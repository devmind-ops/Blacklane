'use server';

import { Client } from "@googlemaps/google-maps-services-js";
import { createClient } from "@/lib/supabase/server";

const client = new Client({});

export async function calculateTripPrice(
    pickup: string,
    dropoff: string,
    date: string,
    time: string,
    vehicleCategory: 'sedan' | 'van' | 'first',
    bookingType: 'one-way' | 'hourly',
    durationHours?: number
) {
    try {
        const supabase = await createClient();
        // 1. Fetch fleet rates from DB
        const { data: fleet, error: fleetError } = await supabase
            .from("fleet")
            .select("*")
            .eq("category", vehicleCategory)
            .single();
        // ... (rest of the logic remains the same)
        if (fleetError || !fleet) {
            console.error("Fleet lookup failed:", fleetError);
            return { error: "Vehicle type not found" };
        }

        if (bookingType === 'hourly') {
            if (!durationHours) return { error: "Duration required for hourly booking" };
            const price = durationHours * fleet.per_hour_rate;
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
            timeout: 1000,
        });

        if (response.data.rows[0].elements[0].status !== "OK") {
            return { error: "Could not calculate distance" };
        }

        const distanceKm = response.data.rows[0].elements[0].distance.value / 1000;
        const durationMins = response.data.rows[0].elements[0].duration.value / 60;

        const price = fleet.base_rate + (distanceKm * fleet.per_km_rate);

        return {
            price: Math.round(price),
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
    booking_type: 'one-way' | 'hourly';
    duration_hours?: number;
    calculated_price: number;
    customer_details: {
        name: string;
        email: string;
        phone: string;
    }
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

        if (error) throw error;
        return { success: true, bookingId: data.id };
    } catch (e) {
        console.error("Booking creation failed:", e);
        return { error: "Failed to create booking" };
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
