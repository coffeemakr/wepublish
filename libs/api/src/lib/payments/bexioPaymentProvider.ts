import Bexio, {ContactsStatic, InvoicesStatic} from 'bexio'
import ContactSearchParameters = ContactsStatic.ContactSearchParameters
import {
  BasePaymentProvider,
  CheckIntentProps,
  CreatePaymentIntentProps,
  Intent,
  IntentState,
  PaymentProviderProps,
  WebhookForPaymentIntentProps
} from './paymentProvider'
import {PaymentState, PrismaClient, User, UserAddress} from '@prisma/client'

export interface BexioPaymentProviderProps extends PaymentProviderProps {
  apiKey: string
  userId: number
  countryId: number
  invoiceTemplate: string
  unitId: number
  taxId: number
  accountId: number
  invoicePositionText: string
  invoiceMailSubject: string
  invoiceMailBody: string
  markInvoiceAsOpen: boolean
  prisma: PrismaClient
}

export class BexioPaymentProvider extends BasePaymentProvider {
  private apiKey: string
  private userId: number
  private countryId: number
  private invoiceTemplate: string
  private unitId: number
  private taxId: number
  private accountId: number
  private invoicePositionText: string
  private invoiceMailSubject: string
  private invoiceMailBody: string
  private markInvoiceAsOpen: boolean
  private prisma: PrismaClient

  constructor(props: BexioPaymentProviderProps) {
    super(props)
    this.apiKey = props.apiKey
    this.userId = props.userId
    this.countryId = props.countryId
    this.invoiceTemplate = props.invoiceTemplate
    this.unitId = props.unitId
    this.taxId = props.taxId
    this.accountId = props.accountId
    this.invoicePositionText = props.invoicePositionText
    this.invoiceMailSubject = props.invoiceMailSubject
    this.invoiceMailBody = props.invoiceMailBody
    this.markInvoiceAsOpen = props.markInvoiceAsOpen
    this.prisma = props.prisma
  }

  async webhookForPaymentIntent(props: WebhookForPaymentIntentProps): Promise<IntentState[]> {
    throw Error('Webhook not implemented!')
  }

  async createIntent(props: CreatePaymentIntentProps): Promise<Intent> {
    try {
      const invoice = await this.prisma.invoice.findUnique({
        where: {
          id: props.invoice.id
        },
        include: {
          user: {
            include: {
              address: true
            }
          }
        }
      })
      const bexio = new Bexio(this.apiKey)
      const contact = await this.searchForContact(bexio, invoice.user)
      const updatedContact = await this.createOrUpdateContact(bexio, contact, invoice.user)
      await this.createInvoice(bexio, updatedContact)
      return {
        intentID: '',
        intentSecret: '',
        intentData: '',
        paidAt: null,
        state: PaymentState.created
      }
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async checkIntentStatus({intentID}: CheckIntentProps): Promise<IntentState> {
    return {
      state: PaymentState.requiresUserAction,
      paidAt: null,
      paymentID: 'None',
      paymentData: ''
    }
  }

  async searchForContact(bexio: Bexio, user: User & {address: UserAddress}) {
    const contacts = await bexio.contacts.search([
      {
        field: ContactSearchParameters.mail,
        value: `${user.email}`,
        criteria: '='
      }
    ])
    return contacts[0]
  }

  async createOrUpdateContact(
    bexio: Bexio,
    contact: ContactsStatic.ContactSmall,
    user: User & {address: UserAddress}
  ) {
    const uppserContact: ContactsStatic.ContactOverwrite = {
      nr: '',
      name_1: user?.address?.company ? user?.address.company : user.name, // lastname or company name
      name_2: user?.address?.company ? '' : user.firstName, // Firstname or none
      mail: user.email,
      user_id: this.userId,
      contact_type_id: user?.address?.company ? 1 : 2, // 1: Company 2: Person
      country_id: this.countryId,
      owner_id: this.userId,
      contact_group_ids: [],
      postcode: user?.address?.zipCode,
      address: user?.address?.streetAddress
    }
    if (!contact) {
      return await bexio.contacts.create(uppserContact)
    } else {
      uppserContact.nr = contact.nr
      return await bexio.contacts.edit(contact.id, uppserContact)
    }
  }

  async createInvoice(bexio: Bexio, contact: ContactsStatic.ContactFull) {
    const invoice: InvoicesStatic.InvoiceCreate = {
      contact_id: contact.id,
      user_id: this.userId,
      mwst_type: 0,
      mwst_is_net: false,
      template_slug: this.invoiceTemplate,
      positions: [
        {
          amount: '1',
          unit_id: this.unitId,
          account_id: this.accountId,
          tax_id: this.taxId,
          text: this.invoicePositionText,
          unit_price: '22',
          type: 'KbPositionCustom'
        }
      ]
    }
    const invoiceUpdated = await bexio.invoices.create(invoice)
    const sentInvoice = await bexio.invoices.sent(invoiceUpdated.id, {
      recipient_email: contact.mail,
      subject: this.invoiceMailSubject,
      message: this.invoiceMailBody,
      mark_as_open: this.markInvoiceAsOpen,
      attach_pdf: true
    })
    if (!sentInvoice.success) {
      throw Error(`Send of invoice failed with message: ${sentInvoice}`)
    }
  }
}
