"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookingSteps } from "@/components/booking/BookingSteps";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { VehicleStep } from "@/components/booking/VehicleStep";
import { DetailsStep } from "@/components/booking/DetailsStep";
import { CheckoutStep } from "@/components/booking/CheckoutStep";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculateTripPrice } from "@/actions/booking";

const DEFAULT_VEHICLES = {
    sedan: {
        id: "sedan",
        name: "TC Sedan",
        model: "Tesla Model S, Standard Sedans",
        image: "/assets/images/business_class_sedan.png",
    },
    suv: {
        id: "suv",
        name: "Full-Size SUV",
        model: "Cadillac Escalade, Lincoln Navigator",
        image: "/assets/images/business_van.png",
    },
    "s-class": {
        id: "s-class",
        name: "S-Class Sedan",
        model: "Mercedes-Benz S-Class",
        image: "/assets/images/first_class_sedan.png",
    },
    sprinter: {
        id: "sprinter",
        name: "Sprinter Van",
        model: "Mercedes Sprinter",
        image: "/assets/images/business_van.png",
    }
};

function BookingPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [bookingData, setBookingData] = useState<any>({
        pickup: searchParams.get("pickup") || "",
        dropoff: searchParams.get("dropoff") || "",
        date: searchParams.get("date") || "",
        time: searchParams.get("time") || "",
        type: searchParams.get("type") || "one-way",
        duration: searchParams.get("duration") || "",
        vehicleCategory: searchParams.get("vehicle") || "sedan",
        selectedVehicle: null,
        customerDetails: {
            name: "",
            email: "",
            phone: ""
        },
        flightNumber: "",
        notes: ""
    });

    const [isInitializing, setIsInitializing] = useState(false);
    const [initializationError, setInitializationError] = useState<string | null>(null);

    useEffect(() => {
        if (!bookingData.pickup || !bookingData.date) {
            router.push("/");
            return;
        }

        const mode = searchParams.get("mode");
        if (mode === "book" && step === 1) {
            setStep(2);
        }

        // Only initialize if mode is "book" AND we don't have a vehicle AND we're not already initializing OR have an error
        if (mode === "book" && !bookingData.selectedVehicle && !isInitializing && !initializationError) {
            setIsInitializing(true);
            const category = bookingData.vehicleCategory as keyof typeof DEFAULT_VEHICLES;
            const vehicleBase = DEFAULT_VEHICLES[category] || DEFAULT_VEHICLES.sedan;

            calculateTripPrice(
                bookingData.pickup,
                bookingData.dropoff,
                bookingData.date,
                bookingData.time,
                category,
                bookingData.type,
                bookingData.duration ? parseInt(bookingData.duration) : undefined
            ).then(priceData => {
                if (priceData.error) {
                    setInitializationError(priceData.error);
                } else {
                    setBookingData((prev: any) => ({
                        ...prev,
                        selectedVehicle: { ...vehicleBase, ...priceData }
                    }));
                }
                setIsInitializing(false);
            }).catch(err => {
                console.error("Initialization failed:", err);
                setInitializationError("Failed to calculate trip details. Please try again.");
                setIsInitializing(false);
            });
        }
    }, [bookingData.pickup, bookingData.date, searchParams, router, step, bookingData.selectedVehicle, isInitializing, bookingData.vehicleCategory, bookingData.dropoff, bookingData.time, bookingData.type, bookingData.duration, initializationError]);

    const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <main className="min-h-screen bg-black text-white flex flex-col">
            <Header />

            <section className="flex-1 relative pt-32 pb-20 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-primary/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="container relative z-10 max-w-4xl mx-auto px-6 space-y-12">

                    <BookingSteps currentStep={step} />

                    {isInitializing ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4">
                            <Loader2 className="w-12 h-12 text-gold-primary animate-spin" />
                            <p className="text-zinc-500 uppercase tracking-widest text-xs font-bold">Initializing Luxury Experience...</p>
                        </div>
                    ) : initializationError ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-6 text-center">
                            <div className="p-4 bg-red-500/10 rounded-full">
                                <Loader2 className="w-10 h-10 text-red-500" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold">Something went wrong</h3>
                                <p className="text-zinc-400 max-w-sm">{initializationError}</p>
                            </div>
                            <Button
                                onClick={() => router.push("/")}
                                className="bg-white/10 hover:bg-white/20 text-white"
                            >
                                Back to Search
                            </Button>
                        </div>
                    ) : (
                        <>
                            <BookingSummary
                                pickup={bookingData.pickup}
                                dropoff={bookingData.dropoff}
                                date={bookingData.date}
                                time={bookingData.time}
                                onEdit={() => router.push("/")}
                            />

                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {step === 1 && searchParams.get("mode") !== "book" && (
                                    <VehicleStep
                                        bookingData={bookingData}
                                        onSelect={(vehicle: any) => {
                                            setBookingData({ ...bookingData, selectedVehicle: vehicle });
                                            nextStep();
                                        }}
                                    />
                                )}

                                {step === 2 && (
                                    <DetailsStep
                                        bookingData={bookingData}
                                        onBack={prevStep}
                                        onContinue={(details: any) => {
                                            setBookingData({ ...bookingData, ...details });
                                            nextStep();
                                        }}
                                    />
                                )}

                                {step === 3 && (
                                    <CheckoutStep
                                        bookingData={bookingData}
                                        onBack={prevStep}
                                    />
                                )}
                            </div>
                        </>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}

export default function BookingPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-gold-primary" />
            </div>
        }>
            <BookingPageContent />
        </Suspense>
    );
}
