'use client'

import { motion } from 'framer-motion'

export default function BeforeAfter() {
  const beforeAfter = [
    {
      before: {
        title: 'Avant ClientFlashAI',
        icon: '❌',
        points: [
          'Pas de site web',
          'Pas de visibilité en ligne',
          '0 demande de clients',
          'Communication manuelle',
          'Temps perdu sur la prospection'
        ]
      },
      after: {
        title: 'Après ClientFlashAI',
        icon: '✅',
        points: [
          'Landing page professionnelle',
          'Visibilité optimisée',
          '+5 demandes/semaine',
          'Contenu réseaux sociaux',
          'Focus sur votre cœur de métier'
        ]
      }
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
            La transformation en 72h
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez la différence entre une présence en ligne classique et une stratégie digitale optimisée par l'IA
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {beforeAfter.map((comparison, index) => (
            <div key={index} className="space-y-8">
              {/* Avant */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
                  <div className="flex items-center mb-6">
                    <span className="text-2xl mr-3">{comparison.before.icon}</span>
                    <h3 className="text-xl font-bold text-red-700">
                      {comparison.before.title}
                    </h3>
                  </div>
                  
                  <ul className="space-y-3">
                    {comparison.before.points.map((point, pointIndex) => (
                      <motion.li
                        key={pointIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 + pointIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start"
                      >
                        <span className="text-red-500 mr-3 mt-1">•</span>
                        <span className="text-gray-700">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Après */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8">
                  <div className="flex items-center mb-6">
                    <span className="text-2xl mr-3">{comparison.after.icon}</span>
                    <h3 className="text-xl font-bold text-green-700">
                      {comparison.after.title}
                    </h3>
                  </div>
                  
                  <ul className="space-y-3">
                    {comparison.after.points.map((point, pointIndex) => (
                      <motion.li
                        key={pointIndex}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 + pointIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start"
                      >
                        <span className="text-green-500 mr-3 mt-1">•</span>
                        <span className="text-gray-700">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Badge de résultat */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                >
                  +500% de clients
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* CTA intermédiaire */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
            Commencer ma transformation
          </button>
        </motion.div>
      </div>
    </section>
  )
}
