import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FleetShowcase() {
    return (
        <section
            id="fleet"
            className="relative py-32 bg-fixed bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: "url('/assets/images/luxury_fleet_lineup_1770699971769.png')" }}
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

            <div className="container relative z-10 px-6 text-center">
                <div className="max-w-3xl mx-auto glass-panel p-10 md:p-16 rounded-lg border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-700">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white">Our Fleet</h2>
                    <p className="text-lg md:text-xl text-gray-300 mb-8 font-light">
                        Choose from our exclusive selection of vehicles including the Mercedes-Benz S-Class, BMW 7 Series, and V-Class available for any occasion.
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="bg-gold-gradient text-black font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                    >
                        <Link href="/fleet">View All Vehicles</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
