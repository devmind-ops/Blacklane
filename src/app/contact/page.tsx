"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Send, Loader2, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useState, useTransition } from "react";
import { submitContactInquiry } from "@/actions/contact";

export default function ContactPage() {
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.full_name || !formData.email || !formData.message) {
            setError("Please fill in all required fields.");
            return;
        }

        startTransition(async () => {
            const result = await submitContactInquiry(formData);
            if (result.success) {
                setSuccess(true);
                setFormData({ full_name: "", email: "", phone: "", subject: "", message: "" });
            } else {
                setError(result.error || "Something went wrong.");
            }
        });
    };

    return (
        <main className="min-h-screen bg-black text-white">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="/assets/images/chauffeur_opening_door_1770699956596.png"
                    alt="Contact Blackcars Chauffeurs"
                    fill
                    className="object-cover opacity-60 grayscale"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
                <div className="relative z-10 text-center space-y-6 px-6 max-w-4xl mx-auto">
                    <div className="inline-block py-1 px-3 border border-gold-primary/30 rounded-full bg-gold-primary/5 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="text-gold-primary text-xs font-bold uppercase tracking-[0.3em]">24/7 Global Support</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        Connect With <span className="text-gold-primary">Midnight</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000">
                        Our dedicated team is ready to assist you with your global travel requirements.
                    </p>
                </div>
            </section>

            <section className="py-32 container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-24">
                    {/* Contact Form */}
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-gold-primary text-sm font-bold uppercase tracking-[0.3em]">Send a Message</h2>
                            <h3 className="text-4xl font-heading font-bold">Inquiry Form</h3>
                            <p className="text-zinc-400 font-light text-lg">
                                Complete the form below and a representative will respond within 15 minutes.
                            </p>
                        </div>

                        {success ? (
                            <div className="bg-white/5 border border-gold-primary/20 rounded-2xl p-12 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                                <CheckCircle2 className="w-16 h-16 text-gold-primary mx-auto animate-bounce" />
                                <h4 className="text-2xl font-heading font-bold">Message Sent Successfully</h4>
                                <p className="text-zinc-400">Thank you for your inquiry. A member of our team will contact you shortly.</p>
                                <Button
                                    onClick={() => setSuccess(false)}
                                    variant="outline"
                                    className="border-white/10 hover:bg-white/5 text-white"
                                >
                                    Send Another Message
                                </Button>
                            </div>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg text-sm">
                                        {error}
                                    </div>
                                )}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Full Name *</label>
                                        <Input
                                            value={formData.full_name}
                                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                            placeholder="John Doe"
                                            className="bg-white/5 border-white/10 h-14 focus:border-gold-primary/50 transition-colors"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Email Address *</label>
                                        <Input
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            type="email"
                                            placeholder="john@example.com"
                                            className="bg-white/5 border-white/10 h-14 focus:border-gold-primary/50 transition-colors"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Phone Number</label>
                                        <Input
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            type="tel"
                                            placeholder="+44 7000 000 000"
                                            className="bg-white/5 border-white/10 h-14 focus:border-gold-primary/50 transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Subject</label>
                                        <Input
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            placeholder="General Inquiry"
                                            className="bg-white/5 border-white/10 h-14 focus:border-gold-primary/50 transition-colors"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Message *</label>
                                    <Textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="How can we help you?"
                                        className="bg-white/5 border-white/10 min-h-[160px] focus:border-gold-primary/50 transition-colors"
                                        required
                                    />
                                </div>
                                <Button
                                    disabled={isPending}
                                    className="w-full h-14 bg-gold-gradient text-black font-bold uppercase tracking-widest hover:scale-[1.02] transition-all"
                                >
                                    {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" />
                                            Send Message
                                        </>
                                    )}
                                </Button>
                            </form>
                        )}
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-16">
                        <div className="space-y-4">
                            <h2 className="text-gold-primary text-sm font-bold uppercase tracking-[0.3em]">Contact Details</h2>
                            <h3 className="text-4xl font-heading font-bold">Global Presence</h3>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-12">
                            <div className="space-y-6 group">
                                <div className="w-12 h-12 rounded-xl bg-gold-primary/10 flex items-center justify-center group-hover:bg-gold-primary/20 transition-colors">
                                    <Phone className="w-6 h-6 text-gold-primary" />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-xl font-heading font-bold uppercase tracking-widest text-zinc-300">Call Us</h4>
                                    <p className="text-zinc-400 font-light">+44 20 7123 4567<br />+1 (800) 123-4567</p>
                                </div>
                            </div>

                            <div className="space-y-6 group">
                                <div className="w-12 h-12 rounded-xl bg-gold-primary/10 flex items-center justify-center group-hover:bg-gold-primary/20 transition-colors">
                                    <Mail className="w-6 h-6 text-gold-primary" />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-xl font-heading font-bold uppercase tracking-widest text-zinc-300">Email Us</h4>
                                    <p className="text-zinc-400 font-light">bookings@midnight.com<br />support@midnight.com</p>
                                </div>
                            </div>

                            <div className="space-y-6 group">
                                <div className="w-12 h-12 rounded-xl bg-gold-primary/10 flex items-center justify-center group-hover:bg-gold-primary/20 transition-colors">
                                    <MapPin className="w-6 h-6 text-gold-primary" />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-xl font-heading font-bold uppercase tracking-widest text-zinc-300">Main Office</h4>
                                    <p className="text-zinc-400 font-light">123 Park Lane, Mayfair<br />London, W1K 7AA</p>
                                </div>
                            </div>

                            <div className="space-y-6 group">
                                <div className="w-12 h-12 rounded-xl bg-gold-primary/10 flex items-center justify-center group-hover:bg-gold-primary/20 transition-colors">
                                    <Clock className="w-6 h-6 text-gold-primary" />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-xl font-heading font-bold uppercase tracking-widest text-zinc-300">Hours</h4>
                                    <p className="text-zinc-400 font-light">24/7/365 Available<br />Global Operations Center</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder/Area */}
                        <div className="aspect-video w-full rounded-2xl bg-zinc-900 border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gold-primary/5 opacity-50 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-gold-primary font-heading font-bold uppercase tracking-[0.2em] text-sm">Global Operations Map</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
