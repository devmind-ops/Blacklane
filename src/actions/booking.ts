'use server';

import { Client } from "@googlemaps/google-maps-services-js";
import { createClient } from "@/lib/supabase/server";

const client = new Client({});

export async function calculateTripPrice(
    pickup: string,
    dropoff: string,
    date: string,
    time: string,
    vehicleCategory: string,
    bookingType: string,
    durationHours?: number,
    extraFees: number = 0
) {
    try {
        const supabase = await createClient();

        // Map frontend categories to database categories
        const categoryMap: Record<string, string> = {
            'sedan': 'sedan',
            'suv': 'van',
            's-class': 'first',
            'sprinter': 'van'
        };

        const dbCategory = categoryMap[vehicleCategory] || vehicleCategory;

        // 1. Fetch fleet rates from DB
        let query = supabase.from("fleet").select("*").eq("category", dbCategory);

        // Disambiguate if category is shared (e.g., 'van' is used for SUV and Sprinter)
        if (vehicleCategory === 'suv') {
            query = query.ilike('name', '%SUV%');
        } else if (vehicleCategory === 'sprinter') {
            query = query.ilike('name', '%Sprinter%');
        }

        const { data: fleetArray, error: fleetError } = await query;

        if (fleetError || !fleetArray || fleetArray.length === 0) {
            console.error("Fleet lookup failed:", fleetError);
            return { error: "Vehicle type not found" };
        }

        // Use the first match (should be unique after filtering)
        const fleet = fleetArray[0];

        if (bookingType === 'hourly') {
            if (!durationHours) return { error: "Duration required for hourly booking" };
            const price = (durationHours * fleet.per_hour_rate) + extraFees;
            return {
                price: Math.round(price),
                duration: durationHours * 60, // minutes
                vehicleId: fleet.id
            };
        }

        // 2. One-way distance calculation
        if (!process.env.GOOGLE_MAPS_API_KEY) {
            console.warn("Missing GOOGLE_MAPS_API_KEY");
            return { error: "Configuration error" };
        }

        const response = await client.distancematrix({
            params: {
                origins: [pickup],
                destinations: [dropoff],
                key: process.env.GOOGLE_MAPS_API_KEY,
            },
            timeout: 5000,
        });

        if (response.data.rows[0].elements[0].status !== "OK") {
            return { error: "Could not calculate distance" };
        }

        const distanceKm = response.data.rows[0].elements[0].distance.value / 1000;
        const durationMins = response.data.rows[0].elements[0].duration.value / 60;

        let basePrice = fleet.base_rate + (distanceKm * fleet.per_km_rate);

        // Multiplier for Round Trip (simple approximation: 1.8x)
        if (bookingType === 'round-trip') {
            basePrice *= 1.8;
        }

        const finalPrice = basePrice + extraFees;

        return {
            price: Math.round(finalPrice),
            distance: distanceKm.toFixed(1),
            duration: Math.round(durationMins),
            vehicleId: fleet.id
        };

    } catch (e) {
        console.error(e);
        return { error: "Calculation failed" };
    }
}

export async function createBooking(bookingData: {
    pickup_location: string;
    dropoff_location?: string;
    pickup_time: string;
    vehicle_id: string;
    booking_type: string;
    duration_hours?: number;
    calculated_price: number;
    customer_details: {
        name: string;
        email: string;
        phone: string;
    },
    flight_number?: string;
    airport_code?: string;
    airline?: string;
    pickup_method?: string;
    notes?: string;
}) {
    try {
        const supabase = await createClient();

        // Optionally attach user_id if logged in
        const { data: { user } } = await supabase.auth.getUser();
        const finalData = user ? { ...bookingData, user_id: user.id } : bookingData;

        const { data, error } = await supabase
            .from("bookings")
            .insert([finalData])
            .select()
            .single();

        if (error) {
            console.error("Supabase insert error:", error);
            return { error: `Database error: ${error.message} (${error.code})`, details: error };
        }
        return { success: true, bookingId: data.id };
    } catch (e: any) {
        console.error("Booking creation exception:", e);
        return { error: `Exception: ${e.message || "Unknown error"}` };
    }
}

export async function getUserBookings() {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return [];

        const { data, error } = await supabase
            .from("bookings")
            .select(`
                *,
                fleet (
                    name,
                    category,
                    image_url
                )
            `)
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

        if (error) throw error;
        return data;
    } catch (e) {
        console.error("Failed to fetch user bookings:", e);
        return [];
    }
}

export async function calculateAllVehiclePrices(
    pickup: string,
    dropoff: string,
    date: string,
    time: string,
    bookingType: string,
    durationHours?: number
) {
    try {
        const categories = ['sedan', 'suv', 's-class', 'sprinter'];

        const results = await Promise.all(
            categories.map(category =>
                calculateTripPrice(pickup, dropoff, date, time, category, bookingType, durationHours)
            )
        );

        return {
            sedan: results[0],
            suv: results[1],
            "s-class": results[2],
            sprinter: results[3]
        };
    } catch (e) {
        console.error("Bulk price calculation failed:", e);
        return { error: "Could not calculate all prices" };
    }
}
