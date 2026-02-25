"use client";

import { useState, useEffect } from "react";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
    {
        text: "Currently the best chauffeur service I have used. The car was spotless, the driver was professional, and the journey was incredibly smooth. Highly recommended for business travel.",
        author: "James Sterling, CEO",
        role: "CEO",
    },
    {
        text: "Impeccable service for our wedding day. The chauffeur was punctual, polite, and the ribbon decoration was perfect. Thank you for making our day special.",
        author: "Sarah & David, Newlyweds",
        role: "Newlyweds",
    },
    {
        text: "I use Midnight Luxury for all my airport transfers. Reliable tracking and the comfort of the S-Class allow me to work while I travel.",
        author: "Michael Ross, Entrepreneur",
        role: "Entrepreneur",
    },
];

export function Testimonials() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="testimonials" className="py-24 bg-zinc-950 text-white relative border-t border-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-dark/5 via-transparent to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 text-center">
                <h2 className="text-2xl md:text-4xl font-heading font-bold mb-12 text-white/50 uppercase tracking-widest px-4">Client Experiences</h2>

                <div className="relative max-w-4xl mx-auto min-h-[400px] md:min-h-[300px]">
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            className={cn(
                                "absolute inset-0 transition-all duration-700 ease-in-out transform flex flex-col items-center justify-center p-8",
                                index === current ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8 pointer-events-none"
                            )}
                        >
                            <Quote className="w-12 h-12 text-gold-dark mb-8 opacity-50" />
                            <p className="text-xl md:text-2xl lg:text-3xl font-heading italic text-gray-200 leading-relaxed mb-8 px-4">
                                &ldquo;{item.text}&rdquo;
                            </p>
                            <p className="text-gold-primary font-bold uppercase tracking-widest text-sm">
                                {item.author}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-3 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={cn(
                                "w-3 h-3 rounded-full transition-all duration-300",
                                index === current ? "bg-gold-primary scale-125 shadow-gold" : "bg-white/20 hover:bg-white/40"
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
