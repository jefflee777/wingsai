import CTASection from "@/components/cta";
import EcosystemBenefits from "@/components/EcosystemBenefits";
import HeroSection from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import KeyFeatures from "@/components/KeyFeatures";
import Roadmap from "@/components/Roadmap";
import Tokenomics from "@/components/Tokenomics";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroSection/>
      <HowItWorks/>
      <KeyFeatures/>
      <EcosystemBenefits/>
      <Tokenomics/>
      <Roadmap/>
      <CTASection/>
    </div>
  );
}
