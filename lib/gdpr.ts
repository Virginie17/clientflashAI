/**
 * Conformité RGPD
 * Gestion des données personnelles et consentements
 */

interface ConsentRecord {
  id: string
  clientId: string
  type: 'data_processing' | 'marketing' | 'analytics' | 'cookies'
  granted: boolean
  timestamp: Date
  ipAddress: string
  userAgent: string
  documentVersion: string
}

interface DataProcessingRecord {
  id: string
  clientId: string
  dataType: 'personal' | 'sensitive' | 'financial'
  purpose: string
  legalBasis: 'consent' | 'contract' | 'legal_obligation' | 'legitimate_interest'
  retentionPeriod: number // en jours
  deletedAt?: Date
  createdAt: Date
  updatedAt: Date
}

class GDPRCompliance {
  private consents: ConsentRecord[] = []
  private dataRecords: DataProcessingRecord[] = []
  private privacyPolicyVersion = '1.0'
  private cookieConsentRequired = true

  // Enregistrer un consentement
  recordConsent(clientId: string, type: ConsentRecord['type'], granted: boolean, ipAddress: string, userAgent: string): ConsentRecord {
    const consent: ConsentRecord = {
      id: this.generateConsentId(),
      clientId,
      type,
      granted,
      timestamp: new Date(),
      ipAddress,
      userAgent,
      documentVersion: this.privacyPolicyVersion
    }

    this.consents.push(consent)
    this.updateDataProcessingRecord(clientId, type, granted)
    
    return consent
  }

  // Vérifier si le consentement est valide
  hasValidConsent(clientId: string, type: ConsentRecord['type']): boolean {
    const consent = this.getLatestConsent(clientId, type)
    if (!consent) return false

    // Vérifier si le consentement est encore valide (1 an)
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
    
    return consent.granted && consent.timestamp >= oneYearAgo
  }

