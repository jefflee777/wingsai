import EcosystemBenefits from "@/components/EcosystemBenefits";
import HeroSection from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import KeyFeatures from "@/components/KeyFeatures";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroSection/>
      <HowItWorks/>
      <KeyFeatures/>
      <EcosystemBenefits/>
    </div>
  );
}
