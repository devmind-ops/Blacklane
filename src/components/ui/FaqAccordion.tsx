"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
    q: string;
    a: string;
}

interface FaqAccordionProps {
    items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="space-y-6">
            {items.map((item, i) => (
                <div key={i} className="group border-b border-white/10 pb-6 transition-all">
                    <button
                        onClick={() => toggle(i)}
                        className="w-full flex justify-between items-center text-left py-4 focus:outline-none"
                    >
                        <h4 className={cn(
                            "text-xl md:text-2xl font-heading font-bold transition-colors",
                            openIndex === i ? "text-gold-primary" : "text-white group-hover:text-gold-primary"
                        )}>
                            {item.q}
                        </h4>
                        <div className={cn(
                            "w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all",
                            openIndex === i ? "bg-gold-primary border-gold-primary text-black" : "text-gold-primary"
                        )}>
                            {openIndex === i ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </div>
                    </button>
                    <div className={cn(
                        "overflow-hidden transition-all duration-300 ease-in-out",
                        openIndex === i ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
                    )}>
                        <p className="text-gray-400 font-light leading-relaxed text-lg">
                            {item.a}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
