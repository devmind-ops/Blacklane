"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signUp } from "@/actions/auth";
import { useActionState } from "react";
import { Loader2, User, Mail, Lock, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
    const [state, formAction, isPending] = useActionState(async (prevState: any, formData: FormData) => {
        return await signUp(formData);
    }, null);

    return (
        <main className="min-h-screen bg-black text-white flex flex-col">
            <Header />

            <section className="flex-1 flex items-center justify-center relative p-6 pt-32 pb-20">
                {/* Background with higher contrast/mood */}
                <div className="absolute inset-0 bg-[url('/assets/images/luxury_fleet_lineup_1770699971769.png')] bg-cover bg-center opacity-20 scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

                {/* Animated Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-primary/5 blur-[120px] rounded-full animate-pulse" />

                <div className="relative z-10 w-full max-w-md">
                    <div className="glass-panel p-10 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <div className="text-center mb-10 space-y-2">
                            <h1 className="text-4xl font-heading font-bold tracking-tight">Join the <span className="text-gold-primary">Circle</span></h1>
                            <p className="text-zinc-500 text-sm font-light">Create an account for personalized luxury travel.</p>
                        </div>

                        {state?.error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm mb-8 text-center animate-in shake duration-500">
                                {state.error}
                            </div>
                        )}

                        {state?.success && (
                            <div className="bg-gold-primary/10 border border-gold-primary/20 text-gold-primary p-6 rounded-xl text-sm mb-8 text-center animate-in zoom-in duration-500">
                                <ShieldCheck className="w-8 h-8 mx-auto mb-3" />
                                <p className="font-bold mb-1">Success!</p>
                                <p className="text-zinc-400">{state.success}</p>
                            </div>
                        )}

                        {!state?.success && (
                            <form action={formAction} className="space-y-6">
                                <div className="space-y-2 group">
                                    <Label className="text-zinc-400 font-bold uppercase tracking-widest text-[10px] ml-1">Full Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 transition-colors group-focus-within:text-gold-primary" />
                                        <Input
                                            name="fullName"
                                            required
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
                                            name="email"
                                            type="email"
                                            required
                                            placeholder="name@example.com"
                                            className="h-14 pl-12 bg-white/5 border-white/10 text-white rounded-xl focus:border-gold-primary/50 transition-all placeholder:text-zinc-700"
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
                                            className="h-14 pl-12 bg-white/5 border-white/10 text-white rounded-xl focus:border-gold-primary/50 transition-all placeholder:text-zinc-700"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        disabled={isPending}
                                        className="w-full bg-gold-gradient text-black font-bold h-14 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                                    >
                                        {isPending ? (
                                            <Loader2 className="animate-spin w-5 h-5" />
                                        ) : (
                                            "Create Account"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        )}

                        <div className="mt-8 text-center text-xs text-zinc-600 uppercase tracking-widest font-bold">
                            Already have an account? <Link href="/login" className="text-gold-primary hover:text-white transition-colors underline underline-offset-4 decoration-gold-primary/30">Sign In</Link>
                        </div>
                    </div>

                    {/* Back to Home */}
                    <div className="mt-8 text-center">
                        <Link href="/" className="text-zinc-500 hover:text-white transition-colors text-sm font-light">
                            ← Return to Homepage
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
