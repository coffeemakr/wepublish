import React, {useContext, useMemo} from 'react'
import {SubscriptionFlowFragment} from '@wepublish/editor/api-v2'
import {
  isNonUserAction,
  DecoratedSubscriptionInterval,
  NonUserActionInterval
} from './subscriptionFlows'
import {useTranslation} from 'react-i18next'
import SubscriptionInterval from './subscriptionInterval'
import {Tag} from 'rsuite'
import {DndContext, DragEndEvent} from '@dnd-kit/core'
import DropContainerSubscriptionInterval from './dropContainerSubscriptionInterval'
import {GraphqlClientContext} from './graphqlClientContext'

interface SubscriptionTimelineProps {
  subscriptionFlow: SubscriptionFlowFragment
}

export default function SubscriptionFlow({subscriptionFlow}: SubscriptionTimelineProps) {
  const {t} = useTranslation()

  const client = useContext(GraphqlClientContext)

  // sorted subscription intervals
  const subscriptionNonUserIntervals: DecoratedSubscriptionInterval<NonUserActionInterval>[] =
    useMemo(() => {
      if (!subscriptionFlow) {
        return []
      }

      return subscriptionFlow.intervals
        .filter(isNonUserAction)
        .map(i => {
          return {
            title: t(`subscriptionFlow.${i.event.toLowerCase()}`),
            subscriptionFlowId: subscriptionFlow.id,
            object: i
          }
        })
        .sort((a, b) => {
          if (!a.object.daysAwayFromEnding || !b.object.daysAwayFromEnding) {
            return -1
          }
          return a.object.daysAwayFromEnding - b.object.daysAwayFromEnding
        })
    }, [t, subscriptionFlow])

  const timeLineArray: number[] = useMemo(() => {
    const minDaysInTimeline = Math.min(
      ...subscriptionNonUserIntervals.map(action => action.object.daysAwayFromEnding)
    )
    const maxDaysInTimeline = Math.max(
      ...subscriptionNonUserIntervals.map(action => action.object.daysAwayFromEnding)
    )
    const timelineStart = Math.min(0, minDaysInTimeline - 2)
    const timelineEnd = maxDaysInTimeline + 2
    // create array of numbers from start to end
    return Array.from({length: timelineEnd - timelineStart}, (_, i) => timelineStart + 1 + i)
  }, [subscriptionNonUserIntervals])

  const skipDays: number[] = useMemo(() => {
    return [-10, -9, -8, -7, -6, -5]
  }, [timeLineArray])

  /**
   * FUNCTIONS
   */
  function getSubscriptionActionsByDay(dayIndex: number) {
    return subscriptionNonUserIntervals.filter(interval => {
      if (!interval.object.daysAwayFromEnding && dayIndex === 0) {
        return true
      }
      if (interval.object.daysAwayFromEnding === dayIndex) {
        return true
      }
      return false
    })
  }

  async function intervalDragEnd(dragEvent: DragEndEvent) {
    const interval: DecoratedSubscriptionInterval<NonUserActionInterval> = dragEvent.active.data
      .current
      ?.decoratedSubscriptionInterval as DecoratedSubscriptionInterval<NonUserActionInterval>
    const daysAwayFromEnding = dragEvent.over?.data.current?.dayIndex

    await client.updateSubscriptionInterval({
      variables: {
        subscriptionInterval: {
          id: interval.object.id,
          daysAwayFromEnding,
          mailTemplateId: interval.object.mailTemplate?.id
        }
      }
    })
  }

  const cellStyle = {
    textAlign: 'center'
  } as const

  const cellStyleCollapsed = {
    textAlign: 'center',
    perspective: '100px'
  } as const

  return (
    <DndContext onDragEnd={event => intervalDragEnd(event)}>
      <table>
        <thead>
          <tr>
            {timeLineArray.map(day => {
              if (skipDays.includes(day)) {
                return <th style={{width: '20px', textAlign: 'center'}}>S</th>
              } else {
                return <th style={{width: '140px', textAlign: 'center'}}>R</th>
              }
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {timeLineArray.map(day => {
              if (day % 2 !== 0 || skipDays.includes(day)) {
                return <td></td>
              }
              const currentIntervals = day % 2 === 0 ? getSubscriptionActionsByDay(day) : []
              return (
                <td style={cellStyle}>
                  <DropContainerSubscriptionInterval dayIndex={day}>
                    {currentIntervals.map(currentInterval => (
                      <SubscriptionInterval
                        subscriptionInterval={currentInterval}
                        subscriptionFlow={subscriptionFlow}
                        event={currentInterval.object.event}
                        key={currentInterval.object.id}
                      />
                    ))}
                  </DropContainerSubscriptionInterval>
                </td>
              )
            })}
          </tr>
          <tr>
            {timeLineArray.map(day => {
              const rotation = day % 2 === 0 ? '60deg' : '-60deg'
              if (skipDays.includes(day)) {
                return (
                  <td style={cellStyleCollapsed}>
                    <Tag color="green" size="sm" style={{transform: `rotateY(${rotation})`}}>
                      Tag {day}
                    </Tag>
                  </td>
                )
              }
              return (
                <td style={cellStyle}>
                  <Tag color="green" size="sm">
                    Tag {day}
                  </Tag>
                </td>
              )
            })}
          </tr>
          <tr>
            {timeLineArray.map(day => {
              if (day % 2 === 0 || skipDays.includes(day)) {
                return <td></td>
              }
              const currentIntervals = day % 2 !== 0 ? getSubscriptionActionsByDay(day) : []
              return (
                <td style={cellStyle}>
                  <DropContainerSubscriptionInterval dayIndex={day}>
                    {currentIntervals.map(currentInterval => (
                      <SubscriptionInterval
                        subscriptionInterval={currentInterval}
                        subscriptionFlow={subscriptionFlow}
                        event={currentInterval.object.event}
                        key={currentInterval.object.id}
                      />
                    ))}
                  </DropContainerSubscriptionInterval>
                </td>
              )
            })}
          </tr>
        </tbody>
      </table>
    </DndContext>
  )
}
