// THIS FILE IS AUTOGENERATED
import {Node} from 'slate'
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: string;
};

export type DashboardInvoice = {
  __typename?: 'DashboardInvoice';
  amount: Scalars['Int'];
  dueAt: Scalars['DateTime'];
  memberPlan?: Maybe<Scalars['String']>;
  paidAt?: Maybe<Scalars['DateTime']>;
};

export type DashboardSubscription = {
  __typename?: 'DashboardSubscription';
  endsAt?: Maybe<Scalars['DateTime']>;
  memberPlan: Scalars['String'];
  monthlyAmount: Scalars['Int'];
  paymentPeriodicity: PaymentPeriodicity;
  reasonForDeactivation?: Maybe<SubscriptionDeactivationReason>;
  renewsAt?: Maybe<Scalars['DateTime']>;
  startsAt: Scalars['DateTime'];
};

export type MailProviderModel = {
  __typename?: 'MailProviderModel';
  name: Scalars['String'];
};

export type MailTemplateRef = {
  __typename?: 'MailTemplateRef';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type MailTemplateWithUrlModel = {
  __typename?: 'MailTemplateWithUrlModel';
  description?: Maybe<Scalars['String']>;
  externalMailTemplateId: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  remoteMissing: Scalars['Boolean'];
  url: Scalars['String'];
};

export type MemberPlanRef = {
  __typename?: 'MemberPlanRef';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createSubscriptionFlow: Array<SubscriptionFlowModel>;
  createSubscriptionInterval: Array<SubscriptionFlowModel>;
  deleteSubscriptionFlow: Array<SubscriptionFlowModel>;
  deleteSubscriptionInterval: Array<SubscriptionFlowModel>;
  syncTemplates: Scalars['Boolean'];
  updateSubscriptionFlow: Array<SubscriptionFlowModel>;
  updateSubscriptionInterval: Array<SubscriptionFlowModel>;
};


export type MutationCreateSubscriptionFlowArgs = {
  subscriptionFlow: SubscriptionFlowModelCreateInput;
};


export type MutationCreateSubscriptionIntervalArgs = {
  subscriptionInterval: SubscriptionIntervalCreateInput;
};


export type MutationDeleteSubscriptionFlowArgs = {
  subscriptionFlowId: Scalars['Int'];
};


export type MutationDeleteSubscriptionIntervalArgs = {
  subscriptionInterval: SubscriptionIntervalDeleteInput;
};


export type MutationUpdateSubscriptionFlowArgs = {
  subscriptionFlow: SubscriptionFlowModelUpdateInput;
};


export type MutationUpdateSubscriptionIntervalArgs = {
  subscriptionInterval: SubscriptionIntervalUpdateInput;
};

export type PaymentMethodRef = {
  __typename?: 'PaymentMethodRef';
  id: Scalars['String'];
  name: Scalars['String'];
};

export enum PaymentPeriodicity {
  Biannual = 'biannual',
  Monthly = 'monthly',
  Quarterly = 'quarterly',
  Yearly = 'yearly'
}

export type Query = {
  __typename?: 'Query';
  SubscriptionFlows: Array<SubscriptionFlowModel>;
  /**
   * Returns all active subscribers.
   * Includes subscribers with a cancelled but not run out subscription.
   */
  activeSubscribers: Array<DashboardSubscription>;
  /**
   * Returns the expected revenue for the time period given.
   * Excludes cancelled or manually set as paid invoices.
   */
  expectedRevenue: Array<DashboardInvoice>;
  mailTemplates: Array<MailTemplateWithUrlModel>;
  /**
   * Returns all new deactivations in a given timeframe.
   * This considers the time the deactivation was made, not when the subscription runs out.
   */
  newDeactivations: Array<DashboardSubscription>;
  /**
   * Returns all new subscribers in a given timeframe.
   * Includes already deactivated ones.
   */
  newSubscribers: Array<DashboardSubscription>;
  provider: MailProviderModel;
  /** Returns all renewing subscribers in a given timeframe. */
  renewingSubscribers: Array<DashboardSubscription>;
  /**
   * Returns the revenue generated for the time period given.
   * Only includes paid invoices that have not been manually paid.
   */
  revenue: Array<DashboardInvoice>;
  versionInformation: VersionInformation;
};


export type QuerySubscriptionFlowsArgs = {
  defaultFlowOnly: Scalars['Boolean'];
};


export type QueryExpectedRevenueArgs = {
  end?: InputMaybe<Scalars['DateTime']>;
  start: Scalars['DateTime'];
};


export type QueryNewDeactivationsArgs = {
  end?: InputMaybe<Scalars['DateTime']>;
  start: Scalars['DateTime'];
};


export type QueryNewSubscribersArgs = {
  end?: InputMaybe<Scalars['DateTime']>;
  start: Scalars['DateTime'];
};


export type QueryRenewingSubscribersArgs = {
  end?: InputMaybe<Scalars['DateTime']>;
  start: Scalars['DateTime'];
};


export type QueryRevenueArgs = {
  end?: InputMaybe<Scalars['DateTime']>;
  start: Scalars['DateTime'];
};

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
  __typename?: 'SubscriptionFlowModel';
  autoRenewal: Array<Scalars['Boolean']>;
  default: Scalars['Boolean'];
  id: Scalars['Int'];
  intervals: Array<SubscriptionInterval>;
  memberPlan?: Maybe<MemberPlanRef>;
  paymentMethods: Array<PaymentMethodRef>;
  periodicities: Array<PaymentPeriodicity>;
};

