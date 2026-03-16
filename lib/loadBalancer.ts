/**
 * Gestion des pics de demande et load balancing
 * Rate limiting avancé et mise en cache
 */

interface RequestQueue {
  id: string
  endpoint: string
  method: string
  data: any
  priority: 'low' | 'medium' | 'high' | 'critical'
  timestamp: Date
  retryCount: number
  maxRetries: number
}

interface LoadMetrics {
  currentLoad: number
  maxCapacity: number
  queueLength: number
  avgResponseTime: number
  errorRate: number
  timestamp: Date
}

class LoadBalancer {
  private requestQueue: RequestQueue[] = []
  private maxConcurrentRequests = 10
  private currentRequests = 0
  private metrics: LoadMetrics[] = []
  private cache = new Map()
  private rateLimits = new Map()

  // Configurer les limites par endpoint
  configureRateLimit(endpoint: string, requestsPerMinute: number) {
    this.rateLimits.set(endpoint, {
      count: 0,
      windowStart: Date.now(),
      maxRequests: requestsPerMinute,
      windowSize: 60 * 1000 // 1 minute
    })
  }

  // Traiter une requête avec load balancing
  async processRequest(endpoint: string, method: string, data: any, priority: RequestQueue['priority'] = 'medium'): Promise<any> {
    // Vérifier le rate limiting
    if (!this.checkRateLimit(endpoint)) {
      throw new Error('Rate limit exceeded')
    }

    // Vérifier le cache
    const cacheKey = this.getCacheKey(endpoint, method, data)
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    // Ajouter à la file si charge maximale atteinte
    if (this.currentRequests >= this.maxConcurrentRequests) {
      return this.queueRequest(endpoint, method, data, priority)
    }

    // Traiter directement
    return this.executeRequest(endpoint, method, data)
  }

  // Ajouter une requête à la file d'attente
  private async queueRequest(endpoint: string, method: string, data: any, priority: RequestQueue['priority']): Promise<any> {
    return new Promise((resolve, reject) => {
      const request: RequestQueue = {
        id: this.generateRequestId(),
        endpoint,
        method,
        data,
        priority,
        timestamp: new Date(),
        retryCount: 0,
        maxRetries: 3
      }

      // Insérer selon la priorité
      this.insertByPriority(request)

      // Traiter la file
      this.processQueue()
        .then(resolve)
        .catch(reject)
    })
  }

  // Traiter la file d'attente
  private async processQueue(): Promise<void> {
    while (this.requestQueue.length > 0 && this.currentRequests < this.maxConcurrentRequests) {
      const request = this.requestQueue.shift()!
      this.currentRequests++

      this.executeRequest(request.endpoint, request.method, request.data)
        .then(result => {
          this.currentRequests--
          this.updateMetrics('success')
          this.processQueue() // Continuer à traiter la file
        })
        .catch(error => {
          this.currentRequests--
          this.updateMetrics('error')
          
          // Retry logic
          if (request.retryCount < request.maxRetries) {
            request.retryCount++
            request.timestamp = new Date()
            this.insertByPriority(request)
          } else {
            console.error('Request failed after max retries:', request.id, error)
          }
          
          this.processQueue()
        })
    }
  }

  // Exécuter une requête
  private async executeRequest(endpoint: string, method: string, data: any): Promise<any> {
    const startTime = Date.now()
    
    try {
      // Simuler l'exécution (remplacer par vrai appel API)
      const result = await this.simulateApiCall(endpoint, method, data)
      
      // Mettre en cache
      const cacheKey = this.getCacheKey(endpoint, method, data)
      this.cache.set(cacheKey, result)
      
      // Nettoyer le cache après 5 minutes
      setTimeout(() => {
        this.cache.delete(cacheKey)
      }, 5 * 60 * 1000)
      
      const responseTime = Date.now() - startTime
      this.updateResponseTime(responseTime)
      
      return result
    } catch (error) {
      throw error
    }
  }

  // Simuler un appel API (remplacer par vrai appel)
  private async simulateApiCall(endpoint: string, method: string, data: any): Promise<any> {
    // Simuler un délai de traitement
    const delay = Math.random() * 1000 + 500 // 500-1500ms
    await new Promise(resolve => setTimeout(resolve, delay))
    
    // Simuler une erreur occasionnelle (5% de chance)
    if (Math.random() < 0.05) {
      throw new Error('Simulated API error')
    }
    
    return {
      success: true,
      data: `Processed ${method} ${endpoint}`,
      timestamp: new Date().toISOString()
    }
  }

  // Vérifier le rate limiting
  private checkRateLimit(endpoint: string): boolean {
    const limit = this.rateLimits.get(endpoint)
    if (!limit) return true

    const now = Date.now()
    
    // Réinitialiser la fenêtre si nécessaire
    if (now - limit.windowStart > limit.windowSize) {
      limit.count = 0
      limit.windowStart = now
    }

    if (limit.count >= limit.maxRequests) {
      return false
    }

    limit.count++
    return true
  }

