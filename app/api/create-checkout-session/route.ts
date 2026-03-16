import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

// Initialiser Stripe
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY!) 
  : null

export async function POST(request: NextRequest) {
  try {
    // Vérifier si Stripe est configuré
    if (!stripe) {
      return NextResponse.json(
        { error: 'Service de paiement non configuré' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { plan, clientEmail, clientInfo } = body

    // Validation
    if (!plan || !clientEmail) {
      return NextResponse.json(
        { error: 'Plan et email requis' },
        { status: 400 }
      )
    }

    // Définir les prix et métadonnées selon le plan
    let priceData: any
    let metadata: Record<string, string>

    if (plan === 'pack-visibilite') {
      // Offre cash unique
      priceData = {
        currency: 'eur',
        product_data: {
          name: 'Pack Visibilité IA',
          description: 'Landing page professionnelle + Textes marketing + 5 posts Instagram',
          images: [],
        },
        unit_amount: 29700, // 297€ en centimes
      }
      metadata = {
        plan_type: 'pack_visibilite',
        client_email: clientEmail,
        price: '297',
        currency: 'EUR',
      }
    } else if (plan === 'boost-abonnement') {
      // Offre abonnement mensuel
      priceData = {
        currency: 'eur',
        product_data: {
          name: 'Boost ClientFlash',
          description: 'Maintenance + Optimisation Google + Posts IA mensuels + Support',
          images: [],
        },
        unit_amount: 1900, // 19€ en centimes
        recurring: {
          interval: 'month',
        },
      }
      metadata = {
        plan_type: 'boost_abonnement',
        client_email: clientEmail,
        price: '19',
        currency: 'EUR',
        interval: 'month',
      }
    } else {
      return NextResponse.json(
        { error: 'Plan invalide' },
        { status: 400 }
      )
    }

    // Créer la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: priceData,
          quantity: 1,
        },
      ],
      mode: plan === 'pack-visibilite' ? 'payment' : 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/pricing?cancelled=true`,
      customer_email: clientEmail,
      metadata,
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['FR', 'BE', 'CH', 'LU'],
      },
      custom_text: {
        submit: {
          message: plan === 'pack-visibilite' 
            ? 'Paiement unique - Accès immédiat après paiement'
            : 'Abonnement mensuel - Annulable à tout moment',
        },
      },
    })

    // Enregistrer la tentative de paiement dans Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Si c'est un client existant, mettre à jour son statut
    if (clientInfo?.clientId) {
      await supabase
        .from('clients')
        .update({ 
          status: 'payment_pending',
          updated_at: new Date().toISOString()
        })
        .eq('id', clientInfo.clientId)
    }

    // Créer un enregistrement de paiement
    await supabase
      .from('payments')
      .insert([
        {
          stripe_session_id: session.id,
          client_email: clientEmail,
          plan_type: plan,
          amount: plan === 'pack-visibilite' ? 29700 : 1900,
          currency: 'EUR',
          status: 'pending',
          created_at: new Date().toISOString(),
        }
      ])

    console.log(`Session Stripe créée: ${session.id} pour ${clientEmail}`)

    return NextResponse.json({ 
      success: true, 
      sessionId: session.id,
      url: session.url 
    })

  } catch (error) {
    console.error('Erreur Stripe:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la session de paiement' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Méthode non autorisée' },
    { status: 405 }
  )
}
