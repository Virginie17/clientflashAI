import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import Example from "@/components/Example"
import Testimonials from "@/components/Testimonials"
import ClientLogos from "@/components/ClientLogos"
import Demo from "@/components/Demo"
import LeadForm from "@/components/LeadForm"
import Pricing from "@/components/Pricing"
import Process from "@/components/Process"
import CTA from "@/components/CTA"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main>
        <Hero />
        <Features />
        <Example />
        <Testimonials />
        <ClientLogos />
        <Demo />
        <LeadForm />
        <Process />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
