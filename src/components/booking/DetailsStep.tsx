"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, Plane, MessageSquare, ArrowLeft, ArrowRight } from "lucide-react";

interface DetailsStepProps {
    bookingData: any;
    onBack: () => void;
    onContinue: (details: any) => void;
}

export function DetailsStep({ bookingData, onBack, onContinue }: DetailsStepProps) {
    const [details, setDetails] = useState({
        customerDetails: bookingData.customerDetails,
        flightNumber: bookingData.flightNumber,
        notes: bookingData.notes
    });

    const isAirport = bookingData.pickup.toLowerCase().includes("airport") ||
        bookingData.pickup.toLowerCase().includes("heathrow") ||
        bookingData.pickup.toLowerCase().includes("gatwick") ||
        bookingData.pickup.toLowerCase().includes("lhr") ||
        bookingData.pickup.toLowerCase().includes("lgw");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onContinue(details);
    };

    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-heading font-bold">Ride <span className="text-gold-primary">Details</span></h2>
                <p className="text-zinc-500 font-light">Please provide the passenger information and any special requests.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 animate-in slide-in-from-right duration-500">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Passenger Info */}
                    <div className="space-y-6">
                        <div className="space-y-2 group">
                            <Label className="text-zinc-400 font-bold uppercase tracking-widest text-[10px] ml-1">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 transition-colors group-focus-within:text-gold-primary" />
                                <Input
                                    required
                                    value={details.customerDetails.name}
                                    onChange={(e) => setDetails({
                                        ...details,
                                        customerDetails: { ...details.customerDetails, name: e.target.value }
                                    })}
                                    placeholder="John Doe"
                                    className="h-14 pl-12 bg-white/5 border-white/10 text-white rounded-xl focus:border-gold-primary/50 transition-all placeholder:text-zinc-700"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <Label className="text-zinc-400 font-bold uppercase tracking-widest text-[10px] ml-1">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 transition-colors group-focus-within:text-gold-primary" />
                                <Input
                                    required
                                    type="email"
                                    value={details.customerDetails.email}
                                    onChange={(e) => setDetails({
                                        ...details,
                                        customerDetails: { ...details.customerDetails, email: e.target.value }
                                    })}
                                    placeholder="name@example.com"
                                    className="h-14 pl-12 bg-white/5 border-white/10 text-white rounded-xl focus:border-gold-primary/50 transition-all placeholder:text-zinc-700"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <Label className="text-zinc-400 font-bold uppercase tracking-widest text-[10px] ml-1">Phone Number</Label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 transition-colors group-focus-within:text-gold-primary" />
                                <Input
                                    required
                                    type="tel"
                                    value={details.customerDetails.phone}
                                    onChange={(e) => setDetails({
                                        ...details,
                                        customerDetails: { ...details.customerDetails, phone: e.target.value }
                                    })}
                                    placeholder="+44 7000 000000"
                                    className="h-14 pl-12 bg-white/5 border-white/10 text-white rounded-xl focus:border-gold-primary/50 transition-all placeholder:text-zinc-700"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="space-y-6">
                        {isAirport && (
                            <div className="space-y-2 group animate-in slide-in-from-top-2 duration-300">
                                <Label className="text-zinc-400 font-bold uppercase tracking-widest text-[10px] ml-1">Flight Number</Label>
                                <div className="relative">
                                    <Plane className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 transition-colors group-focus-within:text-gold-primary" />
                                    <Input
                                        value={details.flightNumber}
                                        onChange={(e) => setDetails({ ...details, flightNumber: e.target.value })}
                                        placeholder="e.g. BA123"
                                        className="h-14 pl-12 bg-white/5 border-white/10 text-white rounded-xl focus:border-gold-primary/50 transition-all placeholder:text-zinc-700"
                                    />
                                </div>
                                <p className="text-[10px] text-zinc-600 font-medium ml-1">We track your flight to adjust for delays.</p>
                            </div>
                        )}

                        <div className="space-y-2 group">
                            <Label className="text-zinc-400 font-bold uppercase tracking-widest text-[10px] ml-1">Notes for Chauffeur</Label>
                            <div className="relative">
                                <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-zinc-600 transition-colors group-focus-within:text-gold-primary" />
                                <Textarea
                                    value={details.notes}
                                    onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                                    placeholder="Enter any special requests, gate numbers, or child seat requirements..."
                                    className="min-h-[148px] pl-12 pt-4 bg-white/5 border-white/10 text-white rounded-xl focus:border-gold-primary/50 transition-all placeholder:text-zinc-700 resize-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onBack}
                        className="flex-1 h-14 border-white/10 text-white uppercase tracking-widest font-bold hover:bg-white/5"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <Button
                        type="submit"
                        className="flex-[2] h-14 bg-gold-gradient text-black font-bold uppercase tracking-widest hover:scale-[1.02] transition-all"
                    >
                        Continue to Checkout
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </form>
        </div>
    );
}
