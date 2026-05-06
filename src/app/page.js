import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import EcosystemBenefits from "@/components/landing/EcosystemBenefits";
import Tokenomics from "@/components/landing/Tokenomics";
import Roadmap from "@/components/landing/Roadmap";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <HowItWorks />
        <EcosystemBenefits />
        <Tokenomics />
        <Roadmap />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
