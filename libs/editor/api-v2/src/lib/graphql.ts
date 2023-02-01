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
};

export type MailTemplateRef = {
  __typename?: 'MailTemplateRef';
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type MemberPlanRef = {
  __typename?: 'MemberPlanRef';
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type PaymentMethodRef = {
  __typename?: 'PaymentMethodRef';
  id: Scalars['Float'];
  name: Scalars['String'];
};

export enum PaymentPeriodicity {
  Biannual = 'Biannual',
  Monthly = 'Monthly',
  Quarterly = 'Quarterly',
  Yearly = 'Yearly'
}

export type Query = {
  __typename?: 'Query';
  SubscriptionFlows: SubscriptionFlows;
  versionInformation: VersionInformation;
};

export type SubscriptionFlow = {
  __typename?: 'SubscriptionFlow';
  additionalIntervals: Array<SubscriptionInterval>;
  autoRenewal: Array<Scalars['Boolean']>;
  deactivationByUser?: Maybe<SubscriptionInterval>;
  deactivationUnpaid?: Maybe<SubscriptionInterval>;
  default: Scalars['Boolean'];
  id: Scalars['Float'];
  invoiceCreation?: Maybe<SubscriptionInterval>;
  memberPlan?: Maybe<MemberPlanRef>;
  paymentMethods: Array<PaymentMethodRef>;
  periodicities: Array<PaymentPeriodicity>;
  reactivation?: Maybe<SubscriptionInterval>;
  renewalFailed?: Maybe<SubscriptionInterval>;
  renewalSuccess?: Maybe<SubscriptionInterval>;
  subscribe?: Maybe<MailTemplateRef>;
};

export type SubscriptionFlows = {
  __typename?: 'SubscriptionFlows';
  subscriptionFlows: Array<SubscriptionFlow>;
};

export type SubscriptionInterval = {
  __typename?: 'SubscriptionInterval';
  daysAwayFromEnding: Scalars['Float'];
  mailTemplate: MailTemplateRef;
};

export type VersionInformation = {
  __typename?: 'VersionInformation';
  version: Scalars['String'];
};

export type SubscriptionFlowsQueryVariables = Exact<{ [key: string]: never; }>;


export type SubscriptionFlowsQuery = { __typename?: 'Query', SubscriptionFlows: { __typename?: 'SubscriptionFlows', subscriptionFlows: Array<{ __typename?: 'SubscriptionFlow', id: number, default: boolean, autoRenewal: Array<boolean>, periodicities: Array<PaymentPeriodicity>, additionalIntervals: Array<{ __typename?: 'SubscriptionInterval', daysAwayFromEnding: number, mailTemplate: { __typename?: 'MailTemplateRef', id: number, name: string } }>, deactivationByUser?: { __typename?: 'SubscriptionInterval', daysAwayFromEnding: number, mailTemplate: { __typename?: 'MailTemplateRef', id: number, name: string } } | null, deactivationUnpaid?: { __typename?: 'SubscriptionInterval', daysAwayFromEnding: number, mailTemplate: { __typename?: 'MailTemplateRef', id: number, name: string } } | null, invoiceCreation?: { __typename?: 'SubscriptionInterval', daysAwayFromEnding: number, mailTemplate: { __typename?: 'MailTemplateRef', id: number, name: string } } | null, memberPlan?: { __typename?: 'MemberPlanRef', id: number, name: string } | null, paymentMethods: Array<{ __typename?: 'PaymentMethodRef', id: number, name: string }>, reactivation?: { __typename?: 'SubscriptionInterval', daysAwayFromEnding: number, mailTemplate: { __typename?: 'MailTemplateRef', id: number, name: string } } | null, renewalFailed?: { __typename?: 'SubscriptionInterval', daysAwayFromEnding: number, mailTemplate: { __typename?: 'MailTemplateRef', id: number, name: string } } | null, renewalSuccess?: { __typename?: 'SubscriptionInterval', daysAwayFromEnding: number, mailTemplate: { __typename?: 'MailTemplateRef', id: number, name: string } } | null, subscribe?: { __typename?: 'MailTemplateRef', id: number, name: string } | null }> } };

export type SubscriptionIntervalFragment = { __typename?: 'SubscriptionInterval', daysAwayFromEnding: number, mailTemplate: { __typename?: 'MailTemplateRef', id: number, name: string } };

export type MailTemplateRefFragment = { __typename?: 'MailTemplateRef', id: number, name: string };

export type MemberPlanRefFragment = { __typename?: 'MemberPlanRef', id: number, name: string };

export type PaymentMethodRefFragment = { __typename?: 'PaymentMethodRef', id: number, name: string };

export type VersionInformationQueryVariables = Exact<{ [key: string]: never; }>;


export type VersionInformationQuery = { __typename?: 'Query', versionInformation: { __typename?: 'VersionInformation', version: string } };

export const MailTemplateRefFragmentDoc = gql`
    fragment MailTemplateRef on MailTemplateRef {
  id
  name
}
    `;
export const SubscriptionIntervalFragmentDoc = gql`
    fragment SubscriptionInterval on SubscriptionInterval {
  daysAwayFromEnding
  mailTemplate {
    ...MailTemplateRef
  }
}
    ${MailTemplateRefFragmentDoc}`;
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
export const SubscriptionFlowsDocument = gql`
    query SubscriptionFlows {
  SubscriptionFlows {
    subscriptionFlows {
      id
      default
      additionalIntervals {
        ...SubscriptionInterval
      }
      autoRenewal
      deactivationByUser {
        ...SubscriptionInterval
      }
      deactivationUnpaid {
        ...SubscriptionInterval
      }
      invoiceCreation {
        ...SubscriptionInterval
      }
      memberPlan {
        ...MemberPlanRef
      }
      paymentMethods {
        ...PaymentMethodRef
      }
      periodicities
      reactivation {
        ...SubscriptionInterval
      }
      renewalFailed {
        ...SubscriptionInterval
      }
      renewalSuccess {
        ...SubscriptionInterval
      }
      subscribe {
        ...MailTemplateRef
      }
    }
  }
}
    ${SubscriptionIntervalFragmentDoc}
${MemberPlanRefFragmentDoc}
${PaymentMethodRefFragmentDoc}
${MailTemplateRefFragmentDoc}`;

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
 *   },
 * });
 */
export function useSubscriptionFlowsQuery(baseOptions?: Apollo.QueryHookOptions<SubscriptionFlowsQuery, SubscriptionFlowsQueryVariables>) {
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