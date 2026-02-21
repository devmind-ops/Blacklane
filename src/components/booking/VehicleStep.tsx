"use client";

import { useEffect, useState, useTransition } from "react";
import { calculateAllVehiclePrices } from "@/actions/booking";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, Wifi, Loader2, Info } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface VehicleStepProps {
    bookingData: any;
    onSelect: (vehicle: any) => void;
}

export function VehicleStep({ bookingData, onSelect }: VehicleStepProps) {
    const [isPending, startTransition] = useTransition();
    const [prices, setPrices] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        startTransition(async () => {
            const result = await calculateAllVehiclePrices(
                bookingData.pickup,
                bookingData.dropoff,
                bookingData.date,
                bookingData.time,
                bookingData.type,
                bookingData.type === 'hourly' ? parseInt(bookingData.duration) : undefined
            );

            if (result.error) {
                setError(result.error);
            } else {
                setPrices(result);
            }
        });
    }, [bookingData]);

    const vehicles = [
        {
            id: "sedan",
            name: "Business Class",
            model: "Mercedes-Benz E-Class, BMW 5 Series",
            capacity: 3,
            luggage: 2,
            image: "/assets/images/business_class_sedan.png",
            features: ["Professional Chauffeur", "Free WiFi", "Bottled Water"]
        },
        {
            id: "van",
            name: "Business Van/SUV",
            model: "Mercedes-Benz V-Class, Cadillac Escalade",
            capacity: 5,
            luggage: 6,
            image: "/assets/images/business_van.png",
            features: ["Spacious Interior", "Free WiFi", "Group Travel"]
        },
        {
            id: "first",
            name: "First Class",
            model: "Mercedes-Benz S-Class, BMW 7 Series",
            capacity: 3,
            luggage: 2,
            image: "/assets/images/first_class_sedan.png",
            features: ["Top-tier Luxury", "Heated Seats", "Premium Refreshments"]
        }
    ];

    if (error) {
        return (
            <div className="glass-panel p-12 rounded-3xl border border-red-500/20 text-center space-y-4">
                <Info className="w-12 h-12 text-red-500 mx-auto" />
                <h3 className="text-xl font-bold">Calculation Error</h3>
                <p className="text-gray-400">{error}</p>
                <Button variant="outline" onClick={() => window.location.reload()}>Try Again</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-heading font-bold text-center mb-8">Select Your <span className="text-gold-primary">Vehicle</span></h2>

            <div className="grid gap-6">
                {vehicles.map((v) => {
                    const priceData = prices ? prices[v.id as keyof typeof prices] : null;
                    const price = priceData?.price;
                    const isLoading = isPending || !prices;

                    return (
                        <Card
                            key={v.id}
                            className={cn(
                                "glass-panel border-white/5 overflow-hidden transition-all duration-500 hover:border-gold-primary/30 group cursor-pointer",
                                bookingData.selectedVehicle?.id === v.id && "border-gold-primary ring-1 ring-gold-primary"
                            )}
                            onClick={() => price && onSelect({ ...v, ...priceData })}
                        >
                            <CardContent className="p-0 flex flex-col md:flex-row">
                                {/* Vehicle Image */}
                                <div className="relative w-full md:w-1/3 aspect-video md:aspect-auto bg-white/5 overflow-hidden">
                                    <Image
                                        src={v.image}
                                        alt={v.name}
                                        fill
                                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>

                                {/* Vehicle Details */}
                                <div className="flex-1 p-8 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white group-hover:text-gold-primary transition-colors">{v.name}</h3>
                                            <p className="text-zinc-500 text-sm">{v.model}</p>
                                        </div>
                                        <div className="text-right">
                                            {isLoading ? (
                                                <div className="flex items-center gap-2 text-gold-primary">
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    <span className="text-sm font-bold uppercase tracking-widest">Calculating</span>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col">
                                                    <span className="text-3xl font-bold text-gold-primary tracking-tighter">£{price}</span>
                                                    <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Inc. VAT & Fees</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 text-zinc-400">
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-gold-primary/60" />
                                            <span className="text-xs">{v.capacity} Passengers</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="w-4 h-4 text-gold-primary/60" />
                                            <span className="text-xs">{v.luggage} Luggage</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Wifi className="w-4 h-4 text-gold-primary/60" />
                                            <span className="text-xs">Free WiFi</span>
                                        </div>
                                    </div>

                                    <ul className="flex flex-wrap gap-2 pt-2">
                                        {v.features.map((feature, i) => (
                                            <li key={i} className="text-[9px] uppercase tracking-widest font-bold bg-white/5 px-2 py-1 rounded text-zinc-500">
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Action */}
                                <div className="p-8 bg-white/5 md:bg-transparent border-t md:border-t-0 md:border-l border-white/5 flex items-center justify-center">
                                    <Button
                                        className="w-full md:w-32 bg-gold-gradient text-black font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all h-12"
                                        disabled={isLoading}
                                    >
                                        Select
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
