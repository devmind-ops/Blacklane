import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ValuesSection } from "@/components/sections/ValuesSection";
import Image from "next/image";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Header />

            {/* Hero */}
            <section className="relative h-[60vh] flex items-center justify-center">
                <Image
                    src="/assets/images/design_scrolled_view_1770699657208.png"
                    alt="About Midnight Luxury"
                    fill
                    className="object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
                <div className="relative z-10 text-center space-y-4 px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <h1 className="text-5xl md:text-7xl font-heading font-bold">Our Story</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Redefining the art of chauffeured travel since 2010.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-24 container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-6 text-lg text-gray-300 leading-relaxed font-light">
                    <h2 className="text-3xl font-heading font-bold text-white mb-6">A Legacy of Excellence</h2>
                    <p>
                        Midnight Luxury was founded on a simple premise: that the journey should be as memorable as the destination.
                        We started with a single vehicle and a commitment to perfection. Today, we serve clients in major cities
                        across the globe, providing a seamless, consistent, and exceptionally high-quality service.
                    </p>
                    <p>
                        Our chauffeurs are more than just drivers; they are personal concierges on wheels, trained to anticipate
                        your needs and ensure your privacy and comfort at all times.
                    </p>
                </div>
                <div className="relative h-[400px] w-full border border-white/10 rounded-lg overflow-hidden">
                    <Image
                        src="/assets/images/booking_step_2_details_1770746957980.png"
                        alt="Chauffeur Service Interior"
                        fill
                        className="object-cover"
                    />
                </div>
            </section>

            <ValuesSection />
            <Footer />
        </main>
    );
}
