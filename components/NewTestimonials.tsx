'use client'

import { motion } from 'framer-motion'

export default function NewTestimonials() {
  const testimonials = [
    {
      name: 'Marie Dubois',
      role: 'Coach Business',
      content: 'Grâce à ClientFlashAI j\'ai obtenu 5 demandes de clients en une semaine. La landing page est professionnelle et les posts réseaux sociaux m\'ont fait gagner un temps précieux.',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: 'Thomas Martin',
      role: 'Agent Immobilier',
      content: 'Incroyable ! En 72h j\'avais une page web complète avec tous mes biens. J\'ai déjà signé 2 nouveaux mandats grâce à la visibilité en ligne.',
      rating: 5,
      avatar: '👨‍💼'
    },
    {
      name: 'Sophie Bernard',
      role: 'Thérapeute',
      content: 'Je suis impressionnée par la qualité des contenus générés. Mes patients trouvent facilement mon cabinet et prennent rendez-vous directement depuis la page.',
      rating: 5,
      avatar: '👩‍⚕️'
    },
    {
      name: 'Lucas Petit',
      role: 'Consultant IT',
      content: 'Le rapport qualité/prix est exceptionnel. J\'ai économisé des milliers d\'euros en évitant une agence web. Le résultat est professionnel et efficace.',
      rating: 5,
      avatar: '👨‍💻'
    },
    {
      name: 'Emma Rousseau',
      role: 'Formatrice',
      content: 'ClientFlashAI a transformé ma manière d\'acquérir des clients. Plus besoin de prospecter, les prospects viennent directement vers moi.',
      rating: 5,
      avatar: '👩‍🏫'
    },
    {
      name: 'Nicolas Leroy',
      role: 'Artisan',
      content: 'Simple, rapide et efficace. Ma petite entreprise a enfin une présence professionnelle qui me rapporte des nouveaux contrats chaque mois.',
      rating: 5,
      avatar: '👷‍♂️'
    }
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les témoignages de nos clients satisfaits
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Avatar et note */}
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">{testimonial.avatar}</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              </div>

              {/* Contenu */}
              <p className="text-gray-700 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Badge de résultat */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                className="mt-4 inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {index % 3 === 0 && '+5 clients/semaine'}
                {index % 3 === 1 && '+2 mandats/mois'}
                {index % 3 === 2 && 'ROI 300%'}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Stats additionnelles */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6">
            Rejoignez les entrepreneurs qui transforment leur activité
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold mb-2">4.9/5</div>
              <div className="text-indigo-200">Note moyenne</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-indigo-200">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">72h</div>
              <div className="text-indigo-200">Livraison garantie</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
