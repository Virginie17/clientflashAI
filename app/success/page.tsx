'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)
  const [orderDetails, setOrderDetails] = useState<any>(null)

  useEffect(() => {
    if (sessionId) {
      // Simuler la récupération des détails de la commande
      // En production, vous appelleriez votre API pour vérifier le statut
      setTimeout(() => {
        setOrderDetails({
          sessionId,
          plan: sessionId?.includes('pack') ? 'Pack Visibilité IA' : 'Boost ClientFlash',
          amount: sessionId?.includes('pack') ? '297€' : '19€/mois',
          email: 'client@example.com', // À récupérer depuis votre API
        })
        setLoading(false)
      }, 1500)
    }
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Traitement de votre commande...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Message de succès */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Paiement réussi ! 🎉
            </h1>
            <p className="text-gray-600">
              Merci pour votre confiance. Votre commande est confirmée.
            </p>
          </div>

          {/* Détails de la commande */}
          {orderDetails && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Détails de la commande
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Commande n°</span>
                  <span className="font-medium text-gray-900">
                    {orderDetails.sessionId?.slice(0, 8)}...
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Offre</span>
                  <span className="font-medium text-gray-900">{orderDetails.plan}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Montant</span>
                  <span className="font-medium text-green-600">{orderDetails.amount}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium text-gray-900">{orderDetails.email}</span>
                </div>
              </div>
            </div>
          )}

          {/* Prochaines étapes */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Prochaines étapes
            </h3>
            
            <div className="space-y-2 text-gray-700">
              {orderDetails?.plan === 'Pack Visibilité IA' ? (
                <>
                  <p>📧 Vous recevrez un email de confirmation dans quelques minutes</p>
                  <p>📋 Notre équipe vous contactera sous 24h pour recueillir vos informations</p>
                  <p>🚀 Livraison de votre pack complet sous 72h maximum</p>
                </>
              ) : (
                <>
                  <p>📧 Email de confirmation d'abonnement envoyé</p>
                  <p>💳 Premier débit effectué avec succès</p>
                  <p>🔄 Accès immédiat à votre espace client</p>
                </>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/"
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-center font-semibold"
            >
              Retour à l'accueil
            </Link>
            
            <button 
              onClick={() => window.print()}
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Imprimer la facture
            </button>
          </div>
        </div>

        {/* Support */}
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Besoin d'aide ?
          </h3>
          <p className="text-gray-600 mb-4">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="mailto:support@clientflash.ai"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              📧 support@clientflash.ai
            </a>
            <span className="text-gray-400">•</span>
            <a 
              href="tel:+33612345678"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              📞 06 12 34 56 78
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
