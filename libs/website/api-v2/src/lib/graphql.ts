// THIS FILE IS AUTOGENERATED
import {Node} from 'slate'
import {gql} from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]?: Maybe<T[SubKey]>}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]: Maybe<T[SubKey]>}
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: string
}

export type Consent = {
  __typename?: 'Consent'
  createdAt: Scalars['DateTime']
  defaultValue: Scalars['Boolean']
  id: Scalars['String']
  modifiedAt: Scalars['DateTime']
  name: Scalars['String']
  slug: Scalars['String']
}

export type ConsentFilter = {
  defaultValue?: InputMaybe<Scalars['Boolean']>
  name?: InputMaybe<Scalars['String']>
  slug?: InputMaybe<Scalars['String']>
}

export type ConsentInput = {
  defaultValue: Scalars['Boolean']
  name: Scalars['String']
  slug: Scalars['String']
}

export type DashboardInvoice = {
  __typename?: 'DashboardInvoice'
  amount: Scalars['Int']
  dueAt: Scalars['DateTime']
  memberPlan?: Maybe<Scalars['String']>
  paidAt?: Maybe<Scalars['DateTime']>
}

export type DashboardSubscription = {
  __typename?: 'DashboardSubscription'
  deactivationDate?: Maybe<Scalars['DateTime']>
  endsAt?: Maybe<Scalars['DateTime']>
  memberPlan: Scalars['String']
  monthlyAmount: Scalars['Int']
  paymentPeriodicity: PaymentPeriodicity
  reasonForDeactivation?: Maybe<SubscriptionDeactivationReason>
  renewsAt?: Maybe<Scalars['DateTime']>
  startsAt: Scalars['DateTime']
}

export type MailProviderModel = {
  __typename?: 'MailProviderModel'
  name: Scalars['String']
}

export type MailTemplateRef = {
  __typename?: 'MailTemplateRef'
  id: Scalars['String']
  name: Scalars['String']
}

export type MailTemplateWithUrlAndStatusModel = {
  __typename?: 'MailTemplateWithUrlAndStatusModel'
  description?: Maybe<Scalars['String']>
  externalMailTemplateId: Scalars['String']
  id: Scalars['String']
  name: Scalars['String']
  remoteMissing: Scalars['Boolean']
  status: Scalars['String']
  url: Scalars['String']
}

export type MemberPlanRef = {
  __typename?: 'MemberPlanRef'
  id: Scalars['String']
  name: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  /** Create a new consent. */
  createConsent: Consent
  createSubscriptionFlow: Array<SubscriptionFlowModel>
  createSubscriptionInterval: Array<SubscriptionFlowModel>
  /**
   * Creates a new userConsent based on input.
   * Returns created userConsent.
   */
  createUserConsent: UserConsent
  /** Deletes an existing consent. */
  deleteConsent: Consent
  deleteSubscriptionFlow: Array<SubscriptionFlowModel>
  deleteSubscriptionInterval: Array<SubscriptionFlowModel>
  /**
   * Delete an existing userConsent by id.
   * Returns deleted userConsent.
   */
  deleteUserConsent: UserConsent
  syncTemplates?: Maybe<Scalars['Boolean']>
  testSystemMail: Array<SystemMailModel>
  /** Updates an existing consent. */
  updateConsent: Consent
  updateSubscriptionFlow: Array<SubscriptionFlowModel>
  updateSubscriptionInterval: Array<SubscriptionFlowModel>
  updateSubscriptionIntervals: Array<SubscriptionFlowModel>
  updateSystemMail: Array<SystemMailModel>
  /**
   * Updates an existing userConsent based on input.
   * Returns updated userConsent.
   */
  updateUserConsent: UserConsent
}

export type MutationCreateConsentArgs = {
  consent: ConsentInput
}

export type MutationCreateSubscriptionFlowArgs = {
  subscriptionFlow: SubscriptionFlowModelCreateInput
}

export type MutationCreateSubscriptionIntervalArgs = {
  subscriptionInterval: SubscriptionIntervalCreateInput
}

