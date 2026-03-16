export default function ClientLogos() {
  const clients = [
    { name: "Coach Sportif", icon: "💪", category: "Sport" },
    { name: "Esthéticienne", icon: "💅", category: "Beauté" },
    { name: "Thérapeute", icon: "🧘", category: "Santé" },
    { name: "Coach Business", icon: "🎯", category: "Business" },
    { name: "Agent Immobilier", icon: "🏠", category: "Immobilier" },
    { name: "Artiste", icon: "🎨", category: "Créatif" },
    { name: "Restaurant", icon: "🍽️", category: "Restauration" },
    { name: "Consultant", icon: "💼", category: "Conseil" }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Des professionnels de tous secteurs nous font confiance
          </h3>
          <p className="text-gray-600">
            Plus de 127 entrepreneurs ont déjà transformé leur activité
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {clients.map((client, index) => (
            <div 
              key={index}
              className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="text-4xl mb-3">{client.icon}</div>
              <div className="text-sm font-semibold text-gray-900 text-center">
                {client.name}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {client.category}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 bg-blue-50 rounded-full px-8 py-4">
            <div className="text-blue-700 font-bold">
              +127 clients actifs
            </div>
            <div className="text-blue-600">
              •
            </div>
            <div className="text-blue-600">
              8 secteurs différents
            </div>
            <div className="text-blue-600">
              •
            </div>
            <div className="text-blue-600">
              95% de satisfaction
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
