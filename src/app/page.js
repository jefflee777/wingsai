import CTASection from "@/components/cta";
import EcosystemBenefits from "@/components/EcosystemBenefits";
import Footer from "@/components/Footer";
import Navbar from "@/components/Header";
import HeroSection from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import KeyFeatures from "@/components/KeyFeatures";
import Roadmap from "@/components/Roadmap";
import Tokenomics from "@/components/Tokenomics";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <HowItWorks/>
      <KeyFeatures/>
      <EcosystemBenefits/>
      <Tokenomics/>
      <Roadmap/>
      <CTASection/>
      <Footer/>
    </div>
  );
}
