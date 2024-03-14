export const ANALYTICS_SERVICE_PROVIDER = Symbol('ANALYTICS_SERVICE_PROVIDER')

export abstract class AnalyticsService {
  abstract getData(): Promise<any>
}
