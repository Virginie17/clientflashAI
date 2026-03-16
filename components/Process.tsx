export default function Process() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-5xl mx-auto text-center">

        <h2 className="text-3xl font-bold mb-12">
          Comment ça fonctionne
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div>
            <h3 className="font-semibold text-lg">1. Vous commandez</h3>
            <p className="text-gray-600 mt-2">
              Remplissez un formulaire rapide sur votre activité.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">2. Nous créons votre page</h3>
            <p className="text-gray-600 mt-2">
              Notre IA génère le contenu et nous créons votre site.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">3. Vous obtenez des clients</h3>
            <p className="text-gray-600 mt-2">
              Votre page est prête pour attirer de nouveaux prospects.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}
