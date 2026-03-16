'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import Logo from './Logo'

export default function NewHero() {
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
    <section className="py-24 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Partie gauche - Texte et formulaire */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <div className="mb-8">
            <Logo size="large" variant="white" />
          </div>
          
          {/* Titre optimisé */}
          <motion.h1 
            className="text-4xl md:text-5xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Obtenez plus de clients en 72h grâce à l'IA
          </motion.h1>

          {/* Sous-titre */}
          <motion.p 
            className="text-xl text-indigo-100 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            ClientFlashAI crée pour vous une page de vente professionnelle
            avec textes marketing et contenu réseaux sociaux.
          </motion.p>

          {/* Formulaire */}
          <motion.div 
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {message && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${
                message.includes('succès') 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-red-100 text-red-700 border border-red-200'
              }`}>
                {message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/90 text-gray-900 border border-white/20 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent placeholder-gray-500"
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
                  className="w-full px-4 py-3 bg-white/90 text-gray-900 border border-white/20 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent placeholder-gray-500"
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
                  className="w-full px-4 py-3 bg-white/90 text-gray-900 border border-white/20 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent placeholder-gray-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-indigo-600 py-3 rounded-xl hover:bg-indigo-50 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Envoi...' : 'Créer ma landing page'}
              </button>
            </form>
          </motion.div>

          {/* Boutons secondaires */}
          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button className="border border-white px-6 py-3 rounded-xl hover:bg-white/10 transition-colors">
              Voir un exemple
            </button>
          </motion.div>
        </motion.div>

        {/* Partie droite - Mockup */}
        <motion.div 
          className="hidden lg:block"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-white p-6 rounded-2xl shadow-2xl">
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl p-8">
              {/* Mockup de landing page */}
              <div className="bg-white rounded-lg shadow-lg p-4">
                <div className="h-4 bg-indigo-600 rounded mb-3"></div>
                <div className="h-3 bg-gray-300 rounded mb-2 w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded mb-2 w-1/2"></div>
                <div className="h-3 bg-gray-300 rounded mb-4 w-5/6"></div>
                <div className="bg-indigo-100 rounded-lg p-3 mb-3">
                  <div className="h-3 bg-indigo-300 rounded mb-2"></div>
                  <div className="h-3 bg-indigo-300 rounded w-2/3"></div>
                </div>
                <div className="bg-purple-600 text-white rounded-lg text-center py-2 text-sm">
                  Contacter maintenant
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
