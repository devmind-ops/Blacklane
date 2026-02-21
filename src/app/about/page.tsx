import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ValuesSection } from "@/components/sections/ValuesSection";
import Image from "next/image";
import { Globe, Users, Award, ShieldCheck, Target, Eye, Calendar, Sparkles } from "lucide-react";
import { Counter } from "@/components/ui/Counter";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="/assets/images/luxury_fleet_lineup_1770699971769.png"
                    alt="About Midnight Luxury"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
                <div className="relative z-10 text-center space-y-8 px-6 max-w-4xl mx-auto">
                    <div className="inline-block py-1 px-3 border border-gold-primary/30 rounded-full bg-gold-primary/5 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="text-gold-primary text-xs font-bold uppercase tracking-[0.3em]">Established 2010</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-heading font-bold tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        Defining the Standard of <span className="text-gold-primary">Luxury</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000">
                        A decade of uncompromised excellence in global chauffeured travel.
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 border-y border-white/5 bg-zinc-900/10">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        <div className="space-y-2">
                            <p className="text-5xl font-heading font-bold text-gold-primary">
                                <Counter end={14} suffix="+" />
                            </p>
                            <p className="text-zinc-500 uppercase tracking-widest text-xs font-bold">Years of Excellence</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-5xl font-heading font-bold text-white">
                                <Counter end={50} suffix="k+" />
                            </p>
                            <p className="text-zinc-500 uppercase tracking-widest text-xs font-bold">Journeys Completed</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-5xl font-heading font-bold text-white">
                                <Counter end={120} />
                            </p>
                            <p className="text-zinc-500 uppercase tracking-widest text-xs font-bold">Global Cities</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-5xl font-heading font-bold text-white">
                                <Counter end={4.9} decimals={1} suffix="/5" />
                            </p>
                            <p className="text-zinc-500 uppercase tracking-widest text-xs font-bold">Client Rating</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story / Legacy */}
            <section className="py-32 container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-gold-primary text-sm font-bold uppercase tracking-[0.3em]">Our Legacy</h2>
                            <h3 className="text-5xl font-heading font-bold leading-tight">Beyond the Destination</h3>
                        </div>
                        <div className="space-y-6 text-xl text-zinc-400 font-light leading-relaxed">
                            <p>
                                Midnight Luxury was born from a vision to redefine the world of private transportation. We believe that professional chauffeuring is an art form—one that requires precision, discretion, and a deep understanding of the traveler's needs.
                            </p>
                            <p>
                                What began as a local service in London has evolved into a global benchmark for luxury travel. Our commitment remains the same: ensuring every mile is traveled with absolute comfort and peace of mind.
                            </p>
                        </div>
                        <div className="flex gap-8 pt-6">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-6 h-6 text-gold-primary" />
                                <span className="text-sm font-bold uppercase">Safety First</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Globe className="w-6 h-6 text-gold-primary" />
                                <span className="text-sm font-bold uppercase">Global Reach</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative aspect-square md:aspect-video lg:aspect-square w-full rounded-2xl overflow-hidden group">
                        <Image
                            src="/assets/images/chauffeur_opening_door_1770699956596.png"
                            alt="Professional Chauffeur Service"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gold-primary/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700" />
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-32 bg-zinc-950 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gold-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Mission */}
                        <div className="glass-panel p-12 space-y-8 border border-white/5 bg-zinc-900/20 rounded-3xl group hover:border-gold-primary/20 transition-colors">
                            <div className="w-16 h-16 rounded-2xl bg-gold-primary/10 flex items-center justify-center group-hover:bg-gold-primary/20 transition-colors">
                                <Target className="w-8 h-8 text-gold-primary" />
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-3xl font-heading font-bold">Our Mission</h4>
                                <p className="text-zinc-400 text-lg font-light leading-relaxed">
                                    To provide seamless, secure, and sophisticated transportation solutions that empower our clients to focus on what matters most, while we handle every detail of their journey.
                                </p>
                            </div>
                        </div>

                        {/* Vision */}
                        <div className="glass-panel p-12 space-y-8 border border-white/5 bg-zinc-900/20 rounded-3xl group hover:border-gold-primary/20 transition-colors">
                            <div className="w-16 h-16 rounded-2xl bg-gold-primary/10 flex items-center justify-center group-hover:bg-gold-primary/20 transition-colors">
                                <Eye className="w-8 h-8 text-gold-primary" />
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-3xl font-heading font-bold">Our Vision</h4>
                                <p className="text-zinc-400 text-lg font-light leading-relaxed">
                                    To be the world’s most trusted luxury travel partner, recognized globally for setting new standards in service innovation, professional excellence, and client satisfaction.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-32 container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-gold-primary text-sm font-bold uppercase tracking-[0.3em] mb-4">The Journey</h2>
                    <h3 className="text-5xl font-heading font-bold">Milestones of Success</h3>
                </div>

                <div className="relative max-w-5xl mx-auto space-y-24 before:absolute before:inset-y-0 before:left-1/2 before:-translate-x-1/2 before:w-px before:bg-gradient-to-b before:from-transparent before:via-gold-primary/30 before:to-transparent">
                    {/* Item 1 */}
                    <div className="relative flex items-center justify-between group">
                        <div className="w-[45%] text-right space-y-2 pr-12">
                            <h5 className="text-gold-primary font-bold text-2xl font-heading tracking-widest">2010</h5>
                            <p className="text-zinc-400">Founded in London with a single flagship S-Class sedan.</p>
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold-primary shadow-[0_0_15px_rgba(234,179,8,0.5)] z-10" />
                        <div className="w-[45%] pl-12" />
                    </div>

                    {/* Item 2 */}
                    <div className="relative flex items-center justify-between group">
                        <div className="w-[45%] pr-12" />
                        <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-zinc-800 border-2 border-gold-primary/50 group-hover:bg-gold-primary transition-colors z-10" />
                        <div className="w-[45%] space-y-2 pl-12">
                            <h5 className="text-gold-primary font-bold text-2xl font-heading tracking-widest">2015</h5>
                            <p className="text-zinc-400">Expansion into Europe and implementation of our first customized fleet management software.</p>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="relative flex items-center justify-between group">
                        <div className="w-[45%] text-right space-y-2 pr-12">
                            <h5 className="text-gold-primary font-bold text-2xl font-heading tracking-widest">2019</h5>
                            <p className="text-zinc-400">Reached 50 cities milestone and introduced electric luxury fleet options.</p>
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-zinc-800 border-2 border-gold-primary/50 group-hover:bg-gold-primary transition-colors z-10" />
                        <div className="w-[45%] pl-12" />
                    </div>

                    {/* Item 4 */}
                    <div className="relative flex items-center justify-between group">
                        <div className="w-[45%] pr-12" />
                        <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold-primary shadow-[0_0_15px_rgba(234,179,8,0.5)] z-10" />
                        <div className="w-[45%] space-y-2 pl-12">
                            <h5 className="text-gold-primary font-bold text-2xl font-heading tracking-widest">2024</h5>
                            <p className="text-zinc-400">Pioneering AI-driven route optimization and private jet lounge transfers globally.</p>
                        </div>
                    </div>
                </div>
            </section>

            <ValuesSection />
            <Footer />
        </main>
    );
}
