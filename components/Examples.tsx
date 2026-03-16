'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Examples() {
  const [selectedExample, setSelectedExample] = useState(0)

  const examples = [
    {
      title: 'Coach Business',
      category: 'Services',
      description: 'Page professionnelle avec formulaire de prise de rendez-vous',
      features: ['Calendrier intégré', 'Témoignages clients', 'Offres de coaching'],
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Agent Immobilier',
      category: 'Immobilier',
      description: 'Vitrine immobilière avec galerie de biens',
      features: ['Galerie photos', 'Filtre de recherche', 'Contact direct'],
      color: 'from-green-500 to-teal-600'
    },
    {
      title: 'Thérapeute',
      category: 'Santé',
      description: 'Présentation cabinet avec prise de RDV en ligne',
      features: ['Présentation', 'Tarifs', 'Rendez-vous en ligne'],
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Consultant IT',
      category: 'Technologie',
      description: 'Page services avec études de cas',
      features: ['Services techniques', 'Projets réalisés', 'Contact expert'],
      color: 'from-orange-500 to-red-600'
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Exemples de landing pages créées
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez quelques-unes des pages créées par notre IA pour différents secteurs d'activité
          </p>
        </motion.div>

        {/* Sélecteur d'exemples */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {examples.map((example, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedExample(index)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                selectedExample === index
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {example.title}
            </motion.button>
          ))}
        </div>

        {/* Exemple sélectionné */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          key={selectedExample}
        >
          {/* Mockup */}
          <div className="relative">
            <motion.div 
              className={`bg-gradient-to-br ${examples[selectedExample].color} rounded-2xl p-8 shadow-2xl`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl p-6">
                {/* Header du mockup */}
                <div className="h-4 bg-gray-800 rounded mb-4"></div>
                <div className="h-3 bg-gray-300 rounded mb-2 w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded mb-4 w-1/2"></div>
                
                {/* Contenu principal */}
                <div className="space-y-3 mb-4">
                  <div className="h-20 bg-gray-100 rounded-lg"></div>
                  <div className="h-20 bg-gray-100 rounded-lg"></div>
                </div>
                
                {/* Features */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {examples[selectedExample].features.map((feature, i) => (
                    <div key={i} className="h-8 bg-gray-200 rounded text-xs flex items-center justify-center">
                      {feature.split(' ')[0]}
                    </div>
                  ))}
                </div>
                
                {/* CTA */}
                <div className={`bg-gradient-to-r ${examples[selectedExample].color} text-white rounded-lg text-center py-2 text-sm`}>
                  Contacter maintenant
                </div>
              </div>
            </motion.div>
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -top-4 -right-4 bg-white shadow-lg rounded-full px-4 py-2 text-sm font-bold text-indigo-600"
            >
              {examples[selectedExample].category}
            </motion.div>
          </div>

          {/* Détails */}
          <div>
            <motion.h3 
              className="text-2xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {examples[selectedExample].title}
            </motion.h3>
            
            <motion.p 
              className="text-lg text-gray-600 mb-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {examples[selectedExample].description}
            </motion.p>

            <motion.div 
              className="space-y-3 mb-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="font-semibold text-gray-900 mb-3">Fonctionnalités incluses :</h4>
              {examples[selectedExample].features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="flex items-center"
                >
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Créer une page similaire
            </motion.button>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-12">
          <button
            onClick={() => setSelectedExample(Math.max(0, selectedExample - 1))}
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            disabled={selectedExample === 0}
          >
            ←
          </button>
          <div className="flex gap-2 items-center">
            {examples.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === selectedExample ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setSelectedExample(Math.min(examples.length - 1, selectedExample + 1))}
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            disabled={selectedExample === examples.length - 1}
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}
