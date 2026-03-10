"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar, Clock, Flag, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { calculateTripPrice, createBooking } from "@/actions/booking";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";

const LIBRARIES: ("places")[] = ["places"];

function BookingWidgetContent() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        libraries: LIBRARIES,
    });

    const [pickupAutocomplete, setPickupAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const [dropoffAutocomplete, setDropoffAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

    const onPickupLoad = (autocomplete: google.maps.places.Autocomplete) => {
        setPickupAutocomplete(autocomplete);
    };

    const onDropoffLoad = (autocomplete: google.maps.places.Autocomplete) => {
        setDropoffAutocomplete(autocomplete);
    };

    const onPickupPlaceChanged = () => {
        if (pickupAutocomplete !== null) {
            const place = pickupAutocomplete.getPlace();
            if (place.formatted_address) setPickup(place.formatted_address);
        }
    };

    const onDropoffPlaceChanged = () => {
        if (dropoffAutocomplete !== null) {
            const place = dropoffAutocomplete.getPlace();
            if (place.formatted_address) setDropoff(place.formatted_address);
        }
    };

    const searchParams = useSearchParams();
    const router = useRouter();
    const [bookingType, setBookingType] = useState<string>("one-way");
    const [isPending, startTransition] = useTransition();
    const [step, setStep] = useState<"search" | "confirm" | "success">("search");

    // Form State
    const [pickup, setPickup] = useState("");
    const [dropoff, setDropoff] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState(""); // Stores HH:mm (24h format)

    // Custom Time Picker State
    const [selectedHour, setSelectedHour] = useState("12");
    const [selectedMinute, setSelectedMinute] = useState("00");
    const [selectedPeriod, setSelectedPeriod] = useState("PM");

    // Sync custom picker to 24h 'time' state
    useEffect(() => {
        let hour = parseInt(selectedHour);
        if (selectedPeriod === "PM" && hour !== 12) hour += 12;
        if (selectedPeriod === "AM" && hour === 12) hour = 0;
        const timeString = `${hour.toString().padStart(2, '0')}:${selectedMinute}`;
        setTime(timeString);
    }, [selectedHour, selectedMinute, selectedPeriod]);

    const [duration, setDuration] = useState("4");
    const [vehicleCategory, setVehicleCategory] = useState<string>("sedan");

    // Handle pre-selected vehicle from URL
    useEffect(() => {
        const vehicle = searchParams.get("vehicle");
        if (vehicle === "sedan" || vehicle === "suv" || vehicle === "s-class" || vehicle === "sprinter") {
            setVehicleCategory(vehicle as any);
        }
    }, [searchParams]);

    // Trip Result State
    const [tripDetails, setTripDetails] = useState<{
        price: number;
        distance?: string;
        duration: number;
        vehicleId: string;
    } | null>(null);

    // Customer State
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");

    const handleSearch = (mode: 'quote' | 'book') => {
        const isHourly = bookingType === 'hourly';
        const isAirportArrival = bookingType === 'airport-arrival';
        const isAirportDeparture = bookingType === 'airport-departure';
        const isPointToPoint = bookingType === 'point-to-point';
        const isOneWay = bookingType === 'one-way';
        const isRoundTrip = bookingType === 'round-trip';

        // Pickup is always required
        if (!pickup) {
            alert("Please provide a pickup location.");
            return;
        }

        // Dropoff is required for everything except Hourly
        if (!isHourly && !dropoff) {
            alert("Please provide a drop-off location.");
            return;
        }

        // Date and Time are always required
        if (!date || !time) {
            alert("Please select a date and time.");
            return;
        }

        const params = new URLSearchParams({
            pickup,
            dropoff: isHourly ? 'As Directed' : dropoff,
            date,
            time,
            type: bookingType,
            vehicle: vehicleCategory,
            duration: isHourly ? duration : "",
            mode: mode
        });

        startTransition(() => {
            router.push(`/booking?${params.toString()}`);
        });
    };

    const handleConfirmBooking = () => {
        if (!customerName || !customerEmail || !customerPhone) {
            alert("Please provide your contact details.");
            return;
        }

        startTransition(async () => {
            const result = await createBooking({
                pickup_location: pickup,
                dropoff_location: bookingType === 'one-way' ? dropoff : undefined,
                pickup_time: `${date}T${time}`,
                vehicle_id: tripDetails?.vehicleId || "",
                booking_type: bookingType,
                duration_hours: bookingType === 'hourly' ? parseInt(duration) : undefined,
                calculated_price: tripDetails?.price || 0,
                customer_details: {
                    name: customerName,
                    email: customerEmail,
                    phone: customerPhone
                }
            });

            if (result.success) {
                setStep("success");
            } else {
                alert(result.error);
            }
        });
    };

    if (step === "success") {
        return (
            <Card className="glass-panel border-white/10 w-full max-w-md mx-auto shadow-2xl overflow-hidden py-12 px-6">
                <CardContent className="flex flex-col items-center text-center space-y-6">
                    <CheckCircle2 className="w-16 h-16 text-primary animate-bounce" />
                    <h2 className="text-2xl font-heading font-bold text-white">Booking Request Sent</h2>
                    <p className="text-gray-400">
                        Thank you, {customerName}. We have received your request and will contact you shortly at {customerEmail} for confirmation.
                    </p>
                    <Button onClick={() => setStep("search")} className="bg-gold-gradient text-black font-bold uppercase">
                        New Booking
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="glass-panel border-white/10 w-full max-w-md lg:max-w-[450px] shadow-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />

            <CardHeader>
                <CardTitle className="text-2xl text-center text-gold-light font-normal border-b border-white/10 pb-4">
                    {step === "search" ? "Book Your Chauffeur" : "Confirm Booking"}
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6 pt-4">
                {step === "search" ? (
                    <>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Service Type</Label>
                                <Select value={bookingType} onValueChange={(v) => setBookingType(v)}>
                                    <SelectTrigger className="w-full bg-white/5 border-white/10 text-white h-12 focus:ring-primary">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-black border-white/10 text-white">
                                        <SelectItem value="one-way">One Way</SelectItem>
                                        <SelectItem value="round-trip">Round Trip</SelectItem>
                                        <SelectItem value="airport-departure">Airport Departure</SelectItem>
                                        <SelectItem value="point-to-point">Point-to-Point Transfer</SelectItem>
                                        <SelectItem value="hourly">Hourly (As Directed)</SelectItem>
                                        <SelectItem value="airport-arrival">Airport Arrival</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Vehicle Class</Label>
                                <Select value={vehicleCategory} onValueChange={(v: any) => setVehicleCategory(v)}>
                                    <SelectTrigger className="w-full bg-white/5 border-white/10 text-white h-12 focus:ring-primary capitalize">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-black border-white/10 text-white">
                                        <SelectItem value="sedan">TC Sedan</SelectItem>
                                        <SelectItem value="suv">Full-Size SUV</SelectItem>
                                        <SelectItem value="s-class">S-Class Sedan</SelectItem>
                                        <SelectItem value="sprinter">Sprinter Van</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Pickup Location</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-primary z-10" />
                                    {isLoaded ? (
                                        <Autocomplete onLoad={onPickupLoad} onPlaceChanged={onPickupPlaceChanged}>
                                            <Input
                                                value={pickup}
                                                onChange={(e) => setPickup(e.target.value)}
                                                className="pl-10 bg-white/5 border-white/10 text-white h-12"
                                                placeholder="Address, Airport, or Hotel"
                                            />
                                        </Autocomplete>
                                    ) : (
                                        <Input
                                            value={pickup}
                                            onChange={(e) => setPickup(e.target.value)}
                                            className="pl-10 bg-white/5 border-white/10 text-white h-12"
                                            placeholder="Loading maps..."
                                            disabled
                                        />
                                    )}
                                </div>
                            </div>

                            {['one-way', 'round-trip', 'point-to-point', 'airport-departure', 'airport-arrival'].includes(bookingType) && (
                                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <Label className="text-xs uppercase tracking-widest text-muted-foreground">Drop-off Location</Label>
                                    <div className="relative">
                                        <Flag className="absolute left-3 top-3 h-5 w-5 text-primary z-10" />
                                        {isLoaded ? (
                                            <Autocomplete onLoad={onDropoffLoad} onPlaceChanged={onDropoffPlaceChanged}>
                                                <Input
                                                    value={dropoff}
                                                    onChange={(e) => setDropoff(e.target.value)}
                                                    className="pl-10 bg-white/5 border-white/10 text-white h-12"
                                                    placeholder="Destination address"
                                                />
                                            </Autocomplete>
                                        ) : (
                                            <Input
                                                value={dropoff}
                                                onChange={(e) => setDropoff(e.target.value)}
                                                className="pl-10 bg-white/5 border-white/10 text-white h-12"
                                                placeholder="Loading maps..."
                                                disabled
                                            />
                                        )}
                                    </div>
                                </div>
                            )}

                            {bookingType === "hourly" && (
                                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <Label className="text-xs uppercase tracking-widest text-muted-foreground">Duration</Label>
                                    <Select value={duration} onValueChange={setDuration}>
                                        <SelectTrigger className="w-full bg-white/5 border-white/10 text-white h-12">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-black border-white/10 text-white">
                                            {[3, 4, 5, 6, 7, 8, 10, 12].map((h) => (
                                                <SelectItem key={h} value={h.toString()}>{h} Hours</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-xs uppercase tracking-widest text-muted-foreground">Date</Label>
                                    <Input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="bg-white/5 border-white/10 text-white h-12 [color-scheme:dark]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs uppercase tracking-widest text-muted-foreground">Time</Label>
                                    <div className="grid grid-cols-3 gap-2">
                                        <Select value={selectedHour} onValueChange={setSelectedHour}>
                                            <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                                                <SelectValue placeholder="Hr" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-black border-white/10 text-white max-h-[200px]">
                                                {Array.from({ length: 12 }, (_, i) => (i + 1).toString()).map(h => (
                                                    <SelectItem key={h} value={h.padStart(2, '0')}>{h}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Select value={selectedMinute} onValueChange={setSelectedMinute}>
                                            <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                                                <SelectValue placeholder="Min" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-black border-white/10 text-white max-h-[200px]">
                                                {["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"].map(m => (
                                                    <SelectItem key={m} value={m}>{m}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                                            <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                                                <SelectValue placeholder="AM/PM" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-black border-white/10 text-white">
                                                <SelectItem value="AM">AM</SelectItem>
                                                <SelectItem value="PM">PM</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <Button
                                    onClick={() => handleSearch('quote')}
                                    loading={isPending}
                                    variant="outline"
                                    className="w-full border-white/10 text-white font-bold h-14 uppercase tracking-widest hover:bg-white/5 transition-all duration-300"
                                >
                                    Calculate Price
                                </Button>
                                <Button
                                    onClick={() => handleSearch('book')}
                                    loading={isPending}
                                    className="w-full bg-gold-gradient text-black font-bold h-14 uppercase tracking-widest hover:scale-[1.02] transition-all duration-300"
                                >
                                    Book Now
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="space-y-6 animate-in slide-in-from-right duration-300">
                        <div className="bg-white/5 p-4 rounded-lg border border-primary/20 space-y-2">
                            <div className="flex justify-between items-end">
                                <span className="text-sm text-muted-foreground uppercase tracking-wider">Estimated Total</span>
                                <span className="text-3xl font-bold text-primary">${tripDetails?.price}</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-400">
                                <span>{bookingType === 'hourly' ? `${duration} hours` : `${tripDetails?.distance} km`}</span>
                                <span>~{tripDetails?.duration} mins total</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Full Name</Label>
                                <Input
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    placeholder="John Doe"
                                    className="h-10 bg-white/5 border-white/10"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Email Address</Label>
                                <Input
                                    value={customerEmail}
                                    onChange={(e) => setCustomerEmail(e.target.value)}
                                    type="email"
                                    placeholder="john@example.com"
                                    className="h-10 bg-white/5 border-white/10"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Phone Number</Label>
                                <Input
                                    value={customerPhone}
                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                    type="tel"
                                    placeholder="+44 7000 000 000"
                                    className="h-10 bg-white/5 border-white/10"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button variant="outline" onClick={() => setStep("search")} className="flex-1 border-white/10 hover:bg-white/5">
                                Back
                            </Button>
                            <Button
                                onClick={handleConfirmBooking}
                                loading={isPending}
                                className="flex-[2] bg-gold-gradient text-black font-bold uppercase"
                            >
                                Confirm Booking
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export function BookingWidget() {
    return (
        <Suspense fallback={
            <Card className="glass-panel border-white/10 w-full max-w-[450px] h-[600px] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </Card>
        }>
            <BookingWidgetContent />
        </Suspense>
    );
}
