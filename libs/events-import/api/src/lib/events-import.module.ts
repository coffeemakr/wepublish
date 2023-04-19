import {Module} from '@nestjs/common'
import {PrismaModule} from '@wepublish/nest-modules'
import {EventsImportResolver} from './import/events-import.resolver'
import {EventsImportService} from './import/events-import.service'

@Module({
  imports: [PrismaModule],
  providers: [EventsImportResolver, EventsImportService]
})
export class EventsImportModule {}
