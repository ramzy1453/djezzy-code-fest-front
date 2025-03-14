import CallToAction from "@/components/landing/CallToAction";
import GetInvolved from "@/components/landing/GetInvolved";
import HeroSection from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Impact from "@/components/landing/Impact";
import Testimonials from "@/components/landing/Testimonials";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <GetInvolved />
      <Impact />
      <Testimonials />
      <CallToAction />
      <Footer />
    </main>
  );
}