export type SubscriptionFlowModelCreateInput = {
  autoRenewal: Array<Scalars['Boolean']>;
  memberPlanId: Scalars['String'];
  paymentMethodIds: Array<Scalars['String']>;
  periodicities: Array<PaymentPeriodicity>;
};

export type SubscriptionFlowModelUpdateInput = {
  autoRenewal: Array<Scalars['Boolean']>;
  id: Scalars['Int'];
  paymentMethodIds: Array<Scalars['String']>;
  periodicities: Array<PaymentPeriodicity>;
};

export type SubscriptionInterval = {
  __typename?: 'SubscriptionInterval';
  daysAwayFromEnding?: Maybe<Scalars['Int']>;
  event: SubscriptionEvent;
  id: Scalars['Int'];
  mailTemplate?: Maybe<MailTemplateRef>;
};

export type SubscriptionIntervalCreateInput = {
  daysAwayFromEnding?: InputMaybe<Scalars['Int']>;
  event: SubscriptionEvent;
  mailTemplateId?: InputMaybe<Scalars['Int']>;
  subscriptionFlowId: Scalars['Int'];
};

export type SubscriptionIntervalDeleteInput = {
  id: Scalars['Int'];
};

export type SubscriptionIntervalUpdateInput = {
  daysAwayFromEnding?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
  mailTemplateId?: InputMaybe<Scalars['Int']>;
};

export type VersionInformation = {
  __typename?: 'VersionInformation';
  version: Scalars['String'];
};

export type MailTemplateQueryVariables = Exact<{ [key: string]: never; }>;


export type MailTemplateQuery = { __typename?: 'Query', mailTemplates: Array<{ __typename?: 'MailTemplateWithUrlModel', id: number, name: string, description?: string | null, externalMailTemplateId: string, remoteMissing: boolean, url: string }>, provider: { __typename?: 'MailProviderModel', name: string } };

export type SynchronizeMailTemplatesMutationVariables = Exact<{ [key: string]: never; }>;


export type SynchronizeMailTemplatesMutation = { __typename?: 'Mutation', syncTemplates: boolean };

export type FullMailTemplateFragment = { __typename?: 'MailTemplateWithUrlModel', id: number, name: string, description?: string | null, externalMailTemplateId: string, remoteMissing: boolean, url: string };

export type FullMailProviderFragment = { __typename?: 'MailProviderModel', name: string };

