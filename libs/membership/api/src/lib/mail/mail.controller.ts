import {MailTemplateMap, OldContextService, PrismaService} from '@wepublish/api'
import {Injectable} from '@nestjs/common'
import {MailTemplate, MailLogState, User} from '@prisma/client'

export enum mailLogType {
  SubscriptionFlow,
  UserFlow
}

export type MailControllerConfig = {
  daysAwayFromEnding: number | null
  externalMailTemplateId: string
  recipient: User
  isRetry: boolean
  optionalData: Record<string, any>
  mailType: mailLogType
}

@Injectable()
export class MailController {
  private sendDate: Date
  constructor(
    private readonly prismaService: PrismaService,
    private readonly oldContextService: OldContextService,
    private readonly config: MailControllerConfig
  ) {
    this.sendDate = new Date()
  }
  private generateMailIdentifier() {
    return `${this.config.mailType}-${this.sendDate.toISOString()}-${
      this.config.daysAwayFromEnding
    }-${this.config.externalMailTemplateId}-${this.config.recipient}`
  }

  private async checkIfMailIsSent(): Promise<number> {
    return this.prismaService.mailLog.count({
      where: {
        mailIdentifier: this.generateMailIdentifier()
      }
    })
  }

  private buildData() {
    return {
      user: this.config.recipient,
      optional: this.config.optionalData,
      jwt: this.oldContextService.context.generateJWT({
        id: this.generateMailIdentifier(),
        expiresInMinutes: 3600
      })
    }
  }

  public async sendMail() {
    if (this.config.isRetry && (await this.checkIfMailIsSent())) {
      console.log(`Mail with id <${this.generateMailIdentifier()}> is already sent skipping...`)
      return
    }
    await oldContext.mailContext.sendRemoteTemplate({
      mailLogID: this.generateMailIdentifier(),
      remoteTemplate: this.config.externalMailTemplateId,
      recipient: this.config.recipient.email,
      data: this.buildData()
    })
    await this.prismaService.mailLog.create({
      data: {
        recipient: {
          connect: this.config.recipient
        },
        state: MailLogState.submitted,
        sentDate: this.sendDate,
        mailProviderID: oldContext.mailContext.mailProvider!.id || '',
        mailIdentifier: this.generateMailIdentifier(),
        mailTemplate: {
          connect: {
            externalMailTemplateId: this.config.externalMailTemplateId
          }
        }
      }
    })
    console.log(
      `Sent template ${this.config.externalMailTemplateId} to ${this.config.recipient.email}`
    )
  }
}
