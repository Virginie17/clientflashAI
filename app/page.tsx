import Header from "@/components/Header"
import NewHero from "@/components/NewHero"
import SocialProof from "@/components/SocialProof"
import Features from "@/components/Features"
import BeforeAfter from "@/components/BeforeAfter"
import Examples from "@/components/Examples"
import NewTestimonials from "@/components/NewTestimonials"
import Process from "@/components/Process"
import Pricing from "@/components/Pricing"
import FAQ from "@/components/FAQ"
import FinalCTA from "@/components/FinalCTA"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main>
        {/* Structure SaaS optimisée pour la conversion */}
        <NewHero />
        <SocialProof />
        <Features />
        <BeforeAfter />
        <Examples />
        <NewTestimonials />
        <Process />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