export type SubscriptionFlowsQueryVariables = Exact<{
  defaultFlowOnly: Scalars['Boolean'];
}>;


export type SubscriptionFlowsQuery = { __typename?: 'Query', SubscriptionFlows: Array<{ __typename?: 'SubscriptionFlowModel', id: number, default: boolean, autoRenewal: Array<boolean>, periodicities: Array<PaymentPeriodicity>, memberPlan?: { __typename?: 'MemberPlanRef', id: string, name: string } | null, paymentMethods: Array<{ __typename?: 'PaymentMethodRef', id: string, name: string }>, intervals: Array<{ __typename?: 'SubscriptionInterval', id: number, daysAwayFromEnding?: number | null, event: SubscriptionEvent, mailTemplate?: { __typename?: 'MailTemplateRef', id: number, name: string } | null }> }> };

export type CreateSubscriptionFlowMutationVariables = Exact<{
  subscriptionFlow: SubscriptionFlowModelCreateInput;
}>;


export type CreateSubscriptionFlowMutation = { __typename?: 'Mutation', createSubscriptionFlow: Array<{ __typename?: 'SubscriptionFlowModel', id: number, default: boolean, autoRenewal: Array<boolean>, periodicities: Array<PaymentPeriodicity>, memberPlan?: { __typename?: 'MemberPlanRef', id: string, name: string } | null, paymentMethods: Array<{ __typename?: 'PaymentMethodRef', id: string, name: string }>, intervals: Array<{ __typename?: 'SubscriptionInterval', id: number, daysAwayFromEnding?: number | null, event: SubscriptionEvent, mailTemplate?: { __typename?: 'MailTemplateRef', id: number, name: string } | null }> }> };

export type UpdateSubscriptionFlowMutationVariables = Exact<{
  subscriptionFlow: SubscriptionFlowModelUpdateInput;
}>;


export type UpdateSubscriptionFlowMutation = { __typename?: 'Mutation', updateSubscriptionFlow: Array<{ __typename?: 'SubscriptionFlowModel', id: number, default: boolean, autoRenewal: Array<boolean>, periodicities: Array<PaymentPeriodicity>, memberPlan?: { __typename?: 'MemberPlanRef', id: string, name: string } | null, paymentMethods: Array<{ __typename?: 'PaymentMethodRef', id: string, name: string }>, intervals: Array<{ __typename?: 'SubscriptionInterval', id: number, daysAwayFromEnding?: number | null, event: SubscriptionEvent, mailTemplate?: { __typename?: 'MailTemplateRef', id: number, name: string } | null }> }> };

export type DeleteSubscriptionFlowMutationVariables = Exact<{
  subscriptionFlowId: Scalars['Int'];
}>;


export type DeleteSubscriptionFlowMutation = { __typename?: 'Mutation', deleteSubscriptionFlow: Array<{ __typename?: 'SubscriptionFlowModel', id: number, default: boolean, autoRenewal: Array<boolean>, periodicities: Array<PaymentPeriodicity>, memberPlan?: { __typename?: 'MemberPlanRef', id: string, name: string } | null, paymentMethods: Array<{ __typename?: 'PaymentMethodRef', id: string, name: string }>, intervals: Array<{ __typename?: 'SubscriptionInterval', id: number, daysAwayFromEnding?: number | null, event: SubscriptionEvent, mailTemplate?: { __typename?: 'MailTemplateRef', id: number, name: string } | null }> }> };

export type CreateSubscriptionIntervalMutationVariables = Exact<{
  subscriptionInterval: SubscriptionIntervalCreateInput;
}>;


export type CreateSubscriptionIntervalMutation = { __typename?: 'Mutation', createSubscriptionInterval: Array<{ __typename?: 'SubscriptionFlowModel', id: number, default: boolean, autoRenewal: Array<boolean>, periodicities: Array<PaymentPeriodicity>, memberPlan?: { __typename?: 'MemberPlanRef', id: string, name: string } | null, paymentMethods: Array<{ __typename?: 'PaymentMethodRef', id: string, name: string }>, intervals: Array<{ __typename?: 'SubscriptionInterval', id: number, daysAwayFromEnding?: number | null, event: SubscriptionEvent, mailTemplate?: { __typename?: 'MailTemplateRef', id: number, name: string } | null }> }> };

