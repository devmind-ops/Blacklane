import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookingWidget } from "@/components/booking/BookingWidget";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getFleet } from "@/actions/fleet";

export const dynamic = 'force-dynamic';

// Mock Data - In real app, fetch from CMS/DB
const services = {
    airport: {
        title: "Airport Transfers",
        description: "Seamless connections between your flight and your final destination.",
        image: "/assets/images/chauffeur_opening_door_1770699956596.png",
        content: "Our airport transfer service monitors your flight in real-time to ensure your chauffeur is waiting when you land. Value your time with our complimentary 60-minute wait time."
    },
    city: {
        title: "City to City",
        description: "Door-to-door luxury travel as an alternative to short-haul flights.",
        image: "/assets/images/luxury_fleet_lineup_1770699971769.png",
        content: "Avoid the airport queues and train delays. Our city-to-city service offers a private, productive, and relaxing environment for your intercity travel."
    },
    hourly: {
        title: "Hourly Service",
        description: "Your personal chauffeur on standby for as long as you need.",
        image: "/assets/images/chauffeur_opening_door_1770699956596.png",
        content: "Perfect for busy days with multiple stops. Whether for business meetings or a shopping tour, your chauffeur stays with the vehicle, ready to move when you are."
    },
    wedding: {
        title: "Wedding Chauffeur",
        description: "Elegant transportation for your special day.",
        image: "/assets/images/chauffeur_opening_door_1770699956596.png",
        content: "Arrive in style on your wedding day. We offer bespoke packages including ribbon decorations and champagne service to make your day unforgettable."
    },
};

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const service = services[slug as keyof typeof services];
    const fleet = await getFleet();
    const recommendedFleet = fleet.slice(0, 2);

    if (!service) {
        if (["business", "events", "secure", "chauffeurs"].includes(slug)) {
            return (
                <main className="min-h-screen bg-black text-white">
                    <Header />
                    <section className="h-[50vh] flex items-center justify-center bg-zinc-900">
                        <h1 className="text-4xl font-heading capitalize">{slug.replace('-', ' ')} Service</h1>
                    </section>
                    <section className="container py-20 text-center">
                        <p>Details coming soon for this service.</p>
                    </section>
                    <Footer />
                </main>
            )
        }
        return notFound();
    }

    return (
        <main className="min-h-screen bg-black text-white">
            <Header />

            {/* Hero */}
            <section className="relative h-[80vh] flex items-center">
                <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

                <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 animate-in slide-in-from-left duration-700">
                        <h1 className="text-5xl md:text-7xl font-heading font-bold text-white">{service.title}</h1>
                        <p className="text-xl text-gold-light border-l-4 border-primary pl-6 py-2">
                            {service.description}
                        </p>
                        <div className="prose prose-invert text-gray-300 font-light text-lg">
                            <p>{service.content}</p>
                        </div>
                    </div>

                    <div className="flex justify-center lg:justify-end animate-in fade-in zoom-in duration-700 delay-200">
                        <BookingWidget />
                    </div>
                </div>
            </section>

            {/* Service Benefits */}
            <section className="py-24 bg-zinc-950">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-heading font-bold mb-12 text-center">Service Highlights</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-black border border-white/5 p-8 rounded-lg text-center hover:border-gold-primary/30 transition-colors">
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Professional Chauffeurs</h3>
                            <p className="text-gray-400 text-sm">Highly trained, discreet, and dedicated to your safety and comfort.</p>
                        </div>
                        <div className="bg-black border border-white/5 p-8 rounded-lg text-center hover:border-gold-primary/30 transition-colors">
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Punctuality Guaranteed</h3>
                            <p className="text-gray-400 text-sm">We value your time. Flight tracking and real-time adjustments ensure we are always there.</p>
                        </div>
                        <div className="bg-black border border-white/5 p-8 rounded-lg text-center hover:border-gold-primary/30 transition-colors">
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Safety First</h3>
                            <p className="text-gray-400 text-sm">Rigorous vehicle maintenance and health protocols for your peace of mind.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recommended Fleet */}
            <section className="py-24 bg-black relative">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-heading font-bold mb-6">Recommended Vehicles</h2>
                    <p className="text-gray-400 mb-12 max-w-2xl mx-auto">Selected from our premium fleet for this specific service.</p>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {recommendedFleet.map((car: any) => (
                            <div key={car.id} className="glass-panel p-6 rounded-lg text-left flex flex-col md:flex-row gap-6 items-center border border-white/10 hover:border-gold-primary/30 transition-colors">
                                <div className="relative w-full md:w-48 h-32 bg-white/5 rounded-md flex items-center justify-center overflow-hidden">
                                    {car.image_url ? (
                                        <Image
                                            src={car.image_url}
                                            alt={car.name}
                                            fill
                                            className="object-contain"
                                        />
                                    ) : (
                                        <div className="text-xs text-muted-foreground">[Image: {car.name}]</div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-bold text-white mb-2">{car.name}</h4>
                                    <p className="text-sm text-gray-400 mb-4 capitalize">{car.category.replace("-", " ")} class. Immaculate condition.</p>
                                    <button className="text-gold-primary text-sm font-bold uppercase hover:underline">View Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
