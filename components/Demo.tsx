export default function Demo() {
  return (
    <section id="demo" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Voici ce que vous recevez en 72h
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une landing page professionnelle qui convertit les visiteurs en clients
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Design Professionnel</h3>
              </div>
              <p className="text-gray-600">
                Une page web moderne, responsive et optimisée pour la conversion avec votre identité visuelle.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Textes Marketing</h3>
              </div>
              <p className="text-gray-600">
                Des copywriting persuasifs qui présentent vos services de manière convaincante et professionnelle.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Posts Instagram</h3>
              </div>
              <p className="text-gray-600">
                5 posts Instagram professionnels pour promouvoir votre nouvelle page et attirer des clients.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Optimisation SEO</h3>
              </div>
              <p className="text-gray-600">
                Votre page est optimisée pour Google pour que vos clients vous trouvent facilement.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="ml-4 text-white text-sm font-medium">www.votre-entreprise.com</div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    Coach Sportif Paris
                  </h3>
                  <p className="text-gray-600">
                    Transformez votre corps en 8 semaines
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h4 className="font-bold text-gray-900 mb-2">✨ Résultats Garantis</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• -5kg en 1 mois</li>
                    <li>• +30% d'énergie</li>
                    <li>• Confidence retrouvée</li>
                  </ul>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">127</div>
                    <div className="text-xs text-gray-600">Clients satisfaits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">4.9</div>
                    <div className="text-xs text-gray-600">Note moyenne</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">8</div>
                    <div className="text-xs text-gray-600">Semaines programme</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-4 text-center">
                  <div className="font-bold mb-2">🎯 Offre Spéciale</div>
                  <div className="text-2xl font-bold mb-2">297€</div>
                  <div className="text-sm opacity-90">Au lieu de 597€</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-gray-900 rounded-full px-4 py-2 font-bold text-sm shadow-lg">
              ✨ Exemple réel
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white rounded-full px-8 py-4 shadow-lg">
            <div className="text-gray-900 font-bold">
              🚀 Livraison en 72h garantie
            </div>
            <div className="text-gray-600">
              •
            </div>
            <div className="text-gray-600">
              ✅ Satisfaction 100%
            </div>
            <div className="text-gray-600">
              •
            </div>
            <div className="text-gray-600">
              💰 ROI moyen x3
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
