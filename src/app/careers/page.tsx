import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, Star, GraduationCap, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CareerPage() {
    const opportunities = [
        {
            title: "Professional Chauffeur",
            location: "London / Global",
            type: "Full-time",
            description: "Become the face of Midnight. We are looking for experienced, discreet, and highly professional chauffeurs."
        },
        {
            title: "Operations Dispatcher",
            location: "Remote / Hybrid",
            type: "Full-time",
            description: "Coordinate our global fleet with precision. requires exceptional multitasking and communication skills."
        },
        {
            title: "Customer Success Representative",
            location: "London / New York",
            type: "Full-time",
            description: "Deliver the Midnight experience through exceptional booking support and client care."
        }
    ];

    const values = [
        {
            icon: Star,
            title: "Excellence",
            description: "We strive for perfection in every detail, from vehicle maintenance to client interaction."
        },
        {
            icon: Users,
            title: "Integrity",
            description: "Discretion and trust are the foundations of our professional relationships."
        },
        {
            icon: GraduationCap,
            title: "Development",
            description: "We invest in continuous training and certification for all our team members."
        }
    ];

    return (
        <main className="min-h-screen bg-black text-white">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="/assets/images/luxury_fleet_lineup_1770699971769.png"
                    alt="Career at Blackcars Chauffeurs"
                    fill
                    className="object-cover opacity-50"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
                <div className="relative z-10 text-center space-y-6 px-6 max-w-4xl mx-auto">
                    <div className="inline-block py-1 px-3 border border-gold-primary/30 rounded-full bg-gold-primary/5 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="text-gold-primary text-xs font-bold uppercase tracking-[0.3em]">Join the Elite</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-heading font-bold tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        Your <span className="text-gold-primary">Career</span> Journey
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000">
                        Build a future with the world's leading luxury transportation service.
                    </p>
                </div>
            </section>

            {/* Why Join Us */}
            <section className="py-32 container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                    <h2 className="text-gold-primary text-sm font-bold uppercase tracking-[0.3em]">The Midnight Standard</h2>
                    <h3 className="text-4xl md:text-5xl font-heading font-bold">Why Join Our Career Path?</h3>
                    <p className="text-zinc-400 text-lg font-light leading-relaxed">
                        We don't just offer jobs; we provide a career path for those who share our passion for excellence, service, and luxury.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {values.map((value, i) => (
                        <div key={i} className="glass-panel p-10 border border-white/5 bg-zinc-900/40 rounded-3xl space-y-6 group hover:border-gold-primary/20 transition-colors">
                            <div className="w-14 h-14 rounded-2xl bg-gold-primary/10 flex items-center justify-center group-hover:bg-gold-primary/20 transition-colors">
                                <value.icon className="w-7 h-7 text-gold-primary" />
                            </div>
                            <h4 className="text-2xl font-heading font-bold">{value.title}</h4>
                            <p className="text-zinc-400 font-light leading-relaxed">
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-32 bg-zinc-950 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div className="space-y-4">
                            <h2 className="text-gold-primary text-sm font-bold uppercase tracking-[0.3em]">Opportunities</h2>
                            <h3 className="text-4xl font-heading font-bold">Current career Openings</h3>
                        </div>
                        <p className="text-zinc-400 max-w-md">Find the role that fits your expertise and join our global team of professionals.</p>
                    </div>

                    <div className="space-y-6">
                        {opportunities.map((job, i) => (
                            <Link href="/contact" key={i} className="block group">
                                <div className="p-8 border border-white/5 bg-zinc-900/20 hover:bg-zinc-900 transition-all rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-8 group-hover:border-gold-primary/30">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <h4 className="text-2xl font-heading font-bold text-white group-hover:text-gold-primary transition-colors">{job.title}</h4>
                                            <span className="px-3 py-1 bg-gold-primary/10 text-gold-primary text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">{job.type}</span>
                                        </div>
                                        <div className="flex items-center gap-6 text-sm text-zinc-500 font-bold uppercase tracking-widest">
                                            <span className="flex items-center gap-2"><Briefcase className="w-4 h-4" /> {job.location}</span>
                                        </div>
                                        <p className="text-zinc-400 max-w-2xl font-light">{job.description}</p>
                                    </div>
                                    <div className="flex items-center gap-4 text-gold-primary font-bold uppercase tracking-widest text-sm">
                                        Learn More <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 container mx-auto px-6 text-center">
                <div className="max-w-3xl mx-auto space-y-10">
                    <h3 className="text-4xl md:text-5xl font-heading font-bold">Don't See a Fit?</h3>
                    <p className="text-zinc-400 text-xl font-light leading-relaxed">
                        We are always looking for exceptional talent to join our global network.
                        Send us your details and we'll keep you in mind for future career opportunities.
                    </p>
                    <Link href="/contact">
                        <Button size="lg" className="bg-gold-gradient text-black font-bold h-16 px-12 group">
                            Submit Your Interest
                            <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
