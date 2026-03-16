'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LeadFormPro() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    business_type: '',
    city: '',
    instagram_or_website: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      if (!supabase) {
        throw new Error('Service non disponible')
      }

      const { data, error } = await supabase
        .from('leads')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            business_type: formData.business_type,
            city: formData.city,
            instagram_or_website: formData.instagram_or_website,
            created_at: new Date().toISOString()
          }
        ])

      if (error) {
        console.error('Erreur Supabase:', error)
        setError('Erreur lors de la soumission. Veuillez réessayer.')
      } else {
        console.log('Lead enregistré:', data[0])
        setSuccess(true)
        setFormData({
          name: '',
          email: '',
          business_type: '',
          city: '',
          instagram_or_website: ''
        })
      }
    } catch (err) {
      console.error('Erreur:', err)
      setError('Erreur technique. Veuillez réessayer plus tard.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto p-8 bg-green-50 border border-green-200 rounded-xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-green-800 mb-4">
            Super ! Votre demande a été enregistrée
          </h3>
          <p className="text-green-700 mb-6">
            Merci pour votre confiance. Nous allons créer votre page professionnelle en 72h.
          </p>
          <div className="bg-white rounded-lg p-6 text-left">
            <h4 className="font-semibold text-gray-900 mb-4">Prochaines étapes :</h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">1.</span>
                <span>Nous étudions votre demande et vous contactons dans les 24h</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">2.</span>
                <span>Création de votre landing page personnalisée</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">3.</span>
                <span>Livraison en 72h avec textes marketing et posts réseaux sociaux</span>
              </li>
            </ul>
          </div>
          <button 
            onClick={() => setSuccess(false)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Faire une autre demande
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Obtenez votre page professionnelle en 72h
        </h2>
        <p className="text-gray-600 mb-8">
          Remplissez ce formulaire et lancez votre activité dès demain
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-center">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nom complet *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Jean Dupont"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email professionnel *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="jean@entreprise.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="business_type" className="block text-sm font-medium text-gray-700 mb-2">
              Type d'activité *
            </label>
            <select
              id="business_type"
              name="business_type"
              value={formData.business_type}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Sélectionnez votre activité</option>
              <option value="coach">Coach/Consultant</option>
              <option value="beauty">Esthéticienne/Beauté</option>
              <option value="fitness">Coach sportif</option>
              <option value="therapy">Thérapeute</option>
              <option value="creative">Artiste/Créatif</option>
              <option value="local">Service local</option>
              <option value="restaurant">Restaurant</option>
              <option value="other">Autre</option>
            </select>
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              Ville
            </label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Paris"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="instagram_or_website" className="block text-sm font-medium text-gray-700 mb-2">
            Instagram ou site web
          </label>
          <input
            type="text"
            id="instagram_or_website"
            name="instagram_or_website"
            placeholder="@votreentreprise ou www.votresite.com"
            value={formData.instagram_or_website}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Traitement en cours...</span>
            </>
          ) : (
            <>
              Recevoir mon pack
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L10.586 11.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          En soumettant ce formulaire, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
        </p>
      </form>
    </div>
  )
}
