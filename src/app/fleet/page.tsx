import { redirect } from "next/navigation";
import { getFleet } from "@/actions/fleet";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import { Suspense } from "react";
import { FleetList } from "@/components/sections/FleetList";
import { FleetSkeleton } from "@/components/sections/FleetSkeleton";

export const dynamic = 'force-dynamic';

export default async function FleetPage({ searchParams }: { searchParams: Promise<{ category?: string; type?: string }> }) {
    const { category, type } = await searchParams;

    // Smart Redirect: If a specific category or type is requested and only one vehicle matches, go directly to that vehicle.
    if (category || type) {
        const fleet = await getFleet();
        let filtered = fleet;
        if (category) filtered = filtered.filter((car: any) => car.category === category);
        if (type) filtered = filtered.filter((car: any) => car.name.toLowerCase().includes(type.toLowerCase()));

        if (filtered.length === 1) {
            redirect(`/fleet/${filtered[0].id}`);
        }
    }

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
                    <h1 className="text-5xl md:text-6xl font-heading font-bold text-white animate-in slide-in-from-bottom-4 duration-700">
                        {type ? `${type.replace('-', ' ').toUpperCase()} CLASS` : category ? `${category.replace('-', ' ')} Class` : "Our Fleet"}
                    </h1>
                    <p className="text-xl text-gold-light max-w-2xl mx-auto font-light">Elegance, comfort, and safety in every mile.</p>
                </div>
            </section>

            <section className="py-24 container mx-auto px-6">
                <Suspense fallback={<FleetSkeleton />}>
                    <FleetList category={category} type={type} />
                </Suspense>
            </section>

            <Footer />
        </main>
    );
}
