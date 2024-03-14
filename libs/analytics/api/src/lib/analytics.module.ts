import {DynamicModule, Module, Provider, Type} from '@nestjs/common'
import {CacheModule} from '@nestjs/cache-manager'
import {PrismaModule} from '@wepublish/nest-modules'
import {ANALYTICS_SERVICE_PROVIDER, AnalyticsService} from './analytics.service'
import {AnalyticsResolver} from './analytics.resolver'
import {ModuleAsyncOptions, createAsyncOptionsProvider} from '@wepublish/utils/api'

type AnalyticsAsyncOptions = ModuleAsyncOptions<AnalyticsService>

@Module({
  imports: [PrismaModule, CacheModule.register()],
  providers: [AnalyticsResolver]
})
export class AnalyticsModule {
  public static register(config: Type<AnalyticsService>): DynamicModule {
    return {
      module: AnalyticsModule,
      providers: [
        {
          provide: ANALYTICS_SERVICE_PROVIDER,
          useClass: config
        }
      ]
    }
  }

  public static registerAsync(options: AnalyticsAsyncOptions): DynamicModule {
    return {
      module: AnalyticsModule,
      global: options.global,
      imports: options.imports || [],
      providers: this.createAsyncProviders(options)
    }
  }

  private static createAsyncProviders(options: AnalyticsAsyncOptions): Provider[] {
    return [createAsyncOptionsProvider(ANALYTICS_SERVICE_PROVIDER, options)]
  }
}
