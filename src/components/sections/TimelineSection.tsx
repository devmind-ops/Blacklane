"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

const milestones = [
    {
        year: "2010",
        content: "Founded in London with a single flagship S-Class sedan.",
        side: "left"
    },
    {
        year: "2015",
        content: "Expansion into Europe and implementation of our first customized fleet management software.",
        side: "right"
    },
    {
        year: "2019",
        content: "Reached 50 cities milestone and introduced electric luxury fleet options.",
        side: "left"
    },
    {
        year: "2024",
        content: "Pioneering AI-driven route optimization and private jet lounge transfers globally.",
        side: "right"
    }
];

export function TimelineSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [cursorTop, setCursorTop] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute("data-index"));
                        setActiveIndex(index);
                    }
                });
            },
            {
                rootMargin: "-40% 0% -40% 0%", // More focused on the center
                threshold: 0.1
            }
        );

        itemsRef.current.forEach((item) => {
            if (item) observer.observe(item);
        });

        return () => observer.disconnect();
    }, []);

    // Update cursorTop whenever activeIndex changes
    useEffect(() => {
        const activeItem = itemsRef.current[activeIndex];
        const container = containerRef.current;
        if (activeItem && container) {
            const yearHeading = activeItem.querySelector('h5');
            if (yearHeading) {
                const containerRect = container.getBoundingClientRect();
                const headingRect = yearHeading.getBoundingClientRect();
                const relativeTop = headingRect.top - containerRect.top + (headingRect.height / 2);
                setCursorTop(relativeTop);
            }
        }
    }, [activeIndex]);

    return (
        <section className="py-32 container mx-auto px-6">
            <div className="text-center mb-20">
                <h2 className="text-gold-primary text-sm font-bold uppercase tracking-[0.3em] mb-4">The Journey</h2>
                <h3 className="text-5xl font-heading font-bold">Milestones of Success</h3>
            </div>

            <div className="relative max-w-5xl mx-auto" ref={containerRef}>
                {/* The Vertical Line */}
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-gold-primary/20 to-transparent" />

                {/* The Flying Cursor */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gold-primary z-20 shadow-[0_0_25px_rgba(234,179,8,0.8)] transition-all duration-300 ease-out"
                    style={{
                        top: `${cursorTop}px`,
                        transform: `translate(-50%, -50%) scale(${activeIndex % 2 === 0 ? 1.2 : 1})`
                    }}
                >
                    <div className="absolute inset-0 rounded-full animate-ping bg-gold-primary opacity-20" />
                </div>

                <div className="flex flex-col gap-32 relative">

                    {milestones.map((item, index) => (
                        <div
                            key={index}
                            data-index={index}
                            ref={(el) => { itemsRef.current[index] = el; }}
                            className={cn(
                                "relative flex items-center justify-between group transition-all duration-300",
                                activeIndex === index ? "opacity-100" : "opacity-30 grayscale blur-[1px]"
                            )}
                        >
                            {item.side === "left" ? (
                                <>
                                    <div className="w-[45%] text-right space-y-2 pr-12">
                                        <h5 className={cn(
                                            "relative font-bold text-3xl font-heading tracking-widest transition-colors duration-300",
                                            activeIndex === index ? "text-gold-primary" : "text-zinc-600"
                                        )}>
                                            {item.year}
                                        </h5>
                                        <p className="text-zinc-400 text-lg leading-relaxed">{item.content}</p>
                                    </div>
                                    <div className="w-[45%] pl-12" />
                                </>
                            ) : (
                                <>
                                    <div className="w-[45%] pr-12" />
                                    <div className="w-[45%] space-y-2 pl-12">
                                        <h5 className={cn(
                                            "relative font-bold text-3xl font-heading tracking-widest transition-colors duration-300",
                                            activeIndex === index ? "text-gold-primary" : "text-zinc-600"
                                        )}>
                                            {item.year}
                                        </h5>
                                        <p className="text-zinc-400 text-lg leading-relaxed">{item.content}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
