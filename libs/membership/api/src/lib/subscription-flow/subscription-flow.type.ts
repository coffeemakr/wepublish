import {SubscriptionEvent} from '@prisma/client'

export const subscriptionFlowDaysAwayFromEndingNeedToBeNull: SubscriptionEvent[] = [
  SubscriptionEvent.SUBSCRIBE,
  SubscriptionEvent.REACTIVATION,
  SubscriptionEvent.DEACTIVATION_BY_USER,
  SubscriptionEvent.RENEWAL_FAILED,
  SubscriptionEvent.RENEWAL_SUCCESS
]

export const subscriptionFlowNonUniqueEvents: SubscriptionEvent[] = [SubscriptionEvent.CUSTOM]
