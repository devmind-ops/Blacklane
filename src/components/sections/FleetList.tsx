import Image from "next/image";
import { Button } from "@/components/ui/button";
import { User, Briefcase, Wifi } from "lucide-react";
import Link from "next/link";
import { getFleet } from "@/actions/fleet";

export async function FleetList({ category, type }: { category?: string; type?: string }) {
    let fleet = await getFleet();

    if (category) {
        fleet = fleet.filter((car: any) => car.category === category);
    }

    if (type) {
        fleet = fleet.filter((car: any) => car.name.toLowerCase().includes(type.toLowerCase()));
    }

    if (fleet.length === 0) {
        return (
            <div className="col-span-full text-center py-20 bg-zinc-900/10 rounded-lg border border-dashed border-white/10">
                <p className="text-gray-500">No vehicles found in the fleet database.</p>
            </div>
        );
    }

    return (
        <div className="grid lg:grid-cols-2 gap-12">
            {fleet.map((car: any) => (
                <div key={car.id} className="glass-panel group relative overflow-hidden rounded-lg border border-white/10 hover:border-gold-primary/30 transition-all duration-500 bg-zinc-950">
                    <div className="relative h-80 w-full flex items-center justify-center overflow-hidden">
                        {car.image_url ? (
                            <Image
                                src={car.image_url}
                                alt={car.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        ) : (
                            <div className="text-muted-foreground">[Vehicle Image: {car.name}]</div>
                        )}
                    </div>

                    <div className="p-10 space-y-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-3xl font-heading font-bold text-white mb-2">{car.name}</h2>
                                <p className="text-gold-primary font-medium tracking-widest uppercase text-sm">
                                    {(car.description || "").split(',')[0]} {/* Show model name as class subtitle if available in first part of description */}
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-1 text-gray-400">
                                    <User className="h-4 w-4 text-primary" />
                                    <span className="text-sm">{(car.features as any)?.passengers || 3} Pax</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-400">
                                    <Briefcase className="h-4 w-4 text-primary" />
                                    <span className="text-sm">{(car.features as any)?.luggage || 3} Bags</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-gray-400 leading-relaxed font-light">
                                {car.description || "Experience the pinnacle of luxury and comfort with our meticulously maintained series. Perfect for business travel and special occasions."}
                            </p>

                            {(car.features as any)?.note && (
                                <p className="text-[10px] text-zinc-500 italic bg-white/5 p-3 rounded-lg border border-white/5">
                                    * {(car.features as any).note}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <Wifi className="h-3 w-3 text-gold-primary" />
                                <span>Complimentary WiFi</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <div className="w-1 h-1 rounded-full bg-gold-primary" />
                                <span>Bottled Water</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <div className="w-1 h-1 rounded-full bg-gold-primary" />
                                <span>Professional Chauffeur</span>
                            </div>
                        </div>

                        <div className="pt-6">
                            <Button asChild className="w-full h-12 bg-gold-gradient text-black font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform">
                                <Link href={`/fleet/${car.id}`}>Explore Vehicle</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
