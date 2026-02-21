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

    useEffect(() => {
        if (!bookingData.pickup || !bookingData.date) {
            router.push("/");
        }
    }, [bookingData, router]);

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

                    <BookingSummary
                        pickup={bookingData.pickup}
                        dropoff={bookingData.dropoff}
                        date={bookingData.date}
                        time={bookingData.time}
                        onEdit={() => router.push("/")}
                    />

                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {step === 1 && (
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