export type MutationCreateUserConsentArgs = {
  userConsent: UserConsentInput
}

export type MutationDeleteConsentArgs = {
  id: Scalars['String']
}

export type MutationDeleteSubscriptionFlowArgs = {
  subscriptionFlowId: Scalars['String']
}

export type MutationDeleteSubscriptionIntervalArgs = {
  subscriptionInterval: SubscriptionIntervalDeleteInput
}

export type MutationDeleteUserConsentArgs = {
  id: Scalars['String']
}

export type MutationTestSystemMailArgs = {
  systemMail: SystemMailTestInput
}

export type MutationUpdateConsentArgs = {
  consent: ConsentInput
  id: Scalars['String']
}

export type MutationUpdateSubscriptionFlowArgs = {
  subscriptionFlow: SubscriptionFlowModelUpdateInput
}

export type MutationUpdateSubscriptionIntervalArgs = {
  subscriptionInterval: SubscriptionIntervalUpdateInput
}

export type MutationUpdateSubscriptionIntervalsArgs = {
  subscriptionIntervals: Array<SubscriptionIntervalUpdateInput>
}

export type MutationUpdateSystemMailArgs = {
  systemMail: SystemMailUpdateInput
}

export type MutationUpdateUserConsentArgs = {
  id: Scalars['String']
  userConsent: UpdateUserConsentInput
}

export type PaymentMethodRef = {
  __typename?: 'PaymentMethodRef'
  id: Scalars['String']
  name: Scalars['String']
}

export enum PaymentPeriodicity {
  Biannual = 'biannual',
  Monthly = 'monthly',
  Quarterly = 'quarterly',
  Yearly = 'yearly'
}

export type Query = {
  __typename?: 'Query'
  /**
   * Returns all active subscribers.
   * Includes subscribers with a cancelled but not run out subscription.
   */
  activeSubscribers: Array<DashboardSubscription>
  /** Returns a consent by id. */
  consent: Consent
  /** Returns all consents. */
  consents: Array<Consent>
  /**
   * Returns the expected revenue for the time period given.
   * Excludes cancelled or manually set as paid invoices.
   */
  expectedRevenue: Array<DashboardInvoice>
  getSystemMails: Array<SystemMailModel>
  mailTemplates: Array<MailTemplateWithUrlAndStatusModel>
  /**
   * Returns all new deactivations in a given timeframe.
   * This considers the time the deactivation was made, not when the subscription runs out.
   */
  newDeactivations: Array<DashboardSubscription>
  /**
   * Returns all new subscribers in a given timeframe.
   * Includes already deactivated ones.
   */
  newSubscribers: Array<DashboardSubscription>
  paymentMethods: Array<PaymentMethodRef>
  provider: MailProviderModel
  /** Returns all renewing subscribers in a given timeframe. */
  renewingSubscribers: Array<DashboardSubscription>
  /**
   * Returns the revenue generated for the time period given.
   * Only includes paid invoices that have not been manually paid.
   */
  revenue: Array<DashboardInvoice>
  subscriptionFlows: Array<SubscriptionFlowModel>
  /** Returns a single userConsent by id. */
  userConsent: UserConsent
  /** Returns a list of userConsents. Possible to filter. */
  userConsents: Array<UserConsent>
  versionInformation: VersionInformation
}

export type QueryConsentArgs = {
  id: Scalars['String']
}

export type QueryConsentsArgs = {
  filter?: InputMaybe<ConsentFilter>
}

export type QueryExpectedRevenueArgs = {
  end?: InputMaybe<Scalars['DateTime']>
  start: Scalars['DateTime']
}

export type QueryNewDeactivationsArgs = {
  end?: InputMaybe<Scalars['DateTime']>
  start: Scalars['DateTime']
}

export type QueryNewSubscribersArgs = {
  end?: InputMaybe<Scalars['DateTime']>
  start: Scalars['DateTime']
}

