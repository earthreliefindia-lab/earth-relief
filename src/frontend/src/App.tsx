import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import EducationSection from "@/components/EducationSection";
import FooterSection from "@/components/FooterSection";
import HeroSection from "@/components/HeroSection";
import ImpactSection from "@/components/ImpactSection";
import MarketplaceSection from "@/components/MarketplaceSection";
import MissionSection from "@/components/MissionSection";
import Navigation from "@/components/Navigation";
import PartnerModal from "@/components/PartnerModal";
import PartnerSection from "@/components/PartnerSection";
import ProductsSection from "@/components/ProductsSection";
import WasteInnovationSection from "@/components/WasteInnovationSection";
import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";

export default function App() {
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background font-body">
      <Toaster position="top-right" richColors />
      <Navigation onPartnerClick={() => setPartnerModalOpen(true)} />
      <main>
        <HeroSection />
        <MissionSection />
        <ProductsSection />
        <MarketplaceSection onPartnerClick={() => setPartnerModalOpen(true)} />
        <WasteInnovationSection />
        <ImpactSection />
        <EducationSection />
        <PartnerSection />
        <BlogSection />
        <ContactSection />
      </main>
      <FooterSection />
      <PartnerModal
        open={partnerModalOpen}
        onClose={() => setPartnerModalOpen(false)}
      />
    </div>
  );
}
