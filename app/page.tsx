import Hero from "@/components/Hero"
import Features from "@/components/Features"
import Example from "@/components/Example"
import LeadFormFixed from "@/components/LeadFormFixed"
import Pricing from "@/components/Pricing"
import Process from "@/components/Process"
import CTA from "@/components/CTA"

export default function Home() {
  return (
    <main className="bg-white text-gray-900">
      {/* Optimisation mobile-first - Hero prend 70% de l'espace */}
      <div className="lg:hidden">
        <Hero />
      </div>
      
      {/* Version desktop */}
      <div className="hidden lg:block">
        <Hero />
      </div>

      {/* Features et Example optimisés pour mobile */}
      <div className="lg:hidden">
        <Features />
        <Example />
      </div>
      
      {/* Version desktop */}
      <div className="hidden lg:block">
        <Features />
        <Example />
      </div>

      {/* Formulaire de leads professionnel */}
      <LeadFormFixed />

      <Process />
      <Pricing />
      <CTA />
    </main>
  )
}
