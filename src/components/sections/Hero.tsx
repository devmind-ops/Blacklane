import Image from "next/image";
import { BookingWidget } from "@/components/booking/BookingWidget";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/images/luxury_chauffeur_hero_1770699554633.png"
                    alt="Luxury Chauffeur Service"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/30 z-10" />
            </div>

            <div className="container relative z-20 mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center pt-20">

                {/* Text Content */}
                <div className="space-y-6 max-w-2xl animate-in slide-in-from-left duration-1000">
                    <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight text-white drop-shadow-lg">
                        The <span className="text-gold-gradient">Art</span> of <br /> Movement
                    </h1>
                    <p className="text-xl text-gray-300 font-light border-l-4 border-primary pl-6 py-2">
                        Experience the pinnacle of luxury travel. Professional chauffeurs, immaculate fleet, and seamless global service.
                    </p>
                </div>

                {/* Booking Widget */}
                <div className="flex justify-center lg:justify-end animate-in slide-in-from-right duration-1000 delay-200">
                    <BookingWidget />
                </div>

            </div>
        </section>
    );
}
