import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import { notFound } from "next/navigation";
import { User, Briefcase, Wifi, Shield, Clock, MapPin } from "lucide-react";
import { getFleet } from "@/actions/fleet";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const fleet = await getFleet();
    const car = fleet.find(v => v.id === id);

    if (!car) {
        return notFound();
    }

    const features = car.features as any;

    return (
        <main className="min-h-screen bg-black text-white">
            <Header />

            <section className="relative pt-24 pb-20">
                <div className="container mx-auto px-6">
                    {/* Navigation */}
                    <Link href="/fleet" className="text-gold-primary text-sm font-bold tracking-[0.2em] uppercase hover:text-white transition-colors mb-8 inline-flex items-center gap-2 group">
                        <span className="group-hover:-translate-x-1 transition-transform">&larr;</span>
                        Return to Fleet
                    </Link>

                    {/* Desktop/Laptop Showcase */}
                    <div className="space-y-12">
                        {/* Primary Image Hero */}
                        <div className="relative aspect-[3/1] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl group">
                            {car.image_url ? (
                                <Image
                                    src={car.image_url}
                                    alt={car.name}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    priority
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-zinc-600">
                                    <span className="text-sm">Image coming soon</span>
                                </div>
                            )}
                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
                        </div>

                        {/* Content Grid */}
                        <div className="grid lg:grid-cols-2 gap-16">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <p className="text-gold-primary font-medium tracking-widest uppercase text-sm">
                                        The Signature {car.category} Class
                                    </p>
                                    <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight">{car.name}</h1>
                                </div>
                                <div className="prose prose-invert max-w-none">
                                    <p className="text-xl text-zinc-400 font-light leading-relaxed">
                                        {car.description || "Experience the pinnacle of luxury and performance. This vehicle offers an unparalleled travel experience with its spacious interior and state-of-the-art amenities, meticulously maintained for your comfort."}
                                    </p>
                                </div>

                                <div className="pt-6">
                                    <Button asChild className="w-full md:w-auto px-12 h-14 bg-gold-gradient text-black font-bold text-lg uppercase tracking-[0.2em] hover:scale-[1.01] transition-all shadow-xl shadow-gold-primary/10">
                                        <Link href={`/?vehicle=${car.category}`}>Book This Vehicle</Link>
                                    </Button>
                                    <p className="text-zinc-500 text-xs mt-6 uppercase tracking-widest opacity-60">
                                        Fixed Rates • No Hidden Fees • Available 24/7
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-12">
                                <div className="grid grid-cols-3 gap-8 pb-10 border-b border-white/10">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-gold-primary">
                                            <User className="h-4 w-4" />
                                            <span className="text-xs font-bold uppercase tracking-tighter">Capacity</span>
                                        </div>
                                        <p className="text-3xl font-heading">{features?.passengers || 3}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-gold-primary">
                                            <Briefcase className="h-4 w-4" />
                                            <span className="text-xs font-bold uppercase tracking-tighter">Luggage</span>
                                        </div>
                                        <p className="text-3xl font-heading">{features?.luggage || 2}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-gold-primary">
                                            <Wifi className="h-4 w-4" />
                                            <span className="text-xs font-bold uppercase tracking-tighter">5G WiFi</span>
                                        </div>
                                        <p className="text-3xl font-heading">On-board</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-y-6 gap-x-12">
                                    {[
                                        { icon: Shield, text: "Privacy Partition Available" },
                                        { icon: Clock, text: "60-Min Waiting Included" },
                                        { icon: MapPin, text: "Real-time Flight Tracking" },
                                        { icon: User, text: "Bilingual Professional Chauffeurs" },
                                        { icon: Shield, text: "Daily Sanitation Protocol" },
                                        { icon: Clock, text: "24/7 Dispatch Support" }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-zinc-500 hover:text-zinc-300 transition-colors">
                                            <item.icon className="h-4 w-4 text-gold-primary/70" />
                                            <span className="text-sm font-medium">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