export type UpdateSubscriptionIntervalMutationVariables = Exact<{
  subscriptionInterval: SubscriptionIntervalUpdateInput;
}>;


export type UpdateSubscriptionIntervalMutation = { __typename?: 'Mutation', updateSubscriptionInterval: Array<{ __typename?: 'SubscriptionFlowModel', id: number, default: boolean, autoRenewal: Array<boolean>, periodicities: Array<PaymentPeriodicity>, memberPlan?: { __typename?: 'MemberPlanRef', id: string, name: string } | null, paymentMethods: Array<{ __typename?: 'PaymentMethodRef', id: string, name: string }>, intervals: Array<{ __typename?: 'SubscriptionInterval', id: number, daysAwayFromEnding?: number | null, event: SubscriptionEvent, mailTemplate?: { __typename?: 'MailTemplateRef', id: number, name: string } | null }> }> };

export type DeleteSubscriptionIntervalMutationVariables = Exact<{
  subscriptionInterval: SubscriptionIntervalDeleteInput;
}>;


export type DeleteSubscriptionIntervalMutation = { __typename?: 'Mutation', deleteSubscriptionInterval: Array<{ __typename?: 'SubscriptionFlowModel', id: number, default: boolean, autoRenewal: Array<boolean>, periodicities: Array<PaymentPeriodicity>, memberPlan?: { __typename?: 'MemberPlanRef', id: string, name: string } | null, paymentMethods: Array<{ __typename?: 'PaymentMethodRef', id: string, name: string }>, intervals: Array<{ __typename?: 'SubscriptionInterval', id: number, daysAwayFromEnding?: number | null, event: SubscriptionEvent, mailTemplate?: { __typename?: 'MailTemplateRef', id: number, name: string } | null }> }> };

export type SubscriptionFlowFragment = { __typename?: 'SubscriptionFlowModel', id: number, default: boolean, autoRenewal: Array<boolean>, periodicities: Array<PaymentPeriodicity>, memberPlan?: { __typename?: 'MemberPlanRef', id: string, name: string } | null, paymentMethods: Array<{ __typename?: 'PaymentMethodRef', id: string, name: string }>, intervals: Array<{ __typename?: 'SubscriptionInterval', id: number, daysAwayFromEnding?: number | null, event: SubscriptionEvent, mailTemplate?: { __typename?: 'MailTemplateRef', id: number, name: string } | null }> };

export type SubscriptionIntervalFragment = { __typename?: 'SubscriptionInterval', id: number, daysAwayFromEnding?: number | null, event: SubscriptionEvent, mailTemplate?: { __typename?: 'MailTemplateRef', id: number, name: string } | null };

export type MailTemplateRefFragment = { __typename?: 'MailTemplateRef', id: number, name: string };

export type MemberPlanRefFragment = { __typename?: 'MemberPlanRef', id: string, name: string };

export type PaymentMethodRefFragment = { __typename?: 'PaymentMethodRef', id: string, name: string };

export type VersionInformationQueryVariables = Exact<{ [key: string]: never; }>;


export type VersionInformationQuery = { __typename?: 'Query', versionInformation: { __typename?: 'VersionInformation', version: string } };

export const FullMailTemplateFragmentDoc = gql`
    fragment fullMailTemplate on MailTemplateWithUrlModel {
  id
  name
  description
  externalMailTemplateId
  remoteMissing
  url
}
    `;
export const FullMailProviderFragmentDoc = gql`
    fragment fullMailProvider on MailProviderModel {
  name
}
    `;
export const MemberPlanRefFragmentDoc = gql`
    fragment MemberPlanRef on MemberPlanRef {
  id
  name
}
    `;
export const PaymentMethodRefFragmentDoc = gql`
    fragment PaymentMethodRef on PaymentMethodRef {
  id
  name
}
    `;
