import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const posts = [
    {
        title: "The Ultimate Guide to Luxury Airport Transfers",
        excerpt: "Why booking a chauffeur is more than just a ride - it's an investment in your peace of mind.",
        date: "Oct 12, 2023",
        slug: "ultimate-guide-airport-transfers"
    },
    {
        title: "Top 5 Destinations for Winter 2024",
        excerpt: "Our curated list of the most exclusive winter getaways accessible by our long-distance fleet.",
        date: "Sep 28, 2023",
        slug: "winter-destinations-2024"
    },
    {
        title: "Behind the Scenes: Maintaining a Premium Fleet",
        excerpt: "How we ensure every vehicle meets the highest standards of safety and cleanliness.",
        date: "Sep 15, 2023",
        slug: "maintaining-premium-fleet"
    }
];

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Header />

            <section className="pt-32 pb-16 text-center">
                <h1 className="text-5xl font-heading font-bold mb-4">Journal</h1>
                <p className="text-muted-foreground">Insights from the world of luxury travel.</p>
            </section>

            <section className="container mx-auto px-6 pb-24 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                    <Link key={index} href={`/blog/${post.slug}`} className="group">
                        <Card className="bg-zinc-900 border-white/5 overflow-hidden hover:border-gold-primary transition-colors">
                            <div className="h-48 bg-zinc-800 w-full relative">
                                {/* Placeholder for blog image */}
                                <div className="absolute inset-0 flex items-center justify-center text-white/20 text-sm">[Feature Image]</div>
                            </div>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-2 text-xs text-gold-primary uppercase tracking-widest mb-3">
                                    <Calendar className="w-3 h-3" /> {post.date}
                                </div>
                                <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-gold-light transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-gray-400 text-sm line-clamp-3">
                                    {post.excerpt}
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </section>

            <Footer />
        </main>
    );
}
