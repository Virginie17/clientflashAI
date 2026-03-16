/**
 * Système de support client et SLA
 * Gestion des tickets, notifications et temps de réponse
 */

interface SupportTicket {
  id: string
  clientId: string
  subject: string
  message: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category: 'technical' | 'billing' | 'delivery' | 'general'
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  createdAt: Date
  updatedAt: Date
  assignedTo?: string
  responseTime?: number
  resolutionTime?: number
  satisfaction?: number
}

interface SLAConfig {
  responseTime: {
    low: number    // 24h en minutes
    medium: number // 8h en minutes  
    high: number   // 2h en minutes
    urgent: number // 30min en minutes
  }
  resolutionTime: {
    low: number    // 72h en minutes
    medium: number // 24h en minutes
    high: number   // 8h en minutes
    urgent: number // 2h en minutes
  }
}

class SupportSystem {
  private tickets: SupportTicket[] = []
  private slaConfig: SLAConfig = {
    responseTime: {
      low: 24 * 60,      // 24h
      medium: 8 * 60,    // 8h
      high: 2 * 60,      // 2h
      urgent: 30         // 30min
    },
    resolutionTime: {
      low: 72 * 60,      // 72h
      medium: 24 * 60,   // 24h
      high: 8 * 60,      // 8h
      urgent: 2 * 60     // 2h
    }
  }