  // Insérer une requête selon la priorité
  private insertByPriority(request: RequestQueue) {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
    const requestPriority = priorityOrder[request.priority]

    let insertIndex = this.requestQueue.length
    for (let i = 0; i < this.requestQueue.length; i++) {
      const existingPriority = priorityOrder[this.requestQueue[i].priority]
      if (requestPriority < existingPriority) {
        insertIndex = i
        break
      }
    }

    this.requestQueue.splice(insertIndex, 0, request)
  }

  // Mettre à jour les métriques
  private updateMetrics(status: 'success' | 'error') {
    const now = new Date()
    const recentMetrics = this.metrics.filter(m => 
      (now.getTime() - m.timestamp.getTime()) < 5 * 60 * 1000 // 5 minutes
    )

    const errorCount = recentMetrics.filter(m => m.errorRate > 0).length
    const newErrorRate = status === 'error' 
      ? (errorCount + 1) / (recentMetrics.length + 1) * 100
      : (errorCount) / Math.max(1, recentMetrics.length) * 100

    this.metrics.push({
      currentLoad: this.currentRequests,
      maxCapacity: this.maxConcurrentRequests,
      queueLength: this.requestQueue.length,
      avgResponseTime: this.getAvgResponseTime(),
      errorRate: newErrorRate,
      timestamp: now
    })

    // Garder seulement les métriques récentes
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100)
    }
  }

  private updateResponseTime(responseTime: number) {
    // Mettre à jour le temps de réponse moyen
    const recentMetrics = this.metrics.slice(-10)
    if (recentMetrics.length > 0) {
      const avgTime = recentMetrics.reduce((sum, m) => sum + m.avgResponseTime, 0) / recentMetrics.length
      const newAvgTime = (avgTime * recentMetrics.length + responseTime) / (recentMetrics.length + 1)
      
      if (this.metrics.length > 0) {
        this.metrics[this.metrics.length - 1].avgResponseTime = newAvgTime
      }
    }
  }

  private getAvgResponseTime(): number {
    if (this.metrics.length === 0) return 0
    return this.metrics.reduce((sum, m) => sum + m.avgResponseTime, 0) / this.metrics.length
  }

  private getCacheKey(endpoint: string, method: string, data: any): string {
    return `${method}:${endpoint}:${JSON.stringify(data)}`
  }

  private generateRequestId(): string {
    return 'REQ-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5)
  }

  // Obtenir les statistiques de charge
  getLoadStats() {
    const now = new Date()
    const recentMetrics = this.metrics.filter(m => 
      (now.getTime() - m.timestamp.getTime()) < 5 * 60 * 1000 // 5 minutes
    )

    return {
      current: {
        activeRequests: this.currentRequests,
        queuedRequests: this.requestQueue.length,
        utilization: (this.currentRequests / this.maxConcurrentRequests) * 100
      },
      metrics: recentMetrics.length > 0 ? recentMetrics[recentMetrics.length - 1] : null,
      rateLimits: Array.from(this.rateLimits.entries()).map(([endpoint, limit]) => ({
        endpoint,
        used: limit.count,
        max: limit.maxRequests,
        remaining: limit.maxRequests - limit.count
      })),
      cache: {
        size: this.cache.size,
        hitRate: this.calculateCacheHitRate()
      }
    }
  }

  private calculateCacheHitRate(): number {
    // Implémenter le calcul de hit rate du cache
    return 0 // Placeholder
  }

  // Ajuster automatiquement la capacité
  autoAdjustCapacity() {
    const stats = this.getLoadStats()
    
    if (stats.current.utilization > 80) {
      // Augmenter la capacité
      this.maxConcurrentRequests = Math.min(20, this.maxConcurrentRequests + 2)
      console.log('📈 Capacité augmentée à:', this.maxConcurrentRequests)
    } else if (stats.current.utilization < 20 && this.maxConcurrentRequests > 5) {
      // Réduire la capacité
      this.maxConcurrentRequests = Math.max(5, this.maxConcurrentRequests - 1)
      console.log('📉 Capacité réduite à:', this.maxConcurrentRequests)
    }
  }
}

export const loadBalancer = new LoadBalancer()

// Configurer les rate limits par défaut
loadBalancer.configureRateLimit('/api/leads', 10) // 10 requêtes/minute
loadBalancer.configureRateLimit('/api/create-checkout-session', 5) // 5 requêtes/minute
loadBalancer.configureRateLimit('/api/generate-content', 3) // 3 requêtes/minute

// Auto-ajustement toutes les 5 minutes
setInterval(() => {
  loadBalancer.autoAdjustCapacity()
}, 5 * 60 * 1000)
