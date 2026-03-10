"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut, User, Plane, Building2, Clock, Briefcase, Wine, Gem, Shield, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/actions/auth";

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);

        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            subscription.unsubscribe();
        };
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
                <Link href="/" className="text-xl md:text-2xl font-bold tracking-[2px] font-heading shrink-0">
                    BLACKCARS<span className="text-primary">CHAUFFEURS</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-4 lg:gap-8">
                    <Link href="/" className="text-xs lg:text-sm uppercase tracking-widest text-white/80 hover:text-primary transition-colors">
                        Home
                    </Link>

                    {/* Services Dropdown */}
                    <div className="relative group px-2 py-4">
                        <Link href="/services" className="text-xs lg:text-sm uppercase tracking-widest text-white/80 hover:text-primary transition-colors flex items-center gap-1">
                            Services
                            <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </Link>
                        <div className="absolute top-full left-0 w-64 bg-black/95 border border-white/10 backdrop-blur-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 py-4 shadow-2xl">
                            {[
                                { name: "Airport Transfers", href: "/services/airport" },
                                { name: "City to City", href: "/services/city" },
                                { name: "Hourly Service", href: "/services/hourly" },
                                { name: "Business Travel", href: "/services/business" },
                                { name: "Events & Galas", href: "/services/events" },
                                { name: "Wedding Chauffeur", href: "/services/wedding" },
                                { name: "Secure Travel", href: "/services/secure" },
                                { name: "Star Class Chauffeurs", href: "/services/chauffeurs" },
                            ].map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block px-6 py-2.5 text-[10px] uppercase tracking-[2px] text-white/60 hover:text-primary hover:bg-white/5 transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Fleet Dropdown */}
                    <div className="relative group px-2 py-4">
                        <Link href="/fleet" className="text-xs lg:text-sm uppercase tracking-widest text-white/80 hover:text-primary transition-colors flex items-center gap-1">
                            Fleet
                            <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </Link>
                        <div className="absolute top-full left-0 w-56 bg-black/95 border border-white/10 backdrop-blur-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 py-4 shadow-2xl">
                            {[
                                { name: "Business Class", href: "/fleet?category=sedan" },
                                { name: "First Class", href: "/fleet?category=first" },
                                { name: "Business Van/SUV", href: "/fleet?category=van&type=suv" },
                                { name: "Luxury Sprinter", href: "/fleet?category=van&type=sprinter" },
                            ].map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block px-6 py-2.5 text-[10px] uppercase tracking-[2px] text-white/60 hover:text-primary hover:bg-white/5 transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Link href="/about" className="text-xs lg:text-sm uppercase tracking-widest text-white/80 hover:text-primary transition-colors">
                        About
                    </Link>

                    <Link href="/rate-list" className="text-xs lg:text-sm uppercase tracking-widest text-white/80 hover:text-primary transition-colors">
                        Rate List
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-6">
                            <Link href="/profile" className="flex items-center gap-2 text-sm uppercase tracking-widest text-gold-light hover:text-white transition-colors">
                                <User className="w-4 h-4" />
                                Profile
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="flex items-center gap-2 text-sm uppercase tracking-widest text-white/60 hover:text-red-400 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-8">
                            <Link href="/login" className="text-sm uppercase tracking-widest text-gold-light hover:text-white transition-colors">
                                Log In
                            </Link>
                            <Button
                                asChild
                                className="bg-gold-gradient text-black hover:text-black font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                            >
                                <Link href="/register">Sign Up</Link>
                            </Button>
                        </div>
                    )}
                </nav>

                {/* Mobile Nav */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-white hover:text-primary -mr-2">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-black/98 border-l border-white/10 text-white w-full sm:w-[400px] p-0 overflow-hidden flex flex-col">
                            {/* Menu Header */}
                            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black">
                                <Link href="/" className="text-xl font-bold tracking-[2px] font-heading">
                                    BLACKCARS<span className="text-primary">CHAUFFEURS</span>
                                </Link>
                            </div>

                            {/* Menu Links */}
                            <div className="flex-1 overflow-y-auto py-10 px-8 space-y-8">
                                <div className="space-y-6">
                                    <p className="text-[10px] uppercase tracking-[4px] text-white/40 font-bold mb-4">Navigation</p>
                                    <Link href="/" className="flex items-center gap-4 text-lg uppercase tracking-widest text-white/80 hover:text-primary transition-all group">
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                            <Plane className="w-4 h-4 text-primary" />
                                        </div>
                                        Home
                                    </Link>

                                    {/* Services Mobile */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 text-lg uppercase tracking-widest text-white/80 font-bold">
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                                <Briefcase className="w-4 h-4 text-primary" />
                                            </div>
                                            Services
                                        </div>
                                        <div className="pl-12 grid grid-cols-1 gap-3">
                                            {[
                                                { name: "Airport Transfers", href: "/services/airport" },
                                                { name: "City to City", href: "/services/city" },
                                                { name: "Hourly Service", href: "/services/hourly" },
                                                { name: "All Services", href: "/services" },
                                            ].map((item) => (
                                                <Link key={item.name} href={item.href} className="text-sm uppercase tracking-widest text-white/40 hover:text-primary transition-colors">
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    <Link href="/fleet" className="flex items-center gap-4 text-lg uppercase tracking-widest text-white/80 hover:text-primary transition-all group">
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                            <Gem className="w-4 h-4 text-primary" />
                                        </div>
                                        Fleet
                                    </Link>
                                    <Link href="/about" className="flex items-center gap-4 text-lg uppercase tracking-widest text-white/80 hover:text-primary transition-all group">
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                            <User className="w-4 h-4 text-primary" />
                                        </div>
                                        About
                                    </Link>
                                    <Link href="/rate-list" className="flex items-center gap-4 text-lg uppercase tracking-widest text-white/80 hover:text-primary transition-all group">
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                            <Globe className="w-4 h-4 text-primary" />
                                        </div>
                                        Rate List
                                    </Link>
                                </div>
                            </div>

                            {/* Menu Footer */}
                            <div className="p-8 bg-zinc-950 border-t border-white/5">
                                {user ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center text-black font-bold text-lg">
                                                {user.email?.[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-white font-bold">{user.email}</p>
                                                <Link href="/profile" className="text-xs text-primary hover:underline">View Profile</Link>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => signOut()}
                                            className="w-full h-12 flex items-center justify-center gap-2 border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors uppercase tracking-widest text-xs font-bold"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        <Link href="/login">
                                            <button className="w-full h-12 flex items-center justify-center border border-white/10 text-white/80 hover:bg-white/5 transition-colors uppercase tracking-widest text-xs font-bold">
                                                Log In
                                            </button>
                                        </Link>
                                        <Link href="/register">
                                            <button className="w-full h-12 flex items-center justify-center bg-gold-gradient text-black hover:opacity-90 transition-opacity uppercase tracking-widest text-xs font-bold">
                                                Sign Up
                                            </button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
