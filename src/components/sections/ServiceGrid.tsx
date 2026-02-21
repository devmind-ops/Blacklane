import Link from "next/link";
import { Plane, Building2, Clock, Briefcase, Wine, Gem, Shield, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
    {
        title: "Airport Transfers",
        description: "Stress-free arrivals and departures with flight tracking and 60 minutes free wait time.",
        icon: Plane,
        href: "/services/airport",
    },
    {
        title: "City to City",
        description: "A luxurious alternative to flights or trains. Door-to-door service in ultimate comfort.",
        icon: Building2,
        href: "/services/city",
    },
    {
        title: "Hourly Service",
        description: "Total flexibility. Your chauffeur is at your disposal for as long as you need.",
        icon: Clock,
        href: "/services/hourly",
    },
    {
        title: "Business Travel",
        description: "Efficient, reliable transportation for roadshows and corporate events.",
        icon: Briefcase,
        href: "/services/business",
    },
    {
        title: "Events & Galas",
        description: "Arrive in style. Red carpet service for special occasions and VIP events.",
        icon: Wine,
        href: "/services/events",
    },
    {
        title: "Wedding Chauffeur",
        description: "Immaculate cars for your special day. Bespoke ribbon and decoration services.",
        icon: Gem,
        href: "/services/wedding",
    },
    {
        title: "Secure Travel",
        description: "Discreet and secure transportation for high-profile individuals.",
        icon: Shield,
        href: "/services/secure",
    },
    {
        title: "Star Class Chauffeurs",
        description: "Explore the city's hidden gems with our knowledgeable local chauffeurs.",
        icon: Globe,
        href: "/services/chauffeurs",
    },
];

export function ServiceGrid() {
    return (
        <section id="services" className="py-24 bg-zinc-950 text-white relative">
            <div className="container mx-auto px-6">

                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Our Services</h2>
                    <div className="h-1 w-20 bg-gold-gradient mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <Link key={index} href={service.href} className="group">
                            <Card className="h-full bg-zinc-900/50 border-white/5 hover:border-gold-dark/50 hover:bg-zinc-900 transition-all duration-300 hover:-translate-y-2 group-hover:shadow-gold-sm">
                                <CardContent className="p-8 flex flex-col items-center text-center h-full">
                                    <div className="mb-6 p-4 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors">
                                        <service.icon className="w-8 h-8 text-primary group-hover:text-gold-light transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {service.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}
