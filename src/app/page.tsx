import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { FleetShowcase } from "@/components/sections/FleetShowcase";
import { ValuesSection } from "@/components/sections/ValuesSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />

      <ServiceGrid />
      <ValuesSection />
      <FleetShowcase />
      <Testimonials />
      <Footer />
    </main>
  );
}