export const MailTemplateRefFragmentDoc = gql`
    fragment MailTemplateRef on MailTemplateRef {
  id
  name
}
    `;
export const SubscriptionIntervalFragmentDoc = gql`
    fragment SubscriptionInterval on SubscriptionInterval {
  id
  daysAwayFromEnding
  event
  mailTemplate {
    ...MailTemplateRef
  }
}
    ${MailTemplateRefFragmentDoc}`;
export const SubscriptionFlowFragmentDoc = gql`
    fragment SubscriptionFlow on SubscriptionFlowModel {
  id
  default
  memberPlan {
    ...MemberPlanRef
  }
  autoRenewal
  paymentMethods {
    ...PaymentMethodRef
  }
  periodicities
  intervals {
    ...SubscriptionInterval
  }
}
    ${MemberPlanRefFragmentDoc}
${PaymentMethodRefFragmentDoc}
${SubscriptionIntervalFragmentDoc}`;
export const MailTemplateDocument = gql`
    query MailTemplate {
  mailTemplates {
    ...fullMailTemplate
  }
  provider {
    ...fullMailProvider
  }
}
    ${FullMailTemplateFragmentDoc}
${FullMailProviderFragmentDoc}`;

/**
 * __useMailTemplateQuery__
 *
 * To run a query within a React component, call `useMailTemplateQuery` and pass it any options that fit your needs.
 * When your component renders, `useMailTemplateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMailTemplateQuery({
 *   variables: {
 *   },
 * });
 */
export function useMailTemplateQuery(baseOptions?: Apollo.QueryHookOptions<MailTemplateQuery, MailTemplateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MailTemplateQuery, MailTemplateQueryVariables>(MailTemplateDocument, options);
      }
export function useMailTemplateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MailTemplateQuery, MailTemplateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MailTemplateQuery, MailTemplateQueryVariables>(MailTemplateDocument, options);
        }
export type MailTemplateQueryHookResult = ReturnType<typeof useMailTemplateQuery>;
export type MailTemplateLazyQueryHookResult = ReturnType<typeof useMailTemplateLazyQuery>;
export type MailTemplateQueryResult = Apollo.QueryResult<MailTemplateQuery, MailTemplateQueryVariables>;
export const SynchronizeMailTemplatesDocument = gql`
    mutation SynchronizeMailTemplates {
  syncTemplates
}
    `;
export type SynchronizeMailTemplatesMutationFn = Apollo.MutationFunction<SynchronizeMailTemplatesMutation, SynchronizeMailTemplatesMutationVariables>;

/**
 * __useSynchronizeMailTemplatesMutation__
 *
 * To run a mutation, you first call `useSynchronizeMailTemplatesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSynchronizeMailTemplatesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [synchronizeMailTemplatesMutation, { data, loading, error }] = useSynchronizeMailTemplatesMutation({
 *   variables: {
 *   },
 * });
 */
export function useSynchronizeMailTemplatesMutation(baseOptions?: Apollo.MutationHookOptions<SynchronizeMailTemplatesMutation, SynchronizeMailTemplatesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SynchronizeMailTemplatesMutation, SynchronizeMailTemplatesMutationVariables>(SynchronizeMailTemplatesDocument, options);
      }
export type SynchronizeMailTemplatesMutationHookResult = ReturnType<typeof useSynchronizeMailTemplatesMutation>;
export type SynchronizeMailTemplatesMutationResult = Apollo.MutationResult<SynchronizeMailTemplatesMutation>;
export type SynchronizeMailTemplatesMutationOptions = Apollo.BaseMutationOptions<SynchronizeMailTemplatesMutation, SynchronizeMailTemplatesMutationVariables>;
export const SubscriptionFlowsDocument = gql`
    query SubscriptionFlows($defaultFlowOnly: Boolean!) {
  SubscriptionFlows(defaultFlowOnly: $defaultFlowOnly) {
    ...SubscriptionFlow
  }
}
    ${SubscriptionFlowFragmentDoc}`;

