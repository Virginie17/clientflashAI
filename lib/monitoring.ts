/**
 * Monitoring des performances API
 * Suivi des requêtes, erreurs et métriques
 */

interface ApiMetric {
  endpoint: string
  method: string
  statusCode: number
  responseTime: number
  timestamp: Date
  error?: string
  userAgent?: string
  ip?: string
}

class ApiMonitoring {
  private metrics: ApiMetric[] = []
  private maxMetrics = 1000 // Garder seulement les 1000 dernières métriques

  // Ajouter une métrique
  addMetric(metric: Omit<ApiMetric, 'timestamp'>) {
    const fullMetric: ApiMetric = {
      ...metric,
      timestamp: new Date()
    }

    this.metrics.push(fullMetric)

    // Garder seulement les métriques récentes
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics)
    }

    // Log en cas d'erreur
    if (metric.statusCode >= 400 || metric.error) {
      console.error(`🚨 API Error: ${metric.method} ${metric.endpoint} - ${metric.statusCode}`, {
        error: metric.error,
        responseTime: metric.responseTime,
        timestamp: fullMetric.timestamp
      })
    }

    // Log pour les requêtes lentes
    if (metric.responseTime > 3000) {
      console.warn(`⚠️ Slow API: ${metric.method} ${metric.endpoint} - ${metric.responseTime}ms`)
    }
  }

  // Obtenir les statistiques
  getStats() {
    const now = new Date()
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

    const recentMetrics = this.metrics.filter(m => m.timestamp >= oneHourAgo)
    const dailyMetrics = this.metrics.filter(m => m.timestamp >= oneDayAgo)

    return {
      lastHour: {
        total: recentMetrics.length,
        success: recentMetrics.filter(m => m.statusCode < 400).length,
        errors: recentMetrics.filter(m => m.statusCode >= 400).length,
        avgResponseTime: this.calculateAvgResponseTime(recentMetrics),
        slowRequests: recentMetrics.filter(m => m.responseTime > 3000).length
      },
      lastDay: {
        total: dailyMetrics.length,
        success: dailyMetrics.filter(m => m.statusCode < 400).length,
        errors: dailyMetrics.filter(m => m.statusCode >= 400).length,
        avgResponseTime: this.calculateAvgResponseTime(dailyMetrics),
        slowRequests: dailyMetrics.filter(m => m.responseTime > 3000).length
      },
      topErrors: this.getTopErrors(recentMetrics),
      slowEndpoints: this.getSlowEndpoints(recentMetrics)
    }
  }

  private calculateAvgResponseTime(metrics: ApiMetric[]): number {
    if (metrics.length === 0) return 0
    const total = metrics.reduce((sum, m) => sum + m.responseTime, 0)
    return Math.round(total / metrics.length)
  }

  private getTopErrors(metrics: ApiMetric[]): Array<{error: string, count: number}> {
    const errors = metrics
      .filter(m => m.error)
      .map(m => m.error!)
    
    const errorCounts = errors.reduce((acc, error) => {
      acc[error] = (acc[error] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(errorCounts)
      .map(([error, count]) => ({ error, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
  }

  private getSlowEndpoints(metrics: ApiMetric[]): Array<{endpoint: string, avgTime: number, count: number}> {
    const endpointTimes = metrics.reduce((acc, metric) => {
      if (!acc[metric.endpoint]) {
        acc[metric.endpoint] = { total: 0, count: 0 }
      }
      acc[metric.endpoint].total += metric.responseTime
      acc[metric.endpoint].count += 1
      return acc
    }, {} as Record<string, {total: number, count: number}>)

    return Object.entries(endpointTimes)
      .map(([endpoint, data]) => ({
        endpoint,
        avgTime: Math.round(data.total / data.count),
        count: data.count
      }))
      .filter(e => e.avgTime > 1000)
      .sort((a, b) => b.avgTime - a.avgTime)
      .slice(0, 5)
  }
}

export const apiMonitoring = new ApiMonitoring()

// Fonction pour les routes API Next.js
export function withMonitoring(handler: Function) {
    return async (req: Request, ...args: any[]) => {
      const startTime = Date.now()
      
      try {
        const response = await handler(req, ...args)
        const responseTime = Date.now() - startTime
        
        apiMonitoring.addMetric({
          endpoint: req.url,
          method: req.method,
          statusCode: (response as any)?.status || 200,
          responseTime,
          userAgent: req.headers.get('user-agent') || undefined,
          ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || undefined
        })
        
        return response
      } catch (error) {
        const responseTime = Date.now() - startTime
        
        apiMonitoring.addMetric({
          endpoint: req.url,
          method: req.method,
          statusCode: 500,
          responseTime,
          error: error instanceof Error ? error.message : 'Unknown error',
          userAgent: req.headers.get('user-agent') || undefined,
          ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || undefined
        })
        
        throw error
      }
    }
  }
