'use client'

import { useState } from 'react'
import Logo from './Logo'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false) // Fermer le menu mobile si ouvert
    }
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo size="medium" />

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('features')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Fonctionnalités
            </button>
            <button onClick={() => scrollToSection('pricing')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Tarifs
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Témoignages
            </button>
            <button onClick={() => scrollToSection('demo')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Démo
            </button>
            <a href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Dashboard
            </a>
          </nav>

          {/* Boutons Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Contact
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Commencer
            </button>
          </div>

          {/* Menu Mobile */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              <button onClick={() => scrollToSection('features')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-left">
                Fonctionnalités
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-left">
                Tarifs
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-left">
                Témoignages
              </button>
              <button onClick={() => scrollToSection('demo')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-left">
                Démo
              </button>
              <a href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Dashboard
              </a>
              <div className="flex flex-col gap-3 pt-4 border-t">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors text-left"
                >
                  Contact
                </button>
                <button 
                  onClick={() => scrollToSection('pricing')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
                >
                  Commencer
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