/**
 * __useSubscriptionFlowsQuery__
 *
 * To run a query within a React component, call `useSubscriptionFlowsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubscriptionFlowsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscriptionFlowsQuery({
 *   variables: {
 *      defaultFlowOnly: // value for 'defaultFlowOnly'
 *   },
 * });
 */
export function useSubscriptionFlowsQuery(baseOptions: Apollo.QueryHookOptions<SubscriptionFlowsQuery, SubscriptionFlowsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubscriptionFlowsQuery, SubscriptionFlowsQueryVariables>(SubscriptionFlowsDocument, options);
      }
export function useSubscriptionFlowsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubscriptionFlowsQuery, SubscriptionFlowsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubscriptionFlowsQuery, SubscriptionFlowsQueryVariables>(SubscriptionFlowsDocument, options);
        }
export type SubscriptionFlowsQueryHookResult = ReturnType<typeof useSubscriptionFlowsQuery>;
export type SubscriptionFlowsLazyQueryHookResult = ReturnType<typeof useSubscriptionFlowsLazyQuery>;
export type SubscriptionFlowsQueryResult = Apollo.QueryResult<SubscriptionFlowsQuery, SubscriptionFlowsQueryVariables>;
export const CreateSubscriptionFlowDocument = gql`
    mutation CreateSubscriptionFlow($subscriptionFlow: SubscriptionFlowModelCreateInput!) {
  createSubscriptionFlow(subscriptionFlow: $subscriptionFlow) {
    ...SubscriptionFlow
  }
}
    ${SubscriptionFlowFragmentDoc}`;
export type CreateSubscriptionFlowMutationFn = Apollo.MutationFunction<CreateSubscriptionFlowMutation, CreateSubscriptionFlowMutationVariables>;

/**
 * __useCreateSubscriptionFlowMutation__
 *
 * To run a mutation, you first call `useCreateSubscriptionFlowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubscriptionFlowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubscriptionFlowMutation, { data, loading, error }] = useCreateSubscriptionFlowMutation({
 *   variables: {
 *      subscriptionFlow: // value for 'subscriptionFlow'
 *   },
 * });
 */
export function useCreateSubscriptionFlowMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubscriptionFlowMutation, CreateSubscriptionFlowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubscriptionFlowMutation, CreateSubscriptionFlowMutationVariables>(CreateSubscriptionFlowDocument, options);
      }
export type CreateSubscriptionFlowMutationHookResult = ReturnType<typeof useCreateSubscriptionFlowMutation>;
export type CreateSubscriptionFlowMutationResult = Apollo.MutationResult<CreateSubscriptionFlowMutation>;
export type CreateSubscriptionFlowMutationOptions = Apollo.BaseMutationOptions<CreateSubscriptionFlowMutation, CreateSubscriptionFlowMutationVariables>;
export const UpdateSubscriptionFlowDocument = gql`
    mutation UpdateSubscriptionFlow($subscriptionFlow: SubscriptionFlowModelUpdateInput!) {
  updateSubscriptionFlow(subscriptionFlow: $subscriptionFlow) {
    ...SubscriptionFlow
  }
}
    ${SubscriptionFlowFragmentDoc}`;
export type UpdateSubscriptionFlowMutationFn = Apollo.MutationFunction<UpdateSubscriptionFlowMutation, UpdateSubscriptionFlowMutationVariables>;

/**
 * __useUpdateSubscriptionFlowMutation__
 *
 * To run a mutation, you first call `useUpdateSubscriptionFlowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSubscriptionFlowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSubscriptionFlowMutation, { data, loading, error }] = useUpdateSubscriptionFlowMutation({
 *   variables: {
 *      subscriptionFlow: // value for 'subscriptionFlow'
 *   },
 * });
 */
export function useUpdateSubscriptionFlowMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSubscriptionFlowMutation, UpdateSubscriptionFlowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSubscriptionFlowMutation, UpdateSubscriptionFlowMutationVariables>(UpdateSubscriptionFlowDocument, options);
      }
