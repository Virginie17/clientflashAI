'use client'

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choisissez votre formule
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cash immédiat ou revenu récurrent ? Les deux options pour transformer votre activité
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Offre principale - Cash immédiat */}
          <div className="bg-white border-2 border-blue-600 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow relative">
            <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-2 rounded-bl-lg rounded-tr-lg">
              <span className="text-sm font-bold">PLUS POPULAIRE</span>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Pack Visibilité IA
              </h3>
              <p className="text-gray-600 mb-4">Cash immédiat</p>
              <div className="text-5xl font-bold text-blue-600 mb-2">
                297€
              </div>
              <p className="text-gray-500">Paiement unique</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Landing page professionnelle</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Textes marketing optimisés IA</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">5 posts Instagram</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Formulaire clients intégré</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Livraison garantie en 72h</span>
              </li>
            </ul>

            <button 
              onClick={() => window.location.href = '#contact'}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
            >
              Commander maintenant
            </button>
          </div>

          {/* Offre abonnement - Revenu récurrent */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow relative">
            <div className="absolute top-0 right-0 bg-purple-600 text-white px-4 py-2 rounded-bl-lg rounded-tr-lg">
              <span className="text-sm font-bold">REVENU RÉCURRENT</span>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Boost ClientFlash
              </h3>
              <p className="text-gray-600 mb-4">Abonnement mensuel</p>
              <div className="text-5xl font-bold text-purple-600 mb-2">
                19€
              </div>
              <p className="text-gray-500">par mois</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Maintenance du site</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Optimisation Google continue</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Génération de posts IA chaque mois</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Support prioritaire 24/7</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Analytics et rapports mensuels</span>
              </li>
            </ul>

            <button 
              onClick={() => window.location.href = '#contact'}
              className="w-full bg-purple-600 text-white py-4 px-6 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-lg"
            >
              S'abonner maintenant
            </button>
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 bg-green-50 rounded-full px-8 py-4">
            <div className="text-green-700 font-bold">
              💰 Doublez vos revenus
            </div>
            <div className="text-green-600">
              •
            </div>
            <div className="text-green-600">
              Pack cash + Abonnement
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