export type QueryRenewingSubscribersArgs = {
  end?: InputMaybe<Scalars['DateTime']>
  start: Scalars['DateTime']
}

export type QueryRevenueArgs = {
  end?: InputMaybe<Scalars['DateTime']>
  start: Scalars['DateTime']
}

export type QuerySubscriptionFlowsArgs = {
  defaultFlowOnly: Scalars['Boolean']
  memberPlanId?: InputMaybe<Scalars['String']>
}

export type QueryUserConsentArgs = {
  id: Scalars['String']
}

export type QueryUserConsentsArgs = {
  filter?: InputMaybe<UserConsentFilter>
}

export enum SubscriptionDeactivationReason {
  InvoiceNotPaid = 'invoiceNotPaid',
  None = 'none',
  UserSelfDeactivated = 'userSelfDeactivated'
}

export enum SubscriptionEvent {
  Custom = 'CUSTOM',
  DeactivationByUser = 'DEACTIVATION_BY_USER',
  DeactivationUnpaid = 'DEACTIVATION_UNPAID',
  InvoiceCreation = 'INVOICE_CREATION',
  Reactivation = 'REACTIVATION',
  RenewalFailed = 'RENEWAL_FAILED',
  RenewalSuccess = 'RENEWAL_SUCCESS',
  Subscribe = 'SUBSCRIBE'
}

export type SubscriptionFlowModel = {
  __typename?: 'SubscriptionFlowModel'
  autoRenewal: Array<Scalars['Boolean']>
  default: Scalars['Boolean']
  id: Scalars['String']
  intervals: Array<SubscriptionInterval>
  memberPlan?: Maybe<MemberPlanRef>
  numberOfSubscriptions: Scalars['Int']
  paymentMethods: Array<PaymentMethodRef>
  periodicities: Array<PaymentPeriodicity>
}

export type SubscriptionFlowModelCreateInput = {
  autoRenewal: Array<Scalars['Boolean']>
  memberPlanId: Scalars['String']
  paymentMethodIds: Array<Scalars['String']>
  periodicities: Array<PaymentPeriodicity>
}

export type SubscriptionFlowModelUpdateInput = {
  autoRenewal: Array<Scalars['Boolean']>
  id: Scalars['String']
  paymentMethodIds: Array<Scalars['String']>
  periodicities: Array<PaymentPeriodicity>
}

export type SubscriptionInterval = {
  __typename?: 'SubscriptionInterval'
  daysAwayFromEnding?: Maybe<Scalars['Int']>
  event: SubscriptionEvent
  id: Scalars['String']
  mailTemplate?: Maybe<MailTemplateRef>
}

export type SubscriptionIntervalCreateInput = {
  daysAwayFromEnding?: InputMaybe<Scalars['Int']>
  event: SubscriptionEvent
  mailTemplateId?: InputMaybe<Scalars['String']>
  subscriptionFlowId: Scalars['String']
}

export type SubscriptionIntervalDeleteInput = {
  id: Scalars['String']
}

export type SubscriptionIntervalUpdateInput = {
  daysAwayFromEnding?: InputMaybe<Scalars['Int']>
  id: Scalars['String']
  mailTemplateId?: InputMaybe<Scalars['String']>
}

export type SystemMailModel = {
  __typename?: 'SystemMailModel'
  event: UserEvent
  mailTemplate?: Maybe<MailTemplateRef>
}

export type SystemMailTestInput = {
  event: UserEvent
}

export type SystemMailUpdateInput = {
  event: UserEvent
  mailTemplateId: Scalars['String']
}

export type UpdateUserConsentInput = {
  value: Scalars['Boolean']
}

export type User = {
  __typename?: 'User'
  active: Scalars['Boolean']
  createdAt: Scalars['DateTime']
  email: Scalars['String']
  emailVerifiedAt?: Maybe<Scalars['DateTime']>
  firstName?: Maybe<Scalars['String']>
  id: Scalars['String']
  lastLogin?: Maybe<Scalars['DateTime']>
  modifiedAt: Scalars['DateTime']
  name: Scalars['String']
  password: Scalars['String']
  preferredName?: Maybe<Scalars['String']>
  roleIDs: Array<Scalars['String']>
  userImageID?: Maybe<Scalars['String']>
}

