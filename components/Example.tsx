export default function Example() {
  const testimonials = [
    {
      name: "Marie Dubois",
      business: "Coach Sportif",
      text: "ClientFlash AI a transformé mon activité. J'ai eu 5 nouveaux clients la première semaine !",
      rating: 5,
      avatar: "👩‍🦰"
    },
    {
      name: "Thomas Martin",
      business: "Photographe",
      text: "Ma page professionnelle est magnifique. Les clients me trouvent facilement sur Google.",
      rating: 5,
      avatar: "👨‍💼"
    },
    {
      name: "Sophie Laurent",
      business: "Esthéticienne",
      text: "Les textes marketing sont parfaits. Je n'ai plus à me soucier de ma communication.",
      rating: 4,
      avatar: "👩‍💼"
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Voir ce que nous créons pour nos clients
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des pages professionnelles qui convertissent et des résultats prouvés
          </p>
        </div>

        {/* Témoignages */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            Ils nous font déjà confiance
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.business}</div>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-xl ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>

          {/* Preuves sociales */}
          <div className="bg-blue-50 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold mb-6 text-blue-900">
              +500 entrepreneurs nous font déjà confiance
            </h3>
            <div className="flex justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>4.9/5 satisfaction</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>72h livraison garantie</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Support 24/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Exemple de site créé */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="flex-1 text-center">
                <span className="text-sm text-gray-600 font-mono">marie-coaching.paris</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Marie Coaching Sportif
              </h3>
              <p className="text-xl text-gray-600 mb-6">
                Coaching personnel et sportif à Paris
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Prendre rendez-vous
              </button>
            </div>

            {/* Services */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">�</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Coaching Personnel</h4>
                <p className="text-gray-600">Programmes sur mesure</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏃‍♀️</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Coaching Sportif</h4>
                <p className="text-gray-600">Préparation physique</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">�</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Nutrition</h4>
                <p className="text-gray-600">Plans alimentaires</p>
              </div>
            </div>

            {/* Témoignage intégré */}
            <div className="bg-blue-50 rounded-xl p-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                  <span className="text-xl">�‍🦰</span>
                </div>
                <div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">⭐</span>
                    ))}
                  </div>
                  <p className="text-gray-700 italic">
                    "Grâce à ma nouvelle page, j'ai doublé mon nombre de clients en 2 mois. Le service est exceptionnel !"
                  </p>
                  <p className="font-semibold text-gray-900 mt-2">Marie Dubois</p>
                </div>
              </div>
            </div>

            {/* Contact et réseaux sociaux */}
            <div className="text-center border-t pt-8">
              <div className="flex justify-center gap-8 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>Paris, France</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📞</span>
                  <span>+33 1 23 45 67 89</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📱</span>
                  <span>@marie_coaching</span>
                </div>
              </div>
              
              <div className="flex justify-center gap-4">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
                  📘 Facebook
                </button>
                <button className="bg-pink-600 text-white px-6 py-2 rounded-lg">
                  📷 Instagram
                </button>
                <button className="bg-blue-400 text-white px-6 py-2 rounded-lg">
                  💼 LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-4">
            Ceci est un exemple réel. Votre site sera personnalisé selon votre activité.
          </p>
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">Responsive mobile & optimisé SEO</span>
          </div>
        </div>
      </div>
    </section>
  )
}
