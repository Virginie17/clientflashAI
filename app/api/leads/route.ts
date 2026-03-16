import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Rate limiting simple en mémoire
const rateLimitMap = new Map()
const RATE_LIMIT = 5 // 5 requêtes par IP
const RATE_WINDOW = 60 * 1000 // 1 minute en millisecondes

function getRateLimitKey(ip: string): string {
  return `leads:${ip}`
}

function checkRateLimit(ip: string): boolean {
  const key = getRateLimitKey(ip)
  const now = Date.now()
  const requests = rateLimitMap.get(key) || []
  
  // Nettoyer les anciennes requêtes
  const validRequests = requests.filter((timestamp: number) => now - timestamp < RATE_WINDOW)
  
  if (validRequests.length >= RATE_LIMIT) {
    return false
  }
  
  validRequests.push(now)
  rateLimitMap.set(key, validRequests)
  
  // Nettoyer périodiquement la carte
  if (rateLimitMap.size > 1000) {
    rateLimitMap.clear()
  }
  
  return true
}

function getClientIP(request: NextRequest): string {
  // Essayer différentes sources d'IP
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const ip = forwarded?.split(',')[0] || realIP || 'unknown'
  return ip
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIP(request)
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Trop de requêtes. Veuillez réessayer plus tard.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, business_type, city, instagram_or_website, phone } = body

    // Validation des champs
    if (!name || !email || !business_type) {
      return NextResponse.json(
        { error: 'Les champs nom, email et type d\'activité sont requis' },
        { status: 400 }
      )
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      )
    }

    // Validation nom (min 2 caractères)
    if (name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Le nom doit contenir au moins 2 caractères' },
        { status: 400 }
      )
    }

    // Créer le client Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Insérer le client (nouveau modèle business)
    const { data, error } = await supabase
      .from('clients')
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          business_type,
          city: city?.trim() || null,
          instagram_or_website: instagram_or_website?.trim() || null,
          phone: phone?.trim() || null,
          status: 'prospect', // Statut initial
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      console.error('Erreur Supabase:', error)
      
      // Si l'email existe déjà, retourner une erreur spécifique
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Cet email est déjà enregistré' },
          { status: 409 }
        )
      }
      
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement' },
        { status: 500 }
      )
    }

    // Aussi insérer dans la table leads pour compatibilité
    await supabase
      .from('leads')
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          business_type,
          city: city?.trim() || null,
          instagram_or_website: instagram_or_website?.trim() || null,
          created_at: new Date().toISOString()
        }
      ])

    console.log('Nouveau client enregistré:', data[0])

    return NextResponse.json({ 
      success: true, 
      message: 'Client enregistré avec succès',
      data: data[0] 
    })

  } catch (error) {
    console.error('Erreur API:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  )
}
