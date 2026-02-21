import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-zinc-950 border-t border-white/10 pt-20 pb-10 text-white">
            <div className="container mx-auto px-6">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand & Newsletter */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block text-2xl font-bold tracking-[2px] font-heading">
                            MIDNIGHT<span className="text-primary">LUXURY</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Experience the pinnacle of luxury travel. Professional chauffeurs, immaculate fleet, and seamless global service.
                        </p>
                        <div className="space-y-4 pt-4">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-gold-light">Subscribe to our Newsletter</h4>
                            <div className="flex gap-2">
                                <Input placeholder="Email Address" className="bg-white/5 border-white/10 text-white" />
                                <Button size="icon" className="bg-gold-gradient text-black hover:bg-gold-light">
                                    <Mail className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Services Links */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-heading font-bold text-white">Services</h4>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><Link href="/services/airport" className="hover:text-gold-primary transition-colors">Airport Transfers</Link></li>
                            <li><Link href="/services/city" className="hover:text-gold-primary transition-colors">City to City</Link></li>
                            <li><Link href="/services/hourly" className="hover:text-gold-primary transition-colors">Hourly Service</Link></li>
                            <li><Link href="/services/wedding" className="hover:text-gold-primary transition-colors">Wedding Chauffeur</Link></li>
                            <li><Link href="/services/events" className="hover:text-gold-primary transition-colors">Events & Galas</Link></li>
                            <li><Link href="/services/secure" className="hover:text-gold-primary transition-colors">Secure Travel</Link></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-heading font-bold text-white">Company</h4>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><Link href="/about" className="hover:text-gold-primary transition-colors">About Us</Link></li>
                            <li><Link href="/fleet" className="hover:text-gold-primary transition-colors">Our Fleet</Link></li>
                            <li><Link href="/blog" className="hover:text-gold-primary transition-colors">Journal</Link></li>
                            <li><Link href="/careers" className="hover:text-gold-primary transition-colors">Careers</Link></li>
                            <li><Link href="/contact" className="hover:text-gold-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-heading font-bold text-white">Contact</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-gold-primary flex-shrink-0" />
                                <span>123 Park Lane, Mayfair<br />London, W1K 7AA</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-gold-primary flex-shrink-0" />
                                <span>+44 20 7123 4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-gold-primary flex-shrink-0" />
                                <span>bookings@midnight.com</span>
                            </li>
                        </ul>
                        <div className="flex gap-4 pt-2">
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold-primary hover:text-black transition-colors"><Facebook className="w-4 h-4" /></Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold-primary hover:text-black transition-colors"><Twitter className="w-4 h-4" /></Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold-primary hover:text-black transition-colors"><Instagram className="w-4 h-4" /></Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold-primary hover:text-black transition-colors"><Linkedin className="w-4 h-4" /></Link>
                        </div>
                    </div>

                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p suppressHydrationWarning>&copy; {new Date().getFullYear()} Midnight Luxury Chauffeurs. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
