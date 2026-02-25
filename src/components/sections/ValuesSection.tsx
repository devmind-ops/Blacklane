import Image from "next/image";
import { Check } from "lucide-react";

const values = [
    {
        title: "Professional Chauffeurs",
        description: "Hand-picked, vetted, and trained to the highest standards. English-speaking and impeccably dressed.",
    },
    {
        title: "Immaculate Fleet",
        description: "Only the latest models of Mercedes-Benz and BMW. Maintained to showroom condition.",
    },
    {
        title: "Global Standard",
        description: "Consistent service quality across London, New York, Dubai, and Paris.",
    },
];

export function ValuesSection() {
    return (
        <section id="about" className="py-24 bg-black text-white overflow-hidden relative">
            <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                {/* Image Side */}
                <div className="flex-1 relative w-full h-[400px] lg:h-[600px] group">
                    <div className="absolute inset-0 bg-gold-gradient opacity-20 blur-3xl -z-10 group-hover:opacity-30 transition-opacity duration-700" />
                    <Image
                        src="/assets/images/chauffeur_opening_door_1770699956596.png"
                        alt="Chauffeur Opening Door"
                        fill
                        className="object-cover rounded-lg border border-white/10 shadow-2xl group-hover:scale-[1.02] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg" />
                </div>

                {/* Content Side */}
                <div className="flex-1 space-y-10">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight">
                        Why <span className="text-gold-gradient">Midnight Luxury?</span>
                    </h2>

                    <div className="space-y-8">
                        {values.map((value, index) => (
                            <div key={index} className="flex gap-4 group">
                                <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-gold-dark group-hover:bg-gold-primary/10 transition-colors">
                                    <Check className="w-4 h-4 text-gold-primary" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-heading font-bold text-gold-light mb-2 group-hover:text-primary transition-colors">
                                        {value.title}
                                    </h4>
                                    <p className="text-gray-400 font-light leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