export type UpdateSubscriptionFlowMutationHookResult = ReturnType<typeof useUpdateSubscriptionFlowMutation>;
export type UpdateSubscriptionFlowMutationResult = Apollo.MutationResult<UpdateSubscriptionFlowMutation>;
export type UpdateSubscriptionFlowMutationOptions = Apollo.BaseMutationOptions<UpdateSubscriptionFlowMutation, UpdateSubscriptionFlowMutationVariables>;
export const DeleteSubscriptionFlowDocument = gql`
    mutation DeleteSubscriptionFlow($subscriptionFlowId: Int!) {
  deleteSubscriptionFlow(subscriptionFlowId: $subscriptionFlowId) {
    ...SubscriptionFlow
  }
}
    ${SubscriptionFlowFragmentDoc}`;
export type DeleteSubscriptionFlowMutationFn = Apollo.MutationFunction<DeleteSubscriptionFlowMutation, DeleteSubscriptionFlowMutationVariables>;

/**
 * __useDeleteSubscriptionFlowMutation__
 *
 * To run a mutation, you first call `useDeleteSubscriptionFlowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSubscriptionFlowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSubscriptionFlowMutation, { data, loading, error }] = useDeleteSubscriptionFlowMutation({
 *   variables: {
 *      subscriptionFlowId: // value for 'subscriptionFlowId'
 *   },
 * });
 */
export function useDeleteSubscriptionFlowMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSubscriptionFlowMutation, DeleteSubscriptionFlowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSubscriptionFlowMutation, DeleteSubscriptionFlowMutationVariables>(DeleteSubscriptionFlowDocument, options);
      }
export type DeleteSubscriptionFlowMutationHookResult = ReturnType<typeof useDeleteSubscriptionFlowMutation>;
export type DeleteSubscriptionFlowMutationResult = Apollo.MutationResult<DeleteSubscriptionFlowMutation>;
export type DeleteSubscriptionFlowMutationOptions = Apollo.BaseMutationOptions<DeleteSubscriptionFlowMutation, DeleteSubscriptionFlowMutationVariables>;
export const CreateSubscriptionIntervalDocument = gql`
    mutation CreateSubscriptionInterval($subscriptionInterval: SubscriptionIntervalCreateInput!) {
  createSubscriptionInterval(subscriptionInterval: $subscriptionInterval) {
    ...SubscriptionFlow
  }
}
    ${SubscriptionFlowFragmentDoc}`;
export type CreateSubscriptionIntervalMutationFn = Apollo.MutationFunction<CreateSubscriptionIntervalMutation, CreateSubscriptionIntervalMutationVariables>;

/**
 * __useCreateSubscriptionIntervalMutation__
 *
 * To run a mutation, you first call `useCreateSubscriptionIntervalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubscriptionIntervalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubscriptionIntervalMutation, { data, loading, error }] = useCreateSubscriptionIntervalMutation({
 *   variables: {
 *      subscriptionInterval: // value for 'subscriptionInterval'
 *   },
 * });
 */
export function useCreateSubscriptionIntervalMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubscriptionIntervalMutation, CreateSubscriptionIntervalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubscriptionIntervalMutation, CreateSubscriptionIntervalMutationVariables>(CreateSubscriptionIntervalDocument, options);
      }
export type CreateSubscriptionIntervalMutationHookResult = ReturnType<typeof useCreateSubscriptionIntervalMutation>;
export type CreateSubscriptionIntervalMutationResult = Apollo.MutationResult<CreateSubscriptionIntervalMutation>;
export type CreateSubscriptionIntervalMutationOptions = Apollo.BaseMutationOptions<CreateSubscriptionIntervalMutation, CreateSubscriptionIntervalMutationVariables>;
export const UpdateSubscriptionIntervalDocument = gql`
    mutation UpdateSubscriptionInterval($subscriptionInterval: SubscriptionIntervalUpdateInput!) {
  updateSubscriptionInterval(subscriptionInterval: $subscriptionInterval) {
    ...SubscriptionFlow
  }
}
    ${SubscriptionFlowFragmentDoc}`;
