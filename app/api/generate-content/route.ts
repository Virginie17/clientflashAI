import { NextRequest, NextResponse } from 'next/server'

// Simuler une API OpenAI pour la génération de contenu
// En production, vous utiliseriez l'API OpenAI réelle

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { business_type, city, target_audience, unique_value } = body

    // Validation
    if (!business_type || !city) {
      return NextResponse.json(
        { error: 'Type d\'activité et ville requis' },
        { status: 400 }
      )
    }

    // Simuler la génération de contenu IA
    // En production, vous appelleriez l'API OpenAI ici
    const generatedContent = generateContentAI(business_type, city, target_audience, unique_value)

    return NextResponse.json({ 
      success: true, 
      content: generatedContent 
    })

  } catch (error) {
    console.error('Erreur génération contenu:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la génération du contenu' },
      { status: 500 }
    )
  }
}

function generateContentAI(businessType: string, city: string, targetAudience?: string, uniqueValue?: string) {
  const templates = {
    'Coach sportif': {
      landing: `Transformez votre corps avec ${uniqueValue || 'un coaching personnalisé'} à ${city}`,
      posts: [
        '🏋️‍♂️ Prêt(e) à transformer votre corps ? Programme sur-mesure à ' + city,
        '💪 -5kg garanti en 1 mois avec notre méthode exclusive',
        '🥗 Nutrition + Sport = Résultats visibles 📈',
        '🎯 Objectif été 2024 ? Commencez maintenant !',
        '⭐ 127 clients satisfaits à ' + city + ' - Rejoignez-nous !'
      ],
      keywords: ['coach sportif ' + city, 'perdre du poids ' + city, 'musculature ' + city, 'fitness ' + city]
    },
    'Esthéticienne': {
      landing: `Révélez votre beauté naturelle avec ${uniqueValue || 'nos soins expert'} à ${city}`,
      posts: [
        '✨ Votre peau éclate de beauté grâce à nos soins expert',
        '💆‍♀️ Détente et résultats garantis - Découvrez nos nouveautés',
        '🌿 Soins naturels pour une peau sublime à ' + city,
        '🎁 Offre spéciale : soin complet -50% pour les nouvelles clientes',
        '⭐ 4.9/5 sur Google - Découvrez nos témoignages'
      ],
      keywords: ['esthéticienne ' + city, 'soins du visage ' + city, 'épilation ' + city, 'beauté ' + city]
    },
    'Thérapeute': {
      landing: `Retrouvez l'équilibre et le bien-être avec ${uniqueValue || 'un accompagnement personnalisé'} à ${city}`,
      posts: [
        '🧘‍♀️ Stress et anxiété : retrouvez votre sérénité',
        '💬 Écoute bienveillante et solutions concrètes',
        '🌟 Développement personnel : devenez la meilleure version de vous-même',
        '📞 Premier rendez-vous offert - Prenez soin de vous',
        '❤️ 89 patients accompagnés vers le bien-être'
      ],
      keywords: ['thérapeute ' + city, 'sophrologie ' + city, 'hypnose ' + city, 'bien-être ' + city]
    },
    'default': {
      landing: `Découvrez ${uniqueValue || 'nos services exceptionnels'} à ${city}`,
      posts: [
        '🚀 Nouveaux services disponibles dans votre région',
        '💎 Qualité et expertise au service de vos besoins',
        '🎯 Solutions adaptées à vos objectifs',
        '📞 Contactez-nous pour un devis personnalisé',
        '⭐ Clients satisfaits : notre meilleure publicité'
      ],
      keywords: [businessType + ' ' + city, 'services ' + city, 'professionnel ' + city]
    }
  }

  const template = templates[businessType as keyof typeof templates] || templates.default

  return {
    landing_text: {
      headline: template.landing,
      subheadline: `Service professionnel à ${city} - Résultats garantis`,
      description: `Expert en ${businessType.toLowerCase()}, je vous propose des solutions sur-mesure pour atteindre vos objectifs.`,
      benefits: [
        'Expertise locale et professionnelle',
        'Approche personnalisée',
        'Résultats mesurables',
        'Accompagnement continu'
      ],
      call_to_action: 'Prenez rendez-vous dès maintenant'
    },
    social_posts: template.posts,
    seo_keywords: template.keywords,
    meta_description: `${businessType} professionnel à ${city} - ${uniqueValue || 'Service de qualité'}. Contactez-nous pour plus d'informations.`,
    google_business_categories: ['Service professionnel', businessType],
    target_audience_description: targetAudience || `Professionnels et particuliers à ${city} cherchant un service de qualité en ${businessType.toLowerCase()}`
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Méthode non autorisée' },
    { status: 405 }
  )
}
