import {Injectable} from '@nestjs/common'
import {v1beta} from '@google-analytics/data'
import {AnalyticsService} from '../analytics.service'
import {format, subDays} from 'date-fns'

const propertyId = '384645027'

@Injectable()
export class GoogleAnalyticsService extends AnalyticsService {
  private betaClient = new v1beta.BetaAnalyticsDataClient({
    credentials: {}
  })

  public async getData() {
    const today = subDays(new Date(), 30)

    const [response] = await this.betaClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: format(today, 'yyyy-MM-dd'),
          endDate: 'today'
        }
      ],
      dimensions: [
        {
          name: 'pagePathPlusQueryString'
        },
        {
          name: 'pageTitle'
        }
      ],
      metrics: [
        {
          name: 'activeUsers'
        }
      ]
    })

    console.log(response)
  }
}