  // Créer un nouveau ticket
  createTicket(clientId: string, subject: string, message: string, priority: SupportTicket['priority'], category: SupportTicket['category']): SupportTicket {
    const ticket: SupportTicket = {
      id: this.generateTicketId(),
      clientId,
      subject,
      message,
      priority,
      category,
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    this.tickets.push(ticket)
    this.notifyNewTicket(ticket)
    
    return ticket
  }

  // Assigner un ticket à un membre de l'équipe
  assignTicket(ticketId: string, assignedTo: string): boolean {
    const ticket = this.findTicket(ticketId)
    if (!ticket) return false

    ticket.assignedTo = assignedTo
    ticket.status = 'in_progress'
    ticket.updatedAt = new Date()

    this.notifyAssignment(ticket)
    return true
  }

  // Répondre à un ticket
  respondToTicket(ticketId: string, response: string): boolean {
    const ticket = this.findTicket(ticketId)
    if (!ticket) return false

    // Calculer le temps de réponse
    if (!ticket.responseTime) {
      ticket.responseTime = this.calculateResponseTime(ticket.createdAt)
    }

    ticket.updatedAt = new Date()
    this.notifyResponse(ticket, response)
    
    return true
  }

  // Résoudre un ticket
  resolveTicket(ticketId: string, resolution: string, satisfaction?: number): boolean {
    const ticket = this.findTicket(ticketId)
    if (!ticket) return false

    ticket.status = 'resolved'
    ticket.updatedAt = new Date()
    ticket.resolutionTime = this.calculateResolutionTime(ticket.createdAt)
    if (satisfaction) ticket.satisfaction = satisfaction

    this.notifyResolution(ticket, resolution)
    return true
  }

  // Vérifier les SLA
  checkSLACompliance(): {
    compliant: SupportTicket[]
    breached: SupportTicket[]
    metrics: {
      totalTickets: number
      complianceRate: number
      avgResponseTime: number
      avgResolutionTime: number
      satisfactionRate: number
    }
  } {
    const now = new Date()
    const compliant: SupportTicket[] = []
    const breached: SupportTicket[] = []

    for (const ticket of this.tickets) {
      const responseSLA = this.slaConfig.responseTime[ticket.priority]
      const resolutionSLA = this.slaConfig.resolutionTime[ticket.priority]

      // Vérifier le temps de réponse
      if (!ticket.responseTime) {
        const timeSinceCreation = (now.getTime() - ticket.createdAt.getTime()) / (1000 * 60)
        if (timeSinceCreation > responseSLA) {
          breached.push(ticket)
        } else {
          compliant.push(ticket)
        }
        continue
      }

      // Vérifier si le SLA est respecté
      const responseBreached = ticket.responseTime > responseSLA
      const resolutionBreached = ticket.resolutionTime && ticket.resolutionTime > resolutionSLA

      if (responseBreached || resolutionBreached) {
        breached.push(ticket)
      } else {
        compliant.push(ticket)
      }
    }

    // Calculer les métriques
    const totalTickets = this.tickets.length
    const complianceRate = totalTickets > 0 ? (compliant.length / totalTickets) * 100 : 0
    
    const responseTimes = this.tickets.filter(t => t.responseTime).map(t => t.responseTime!)
    const avgResponseTime = responseTimes.length > 0 
      ? responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length 
      : 0

    const resolutionTimes = this.tickets.filter(t => t.resolutionTime).map(t => t.resolutionTime!)
    const avgResolutionTime = resolutionTimes.length > 0 
      ? resolutionTimes.reduce((sum, time) => sum + time, 0) / resolutionTimes.length 
      : 0

    const satisfactionScores = this.tickets.filter(t => t.satisfaction).map(t => t.satisfaction!)
    const satisfactionRate = satisfactionScores.length > 0 
      ? satisfactionScores.reduce((sum, score) => sum + score, 0) / satisfactionScores.length 
      : 0

    return {
      compliant,
      breached,
      metrics: {
        totalTickets,
        complianceRate: Math.round(complianceRate * 100) / 100,
        avgResponseTime: Math.round(avgResponseTime),
        avgResolutionTime: Math.round(avgResolutionTime),
        satisfactionRate: Math.round(satisfactionRate * 100) / 100
      }
    }
  }

  // Obtenir les statistiques de support
  getSupportStats() {
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    const weekTickets = this.tickets.filter(t => t.createdAt >= oneWeekAgo)
    const monthTickets = this.tickets.filter(t => t.createdAt >= oneMonthAgo)

    return {
      week: {
        total: weekTickets.length,
        byPriority: this.groupByPriority(weekTickets),
        byCategory: this.groupByCategory(weekTickets),
        byStatus: this.groupByStatus(weekTickets)
      },
      month: {
        total: monthTickets.length,
        byPriority: this.groupByPriority(monthTickets),
        byCategory: this.groupByCategory(monthTickets),
        byStatus: this.groupByStatus(monthTickets)
      },
      sla: this.checkSLACompliance()
    }
  }

  // Méthodes privées
  private findTicket(ticketId: string): SupportTicket | undefined {
    return this.tickets.find(t => t.id === ticketId)
  }

  private generateTicketId(): string {
    return 'TKT-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase()
  }

  private calculateResponseTime(createdAt: Date): number {
    return Math.floor((new Date().getTime() - createdAt.getTime()) / (1000 * 60))
  }

  private calculateResolutionTime(createdAt: Date): number {
    return Math.floor((new Date().getTime() - createdAt.getTime()) / (1000 * 60))
  }

  private groupByPriority(tickets: SupportTicket[]): Record<string, number> {
    return tickets.reduce((acc, ticket) => {
      acc[ticket.priority] = (acc[ticket.priority] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }

  private groupByCategory(tickets: SupportTicket[]): Record<string, number> {
    return tickets.reduce((acc, ticket) => {
      acc[ticket.category] = (acc[ticket.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }

  private groupByStatus(tickets: SupportTicket[]): Record<string, number> {
    return tickets.reduce((acc, ticket) => {
      acc[ticket.status] = (acc[ticket.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }

  // Notifications (à implémenter avec email/Slack)
  private notifyNewTicket(ticket: SupportTicket) {
    console.log('🎫 Nouveau ticket créé:', ticket.id, '-', ticket.subject)
    // TODO: Envoyer email/Slack
  }

  private notifyAssignment(ticket: SupportTicket) {
    console.log('👤 Ticket assigné:', ticket.id, 'à', ticket.assignedTo)
    // TODO: Notifier l'assigné
  }

  private notifyResponse(ticket: SupportTicket, response: string) {
    console.log('💬 Réponse envoyée pour le ticket:', ticket.id)
    // TODO: Notifier le client
  }

  private notifyResolution(ticket: SupportTicket, resolution: string) {
    console.log('✅ Ticket résolu:', ticket.id)
    // TODO: Notifier le client et demander satisfaction
  }
}

export const supportSystem = new SupportSystem()

// Templates de réponses automatiques
export const responseTemplates = {
  welcome: {
    technical: "Bonjour ! Nous avons bien reçu votre demande technique. Notre équipe l'examinera dans les plus brefs délais.",
    billing: "Bonjour ! Votre question concernant la facturation a bien été reçue. Nous y répondrons rapidement.",
    delivery: "Bonjour ! Nous avons bien reçu votre demande concernant la livraison. Votre projet est notre priorité.",
    general: "Bonjour ! Merci pour votre message. Nous reviendrons vers vous très rapidement."
  },
  escalation: {
    technical: "Votre problème technique nécessite une attention particulière. Notre équipe spécialisée vous contactera sous peu.",
    billing: "Votre question de facturation a été transmise à notre service comptable pour traitement prioritaire.",
    delivery: "Nous accordons une attention particulière à votre projet. Un responsable vous contactera personnellement."
  }
}
