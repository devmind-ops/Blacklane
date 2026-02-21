"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signIn } from "@/actions/auth";
import { useActionState } from "react";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(async (prevState: any, formData: FormData) => {
        return await signIn(formData);
    }, null);

    return (
        <main className="min-h-screen bg-black text-white flex flex-col">
            <Header />

            <section className="flex-1 flex items-center justify-center relative p-6">
                {/* Background */}
                <div className="absolute inset-0 bg-[url('/assets/images/luxury_chauffeur_hero_1770699554633.png')] bg-cover bg-center opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />

                <div className="relative z-10 w-full max-w-md glass-panel p-8 rounded-lg border border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-3xl font-heading font-bold text-center mb-2">Welcome Back</h1>
                    <p className="text-center text-muted-foreground mb-8 text-sm">Sign in to manage your bookings.</p>

                    {state?.error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-md text-sm mb-6 text-center">
                            {state.error}
                        </div>
                    )}

                    <form action={formAction} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Email Address</Label>
                            <Input
                                name="email"
                                type="email"
                                required
                                placeholder="name@example.com"
                                className="bg-white/5 border-white/10 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label>Password</Label>
                                <Link href="/forgot-password" className="text-xs text-gold-primary hover:underline">Forgot?</Link>
                            </div>
                            <Input
                                name="password"
                                type="password"
                                required
                                placeholder="••••••••"
                                className="bg-white/5 border-white/10 text-white"
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-gold-gradient text-black font-bold h-12"
                        >
                            {isPending ? <Loader2 className="animate-spin" /> : "Sign In"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-400">
                        Don't have an account? <Link href="/register" className="text-gold-primary hover:underline">Create one</Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
