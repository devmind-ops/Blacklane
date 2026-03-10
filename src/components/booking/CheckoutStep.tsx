"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createBooking } from "@/actions/booking";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Loader2, ArrowLeft, ShieldCheck, CreditCard, Lock } from "lucide-react";
import Image from "next/image";

interface CheckoutStepProps {
    bookingData: any;
    onBack: () => void;
}

export function CheckoutStep({ bookingData, onBack }: CheckoutStepProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);
    const [bookingId, setBookingId] = useState<string | null>(null);

    const totalAmount = bookingData.selectedVehicle.price + (bookingData.extraFees || 0);

    const handleConfirm = () => {
        startTransition(async () => {
            const result = await createBooking({
                pickup_location: bookingData.pickup,
                dropoff_location: bookingData.dropoff,
                pickup_time: `${bookingData.date}T${bookingData.time}`,
                vehicle_id: bookingData.selectedVehicle.vehicleId,
                booking_type: bookingData.type,
                duration_hours: bookingData.type === 'hourly' ? parseInt(bookingData.duration) : undefined,
                calculated_price: totalAmount,
                customer_details: bookingData.customerDetails,
                flight_number: bookingData.flightNumber?.trim() || "",
                airport_code: bookingData.airportCode?.trim() || "",
                airline: bookingData.airline?.trim() || "",
                pickup_method: bookingData.pickupMethod || "curbside",
                notes: bookingData.notes?.trim() || ""
            });

            if (result.success) {
                setSuccess(true);
                setBookingId(result.bookingId);
            } else {
                alert(result.error);
            }
        });
    };

    if (success) {
        return (
            <div className="max-w-xl mx-auto text-center space-y-8 animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-gold-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-12 h-12 text-gold-primary" />
                </div>
                <div className="space-y-4">
                    <h2 className="text-4xl font-heading font-bold">Booking <span className="text-gold-primary">Confirmed</span></h2>
                    <p className="text-zinc-500 font-light">
                        Thank you for choosing Blackcars Chauffeurs. Your reference number is <span className="text-white font-bold font-mono">{bookingId?.slice(0, 8).toUpperCase()}</span>.
                    </p>
                    <p className="text-zinc-400 text-sm">
                        A confirmation email has been sent to <span className="text-gold-primary">{bookingData.customerDetails.email}</span>. Your chauffeur will be waiting.
                    </p>
                </div>
                <Button
                    onClick={() => router.push('/')}
                    className="w-full h-14 bg-gold-gradient text-black font-bold uppercase tracking-widest hover:scale-[1.02] transition-all"
                >
                    Return to Homepage
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-right duration-500">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-heading font-bold">Secure <span className="text-gold-primary">Checkout</span></h2>
                <p className="text-zinc-500 font-light">Finalize your luxury booking details below.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Summary Column */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="glass-panel border-white/5 overflow-hidden">
                        <CardContent className="p-8 space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="relative w-24 h-24 bg-white/5 rounded-xl overflow-hidden shrink-0">
                                    <Image
                                        src={bookingData.selectedVehicle.image}
                                        alt={bookingData.selectedVehicle.name}
                                        fill
                                        className="object-contain p-2"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold text-white">{bookingData.selectedVehicle.name}</h3>
                                    <p className="text-zinc-500 text-sm">{bookingData.selectedVehicle.model}</p>
                                    <div className="flex gap-4 text-[10px] uppercase tracking-widest font-bold text-gold-primary/60">
                                        <span>{bookingData.type.replace('-', ' ')}</span>
                                        {bookingData.type === 'hourly' && <span>{bookingData.duration} Hours</span>}
                                    </div>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-8 py-6 border-t border-white/5">
                                <div className="space-y-4">
                                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Passenger Details</h4>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">{bookingData.customerDetails.name}</p>
                                        <p className="text-xs text-zinc-400">{bookingData.customerDetails.email}</p>
                                        <p className="text-xs text-zinc-400">{bookingData.customerDetails.phone}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Additional Info</h4>
                                    <div className="space-y-2 text-xs text-zinc-400">
                                        {bookingData.airportCode && (
                                            <p>Airport: <span className="text-white">{bookingData.airportCode} ({bookingData.airline})</span></p>
                                        )}
                                        {bookingData.flightNumber && <p>Flight: <span className="text-white">{bookingData.flightNumber}</span></p>}
                                        {bookingData.pickupMethod === 'meet-greet' && <p>Method: <span className="text-white">Inside Meet & Greet</span></p>}
                                        <p className="italic">"{bookingData.notes || 'No special requests'}"</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-panel border-white/5 bg-gold-primary/5">
                        <CardContent className="p-6 flex items-start gap-4">
                            <ShieldCheck className="w-6 h-6 text-gold-primary shrink-0" />
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-white underline decoration-gold-primary/30">Free Cancellation</p>
                                <p className="text-xs text-zinc-400">Cancel for free up to 24 hours before your scheduled pickup time.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Price Column */}
                <div className="space-y-6">
                    <Card className="glass-panel border-gold-primary/20 bg-gradient-to-br from-zinc-900 to-black sticky top-32">
                        <CardContent className="p-8 space-y-6">
                            <h3 className="text-lg font-bold text-white border-b border-white/5 pb-4">Fare Summary</h3>

                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-400">Base Fare</span>
                                    <span>${bookingData.selectedVehicle.price}</span>
                                </div>
                                {bookingData.extraFees > 0 && (
                                    <div className="flex justify-between text-sm text-gold-primary">
                                        <span className="text-zinc-400">Additional Fees</span>
                                        <span>+${bookingData.extraFees}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-400">Taxes & Fees</span>
                                    <span className="text-green-500">Included</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/5 space-y-2">
                                <div className="flex justify-between items-end text-white">
                                    <span className="text-sm font-bold">Total Amount</span>
                                    <span className="text-4xl font-bold tracking-tighter text-gold-primary">${totalAmount}</span>
                                </div>
                                <p className="text-[10px] text-zinc-600 text-right font-bold uppercase tracking-widest">All inclusive price</p>
                            </div>

                            <div className="space-y-4 pt-4">
                                <div className="flex items-center gap-2 text-[10px] text-zinc-500 justify-center">
                                    <Lock className="w-3 h-3" />
                                    <span>Secure 256-bit SSL encrypted connection</span>
                                </div>
                                <Button
                                    onClick={handleConfirm}
                                    loading={isPending}
                                    className="w-full h-14 bg-gold-gradient text-black font-bold uppercase tracking-widest hover:scale-[1.05] active:scale-95 transition-all shadow-xl shadow-gold-primary/10"
                                >
                                    Book & Pay Now
                                </Button>
                                <button
                                    onClick={onBack}
                                    className="w-full text-[10px] uppercase tracking-widest font-bold text-zinc-600 hover:text-white transition-colors flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft className="w-3 h-3" />
                                    Back to Details
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-center gap-4 opacity-30 grayscale">
                        <CreditCard className="w-8 h-8" />
                        <div className="w-8 h-8 font-bold border rounded flex items-center justify-center text-[8px]">VISA</div>
                        <div className="w-8 h-8 font-bold border rounded flex items-center justify-center text-[8px]">MC</div>
                        <div className="w-8 h-8 font-bold border rounded flex items-center justify-center text-[8px]">AMEX</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
