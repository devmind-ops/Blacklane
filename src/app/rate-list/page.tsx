import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function RateListPage() {
    return (
        <main className="min-h-screen bg-black text-white flex flex-col">
            <Header />
            <section className="flex-1 pt-40 pb-20 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-primary/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="container relative z-10 mx-auto px-6">
                    <div className="max-w-4xl mx-auto space-y-12">
                        <div className="text-center space-y-4">
                            <h1 className="text-5xl md:text-6xl font-heading font-bold">Rate <span className="text-gold-primary">List</span></h1>
                            <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
                                Transparent pricing for our premium chauffeur services. View our standard rates for various vehicle classes and service types.
                            </p>
                        </div>

                        <div className="glass-panel border-white/5 p-8 md:p-12 rounded-3xl space-y-10">
                            <div>
                                <h2 className="text-2xl font-bold mb-6 text-gold-primary">Standard Hourly Rates</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { name: "TC Sedan", rate: "$60/hour", models: "Tesla, Standard Sedans", pax: "3 Pax", luggage: "3 Bags" },
                                        { name: "Full-Size SUV", rate: "$90/hour", models: "Escalade, Navigator", pax: "5-6 Pax*", luggage: "5 Bags" },
                                        { name: "S-Class Sedan", rate: "$120/hour", models: "Mercedes-Benz S-Class", pax: "3 Pax", luggage: "3 Bags" },
                                        { name: "Sprinter Van", rate: "$150/hour", models: "Mercedes Sprinter", pax: "11 Pax", luggage: "11 Bags" },
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-white/5 p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-gold-primary/30 transition-all duration-500">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-xl font-bold text-white">{item.name}</h3>
                                                    <span className="text-[10px] uppercase tracking-widest font-bold text-gold-primary/60 bg-gold-primary/10 px-2 py-0.5 rounded">
                                                        {item.rate}
                                                    </span>
                                                </div>
                                                <p className="text-zinc-500 text-xs mt-1">{item.models}</p>
                                                <div className="flex gap-4 mt-2 text-[10px] uppercase tracking-widest font-bold text-zinc-600">
                                                    <span>{item.pax}</span>
                                                    <span>{item.luggage}</span>
                                                </div>
                                            </div>
                                            <span className="text-2xl font-bold text-gold-primary hidden md:block">{item.rate}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-10 border-t border-white/5">
                                <h2 className="text-2xl font-bold mb-6 text-gold-primary">Additional Fees & Logic</h2>
                                <div className="space-y-4 text-zinc-400">
                                    <div className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gold-primary mt-2" />
                                        <p><span className="text-white font-bold">SUV Capacity:</span> *SUVs can accommodate 6 passengers only if there is zero luggage. If luggage is present, the cap is 5 passengers.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gold-primary mt-2" />
                                        <p><span className="text-white font-bold">Meet & Greet:</span> A flat $20.00 fee applies for inside terminal pickups. Parking fees are charged at cost based on the driver's slip.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gold-primary mt-2" />
                                        <p><span className="text-white font-bold">Car Seats:</span> Toddler car seats are available upon request for a flat $20.00 fee per seat.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gold-primary mt-2" />
                                        <p><span className="text-white font-bold">Wait Time:</span> 60 minutes of complimentary wait time for International Arrivals, 30 minutes for Domestic. Additional time charged at hourly rate.</p>
                                    </div>
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
