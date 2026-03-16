/**
 * Contrôle qualité des livrables
 * Validation templates vs sur-mesure
 */

interface QualityChecklist {
  design: {
    visualIdentity: boolean
    responsive: boolean
    accessibility: boolean
    performance: boolean
  }
  content: {
    grammar: boolean
    seo: boolean
    tone: boolean
    completeness: boolean
  }
  technical: {
    functionality: boolean
    security: boolean
    compatibility: boolean
    deployment: boolean
  }
  client: {
    requirementsMet: boolean
    feedbackIncorporated: boolean
    timelineMet: boolean
    satisfaction: boolean
  }
}

interface Deliverable {
  id: string
  clientId: string
  type: 'landing_page' | 'content' | 'social_posts' | 'full_package'
  templateId?: string
  customizations: string[]
  qualityScore: number
  checklist: QualityChecklist
  status: 'in_progress' | 'review' | 'approved' | 'delivered'
  createdAt: Date
  updatedAt: Date
  reviewerId?: string
  clientFeedback?: string
}

class QualityControl {
  private deliverables: Deliverable[] = []
  private templates = new Map()
  private qualityThreshold = 85 // Score minimum de qualité

  // Enregistrer un nouveau livrable
  createDeliverable(clientId: string, type: Deliverable['type'], templateId?: string): Deliverable {
    const deliverable: Deliverable = {
      id: this.generateDeliverableId(),
      clientId,
      type,
      templateId,
      customizations: [],
      qualityScore: 0,
      checklist: this.initializeChecklist(),
      status: 'in_progress',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    this.deliverables.push(deliverable)
    return deliverable
  }

  // Ajouter une personnalisation
  addCustomization(deliverableId: string, customization: string): boolean {
    const deliverable = this.findDeliverable(deliverableId)
    if (!deliverable) return false

    deliverable.customizations.push(customization)
    deliverable.updatedAt = new Date()
    
    // Recalculer le score de qualité
    this.calculateQualityScore(deliverable)
    
    return true
  }

  // Effectuer le contrôle qualité
  performQualityCheck(deliverableId: string): {
    score: number
    checklist: QualityChecklist
    issues: string[]
    recommendations: string[]
    approved: boolean
  } {
    const deliverable = this.findDeliverable(deliverableId)
    if (!deliverable) {
      throw new Error('Deliverable not found')
    }

    const issues: string[] = []
    const recommendations: string[] = []

    // Vérification du design
    this.checkDesign(deliverable, issues, recommendations)
    
    // Vérification du contenu
    this.checkContent(deliverable, issues, recommendations)
    
    // Vérification technique
    this.checkTechnical(deliverable, issues, recommendations)
    
    // Vérification client
    this.checkClientRequirements(deliverable, issues, recommendations)

    // Calculer le score final
    this.calculateQualityScore(deliverable)
    
    const approved = deliverable.qualityScore >= this.qualityThreshold

    return {
      score: deliverable.qualityScore,
      checklist: deliverable.checklist,
      issues,
      recommendations,
      approved
    }
  }

  // Approuver un livrable
  approveDeliverable(deliverableId: string, reviewerId: string): boolean {
    const deliverable = this.findDeliverable(deliverableId)
    if (!deliverable) return false

    const qualityCheck = this.performQualityCheck(deliverableId)
    
    if (!qualityCheck.approved) {
      throw new Error(`Deliverable quality score (${qualityCheck.score}) below threshold (${this.qualityThreshold})`)
    }

    deliverable.status = 'approved'
    deliverable.reviewerId = reviewerId
    deliverable.updatedAt = new Date()

    return true
  }

  // Marquer comme livré
  markAsDelivered(deliverableId: string, clientFeedback?: string): boolean {
    const deliverable = this.findDeliverable(deliverableId)
    if (!deliverable || deliverable.status !== 'approved') return false

    deliverable.status = 'delivered'
    deliverable.clientFeedback = clientFeedback
    deliverable.updatedAt = new Date()

    return true
  }

  // Obtenir les statistiques de qualité
  getQualityStats() {
    const now = new Date()
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const recentDeliverables = this.deliverables.filter(d => d.createdAt >= oneMonthAgo)

    const byType = recentDeliverables.reduce((acc, d) => {
      if (!acc[d.type]) acc[d.type] = { total: 0, approved: 0, avgScore: 0 }
      acc[d.type].total++
      if (d.status === 'delivered') acc[d.type].approved++
      acc[d.type].avgScore += d.qualityScore
      return acc
    }, {} as Record<string, { total: number, approved: number, avgScore: number }>)

    // Calculer les moyennes
    Object.keys(byType).forEach(type => {
      const stats = byType[type]
      stats.avgScore = stats.avgScore / stats.total
    })

    const templateVsCustom = recentDeliverables.reduce((acc, d) => {
      if (d.templateId) {
        acc.template.count++
        acc.template.avgScore += d.qualityScore
      } else {
        acc.custom.count++
        acc.custom.avgScore += d.qualityScore
      }
      return acc
    }, { template: { count: 0, avgScore: 0 }, custom: { count: 0, avgScore: 0 } })

    // Calculer les moyennes
    if (templateVsCustom.template.count > 0) {
      templateVsCustom.template.avgScore /= templateVsCustom.template.count
    }
    if (templateVsCustom.custom.count > 0) {
      templateVsCustom.custom.avgScore /= templateVsCustom.custom.count
    }

    return {
      total: recentDeliverables.length,
      approved: recentDeliverables.filter(d => d.status === 'delivered').length,
      avgQualityScore: recentDeliverables.reduce((sum, d) => sum + d.qualityScore, 0) / recentDeliverables.length,
      byType,
      templateVsCustom,
      qualityThreshold: this.qualityThreshold
    }
  }

  // Méthodes privées
  private findDeliverable(deliverableId: string): Deliverable | undefined {
    return this.deliverables.find(d => d.id === deliverableId)
  }

  private initializeChecklist(): QualityChecklist {
    return {
      design: {
        visualIdentity: false,
        responsive: false,
        accessibility: false,
        performance: false
      },
      content: {
        grammar: false,
        seo: false,
        tone: false,
        completeness: false
      },
      technical: {
        functionality: false,
        security: false,
        compatibility: false,
        deployment: false
      },
      client: {
        requirementsMet: false,
        feedbackIncorporated: false,
        timelineMet: false,
        satisfaction: false
      }
    }
  }

  private checkDesign(deliverable: Deliverable, issues: string[], recommendations: string[]) {
    const checklist = deliverable.checklist.design
    
    // Vérifier l'identité visuelle
    if (deliverable.customizations.length === 0 && !deliverable.templateId) {
      issues.push('Pas d\'identité visuelle définie')
      recommendations.push('Ajouter les couleurs et logo du client')
    } else {
      checklist.visualIdentity = true
    }

    // Vérifier le responsive
    // Simuler une vérification (remplacer par vraie vérification)
    checklist.responsive = Math.random() > 0.2 // 80% de chance d'être responsive
    if (!checklist.responsive) {
      issues.push('Le design n\'est pas responsive')
      recommendations.push('Optimiser pour mobile et tablette')
    }

    // Vérifier l'accessibilité
    checklist.accessibility = Math.random() > 0.3 // 70% de chance d'être accessible
    if (!checklist.accessibility) {
      issues.push('Problèmes d\'accessibilité détectés')
      recommendations.push('Ajouter les attributs ALT et améliorer le contraste')
    }

    // Vérifier la performance
    checklist.performance = Math.random() > 0.15 // 85% de chance d'être performant
    if (!checklist.performance) {
      issues.push('Performance insuffisante')
      recommendations.push('Optimiser les images et minifier le CSS')
    }
  }

  private checkContent(deliverable: Deliverable, issues: string[], recommendations: string[]) {
    const checklist = deliverable.checklist.content
    
    // Vérifier la grammaire
    checklist.grammar = Math.random() > 0.1 // 90% de chance d'être correct
    if (!checklist.grammar) {
      issues.push('Erreurs de grammaire détectées')
      recommendations.push('Relire et corriger le contenu')
    }

    // Vérifier le SEO
    checklist.seo = Math.random() > 0.25 // 75% de chance d'être optimisé SEO
    if (!checklist.seo) {
      issues.push('SEO non optimisé')
      recommendations.push('Ajouter les méta-données et balises titres')
    }

    // Vérifier le ton
    checklist.tone = Math.random() > 0.2 // 80% de chance d'avoir le bon ton
    if (!checklist.tone) {
      issues.push('Ton inapproprié')
      recommendations.push('Adapter le ton à la cible du client')
    }

    // Vérifier la complétude
    checklist.completeness = Math.random() > 0.15 // 85% de chance d'être complet
    if (!checklist.completeness) {
      issues.push('Contenu incomplet')
      recommendations.push('Ajouter les sections manquantes')
    }
  }

  private checkTechnical(deliverable: Deliverable, issues: string[], recommendations: string[]) {
    const checklist = deliverable.checklist.technical
    
    // Vérifier la fonctionnalité
    checklist.functionality = Math.random() > 0.05 // 95% de chance de fonctionner
    if (!checklist.functionality) {
      issues.push('Fonctionnalités défectueuses')
      recommendations.push('Tester et corriger les bugs')
    }

    // Vérifier la sécurité
    checklist.security = Math.random() > 0.1 // 90% de chance d'être sécurisé
    if (!checklist.security) {
      issues.push('Problèmes de sécurité')
      recommendations.push('Valider les entrées et sécuriser les données')
    }

    // Vérifier la compatibilité
    checklist.compatibility = Math.random() > 0.2 // 80% de chance d'être compatible
    if (!checklist.compatibility) {
      issues.push('Problèmes de compatibilité navigateur')
      recommendations.push('Tester sur différents navigateurs')
    }

    // Vérifier le déploiement
    checklist.deployment = Math.random() > 0.1 // 90% de chance d'être déployable
    if (!checklist.deployment) {
      issues.push('Problèmes de déploiement')
      recommendations.push('Optimiser pour la production')
    }
  }

  private checkClientRequirements(deliverable: Deliverable, issues: string[], recommendations: string[]) {
    const checklist = deliverable.checklist.client
    
    // Vérifier les exigences client
    checklist.requirementsMet = Math.random() > 0.15 // 85% de chance de respecter les exigences
    if (!checklist.requirementsMet) {
      issues.push('Exigences client non respectées')
      recommendations.push('Revoir les exigences et ajuster le livrable')
    }

    // Vérifier le feedback client
    checklist.feedbackIncorporated = Math.random() > 0.2 // 80% de chance d'avoir incorporé le feedback
    if (!checklist.feedbackIncorporated) {
      issues.push('Feedback client non incorporé')
      recommendations.push('Intégrer les retours du client')
    }

    // Vérifier le délai
    checklist.timelineMet = Math.random() > 0.1 // 90% de chance de respecter le délai
    if (!checklist.timelineMet) {
      issues.push('Délai non respecté')
      recommendations.push('Optimiser le processus de production')
    }

    // Vérifier la satisfaction
    checklist.satisfaction = Math.random() > 0.25 // 75% de chance de satisfaire le client
    if (!checklist.satisfaction) {
      issues.push('Client non satisfait')
      recommendations.push('Proposer des améliorations')
    }
  }

  private calculateQualityScore(deliverable: Deliverable) {
    const checklist = deliverable.checklist
    let score = 0
    let totalChecks = 0

    // Calculer le score par catégorie
    Object.values(checklist).forEach(category => {
      Object.values(category).forEach(check => {
        if (check) score += 25
        totalChecks += 25
      })
    })

    // Bonus pour les personnalisations
    const customizationBonus = Math.min(deliverable.customizations.length * 5, 25)
    score += customizationBonus
    totalChecks += 25

    deliverable.qualityScore = Math.round((score / totalChecks) * 100)
  }

  private generateDeliverableId(): string {
    return 'DEL-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase()
  }
}

export const qualityControl = new QualityControl()

// Standards de qualité par type de livrable
export const qualityStandards = {
  landing_page: {
    minScore: 85,
    requiredChecks: ['visualIdentity', 'responsive', 'seo', 'functionality'],
    maxCustomizations: 10
  },
  content: {
    minScore: 90,
    requiredChecks: ['grammar', 'tone', 'completeness', 'seo'],
    maxCustomizations: 5
  },
  social_posts: {
    minScore: 80,
    requiredChecks: ['grammar', 'tone', 'completeness'],
    maxCustomizations: 3
  },
  full_package: {
    minScore: 85,
    requiredChecks: ['visualIdentity', 'responsive', 'seo', 'functionality', 'grammar'],
    maxCustomizations: 15
  }
}