export type UpdateSubscriptionIntervalMutationFn = Apollo.MutationFunction<UpdateSubscriptionIntervalMutation, UpdateSubscriptionIntervalMutationVariables>;

/**
 * __useUpdateSubscriptionIntervalMutation__
 *
 * To run a mutation, you first call `useUpdateSubscriptionIntervalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSubscriptionIntervalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSubscriptionIntervalMutation, { data, loading, error }] = useUpdateSubscriptionIntervalMutation({
 *   variables: {
 *      subscriptionInterval: // value for 'subscriptionInterval'
 *   },
 * });
 */
export function useUpdateSubscriptionIntervalMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSubscriptionIntervalMutation, UpdateSubscriptionIntervalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSubscriptionIntervalMutation, UpdateSubscriptionIntervalMutationVariables>(UpdateSubscriptionIntervalDocument, options);
      }
export type UpdateSubscriptionIntervalMutationHookResult = ReturnType<typeof useUpdateSubscriptionIntervalMutation>;
export type UpdateSubscriptionIntervalMutationResult = Apollo.MutationResult<UpdateSubscriptionIntervalMutation>;
export type UpdateSubscriptionIntervalMutationOptions = Apollo.BaseMutationOptions<UpdateSubscriptionIntervalMutation, UpdateSubscriptionIntervalMutationVariables>;
export const DeleteSubscriptionIntervalDocument = gql`
    mutation DeleteSubscriptionInterval($subscriptionInterval: SubscriptionIntervalDeleteInput!) {
  deleteSubscriptionInterval(subscriptionInterval: $subscriptionInterval) {
    ...SubscriptionFlow
  }
}
    ${SubscriptionFlowFragmentDoc}`;
export type DeleteSubscriptionIntervalMutationFn = Apollo.MutationFunction<DeleteSubscriptionIntervalMutation, DeleteSubscriptionIntervalMutationVariables>;

/**
 * __useDeleteSubscriptionIntervalMutation__
 *
 * To run a mutation, you first call `useDeleteSubscriptionIntervalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSubscriptionIntervalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSubscriptionIntervalMutation, { data, loading, error }] = useDeleteSubscriptionIntervalMutation({
 *   variables: {
 *      subscriptionInterval: // value for 'subscriptionInterval'
 *   },
 * });
 */
export function useDeleteSubscriptionIntervalMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSubscriptionIntervalMutation, DeleteSubscriptionIntervalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSubscriptionIntervalMutation, DeleteSubscriptionIntervalMutationVariables>(DeleteSubscriptionIntervalDocument, options);
      }
export type DeleteSubscriptionIntervalMutationHookResult = ReturnType<typeof useDeleteSubscriptionIntervalMutation>;
export type DeleteSubscriptionIntervalMutationResult = Apollo.MutationResult<DeleteSubscriptionIntervalMutation>;
export type DeleteSubscriptionIntervalMutationOptions = Apollo.BaseMutationOptions<DeleteSubscriptionIntervalMutation, DeleteSubscriptionIntervalMutationVariables>;
export const VersionInformationDocument = gql`
    query VersionInformation {
  versionInformation {
    version
  }
}
    `;

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
export function useVersionInformationQuery(baseOptions?: Apollo.QueryHookOptions<VersionInformationQuery, VersionInformationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VersionInformationQuery, VersionInformationQueryVariables>(VersionInformationDocument, options);
      }
export function useVersionInformationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VersionInformationQuery, VersionInformationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VersionInformationQuery, VersionInformationQueryVariables>(VersionInformationDocument, options);
        }
export type VersionInformationQueryHookResult = ReturnType<typeof useVersionInformationQuery>;
export type VersionInformationLazyQueryHookResult = ReturnType<typeof useVersionInformationLazyQuery>;
export type VersionInformationQueryResult = Apollo.QueryResult<VersionInformationQuery, VersionInformationQueryVariables>;