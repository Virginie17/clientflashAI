export default function Problem() {
  const problems = [
    {
      icon: "🌐",
      title: "Pas de Présence en Ligne",
      description: "Votre entreprise est invisible pour les clients potentiels qui vous cherchent en ligne."
    },
    {
      icon: "⏰",
      title: "Pas le Temps de Créer",
      description: "Vous êtes occupé à servir vos clients et ne pouvez pas passer des semaines à construire un site web."
    },
    {
      icon: "💰",
      title: "Solutions Coûteuses",
      description: "Les agences web facturent des milliers d'euros pour des pages d'atterrissage de base."
    },
    {
      icon: "📱",
      title: "Surcharge Marketing",
      description: "Créer du contenu pour les réseaux sociaux ressemble à un travail à plein temps."
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              La lutte est réelle
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              La plupart des entrepreneurs font face à ces défis lorsqu'ils essaient d'attirer des clients en ligne. 
              Vous n'êtes pas seul dans ce parcours.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {problems.map((problem, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{problem.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {problem.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {problem.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-blue-50 rounded-2xl p-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Et si vous pouviez résoudre tout ça en 72 heures ?
              </h3>
              <p className="text-lg text-gray-700">
                Imaginez avoir une présence en ligne professionnelle qui attire des clients pendant que vous vous concentrez sur ce que vous faites de mieux.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
