import React, {useContext} from 'react'
import {
  MailTemplatesContext,
  DecoratedSubscriptionInterval,
  NonUserActionInterval
} from './subscriptionFlows'
import {
  FullMailTemplateFragment,
  SubscriptionEvent,
  SubscriptionFlowFragment
} from '@wepublish/editor/api-v2'
import MailTemplateSelect from './mailTemplateSelect'
import {useDraggable} from '@dnd-kit/core'
import {MdDragIndicator} from 'react-icons/md'

interface SubscriptionIntervalProps {
  subscriptionInterval: DecoratedSubscriptionInterval<NonUserActionInterval>
  subscriptionFlow: SubscriptionFlowFragment
  event: SubscriptionEvent
}
export default function SubscriptionInterval({
  subscriptionInterval,
  subscriptionFlow,
  event
}: SubscriptionIntervalProps) {
  const mailTemplates = useContext<FullMailTemplateFragment[]>(MailTemplatesContext)

  // draggable
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: `draggable-${subscriptionInterval.object.id}`,
    data: {
      decoratedSubscriptionInterval: subscriptionInterval
    }
  })
  const draggableStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }
    : undefined

  return (
    <div
      style={{
        ...draggableStyle,
        padding: '5px',
        border: '1px solid black',
        borderRadius: '5px',
        width: '100%',
        backgroundColor: 'white',
        textAlign: 'left',
        hyphens: 'auto'
      }}>
      <div>
        <span style={{cursor: 'move'}} ref={setNodeRef} {...listeners} {...attributes}>
          <MdDragIndicator />
        </span>
        {subscriptionInterval.title}
      </div>
      <div>
        <MailTemplateSelect
          mailTemplates={mailTemplates}
          subscriptionInterval={subscriptionInterval}
          subscriptionFlow={subscriptionFlow}
          event={event}
        />
      </div>
    </div>
  )
}
