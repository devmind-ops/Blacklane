"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-300 py-6 border-b border-transparent",
                scrolled ? "bg-black/95 py-4 border-white/10 backdrop-blur-md" : "bg-transparent bg-gradient-to-b from-black/80 to-transparent"
            )}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-[2px] font-heading">
                    MIDNIGHT<span className="text-primary">LUXURY</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm uppercase tracking-widest text-white/80 hover:text-primary transition-colors">
                        Home
                    </Link>
                    <Link href="/services" className="text-sm uppercase tracking-widest text-white/80 hover:text-primary transition-colors">
                        Services
                    </Link>
                    <Link href="/fleet" className="text-sm uppercase tracking-widest text-white/80 hover:text-primary transition-colors">
                        Fleet
                    </Link>
                    <Link href="/about" className="text-sm uppercase tracking-widest text-white/80 hover:text-primary transition-colors">
                        About
                    </Link>
                    <Link href="/login" className="text-sm uppercase tracking-widest text-gold-light hover:text-white transition-colors">
                        Log In
                    </Link>
                    <Button
                        asChild
                        className="bg-gold-gradient text-black hover:text-black font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                    >
                        <Link href="/register">Sign Up</Link>
                    </Button>
                </nav>

                {/* Mobile Nav */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-white hover:text-primary">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-black/95 border-l border-white/10 text-white w-[300px]">
                            <div className="flex flex-col gap-8 mt-10">
                                <Link href="/" className="text-lg uppercase tracking-widest hover:text-primary">Home</Link>
                                <Link href="/services" className="text-lg uppercase tracking-widest hover:text-primary">Services</Link>
                                <Link href="/fleet" className="text-lg uppercase tracking-widest hover:text-primary">Fleet</Link>
                                <Link href="/about" className="text-lg uppercase tracking-widest hover:text-primary">About</Link>
                                <Link href="/login" className="text-lg uppercase tracking-widest hover:text-primary">Log In</Link>
                                <Link href="/register" className="mt-4">
                                    <Button className="w-full bg-gold-gradient text-black font-bold uppercase">Sign Up</Button>
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
