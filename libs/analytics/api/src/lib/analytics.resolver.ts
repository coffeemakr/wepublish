import {Resolver, Query} from '@nestjs/graphql'
import {AnalyticsService} from './analytics.service'

@Resolver()
export class AnalyticsResolver {
  constructor(private statsService: AnalyticsService) {}

  @Query(() => Number, {nullable: true})
  async analytics() {
    await this.statsService.getData()

    return 1
  }
}
