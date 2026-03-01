"use client";

import { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, Plane, MessageSquare, ArrowLeft, ArrowRight, Loader2, Lock, ShieldCheck } from "lucide-react";
import { getUserProfile } from "@/actions/auth";
import { createClient } from "@/lib/supabase/client";

interface DetailsStepProps {
    bookingData: any;
    onBack: () => void;
    onContinue: (details: any) => void;
}

export function DetailsStep({ bookingData, onBack, onContinue }: DetailsStepProps) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [authState, setAuthState] = useState<"login" | "register">("login");
    const [isPending, startTransition] = useTransition();
    const [authError, setAuthError] = useState<string | null>(null);
    const supabase = createClient();

    const [details, setDetails] = useState({
        customerDetails: bookingData.customerDetails,
        flightNumber: bookingData.flightNumber,
        notes: bookingData.notes
    });

    useEffect(() => {
        async function checkAuth() {
            setLoading(true);
            const { data: { user: authUser } } = await supabase.auth.getUser();
            if (authUser) {
                const profile = await getUserProfile();
                if (profile) {
                    setUser(profile);
                    setDetails(prev => ({
                        ...prev,
                        customerDetails: {
                            name: profile.full_name || "",
                            email: authUser.email || "",
                            phone: prev.customerDetails.phone || ""
                        }
                    }));
                }
            }
            setLoading(false);
        }
        checkAuth();
    }, []);

    const handleAuthSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAuthError(null);
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const fullName = formData.get("fullName") as string;

        startTransition(async () => {
            let error;
            if (authState === "login") {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });
                error = signInError;
            } else {
                const { error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { full_name: fullName },
                        emailRedirectTo: `${window.location.origin}/auth/callback`
                    }
                });
                error = signUpError;
            }

            if (error) {
                setAuthError(error.message);
            } else {
                // Succesfull auth - Fetch profile
                const profile = await getUserProfile();
                if (profile) {
                    setUser(profile);
                    setDetails(prev => ({
                        ...prev,
                        customerDetails: {
                            name: profile.full_name || "",
                            email: email,
                            phone: prev.customerDetails.phone || ""
                        }
                    }));
                } else if (authState === "register") {
                    setAuthError("Account created! Please check your email for confirmation before logging in.");
                }
            }
        });
    };

    const isAirport = bookingData.pickup.toLowerCase().includes("airport") ||
        bookingData.pickup.toLowerCase().includes("heathrow") ||
        bookingData.pickup.toLowerCase().includes("gatwick") ||
        bookingData.pickup.toLowerCase().includes("lhr") ||
        bookingData.pickup.toLowerCase().includes("lgw");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onContinue(details);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Loader2 className="w-12 h-12 text-gold-primary animate-spin" />
                <p className="text-zinc-500 uppercase tracking-widest text-xs font-bold">Authenticating...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl space-y-8">
                    <div className="text-center space-y-2">
                        <ShieldCheck className="w-12 h-12 text-gold-primary mx-auto mb-2" />
                        <h2 className="text-3xl font-heading font-bold">Exclusive <span className="text-gold-primary">Access</span></h2>
                        <p className="text-zinc-500 text-sm font-light">Please sign in or create an account to proceed with your luxury booking.</p>
                    </div>

                    {authError && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-xs text-center">
                            {authError}
                        </div>
                    )}

                    <form onSubmit={handleAuthSubmit} className="space-y-6">
                        {authState === "register" && (
                            <div className="space-y-2 group">
                                <Label className="text-zinc-400 font-bold uppercase tracking-widest text-[10px] ml-1">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 transition-colors group-focus-within:text-gold-primary" />
                                    <Input
                                        name="fullName"
                                        required
                                        placeholder="John Doe"
                                        className="h-14 pl-12 bg-white/5 border-white/10 text-white rounded-xl focus:border-gold-primary/50 transition-all"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2 group">
                            <Label className="text-zinc-400 font-bold uppercase tracking-widest text-[10px] ml-1">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 transition-colors group-focus-within:text-gold-primary" />
                                <Input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="name@example.com"
                                    className="h-14 pl-12 bg-white/5 border-white/10 text-white rounded-xl focus:border-gold-primary/50 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <Label className="text-zinc-400 font-bold uppercase tracking-widest text-[10px] ml-1">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 transition-colors group-focus-within:text-gold-primary" />
                                <Input
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="h-14 pl-12 bg-white/5 border-white/10 text-white rounded-xl focus:border-gold-primary/50 transition-all"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full h-14 bg-gold-gradient text-black font-bold uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-all"
                        >
                            {isPending ? <Loader2 className="animate-spin" /> : authState === "login" ? "Sign In" : "Create Account"}
                        </Button>
                    </form>

                    <div className="pt-4 text-center border-t border-white/5">
                        <button
                            onClick={() => setAuthState(authState === "login" ? "register" : "login")}
                            className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 hover:text-gold-primary transition-colors"
                        >
                            {authState === "login" ? "New to Blackcars Chauffeurs? Join Now" : "Already a member? Sign In"}
                        </button>
                    </div>
                </div>
                <button
                    onClick={onBack}
                    className="mt-6 w-full text-zinc-600 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                >
                    <ArrowLeft className="w-3 h-3" />
                    Back to Vehicle
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-heading font-bold">Ride <span className="text-gold-primary">Details</span></h2>
                <p className="text-zinc-500 font-light">Welcome back, <span className="text-white font-medium">{user.full_name}</span>. Please confirm your details.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 animate-in slide-in-from-right duration-500">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Passenger Info */}
                    <div className="space-y-6">
                        <div className="space-y-2 group">
                            <Label className="text-zinc-400 font-bold uppercase tracking-widest text-[10px] ml-1">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 transition-colors group-focus-within:text-gold-primary" />
                                <Input
                                    required
                                    value={details.customerDetails.name}
                                    onChange={(e) => setDetails({
                                        ...details,
                                        customerDetails: { ...details.customerDetails, name: e.target.value }
                                    })}
                                    placeholder="John Doe"
                                    className="h-14 pl-12 bg-white/5 border-white/10 text-white rounded-xl focus:border-gold-primary/50 transition-all placeholder:text-zinc-700"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <Label className="text-zinc-400 font-bold uppercase tracking-widest text-[10px] ml-1">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 transition-colors group-focus-within:text-gold-primary" />
                                <Input
                                    required
                                    type="email"
                                    value={details.customerDetails.email}
                                    onChange={(e) => setDetails({
                                        ...details,
                                        customerDetails: { ...details.customerDetails, email: e.target.value }
                                    })}
                                    placeholder="name@example.com"
                                    className="h-14 pl-12 bg-white/5 border-white/10 text-white rounded-xl focus:border-gold-primary/50 transition-all placeholder:text-zinc-700"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <Label className="text-zinc-400 font-bold uppercase tracking-widest text-[10px] ml-1">Phone Number</Label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 transition-colors group-focus-within:text-gold-primary" />
                                <Input
                                    required
                                    type="tel"
                                    value={details.customerDetails.phone}
                                    onChange={(e) => setDetails({
                                        ...details,
                                        customerDetails: { ...details.customerDetails, phone: e.target.value }
                                    })}
                                    placeholder="+44 7000 000000"
                                    className="h-14 pl-12 bg-white/5 border-white/10 text-white rounded-xl focus:border-gold-primary/50 transition-all placeholder:text-zinc-700"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="space-y-6">
                        {isAirport && (
                            <div className="space-y-2 group animate-in slide-in-from-top-2 duration-300">
                                <Label className="text-zinc-400 font-bold uppercase tracking-widest text-[10px] ml-1">Flight Number</Label>
                                <div className="relative">
                                    <Plane className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 transition-colors group-focus-within:text-gold-primary" />
                                    <Input
                                        value={details.flightNumber}
                                        onChange={(e) => setDetails({ ...details, flightNumber: e.target.value })}
                                        placeholder="e.g. BA123"
                                        className="h-14 pl-12 bg-white/5 border-white/10 text-white rounded-xl focus:border-gold-primary/50 transition-all placeholder:text-zinc-700"
                                    />
                                </div>
                                <p className="text-[10px] text-zinc-600 font-medium ml-1">We track your flight to adjust for delays.</p>
                            </div>
                        )}

                        <div className="space-y-2 group">
                            <Label className="text-zinc-400 font-bold uppercase tracking-widest text-[10px] ml-1">Notes for Chauffeur</Label>
                            <div className="relative">
                                <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-zinc-600 transition-colors group-focus-within:text-gold-primary" />
                                <Textarea
                                    value={details.notes}
                                    onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                                    placeholder="Enter any special requests, gate numbers, or child seat requirements..."
                                    className="min-h-[148px] pl-12 pt-4 bg-white/5 border-white/10 text-white rounded-xl focus:border-gold-primary/50 transition-all placeholder:text-zinc-700 resize-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onBack}
                        className="flex-1 h-14 border-white/10 text-white uppercase tracking-widest font-bold hover:bg-white/5"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <Button
                        type="submit"
                        className="flex-[2] h-14 bg-gold-gradient text-black font-bold uppercase tracking-widest hover:scale-[1.02] transition-all"
                    >
                        Continue to Checkout
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </form>
        </div>
    );
}
