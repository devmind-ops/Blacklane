"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getUserProfile } from "@/actions/auth";
import { getUserBookings } from "@/actions/booking";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, User, Calendar, Clock, MapPin, History, Shield, Star, Crown } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";

export default function ProfilePage() {
    const [profile, setProfile] = useState<any>(null);
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const [profileData, bookingsData] = await Promise.all([
                    getUserProfile(),
                    getUserBookings()
                ]);
                setProfile(profileData);
                setBookings(bookingsData);
            } catch (error) {
                console.error("Error loading profile data:", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const getTierIcon = (tier: string) => {
        switch (tier?.toLowerCase()) {
            case 'gold': return <Star className="w-5 h-5 text-gold-primary" />;
            case 'platinum': return <Crown className="w-5 h-5 text-gold-primary" />;
            default: return <Shield className="w-5 h-5 text-zinc-400" />;
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
                <Loader2 className="w-10 h-10 animate-spin text-gold-primary" />
                <p className="mt-4 text-zinc-500 animate-pulse uppercase tracking-[4px] text-xs">Loading Experience</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white flex flex-col">
            <Header />

            <section className="flex-1 pt-32 pb-20 px-6 container mx-auto">
                {/* Hero / Header Section */}
                <div className="relative mb-12 rounded-3xl overflow-hidden glass-panel p-8 md:p-12 border border-white/5 shadow-2xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold-primary/5 blur-[100px] rounded-full -mr-20 -mt-20" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                        <div className="w-24 h-24 rounded-full bg-gold-gradient p-1 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                            <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center">
                                <User className="w-10 h-10 text-gold-primary" />
                            </div>
                        </div>

                        <div className="flex-1 space-y-2">
                            <h1 className="text-4xl font-heading font-bold">
                                {profile?.full_name || "Valued Merchant"}
                            </h1>
                            <p className="text-zinc-500 font-light tracking-wide">{profile?.email || "Guest User"}</p>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mt-4">
                                {getTierIcon(profile?.tier)}
                                <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">
                                    {profile?.tier || "Silver"} Status
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar Stats? */}
                    <div className="lg:col-span-1 space-y-8">
                        <Card className="bg-zinc-950/50 border-white/5 rounded-3xl backdrop-blur-sm overflow-hidden text-white">
                            <CardHeader>
                                <CardTitle className="text-sm font-heading uppercase tracking-[3px] text-gold-primary/80">Account Insights</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-0">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                                    <span className="text-zinc-500 text-xs uppercase tracking-widest">Total Journeys</span>
                                    <span className="text-xl font-bold font-heading">{bookings.length}</span>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                                    <span className="text-zinc-500 text-xs uppercase tracking-widest">Member Since</span>
                                    <span className="text-sm font-medium">
                                        {profile?.created_at ? format(new Date(profile.created_at), 'MMMM yyyy') : "2024"}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content: Booking History */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-heading font-bold">Journey History</h2>
                            <Badge variant="outline" className="border-gold-primary/30 text-gold-primary px-3 py-1">
                                {bookings.length} Bookings
                            </Badge>
                        </div>

                        {bookings.length === 0 ? (
                            <div className="glass-panel p-20 rounded-3xl border border-white/5 text-center space-y-4">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                                    <Clock className="w-8 h-8 text-zinc-600" />
                                </div>
                                <p className="text-zinc-500 font-light">Your luxury journey with us is yet to begin.</p>
                                <Link href="/fleet" className="text-gold-primary text-sm hover:underline uppercase tracking-widest font-bold">Book your first ride</Link>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {bookings.map((booking: any) => (
                                    <div
                                        key={booking.id}
                                        className="glass-panel rounded-3xl border border-white/5 p-6 hover:border-white/10 transition-all duration-300 group shadow-lg"
                                    >
                                        <div className="flex flex-col md:flex-row gap-6">
                                            {/* Vehicle Image */}
                                            <div className="relative w-full md:w-48 h-32 rounded-2xl overflow-hidden bg-zinc-900 flex-shrink-0 border border-white/5 grayscale group-hover:grayscale-0 transition-all duration-500">
                                                {booking.fleet?.image_url ? (
                                                    <Image
                                                        src={booking.fleet.image_url}
                                                        alt={booking.fleet.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <History className="w-8 h-8 text-zinc-800" />
                                                    </div>
                                                )}
                                                <Badge className="absolute top-2 right-2 bg-black/80 backdrop-blur-md border border-white/20 text-[10px] uppercase font-bold tracking-tighter">
                                                    {booking.status}
                                                </Badge>
                                            </div>

                                            {/* Booking Info */}
                                            <div className="flex-1 space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-xl font-heading font-bold">{booking.fleet?.name || "Premium Vehicle"}</h3>
                                                        <p className="text-xs text-zinc-500 font-medium uppercase tracking-widest">{booking.booking_type}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-gold-primary font-heading font-bold font-heading text-lg">${booking.calculated_price}</p>
                                                        <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest">{format(new Date(booking.pickup_time), 'MMM d, h:mm a')}</p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-light">
                                                    <div className="flex items-center gap-2 text-zinc-400">
                                                        <MapPin className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                                                        <span className="truncate">{booking.pickup_location}</span>
                                                    </div>
                                                    {booking.dropoff_location && (
                                                        <div className="flex items-center gap-2 text-zinc-400">
                                                            <MapPin className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                                                            <span className="truncate">{booking.dropoff_location}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
