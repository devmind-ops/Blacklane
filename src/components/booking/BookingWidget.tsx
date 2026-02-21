"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar, Clock, Flag, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { calculateTripPrice, createBooking } from "@/actions/booking";

function BookingWidgetContent() {
    const searchParams = useSearchParams();
    const [bookingType, setBookingType] = useState<"one-way" | "hourly">("one-way");
    const [isPending, startTransition] = useTransition();
    const [step, setStep] = useState<"search" | "confirm" | "success">("search");

    // Form State
    const [pickup, setPickup] = useState("");
    const [dropoff, setDropoff] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [duration, setDuration] = useState("4");
    const [vehicleCategory, setVehicleCategory] = useState<"sedan" | "van" | "first">("sedan");

    // Handle pre-selected vehicle from URL
    useEffect(() => {
        const vehicle = searchParams.get("vehicle");
        if (vehicle === "sedan" || vehicle === "van" || vehicle === "first") {
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

    const handleSearch = () => {
        if (!pickup || (bookingType === 'one-way' && !dropoff) || !date || !time) {
            alert("Please fill in all search details.");
            return;
        }

        const params = new URLSearchParams({
            pickup,
            dropoff: bookingType === 'one-way' ? dropoff : 'As Directed',
            date,
            time,
            type: bookingType,
            vehicle: vehicleCategory,
            duration: bookingType === 'hourly' ? duration : ""
        });

        window.location.href = `/booking?${params.toString()}`;
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
            <Card className="glass-panel border-white/10 w-full max-w-[450px] shadow-2xl overflow-hidden py-12">
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
        <Card className="glass-panel border-white/10 w-full max-w-[450px] shadow-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />

            <CardHeader>
                <CardTitle className="text-2xl text-center text-gold-light font-normal border-b border-white/10 pb-4">
                    {step === "search" ? "Book Your Chauffeur" : "Confirm Booking"}
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6 pt-4">
                {step === "search" ? (
                    <>
                        <div className="flex bg-white/5 p-1 rounded-md border border-white/10">
                            {["one-way", "hourly"].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setBookingType(type as any)}
                                    className={cn(
                                        "flex-1 py-3 px-4 rounded-sm text-sm font-medium transition-all duration-300 capitalize",
                                        bookingType === type
                                            ? "bg-primary text-black font-bold shadow-lg"
                                            : "text-muted-foreground hover:text-white"
                                    )}
                                >
                                    {type.replace("-", " ")}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Vehicle Class</Label>
                                <Select value={vehicleCategory} onValueChange={(v: any) => setVehicleCategory(v)}>
                                    <SelectTrigger className="w-full bg-white/5 border-white/10 text-white h-12 focus:ring-primary capitalize">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-black border-white/10 text-white">
                                        <SelectItem value="sedan">Business Class Sedan</SelectItem>
                                        <SelectItem value="van">Business Van/SUV</SelectItem>
                                        <SelectItem value="first">First Class Sedan</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Pickup Location</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-primary" />
                                    <Input
                                        value={pickup}
                                        onChange={(e) => setPickup(e.target.value)}
                                        className="pl-10 bg-white/5 border-white/10 text-white h-12"
                                        placeholder="Address, Airport, or Hotel"
                                    />
                                </div>
                            </div>

                            {bookingType === "one-way" && (
                                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <Label className="text-xs uppercase tracking-widest text-muted-foreground">Drop-off Location</Label>
                                    <div className="relative">
                                        <Flag className="absolute left-3 top-3 h-5 w-5 text-primary" />
                                        <Input
                                            value={dropoff}
                                            onChange={(e) => setDropoff(e.target.value)}
                                            className="pl-10 bg-white/5 border-white/10 text-white h-12"
                                            placeholder="Destination address"
                                        />
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
                                    <Input
                                        type="time"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        className="bg-white/5 border-white/10 text-white h-12 [color-scheme:dark]"
                                    />
                                </div>
                            </div>

                            <Button
                                onClick={handleSearch}
                                disabled={isPending}
                                className="w-full bg-gold-gradient text-black font-bold h-14 uppercase tracking-widest hover:scale-[1.02] transition-all duration-300 mt-4"
                            >
                                {isPending ? <Loader2 className="animate-spin" /> : "Calculate Price"}
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="space-y-6 animate-in slide-in-from-right duration-300">
                        <div className="bg-white/5 p-4 rounded-lg border border-primary/20 space-y-2">
                            <div className="flex justify-between items-end">
                                <span className="text-sm text-muted-foreground uppercase tracking-wider">Estimated Total</span>
                                <span className="text-3xl font-bold text-primary">£{tripDetails?.price}</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-400">
                                <span>{bookingType === 'one-way' ? `${tripDetails?.distance} km` : `${duration} hours`}</span>
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
                                disabled={isPending}
                                className="flex-[2] bg-gold-gradient text-black font-bold uppercase"
                            >
                                {isPending ? <Loader2 className="animate-spin" /> : "Confirm Booking"}
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
