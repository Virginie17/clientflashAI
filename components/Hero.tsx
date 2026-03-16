'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Logo from './Logo'

export default function Hero() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    business: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      if (!supabase) {
        setMessage('Service indisponible. Veuillez réessayer plus tard.')
        return
      }

      const { data, error } = await supabase
        .from('leads')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            business_type: formData.business,
            city: '',
            instagram_or_website: '',
            created_at: new Date().toISOString()
          }
        ])

      if (error) {
        setMessage('Erreur lors de la soumission. Veuillez réessayer.')
      } else {
        setMessage('✅ Formulaire envoyé avec succès ! Nous vous contacterons rapidement.')
        setFormData({ name: '', email: '', business: '' })
      }
    } catch (err) {
      setMessage('Erreur technique. Veuillez réessayer plus tard.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className="py-12 text-center bg-gray-50 px-4 lg:py-16">
      <div className="max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-6 md:mb-8">
          <Logo size="large" />
        </div>
        
        {/* Titre optimisé mobile */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
          <span className="block md:inline">Attirez plus de clients</span>
          <span className="block md:inline lg:block text-blue-600">avec une page pro en 72h</span>
        </h1>

        {/* Description plus concise sur mobile */}
        <p className="text-base md:text-lg text-gray-600 max-w-lg md:max-w-xl mx-auto mb-6 md:mb-8">
          <span className="md:hidden">ClientFlash AI : landing page + textes + posts réseaux sociaux</span>
          <span className="hidden md:inline">ClientFlash AI crée votre landing page, vos textes marketing et vos posts réseaux sociaux pour booster votre visibilité.</span>
        </p>

        {/* Formulaire optimisé pour mobile - prend 70% de l'espace */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 md:mb-8 max-w-sm md:max-w-md mx-auto lg:max-w-lg">
          {message && (
            <div className={`mb-4 p-3 rounded-lg text-xs md:text-sm ${
              message.includes('succès') 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              {message}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Votre nom"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Votre email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="business"
                placeholder="Votre activité"
                value={formData.business}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 md:py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Envoi...' : 'Obtenir mon pack'}
            </button>
          </form>
        </div>

        {/* Boutons optimisés mobile */}
        <div className="flex flex-col gap-3 md:flex-row md:gap-4 md:justify-center">
          <button className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg text-sm md:text-base">
            Réserver mon pack
          </button>
          <button className="border px-4 py-2 md:px-6 md:py-3 rounded-lg text-sm md:text-base">
            Voir un exemple
          </button>
        </div>
      </div>
    </section>
  )
}
