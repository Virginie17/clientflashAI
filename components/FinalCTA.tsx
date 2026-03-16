'use client'

import { motion } from 'framer-motion'

export default function FinalCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Titre principal */}
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Prêt à transformer votre activité ?
          </motion.h2>

          {/* Sous-titre */}
          <motion.p 
            className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Rejoignez les 120+ entrepreneurs qui ont déjà 
            <span className="font-bold"> doublé leurs clients</span> en 72h
          </motion.p>

          {/* Garanties */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-green-300">✓</span>
              <span>Livraison 72h garantie</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-green-300">✓</span>
              <span>Satisfaction 30 jours</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-green-300">✓</span>
              <span>Paiement sécurisé</span>
            </div>
          </motion.div>

          {/* Bouton CTA principal */}
          <motion.button
            className="bg-white text-indigo-600 px-12 py-5 rounded-xl text-xl font-bold hover:bg-indigo-50 transition-colors shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Créer ma landing page maintenant
          </motion.button>

          {/* Texte secondaire */}
          <motion.p 
            className="mt-6 text-indigo-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
          >
            Ou commencez gratuitement →
          </motion.p>

          {/* Stats finales */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">297€</div>
              <div className="text-indigo-200">Investissement unique</div>
              <div className="text-sm text-indigo-300 mt-1">Pas d'abonnement</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">72h</div>
              <div className="text-indigo-200">Livraison garantie</div>
              <div className="text-sm text-indigo-300 mt-1">Ou remboursé</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">+500%</div>
              <div className="text-indigo-200">ROI moyen</div>
              <div className="text-sm text-indigo-300 mt-1">Pour nos clients</div>
            </div>
          </motion.div>

          {/* Badge urgence */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            viewport={{ once: true }}
            className="mt-8 inline-block bg-red-500 text-white px-6 py-2 rounded-full text-sm font-bold animate-pulse"
          >
            🔥 Offre limitée - 5 places restantes
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
