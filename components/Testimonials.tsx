export default function Testimonials() {
  const testimonials = [
    {
      name: "Marie Dubois",
      business: "Coach Sportif",
      city: "Lyon",
      rating: 5,
      text: "J'ai obtenu mes premiers clients en 1 semaine ! La landing page est professionnelle et les posts Instagram m'ont vraiment aidé à me démarquer.",
      result: "+5 clients la première semaine"
    },
    {
      name: "Sophie Martin",
      business: "Esthéticienne",
      city: "Paris",
      rating: 5,
      text: "Un service incroyable ! En 72h j'avais ma page web complète avec des textes qui convertissent. Mes rendez-vous ont explosé.",
      result: "+40% de rendez-vous"
    },
    {
      name: "Thomas Bernard",
      business: "Thérapeute",
      city: "Marseille",
      rating: 5,
      text: "Je ne savais pas comment me lancer en ligne. ClientFlash AI a tout fait pour moi. Maintenant j'ai une clientèle stable.",
      result: "Clientèle stable en 2 mois"
    },
    {
      name: "Claire Petit",
      business: "Coach Business",
      city: "Bordeaux",
      rating: 5,
      text: "Le retour sur investissement est incroyable. J'ai dépensé 297€ et j'en ai gagné plus de 2000€ le premier mois.",
      result: "ROI x7 le premier mois"
    }
  ]

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ils ont transformé leur activité
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez comment nos clients ont obtenu des résultats spectaculaires en seulement 72h
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              <blockquote className="text-gray-700 mb-6 text-sm leading-relaxed">
                "{testimonial.text}"
              </blockquote>
              
              <div className="border-t pt-4">
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.business}</div>
                <div className="text-xs text-gray-500">{testimonial.city}</div>
              </div>
              
              <div className="mt-4 bg-green-50 rounded-lg p-3 text-center">
                <div className="text-green-700 font-bold text-sm">
                  {testimonial.result}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-6 py-3">
            <span className="text-blue-700 font-semibold">
              4.9/5
            </span>
            <span className="text-blue-600">
              •
            </span>
            <span className="text-blue-600">
              127+ clients satisfaits
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
