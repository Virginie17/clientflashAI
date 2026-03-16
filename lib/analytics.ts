/**
 * Analytics et tracking des conversions
 * Google Analytics 4 + événements personnalisés
 */

interface ConversionEvent {
  event: string
  category: string
  action: string
  label?: string
  value?: number
  userId?: string
  timestamp: Date
  page: string
  userAgent?: string
}

class ConversionTracking {
  private events: ConversionEvent[] = []
  private isProduction = process.env.NODE_ENV === 'production'

  // Envoyer un événement à Google Analytics
  track(event: string, category: string, action: string, label?: string, value?: number) {
    const conversionEvent: ConversionEvent = {
      event,
      category,
      action,
      label,
      value,
      timestamp: new Date(),
      page: typeof window !== 'undefined' ? window.location.pathname : '',
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined
    }

    // Stocker localement pour le debugging
    this.events.push(conversionEvent)

    // Envoyer à Google Analytics si en production
    if (this.isProduction && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, {
        event_category: category,
        event_action: action,
        event_label: label,
        value: value,
        custom_parameter: {
          user_id: this.getUserId(),
          timestamp: conversionEvent.timestamp.toISOString()
        }
      })
    }

    // Log en développement
    if (!this.isProduction) {
      console.log('📊 Analytics Track:', {
        event,
        category,
        action,
        label,
        value,
        timestamp: conversionEvent.timestamp
      })
    }
  }

  // Événements de conversion spécifiques
  trackLeadFormSubmit(email: string, businessType: string) {
    this.track('lead_form_submit', 'lead_generation', 'form_submit', businessType, 1)
    this.track('potential_lead_value', 'revenue', 'potential_value', businessType, 297) // Valeur potentielle
  }

  trackPricingView(plan: string) {
    this.track('pricing_view', 'engagement', 'view_pricing', plan)
  }

  trackPaymentInitiated(plan: string, amount: number) {
    this.track('payment_initiated', 'conversion', 'checkout_start', plan, amount)
  }

  trackPaymentCompleted(plan: string, amount: number, transactionId: string) {
    this.track('payment_completed', 'revenue', 'purchase', plan, amount)
    this.track('revenue', 'revenue', 'purchase_completed', plan, amount)
    
    // Marquer comme conversion
    this.track('conversion', 'conversion', 'purchase', plan, amount)
  }

  trackPageView(page: string, title?: string) {
    if (this.isProduction && typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: title,
        page_location: page
      })
    }

    this.track('page_view', 'engagement', 'page_view', page)
  }

  trackCTAClick(ctaName: string, location: string) {
    this.track('cta_click', 'engagement', 'button_click', `${ctaName}_${location}`)
  }

  trackScrollDepth(depth: number) {
    this.track('scroll_engagement', 'engagement', 'scroll_depth', `${depth}%`)
  }

  trackTimeOnPage(duration: number) {
    this.track('engagement_time', 'engagement', 'time_on_page', undefined, duration)
  }

  trackError(error: string, context: string) {
    this.track('error', 'error', 'javascript_error', `${context}: ${error}`)
  }

  // Obtenir l'ID utilisateur (simplifié)
  private getUserId(): string | undefined {
    if (typeof window === 'undefined') return undefined
    
    // Essayer de récupérer depuis localStorage ou générer un nouvel ID
    let userId = localStorage.getItem('clientflash_user_id')
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9)
      localStorage.setItem('clientflash_user_id', userId)
    }
    return userId
  }

  // Obtenir les statistiques de conversion
  getConversionStats() {
    const now = new Date()
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    const dayEvents = this.events.filter(e => e.timestamp >= oneDayAgo)
    const weekEvents = this.events.filter(e => e.timestamp >= oneWeekAgo)

    return {
      lastDay: {
        totalEvents: dayEvents.length,
        leadForms: dayEvents.filter(e => e.event === 'lead_form_submit').length,
        paymentsInitiated: dayEvents.filter(e => e.event === 'payment_initiated').length,
        paymentsCompleted: dayEvents.filter(e => e.event === 'payment_completed').length,
        conversionRate: this.calculateConversionRate(dayEvents),
        totalValue: this.calculateTotalValue(dayEvents)
      },
      lastWeek: {
        totalEvents: weekEvents.length,
        leadForms: weekEvents.filter(e => e.event === 'lead_form_submit').length,
        paymentsInitiated: weekEvents.filter(e => e.event === 'payment_initiated').length,
        paymentsCompleted: weekEvents.filter(e => e.event === 'payment_completed').length,
        conversionRate: this.calculateConversionRate(weekEvents),
        totalValue: this.calculateTotalValue(weekEvents)
      }
    }
  }

  private calculateConversionRate(events: ConversionEvent[]): number {
    const leads = events.filter(e => e.event === 'lead_form_submit').length
    const conversions = events.filter(e => e.event === 'payment_completed').length
    
    if (leads === 0) return 0
    return Math.round((conversions / leads) * 100)
  }

  private calculateTotalValue(events: ConversionEvent[]): number {
    return events
      .filter(e => e.event === 'payment_completed')
      .reduce((sum, e) => sum + (e.value || 0), 0)
  }

  // Exporter les données pour analyse
  exportEvents(): ConversionEvent[] {
    return [...this.events]
  }

  // Vider les événements (pour le debugging)
  clearEvents() {
    this.events = []
  }
}

export const conversionTracking = new ConversionTracking()

// Hook React pour utiliser le tracking
export function useConversionTracking() {
  return {
    trackLeadFormSubmit: (email: string, businessType: string) => 
      conversionTracking.trackLeadFormSubmit(email, businessType),
    trackPricingView: (plan: string) => 
      conversionTracking.trackPricingView(plan),
    trackPaymentInitiated: (plan: string, amount: number) => 
      conversionTracking.trackPaymentInitiated(plan, amount),
    trackPaymentCompleted: (plan: string, amount: number, transactionId: string) => 
      conversionTracking.trackPaymentCompleted(plan, amount, transactionId),
    trackCTAClick: (ctaName: string, location: string) => 
      conversionTracking.trackCTAClick(ctaName, location),
    trackPageView: (page: string, title?: string) => 
      conversionTracking.trackPageView(page, title),
    getStats: () => conversionTracking.getConversionStats()
  }
}
