import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookingWidget } from "@/components/booking/BookingWidget";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFleet } from "@/actions/fleet";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const dynamic = 'force-dynamic';

// Mock Data - In real app, fetch from CMS/DB
const services = {
    airport: {
        title: "Airport Transfers",
        description: "Seamless connections between your flight and your final destination.",
        image: "/assets/images/chauffeur_opening_door_1770699956596.png",
        content: "Our airport transfer service monitors your flight in real-time to ensure your chauffeur is waiting when you land. Value your time with our complimentary 60-minute wait time.",
        highlights: [
            { title: "Flight Tracking", description: "We monitor your flight and adjust to delays.", icon: "Clock" },
            { title: "Complimentary Wait", description: "60-minute free wait time after arrival.", icon: "Clock" },
            { title: "Meet & Greet", description: "Chauffeur holds a sign at the arrivals hall.", icon: "Users" }
        ],
        howItWorks: [
            { title: "Booking", description: "Reserve your ride online or via app." },
            { title: "Arrival", description: "Your chauffeur tracks your flight." },
            { title: "Transfer", description: "Enjoy a smooth, quiet ride to your destination." }
        ],
        amenities: ["Free 5G Wi-Fi", "Bottled Water", "Phone Charger", "Daily Press"],
        faqs: [
            { q: "What happens if my flight is delayed?", a: "We track your flight in real-time and adjust pickup accordingly at no extra cost." },
            { q: "Where do I meet my driver?", a: "Your chauffeur will meet you at the arrivals hall with a name sign." }
        ]
    },
    city: {
        title: "City to City",
        description: "Door-to-door luxury travel as an alternative to short-haul flights.",
        image: "/assets/images/luxury_fleet_lineup_1770699971769.png",
        content: "Avoid the airport queues and train delays. Our city-to-city service offers a private, productive, and relaxing environment for your intercity travel.",
        highlights: [
            { title: "Productive Travel", description: "Quiet cabin environment for work.", icon: "Briefcase" },
            { title: "Fixed Rates", description: "No hidden costs or surge pricing.", icon: "Shield" },
            { title: "Door-to-Door", description: "Convenience from start to finish.", icon: "Clock" }
        ],
        howItWorks: [
            { title: "Planning", description: "Define your route and schedule." },
            { title: "Pickup", description: "Prompt arrival at your doorstep." },
            { title: "Journey", description: "Relax across cities in total comfort." }
        ],
        amenities: ["Wi-Fi Hotspot", "Refreshments", "Privacy Screen", "Climate Control"],
        faqs: [
            { q: "Can I make stops along the way?", a: "Yes, you can add stops during booking or request them from your chauffeur." },
            { q: "Is the price fixed?", a: "Yes, all intercity rates are fixed and inclusive of all fees." }
        ]
    },
    hourly: {
        title: "Hourly Service",
        description: "Your personal chauffeur on standby for as long as you need.",
        image: "/assets/images/chauffeur_opening_door_1770699956596.png",
        content: "Perfect for busy days with multiple stops. Whether for business meetings or a shopping tour, your chauffeur stays with the vehicle, ready to move when you are.",
        highlights: [
            { title: "Ultimate Flexibility", description: "Change your destination on the fly.", icon: "Clock" },
            { title: "Expert Local Knowledge", description: "Drivers who know the city routes best.", icon: "Users" },
            { title: "Constant Availability", description: "Vehicle waits for you at every stop.", icon: "Shield" }
        ],
        howItWorks: [
            { title: "Duration", description: "Book for a minimum of 2 hours." },
            { title: "Itinerary", description: "Share your schedule or decide as you go." },
            { title: "Standby", description: "Chauffeur remains ready for your next move." }
        ],
        amenities: ["Concierge Service", "Premium Water", "Mobile Office Kit", "Umbrella"],
        faqs: [
            { q: "What is the minimum booking time?", a: "Hourly services typically have a 2-hour minimum." },
            { q: "Can I extend my booking?", a: "Yes, extensions are available at the same hourly rate." }
        ]
    },
    wedding: {
        title: "Wedding Chauffeur",
        description: "Elegant transportation for your special day.",
        image: "/assets/images/chauffeur_opening_door_1770699956596.png",
        content: "Arrive in style on your wedding day. We offer bespoke packages including ribbon decorations and champagne service to make your day unforgettable.",
        highlights: [
            { title: "Impeccable Styling", description: "Vehicles detailed to perfection.", icon: "Shield" },
            { title: "Bespoke Packages", description: "Ribbons, champagne, and more.", icon: "Briefcase" },
            { title: "Dedicated Team", description: "Special coordination for your big day.", icon: "Users" }
        ],
        howItWorks: [
            { title: "Consultation", description: "Tell us your theme and requirements." },
            { title: "Preparation", description: "Vehicles are decorated and polished." },
            { title: "Ceremony", description: "Flawless timing for your grand entrance." }
        ],
        amenities: ["Champagne", "Floral Accents", "Red Carpet Service", "Luxury Tissues"],
        faqs: [
            { q: "Can we decorate the car ourselves?", a: "We provide professional decoration to ensure vehicle safety, but can accommodate themes." },
            { q: "Are multiple cars available?", a: "Yes, we can provide a matched fleet for the entire bridal party." }
        ]
    },
    business: {
        title: "Business Travel",
        description: "Professional transportation for executive roadshows and corporate events.",
        image: "/assets/images/business_class_sedan.png",
        content: "Reliability and punctuality are the cornerstones of our executive service. We handle complex logistics so you can focus on your business objectives.",
        highlights: [
            { title: "Executive Standards", description: "Punctuality and professionalism guaranteed.", icon: "Briefcase" },
            { title: "Roadshow Logistics", description: "Coordinated transport for busy schedules.", icon: "Clock" },
            { title: "Billing Support", description: "Simple, transparent invoicing for companies.", icon: "Shield" }
        ],
        howItWorks: [
            { title: "Scheduling", description: "Detailed itinerary planning for your team." },
            { title: "Execution", description: "On-time pickups and efficient routing." },
            { title: "Reporting", description: "Clear documentation for expense tracking." }
        ],
        amenities: ["Financial Times", "Stable 5G Wi-Fi", "Privacy Tint", "Power Outlets"],
        faqs: [
            { q: "Do you offer corporate accounts?", a: "Yes, we provide specialized billing and priority booking for corporate partners." },
            { q: "Can you handle multi-car roadshows?", a: "Absolutely, we specialize in coordinating large fleets for executive tours." }
        ]
    },
    events: {
        title: "Events & Galas",
        description: "Arrive at high-profile events with the elegance you deserve.",
        image: "/assets/images/first_class_sedan.png",
        content: "Make a grand entrance. Our event service provides coordinated fleet solutions for VIPs, ensuring a flawless experience from the red carpet onwards.",
        highlights: [
            { title: "Red Carpet Presence", description: "Sleek vehicles for high-profile arrivals.", icon: "Wine" },
            { title: "Large Capacity", description: "Fleet solutions for scale and coordination.", icon: "Users" },
            { title: "VIP Protocols", description: "Staff trained in handling high-profile guests.", icon: "Shield" }
        ],
        howItWorks: [
            { title: "Coordination", description: "We work with event planners for timing." },
            { title: "Logistics", description: "Managed staging and arrival sequences." },
            { title: "Departure", description: "Ready and waiting as the event concludes." }
        ],
        amenities: ["Climate Control", "Premium Soundtrack", "Evening Refreshments", "Mirror & Kit"],
        faqs: [
            { q: "Do you provide on-site coordinators?", a: "For large events, we can provide dedicated dispatchers to manage the fleet." },
            { q: "Can you handle late-night departures?", a: "Yes, our chauffeurs remain on standby until the very last guest departs." }
        ]
    },
    secure: {
        title: "Secure Travel",
        description: "High-level security and discretion for diplomats and VIPs.",
        image: "/assets/images/chauffeur_opening_door_1770699956596.png",
        content: "Safety is paramount. Our secure travel service features chauffeurs trained in defensive driving and protective protocols, ensuring complete confidentiality.",
        highlights: [
            { title: "Trained Security", description: "Drivers experts in defensive maneuvers.", icon: "Shield" },
            { title: "Absolute Discretion", description: "Strict confidentiality for all passengers.", icon: "Briefcase" },
            { title: "Vetted Chauffeurs", description: "Extensive background and safety checks.", icon: "Users" }
        ],
        howItWorks: [
            { title: "Assessment", description: "Route analysis and security planning." },
            { title: "Preparation", description: "Vetted vehicles and briefed personnel." },
            { title: "Protection", description: "Tactical monitoring throughout the journey." }
        ],
        amenities: ["Encrypted Comms", "Medical First Aid", "Bullet-Resistant Glass", "Tracking System"],
        faqs: [
            { q: "Are the vehicles armored?", a: "We can provide armored vehicles upon request for high-risk assignments." },
            { q: "Do the drivers carry protection?", a: "Our chauffeurs are trained in defensive protocols; specialized security teams can be added." }
        ]
    },
    chauffeurs: {
        title: "Star Class Chauffeurs",
        description: "Discover the city's secrets with our knowledgeable local guides.",
        image: "/assets/images/luxury_chauffeur_hero_1770699554633.png",
        content: "More than just a ride - a personalized discovery. Our Star Class chauffeurs act as local ambassadors, revealing the best of the city in luxury.",
        highlights: [
            { title: "Local Ambassadors", description: "Deep knowledge of city history and culture.", icon: "Globe" },
            { title: "Custom Itineraries", description: "Tours tailored to your specific interests.", icon: "Clock" },
            { title: "Multilingual", description: "Guides available in multiple languages.", icon: "Users" }
        ],
        howItWorks: [
            { title: "Consultation", description: "Tell us what you want to see and explore." },
            { title: "Discovery", description: "A fluid, personalized tour of the city." },
            { title: "Concierge", description: "Help with reservations and local access." }
        ],
        amenities: ["City Guides", "Binoculars", "Gourmet Snacks", "Local Map"],
        faqs: [
            { q: "Can the tour be changed mid-way?", a: "Yes, our chauffeurs are flexible and can adapt to your discoveries." },
            { q: "Is this suitable for families?", a: "Absolutely, we tailor our tours to be engaging for all ages." }
        ]
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
            <section className="relative min-h-[90vh] flex items-center overflow-hidden py-20 lg:py-0">
                <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover opacity-60 scale-105"
                    priority
                />
                {/* Content Overlay */}
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />

                <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-20">
                    <div className="space-y-8 animate-in slide-in-from-left duration-1000 text-center lg:text-left flex flex-col items-center lg:items-start">
                        <div className="inline-block px-4 py-1.5 bg-gold-primary/10 border border-gold-primary/20 rounded-full">
                            <span className="text-gold-primary text-xs font-bold uppercase tracking-widest leading-none">Midnight Exclusive</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight leading-tight">
                            {service.title}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 border-l-2 border-gold-primary/50 pl-8 py-2 max-w-xl text-left">
                            {service.description}
                        </p>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                            <Link href="#booking">
                                <button className="bg-gold-primary text-black px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-gold-light transition-colors min-w-[160px]">
                                    Book Now
                                </button>
                            </Link>
                            <Link href="/fleet">
                                <button className="border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-colors min-w-[160px]">
                                    Explore Fleet
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div id="booking" className="flex justify-center lg:justify-end animate-in fade-in zoom-in duration-1000 delay-300">
                        <BookingWidget />
                    </div>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-32 bg-black relative">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-gold-primary text-sm font-bold uppercase tracking-[0.4em] mb-6">Excellence Defined</h2>
                    <p className="text-3xl md:text-5xl font-heading font-bold mb-12 leading-tight">
                        Experience the Pinnacle of Luxury Transportation
                    </p>
                    <div className="prose prose-invert max-w-none text-lg md:text-xl text-gray-400 font-light leading-relaxed">
                        <p>{service.content}</p>
                    </div>
                </div>
            </section>

            {/* Service Highlights */}
            <section className="py-32 bg-zinc-950 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        {service.highlights?.map((h, i) => (
                            <div key={i} className="group p-8 border border-white/5 bg-zinc-900/50 backdrop-blur-sm hover:border-gold-primary/30 transition-all duration-500">
                                <div className="w-16 h-16 bg-gold-primary/10 text-gold-primary flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                </div>
                                <h3 className="text-2xl font-heading font-bold mb-4">{h.title}</h3>
                                <p className="text-gray-400 font-light leading-relaxed">{h.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-32 bg-black">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-gold-primary text-sm font-bold uppercase tracking-[0.4em] mb-4">The Process</h2>
                        <h3 className="text-4xl font-heading font-bold">How It Works</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-16 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-[60px] left-32 right-32 h-px bg-gradient-to-r from-transparent via-gold-primary/20 to-transparent" />

                        {service.howItWorks?.map((step, i) => (
                            <div key={i} className="relative text-center space-y-6">
                                <div className="w-20 h-20 bg-black border-2 border-gold-primary/30 rounded-full flex items-center justify-center mx-auto relative z-10 shadow-[0_0_30px_rgba(234,179,8,0.1)]">
                                    <span className="text-2xl font-heading font-bold text-gold-primary">0{i + 1}</span>
                                </div>
                                <h4 className="text-2xl font-heading font-bold">{step.title}</h4>
                                <p className="text-gray-400 font-light">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Amenities Section */}
            <section className="py-32 bg-zinc-950 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gold-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="md:w-1/2 space-y-8">
                            <h2 className="text-gold-primary text-sm font-bold uppercase tracking-[0.4em]">In-Cabin Comfort</h2>
                            <h3 className="text-4xl md:text-5xl font-heading font-bold leading-tight">Elevated Travel Amenities</h3>
                            <p className="text-gray-400 text-lg font-light leading-relaxed">
                                Every journey with Blackcars Chauffeurs is designed to be an experience in indulgence.
                                We provide a curated selection of amenities to ensure your absolute comfort and connectivity.
                            </p>
                            <div className="grid grid-cols-2 gap-6 pt-4">
                                {service.amenities?.map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <div className="w-2 h-2 rounded-full bg-gold-primary group-hover:scale-150 transition-transform" />
                                        <span className="text-white font-medium tracking-wide">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="md:w-1/2 relative h-[500px] w-full group">
                            <div className="absolute inset-4 border border-gold-primary/20 -m-4 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-700" />
                            <Image
                                src="/assets/images/chauffeur_opening_door_1770699956596.png"
                                alt="Amenities"
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Recommended Fleet */}
            <section className="py-32 bg-black relative">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div>
                            <h2 className="text-gold-primary text-sm font-bold uppercase tracking-[0.4em] mb-4">Vehicle Selection</h2>
                            <h3 className="text-4xl font-heading font-bold">Recommended Fleet</h3>
                        </div>
                        <p className="text-gray-400 max-w-md">Selected for their exceptional performance and luxury specifically for this service profile.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {recommendedFleet.map((car: any) => (
                            <div key={car.id} className="group relative bg-zinc-900 overflow-hidden">
                                <div className="h-[400px] relative">
                                    {car.image_url ? (
                                        <Image
                                            src={car.image_url}
                                            alt={car.name}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full bg-zinc-800 text-gray-500">No Image</div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                    <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                                        <div>
                                            <span className="text-gold-primary text-xs font-bold uppercase tracking-[0.2em] mb-2 block">{car.category}</span>
                                            <h4 className="text-3xl font-heading font-bold text-white">{car.name}</h4>
                                        </div>
                                        <Link href={`/fleet/${car.id}`}>
                                            <button className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-gold-primary hover:border-gold-primary hover:text-black transition-all">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-32 bg-black border-t border-white/5 overflow-hidden">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-gold-primary text-sm font-bold uppercase tracking-[0.4em] mb-12">Client Voices</h2>
                    <div className="max-w-4xl mx-auto">
                        <svg className="w-12 h-12 text-gold-primary/20 mx-auto mb-8" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 8.44772 10.4647 8 11.017 8H14.017C14.017 6.34315 15.3601 5 17.017 5H18.017C18.5693 5 19.017 4.55228 19.017 4V1C19.017 0.447715 18.5693 0 18.017 0H17.017C13.7033 0 11.017 2.68629 11.017 6V7H10.017C6.70329 7 4.017 9.68629 4.017 13V20C4.017 20.5523 4.46471 21 5.017 21H14.017Z" /></svg>
                        <p className="text-3xl md:text-4xl font-heading italic text-white leading-tight mb-12">
                            "The level of service provided by Blackcars Chauffeurs is unmatched. From the pristine condition of the S-Class to the absolute professionalism of the chauffeur, every detail was perfect."
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-12 h-px bg-gold-primary/30" />
                            <span className="text-gold-primary font-bold uppercase tracking-widest text-sm">Alexander van der Berg, Director</span>
                            <div className="w-12 h-px bg-gold-primary/30" />
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-32 bg-zinc-950">
                <div className="container mx-auto px-6 max-w-3xl">
                    <div className="text-center mb-20">
                        <h2 className="text-gold-primary text-sm font-bold uppercase tracking-[0.4em] mb-4">Questions</h2>
                        <h3 className="text-4xl font-heading font-bold">Common Queries</h3>
                    </div>
                    <div className="space-y-8">
                        {service.faqs?.map((faq, i) => (
                            <div key={i} className="group border-b border-white/10 pb-8">
                                <h4 className="text-2xl font-heading font-bold mb-4 group-hover:text-gold-primary transition-colors cursor-pointer flex justify-between items-center">
                                    {faq.q}
                                    <span className="text-gold-primary">+</span>
                                </h4>
                                <p className="text-gray-400 font-light leading-relaxed">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden bg-black border-t border-white/5">
                <div className="absolute inset-0 bg-gold-primary/5 blur-[120px] rounded-full translate-y-1/2" />
                <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
                    <h2 className="text-4xl font-heading font-bold mb-6">Ready to Experience Midnight?</h2>
                    <p className="text-zinc-400 text-lg mb-10 font-light">
                        Book your premium chauffeur service now or explore our full range of luxury vehicles.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="#booking">
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

