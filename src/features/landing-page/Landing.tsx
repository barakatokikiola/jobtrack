import { Hero } from "./components/Hero";
import { DashboardShowcase } from "./components/DashboardShowcase";
import { HowItWorks } from "./components/HowItWorks";
import { Features } from "./components/Features";
import { CtaBanner } from "./components/CtaBanner";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";

export default function Landing() {
  return (
    <main id="top" className="min-h-screen ">
      <div className="overflow-hidden">
        <Navbar />
        

        <div className="flex flex-col gap-12 px-5 pb-5 sm:px-20 sm:pb-8">
            <Hero />
          <DashboardShowcase />
          <HowItWorks />
          <Features />
          <CtaBanner />
        </div>

        <Footer />
      </div>
    </main>
  );
}
