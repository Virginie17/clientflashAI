'use client'

import { motion } from 'framer-motion'

export default function SocialProof() {
  const stats = [
    { number: '120+', label: 'Entrepreneurs accompagnés' },
    { number: '72h', label: 'Livraison garantie' },
    { number: '95%', label: 'Satisfaction client' },
    { number: '500+', label: 'Pages créées' }
  ]

  const categories = [
    'Coachs', 'Immobilier', 'Thérapeutes', 'Consultants', 'Formateurs', 'Artisans'
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Stats */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 uppercase tracking-wide text-sm font-medium mb-8">
            Déjà utilisé par des entrepreneurs
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Catégories */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 uppercase tracking-wide text-sm font-medium mb-6">
            Secteurs d'activité
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {categories.map((category, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.05 }}
                viewport={{ once: true }}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-600 text-sm font-medium hover:border-indigo-300 hover:text-indigo-600 transition-colors"
              >
                {category}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
