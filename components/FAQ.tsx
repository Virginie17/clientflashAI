'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'Comment fonctionne ClientFlashAI ?',
      answer: 'ClientFlashAI utilise l\'intelligence artificielle pour créer votre landing page professionnelle en 72h. Vous nous fournissez vos informations, et nous générons automatiquement votre page web, vos textes marketing et vos posts réseaux sociaux optimisés.'
    },
    {
      question: 'Qu\'est-ce que je reçois exactement ?',
      answer: 'Vous recevez : 1) Une landing page professionnelle et responsive, 2) Textes marketing optimisés pour la conversion, 3) Contenus pour vos réseaux sociaux, 4) Formulaire de contact intégré, 5) Optimisation SEO de base.'
    },
    {
      question: 'Puis-je personnaliser ma landing page ?',
      answer: 'Oui ! Bien que notre IA crée une base professionnelle, toutes les personnalisations sont possibles. Vous pouvez modifier les couleurs, les textes, les images et ajouter vos propres éléments selon vos besoins.'
    },
    {
      question: 'Combien de temps faut-il pour obtenir ma page ?',
      answer: 'Le délai standard est de 72h maximum. Dans la plupart des cas, votre landing page est prête en 48h. Nous vous envoyons un lien pour validation avant la mise en ligne finale.'
    },
    {
      question: 'Quel est le prix du service ?',
      answer: 'Nous proposons une offre unique à 297€ pour une landing page complète avec textes et contenus réseaux sociaux. Aucun frais mensuel ni coût caché. Vous payez une fois et profitez de votre page à vie.'
    },
    {
      question: 'Ma page sera-t-elle référencée sur Google ?',
      answer: 'Oui, votre page est optimisée pour le référencement naturel avec les bonnes balises, méta-descriptions et structure. Le référencement prend généralement 2-4 semaines pour apparaître sur Google.'
    },
    {
      question: 'Puis-je utiliser mon propre nom de domaine ?',
      answer: 'Absolument ! Vous pouvez utiliser votre propre nom de domaine (.fr, .com, etc.) ou nous pouvons vous aider à en acquérir un. La configuration technique est incluse dans notre service.'
    },
    {
      question: 'Que se passe-t-il si je ne suis pas satisfait ?',
      answer: 'Nous offrons une satisfaction garantie de 30 jours. Si vous n\'êtes pas satisfait de votre landing page, nous effectuons jusqu\'à 3 modifications gratuites ou vous remboursons intégralement.'
    },
    {
      question: 'Comment les clients me contacteront-ils ?',
      answer: 'Votre landing page inclut un formulaire de contact qui vous enverra directement les demandes par email. Vous pouvez également ajouter votre numéro de téléphone, WhatsApp ou tout autre moyen de contact.'
    },
    {
      question: 'Proposez-vous un accompagnement après la livraison ?',
      answer: 'Oui, nous restons disponibles 7 jours après la livraison pour répondre à toutes vos questions et effectuer les ajustements nécessaires. Un support technique est également inclus.'
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Questions fréquentes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tout ce que vous devez savoir sur ClientFlashAI
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA final */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Vous ne trouvez pas votre réponse ?
            </h3>
            <p className="text-indigo-100 mb-6">
              Notre équipe est disponible pour répondre à toutes vos questions
            </p>
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors">
              Contacter le support
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
