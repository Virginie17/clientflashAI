export default function Features() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-12">
        Le Pack Visibilité IA
      </h2>

      <div className="grid md:grid-cols-4 gap-8">

        <div className="p-6 border rounded-xl">
          <h3 className="font-semibold mb-2">Landing Page</h3>
          <p className="text-gray-600">
            Une page professionnelle optimisée pour convertir vos visiteurs.
          </p>
        </div>

        <div className="p-6 border rounded-xl">
          <h3 className="font-semibold mb-2">Textes marketing</h3>
          <p className="text-gray-600">
            Contenu généré par IA pour convaincre vos clients.
          </p>
        </div>

        <div className="p-6 border rounded-xl">
          <h3 className="font-semibold mb-2">5 posts réseaux sociaux</h3>
          <p className="text-gray-600">
            Des publications prêtes à attirer de nouveaux clients.
          </p>
        </div>

        <div className="p-6 border rounded-xl">
          <h3 className="font-semibold mb-2">SEO Google</h3>
          <p className="text-gray-600">
            Optimisation pour apparaître dans les recherches locales.
          </p>
        </div>

      </div>
    </section>
  )
}
