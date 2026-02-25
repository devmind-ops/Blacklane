import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import { Suspense } from "react";
import { FleetList } from "@/components/sections/FleetList";
import { FleetSkeleton } from "@/components/sections/FleetSkeleton";

export const dynamic = 'force-dynamic';

export default function FleetPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Header />

            {/* Hero */}
            <section className="h-[40vh] relative flex items-center justify-center overflow-hidden">
                <Image
                    src="/assets/images/luxury_fleet_lineup_1770699971769.png"
                    alt="Our Fleet"
                    fill
                    className="object-cover opacity-50"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="relative z-10 text-center space-y-4 px-6">
                    <h1 className="text-5xl md:text-6xl font-heading font-bold text-white animate-in slide-in-from-bottom-4 duration-700">Our Fleet</h1>
                    <p className="text-xl text-gold-light max-w-2xl mx-auto font-light">Elegance, comfort, and safety in every mile.</p>
                </div>
            </section>

            <section className="py-24 container mx-auto px-6">
                <Suspense fallback={<FleetSkeleton />}>
                    <FleetList />
                </Suspense>
            </section>

            <Footer />
        </main>
    );
}