  // Obtenir le dernier consentement
  private getLatestConsent(clientId: string, type: ConsentRecord['type']): ConsentRecord | undefined {
    return this.consents
      .filter(c => c.clientId === clientId && c.type === type)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0]
  }

  // Mettre à jour les enregistrements de traitement
  private updateDataProcessingRecord(clientId: string, consentType: ConsentRecord['type'], granted: boolean) {
    const existingRecord = this.dataRecords.find(r => r.clientId === clientId)
    
    if (!existingRecord) {
      const record: DataProcessingRecord = {
        id: this.generateRecordId(),
        clientId,
        dataType: this.getDataTypeForConsent(consentType),
        purpose: this.getPurposeForConsent(consentType),
        legalBasis: granted ? 'consent' : 'legitimate_interest',
        retentionPeriod: this.getRetentionPeriod(consentType),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      this.dataRecords.push(record)
    } else {
      existingRecord.updatedAt = new Date()
      existingRecord.legalBasis = granted ? 'consent' : 'legitimate_interest'
    }
  }

  // Droit à l'oubli - supprimer toutes les données d'un client
  rightToBeForgotten(clientId: string): {
    deleted: number
    records: string[]
  } {
    const deletedRecords: string[] = []
    let deletedCount = 0

    // Supprimer les consentements
    const consentsToDelete = this.consents.filter(c => c.clientId === clientId)
    consentsToDelete.forEach(consent => {
      const index = this.consents.indexOf(consent)
      if (index > -1) {
        this.consents.splice(index, 1)
        deletedRecords.push(`Consent: ${consent.type}`)
        deletedCount++
      }
    })

    // Marquer les données de traitement comme supprimées
    const dataRecords = this.dataRecords.filter(r => r.clientId === clientId)
    dataRecords.forEach(record => {
      record.deletedAt = new Date()
      deletedRecords.push(`Data Record: ${record.dataType}`)
      deletedCount++
    })

    return {
      deleted: deletedCount,
      records: deletedRecords
    }
  }

  // Droit d'accès - exporter les données d'un client
  exportUserData(clientId: string): {
    consents: ConsentRecord[]
    dataRecords: DataProcessingRecord[]
    exportDate: Date
  } {
    const userConsents = this.consents.filter(c => c.clientId === clientId)
    const userDataRecords = this.dataRecords.filter(r => r.clientId === clientId && !r.deletedAt)

    return {
      consents: userConsents,
      dataRecords: userDataRecords,
      exportDate: new Date()
    }
  }

  // Droit de rectification - mettre à jour les données
  rectifyData(clientId: string, corrections: Partial<DataProcessingRecord>): boolean {
    const record = this.dataRecords.find(r => r.clientId === clientId && !r.deletedAt)
    if (!record) return false

    Object.assign(record, corrections)
    record.updatedAt = new Date()
    
    return true
  }

  // Vérifier la conformité globale
  checkCompliance(): {
    score: number
    issues: string[]
    recommendations: string[]
    stats: {
      totalConsents: number
      validConsents: number
      expiredConsents: number
      dataRecords: number
      deletedRecords: number
    }
  } {
    const issues: string[] = []
    const recommendations: string[] = []

    const now = new Date()
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

    const totalConsents = this.consents.length
    const validConsents = this.consents.filter(c => c.granted && c.timestamp >= oneYearAgo).length
    const expiredConsents = this.consents.filter(c => c.timestamp < oneYearAgo).length
    const deletedRecordsCount = this.dataRecords.filter(r => r.deletedAt).length

    // Vérifier les consentements expirés
    if (expiredConsents > 0) {
      issues.push(`${expiredConsents} consentements expirés`)
      recommendations.push('Demander le renouvellement des consentements expirés')
    }

    // Vérifier les données non supprimées après la période de rétention
    const overdueRecords = this.dataRecords.filter(r => 
      !r.deletedAt && 
      r.createdAt.getTime() + (r.retentionPeriod * 24 * 60 * 60 * 1000) < now.getTime()
    )

    if (overdueRecords.length > 0) {
      issues.push(`${overdueRecords.length} enregistrements devraient être supprimés`)
      recommendations.push('Supprimer les données dépassant la période de rétention')
    }

    // Calculer le score de conformité
    const maxScore = 100
    let score = maxScore

    if (totalConsents > 0) {
      score -= (expiredConsents / totalConsents) * 20 // -20 points max pour consentements expirés
    }
    
    if (this.dataRecords.length > 0) {
      const dataRecordsLength = this.dataRecords.length
      const deletedRecordsLength = deletedRecordsCount
      score -= (overdueRecords.length / dataRecordsLength) * 30 // -30 points max pour données non supprimées
      score -= (deletedRecordsLength / dataRecordsLength) * 10 // -10 points max si trop de données supprimées
    }

    score = Math.max(0, Math.round(score))

    return {
      score,
      issues,
      recommendations,
      stats: {
        totalConsents,
        validConsents,
        expiredConsents,
        dataRecords: this.dataRecords.filter(r => !r.deletedAt).length,
        deletedRecords: deletedRecordsCount
      }
    }
  }

  // Générer une politique de confidentialité
  generatePrivacyPolicy(): {
    version: string
    lastUpdated: Date
    sections: {
      dataCollection: string
      dataUsage: string
      dataRetention: string
      userRights: string
      cookies: string
      contact: string
    }
  } {
    return {
      version: this.privacyPolicyVersion,
      lastUpdated: new Date(),
      sections: {
        dataCollection: 'Nous collectons les informations personnelles nécessaires pour fournir nos services : nom, email, type d\'activité, ville, et informations de paiement.',
        dataUsage: 'Vos données sont utilisées pour créer votre page web professionnelle, générer du contenu marketing, et traiter vos paiements. Nous ne partageons jamais vos données avec des tiers sans votre consentement.',
        dataRetention: 'Vos données sont conservées pendant 2 ans après la fin de notre relation contractuelle, sauf si la loi exige une période plus longue.',
        userRights: 'Vous avez le droit d\'accéder, rectifier, supprimer, et porter vos données personnelles. Contactez-nous pour exercer ces droits.',
        cookies: 'Nous utilisons des cookies essentiels pour le fonctionnement du site et des cookies analytiques avec votre consentement.',
        contact: 'Pour toute question concernant vos données personnelles, contactez-nous à privacy@clientflash.ai ou par téléphone au 06 12 34 56 78.'
      }
    }
  }

  // Méthodes privées
  private generateConsentId(): string {
    return 'CONSENT-' + Date.now() + '-' + Math.random().toString(36).substr(2, 8)
  }

  private generateRecordId(): string {
    return 'DATA-' + Date.now() + '-' + Math.random().toString(36).substr(2, 8)
  }

  private getDataTypeForConsent(consentType: ConsentRecord['type']): DataProcessingRecord['dataType'] {
    const mapping: Record<ConsentRecord['type'], DataProcessingRecord['dataType']> = {
      data_processing: 'personal',
      marketing: 'personal',
      analytics: 'personal',
      cookies: 'personal'
    }
    return mapping[consentType] || 'personal'
  }

  private getPurposeForConsent(consentType: ConsentRecord['type']): string {
    const mapping: Record<ConsentRecord['type'], string> = {
      data_processing: 'Fourniture des services ClientFlash AI',
      marketing: 'Communication marketing et promotionnelle',
      analytics: 'Analyse des performances et amélioration des services',
      cookies: 'Fonctionnement du site web et expérience utilisateur'
    }
    return mapping[consentType] || 'Traitement des données'
  }

  private getRetentionPeriod(consentType: ConsentRecord['type']): number {
    const mapping: Record<ConsentRecord['type'], number> = {
      data_processing: 730, // 2 ans
      marketing: 365, // 1 an
      analytics: 180, // 6 mois
      cookies: 90 // 3 mois
    }
    return mapping[consentType] || 730
  }
}

export const gdprCompliance = new GDPRCompliance()

// Templates de consentement
export const consentTemplates = {
  cookie: {
    title: 'Nous utilisons des cookies',
    description: 'Nous utilisons des cookies essentiels pour le fonctionnement du site et des cookies analytiques pour améliorer votre expérience.',
    required: ['essential'],
    optional: ['analytics', 'marketing'],
    privacyPolicy: '/privacy'
  },
  dataProcessing: {
    title: 'Traitement de vos données',
    description: 'Nous traitons vos données personnelles pour vous fournir nos services de création de pages web et de marketing digital.',
    purposes: [
      'Création de votre page web professionnelle',
      'Génération de contenus marketing',
      'Traitement des paiements',
      'Support client'
    ],
    retention: '2 ans après la fin du contrat'
  }
}

// Fonctions utilitaires pour le frontend
export function getCookieConsent(): boolean | null {
  if (typeof window === 'undefined') return null
  
  const consent = localStorage.getItem('cookie_consent')
  return consent === 'true'
}

export function setCookieConsent(granted: boolean): void {
  if (typeof window === 'undefined') return
  
  localStorage.setItem('cookie_consent', granted.toString())
  localStorage.setItem('cookie_consent_timestamp', new Date().toISOString())
  
  // Notifier le système de conformité
  gdprCompliance.recordConsent(
    'web_user',
    'cookies',
    granted,
    'unknown', // IP address would be captured server-side
    navigator.userAgent
  )
}