export type UserConsent = {
  __typename?: 'UserConsent'
  consent: Consent
  createdAt: Scalars['DateTime']
  id: Scalars['String']
  modifiedAt: Scalars['DateTime']
  user: User
  value: Scalars['Boolean']
}

export type UserConsentFilter = {
  name?: InputMaybe<Scalars['String']>
  slug?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['Boolean']>
}

export type UserConsentInput = {
  consentId: Scalars['String']
  userId: Scalars['String']
  value: Scalars['Boolean']
}

export enum UserEvent {
  AccountCreation = 'ACCOUNT_CREATION',
  LoginLink = 'LOGIN_LINK',
  PasswordReset = 'PASSWORD_RESET',
  TestMail = 'TEST_MAIL'
}

export type VersionInformation = {
  __typename?: 'VersionInformation'
  version: Scalars['String']
}

export type RevenueQueryVariables = Exact<{
  start: Scalars['DateTime']
  end?: InputMaybe<Scalars['DateTime']>
}>

export type RevenueQuery = {
  __typename?: 'Query'
  revenue: Array<{
    __typename?: 'DashboardInvoice'
    amount: number
    paidAt?: string | null
    memberPlan?: string | null
  }>
}

export type VersionInformationQueryVariables = Exact<{[key: string]: never}>

export type VersionInformationQuery = {
  __typename?: 'Query'
  versionInformation: {__typename?: 'VersionInformation'; version: string}
}

export const RevenueDocument = gql`
  query Revenue($start: DateTime!, $end: DateTime) {
    revenue(start: $start, end: $end) {
      amount
      paidAt
      memberPlan
    }
  }
`

/**
 * __useRevenueQuery__
 *
 * To run a query within a React component, call `useRevenueQuery` and pass it any options that fit your needs.
 * When your component renders, `useRevenueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRevenueQuery({
 *   variables: {
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useRevenueQuery(
  baseOptions: Apollo.QueryHookOptions<RevenueQuery, RevenueQueryVariables>
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<RevenueQuery, RevenueQueryVariables>(RevenueDocument, options)
}
export function useRevenueLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<RevenueQuery, RevenueQueryVariables>
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<RevenueQuery, RevenueQueryVariables>(RevenueDocument, options)
}
export type RevenueQueryHookResult = ReturnType<typeof useRevenueQuery>
export type RevenueLazyQueryHookResult = ReturnType<typeof useRevenueLazyQuery>
export type RevenueQueryResult = Apollo.QueryResult<RevenueQuery, RevenueQueryVariables>
export const VersionInformationDocument = gql`
  query VersionInformation {
    versionInformation {
      version
    }
  }
`

/**
 * __useVersionInformationQuery__
 *
 * To run a query within a React component, call `useVersionInformationQuery` and pass it any options that fit your needs.
 * When your component renders, `useVersionInformationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVersionInformationQuery({
 *   variables: {
 *   },
 * });
 */
export function useVersionInformationQuery(
  baseOptions?: Apollo.QueryHookOptions<VersionInformationQuery, VersionInformationQueryVariables>
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<VersionInformationQuery, VersionInformationQueryVariables>(
    VersionInformationDocument,
    options
  )
}
export function useVersionInformationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    VersionInformationQuery,
    VersionInformationQueryVariables
  >
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<VersionInformationQuery, VersionInformationQueryVariables>(
    VersionInformationDocument,
    options
  )
}
export type VersionInformationQueryHookResult = ReturnType<typeof useVersionInformationQuery>
export type VersionInformationLazyQueryHookResult = ReturnType<
  typeof useVersionInformationLazyQuery
>
export type VersionInformationQueryResult = Apollo.QueryResult<
  VersionInformationQuery,
  VersionInformationQueryVariables
>
