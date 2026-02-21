"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { Plane, Building2, Clock, Briefcase, Wine, Gem, Shield, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
    {
        title: "Airport Transfers",
        description: "Seamless door-to-door service with real-time flight tracking and 60 minutes complimentary wait time. Experience the ultimate in stress-free travel.",
        icon: Plane,
        href: "/services/airport",
        image: "/assets/images/chauffeur_opening_door_1770699956596.png",
        features: ["Flight Tracking", "Meet & Greet", "Wait Time Included"]
    },
    {
        title: "City to City",
        description: "A refined alternative to short-haul flights or trains. Enjoy the privacy and comfort of your own mobile office as we transport you between cities.",
        icon: Building2,
        href: "/services/city",
        image: "/assets/images/luxury_fleet_lineup_1770699971769.png",
        features: ["Door-to-Door", "Privacy Guaranteed", "Flexible Stops"]
    },
    {
        title: "Hourly Service",
        description: "Your private chauffeur at your disposal for as long as you need. Perfect for back-to-back meetings or exploring the city at your own pace.",
        icon: Clock,
        href: "/services/hourly",
        image: "/assets/images/luxury_chauffeur_hero_1770699554633.png",
        features: ["Maximum Flexibility", "Unlimited Stops", "On-Call Service"]
    },
    {
        title: "Business Travel",
        description: "Professional transportation for executive roadshows and corporate events. Reliability and punctuality are the cornerstones of our service.",
        icon: Briefcase,
        href: "/services/business",
        image: "/assets/images/business_class_sedan.png",
        features: ["Executive Standards", "Roadshow Logistics", "Billing Support"]
    },
    {
        title: "Events & Galas",
        description: "Arrive at high-profile events with the elegance you deserve. We provide coordinated fleet solutions for guests and VIPs.",
        icon: Wine,
        href: "/services/events",
        image: "/assets/images/first_class_sedan.png",
        features: ["Red Carpet Presence", "Large Fleet Capacity", "Event Coordination"]
    },
    {
        title: "Wedding Chauffeur",
        description: "Immaculate vehicles and professional chauffeurs for your most special day. Bespoke arrangements to match your wedding theme.",
        icon: Gem,
        href: "/services/wedding",
        image: "/assets/images/luxury_fleet_lineup_1770699971769.png", // Reusing for now
        features: ["Bespoke Decor", "Punctual Service", "Immaculate Fleet"]
    },
    {
        title: "Secure Travel",
        description: "High-level security and discretion for diplomats and VIPs. Chauffeurs trained in defensive driving and protective protocols.",
        icon: Shield,
        href: "/services/secure",
        image: "/assets/images/chauffeur_opening_door_1770699956596.png", // Reusing for now
        features: ["Trained Security", "Confidentiality", "Vetted Chauffeurs"]
    },
    {
        title: "Star Class Chauffeurs",
        description: "Discover the city's best-kept secrets with our knowledgeable local guides. A personalized tour in the comfort of a luxury vehicle.",
        icon: Globe,
        href: "/services/chauffeurs",
        image: "/assets/images/luxury_chauffeur_hero_1770699554633.png", // Reusing for now
        features: ["Local Knowledge", "Custom Itineraries", "Multilingual Guides"]
    }
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="/assets/images/luxury_chauffeur_hero_1770699554633.png"
                    alt="Midnight Luxury Services"
                    fill
                    className="object-cover opacity-50 contrast-125"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black" />

                <div className="relative z-10 text-center space-y-6 px-6 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        Our World Class <span className="text-gold-primary">Services</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
                        Tailored transportation solutions designed for those who demand the highest standards of safety, comfort, and reliability.
                    </p>
                </div>
            </section>

            {/* Services Showcase */}
            <section className="py-24 bg-zinc-950">
                <div className="container mx-auto px-6">
                    <div className="grid gap-20">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className={`flex flex-col lg:flex-row items-center gap-12 group ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                            >
                                {/* Content */}
                                <div className="flex-1 space-y-8">
                                    <div className="space-y-4">
                                        <div className="inline-flex items-center gap-3 text-gold-primary">
                                            <service.icon className="w-6 h-6" />
                                            <span className="text-sm font-bold uppercase tracking-[0.3em]">Premium Service</span>
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-heading font-bold group-hover:text-gold-primary transition-colors duration-500">
                                            {service.title}
                                        </h2>
                                    </div>

                                    <p className="text-zinc-400 text-lg leading-relaxed font-light">
                                        {service.description}
                                    </p>

                                    <ul className="grid grid-cols-2 gap-4">
                                        {service.features.map((feature, fIndex) => (
                                            <li key={fIndex} className="flex items-center gap-2 text-sm text-zinc-500">
                                                <div className="w-1 h-1 rounded-full bg-gold-primary" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="pt-4">
                                        <Link href={service.href}>
                                            <Button variant="outline" className="border-white/10 hover:border-gold-primary hover:text-gold-primary group/btn transition-all duration-300">
                                                Explore Service
                                                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>

                                {/* Image */}
                                <div className="flex-1 w-full">
                                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/5 shadow-2xl group/img">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover/img:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover/img:opacity-40 transition-opacity" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gold-primary/5" />
                <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
                    <h2 className="text-4xl font-heading font-bold mb-6">Experience Excellence Today</h2>
                    <p className="text-zinc-400 text-lg mb-10 font-light">
                        No matter your requirements, we are here to ensure your journey is nothing short of exceptional. Our global network is standing by.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/">
                            <Button size="lg" className="bg-gold-primary text-black hover:bg-gold-light px-12 font-bold h-14 hover:scale-105 transition-all">
                                Book Now
                            </Button>
                        </Link>
                        <Link href="/fleet">
                            <Button size="lg" variant="outline" className="border-white/20 hover:border-gold-primary hover:text-gold-primary hover:bg-gold-primary/5 px-12 h-14 hover:scale-105 transition-all group">
                                View Fleet
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
