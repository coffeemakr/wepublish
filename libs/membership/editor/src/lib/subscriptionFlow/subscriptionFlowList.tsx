import React, {createContext, useMemo, useState} from 'react'
import {
  ListViewActions,
  ListViewContainer,
  ListViewHeader
} from '../../../../../../apps/editor/src/app/ui/listView'
import {
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import {MdAdd, MdDelete, MdOutlineHourglassTop, MdOutlineTextSnippet, MdTune} from 'react-icons/all'
import {useTranslation} from 'react-i18next'
import {useParams} from 'react-router-dom'
import {
  Button,
  CheckPicker,
  IconButton,
  InputNumber,
  Loader,
  Message,
  Modal,
  Stack,
  Tag,
  toaster
} from 'rsuite'
import {useMemberPlanListQuery} from '@wepublish/editor/api'
import {ApolloClient, ApolloError, NormalizedCacheObject} from '@apollo/client'
import {getApiClientV2} from 'apps/editor/src/app/utility'
import {
  FullMailTemplateFragment,
  PaymentPeriodicity,
  SubscriptionEvent,
  SubscriptionFlowFragment,
  SubscriptionFlowModelUpdateInput,
  SubscriptionInterval,
  useCreateSubscriptionFlowMutation,
  useCreateSubscriptionIntervalMutation,
  useDeleteSubscriptionFlowMutation,
  useDeleteSubscriptionIntervalMutation,
  useListPaymentMethodsQuery,
  useMailTemplateQuery,
  useSubscriptionFlowsQuery,
  useUpdateSubscriptionFlowMutation,
  useUpdateSubscriptionIntervalMutation
} from '@wepublish/editor/api-v2'
import {GraphqlClientContext} from './graphqlClientContext'
import MailTemplateSelect from './mailTemplateSelect'

const MailTemplatesContext = createContext<FullMailTemplateFragment[]>([])

const showErrors = (error: ApolloError): void => {
  toaster.push(
    <Message type="error" showIcon closable duration={3000}>
      {error.message}
    </Message>
  )
}

/**
 * TYPES
 */

interface CreateDayFormType {
  open: boolean
  dayNumber: string | number
}

const USER_ACTION_EVENTS = [
  SubscriptionEvent.Subscribe,
  SubscriptionEvent.RenewalSuccess,
  SubscriptionEvent.RenewalFailed,
  SubscriptionEvent.DeactivationByUser,
  SubscriptionEvent.Reactivation
] as const
type UserActionEvents = typeof USER_ACTION_EVENTS[number]

const NON_USER_ACTION_EVENTS = [
  SubscriptionEvent.InvoiceCreation,
  SubscriptionEvent.DeactivationUnpaid,
  SubscriptionEvent.Custom
] as const
type NonUserActionEvents = typeof NON_USER_ACTION_EVENTS[number]

export interface UserActionInterval extends SubscriptionInterval {
  event: UserActionEvents
  daysAwayFromEnding: null
}

export interface NonUserActionInterval extends SubscriptionInterval {
  event: NonUserActionEvents
  daysAwayFromEnding: number
}

function isNonUserAction(
  subscriptionInterval: SubscriptionInterval
): subscriptionInterval is NonUserActionInterval {
  return NON_USER_ACTION_EVENTS.includes(subscriptionInterval.event as NonUserActionEvents)
}

export function isNonUserEvent(event: SubscriptionEvent): event is NonUserActionEvents {
  return NON_USER_ACTION_EVENTS.includes(event as NonUserActionEvents)
}

export interface DecoratedSubscriptionInterval<T extends SubscriptionInterval> {
  subscriptionFlowId: number
  title: string
  object: T
  icon: JSX.Element
  color: {bg: string; fg: string}
}

/**
 * COMPONENT
 */

export default function () {
  const {t} = useTranslation()

  const params = useParams()
  const {id: memberPlanId} = params

  const defaultFlowOnly = memberPlanId === 'default'

  const [createDayForm, setCreateDayForm] = useState<CreateDayFormType>({
    open: false,
    dayNumber: -3
  })
  const [newDay, setNewDay] = useState<number | undefined>(undefined)

  /******************************************
   * API SERVICES
   ******************************************/
  const client: ApolloClient<NormalizedCacheObject> = useMemo(() => getApiClientV2(), [])

  const {data: memberPlans} = useMemberPlanListQuery({})

  const memberPlan = useMemo(() => {
    return memberPlans && memberPlans.memberPlans.nodes.find(p => p.id === memberPlanId)
  }, [memberPlanId, memberPlans])

  // get subscriptions flows
  const {data: subscriptionFlows, loading: loadingSubscriptionFlows} = useSubscriptionFlowsQuery({
    variables: {
      defaultFlowOnly,
      memberPlanId
    },
    client,
    onError: showErrors
  })

  // get mail templates
  const {data: mailTemplates, loading: loadingMailTemplates} = useMailTemplateQuery({
    client,
    onError: showErrors
  })

  // get payment methods
  const {data: paymentMethods, loading: loadingPaymentMethods} = useListPaymentMethodsQuery({
    client,
    onError: showErrors
  })

  const [createSubscriptionFlow] = useCreateSubscriptionFlowMutation({
    client,
    onError: showErrors
  })

  const [createSubscriptionInterval] = useCreateSubscriptionIntervalMutation({
    client,
    onError: showErrors
  })
  const [updateSubscriptionInterval] = useUpdateSubscriptionIntervalMutation({
    client,
    onError: showErrors
  })
  const [deleteSubscriptionInterval] = useDeleteSubscriptionIntervalMutation({
    client,
    onError: showErrors
  })

  const [updateSubscriptionFlow] = useUpdateSubscriptionFlowMutation({
    client,
    onError: showErrors
  })

  const [deleteSubscriptionFlow] = useDeleteSubscriptionFlowMutation({
    client,
    onError: showErrors
  })

  /******************************************
   * HELPER METHODS
   ******************************************/
  const updateFlow = async function (
    subscriptionFlow: SubscriptionFlowFragment,
    payload: Partial<SubscriptionFlowModelUpdateInput>
  ) {
    const mutation: SubscriptionFlowModelUpdateInput = {
      id: subscriptionFlow.id,
      paymentMethodIds:
        payload.paymentMethodIds || subscriptionFlow.paymentMethods.map(pm => pm.id),
      periodicities: payload.periodicities || subscriptionFlow.periodicities,
      autoRenewal: payload.autoRenewal || subscriptionFlow.autoRenewal
    }

    await updateSubscriptionFlow({
      variables: {
        subscriptionFlow: mutation
      }
    })
  }

  const eventIcons: {[key: string]: JSX.Element} = {
    [SubscriptionEvent.InvoiceCreation]: <MdOutlineTextSnippet />,
    [SubscriptionEvent.DeactivationUnpaid]: <MdOutlineHourglassTop />
  }

  const eventColors: {[key: string]: {bg: string; fg: string}} = {
    [SubscriptionEvent.InvoiceCreation]: {bg: 'blue', fg: 'white'},
    [SubscriptionEvent.DeactivationUnpaid]: {bg: 'black', fg: 'white'}
  }

  const userActionIntervalFor = function (
    subscriptionFlow: SubscriptionFlowFragment,
    eventName: string
  ): DecoratedSubscriptionInterval<NonUserActionInterval> | undefined {
    const withTitle = subscriptionFlow.intervals.map(i => {
      return {
        title: t(`subscriptionFlow.${i.event.toLowerCase()}`),
        subscriptionFlowId: subscriptionFlow.id,
        object: i,
        icon: eventIcons[i.event.toUpperCase()],
        color: eventColors[i.event.toUpperCase()]
      }
    })
    return withTitle.find(
      i => i.object.event === eventName
    ) as DecoratedSubscriptionInterval<NonUserActionInterval>
  }

  const nonUserActionIntervalsFor = function (
    subscriptionFlow: SubscriptionFlowFragment,
    days: number
  ): DecoratedSubscriptionInterval<NonUserActionInterval>[] {
    const intervals = subscriptionFlow.intervals.filter(i => i.daysAwayFromEnding === days)
    return intervals.map(i => {
      return {
        title: t(`subscriptionFlow.${i.event.toLowerCase()}`),
        subscriptionFlowId: subscriptionFlow.id,
        object: i,
        icon: eventIcons[i.event.toUpperCase()],
        color: eventColors[i.event.toUpperCase()]
      }
    }) as DecoratedSubscriptionInterval<NonUserActionInterval>[]
  }

  const loading: boolean = useMemo(
    () => loadingSubscriptionFlows || loadingMailTemplates || loadingPaymentMethods,
    [loadingSubscriptionFlows, loadingMailTemplates, loadingPaymentMethods]
  )

  const userActionEvents = USER_ACTION_EVENTS.map(eventName => {
    return {
      title: t(`subscriptionFlow.${eventName.toLowerCase()}`),
      description: t(`subscriptionFlow.${eventName.toLowerCase()}Description`),
      subscriptionEventKey: eventName
    }
  })

  const intervals = useMemo(() => {
    if (!subscriptionFlows) {
      return []
    }
    let intervals: SubscriptionInterval[] = []
    for (const flow of subscriptionFlows.subscriptionFlows) {
      intervals = intervals.concat(flow.intervals)
    }
    return intervals
  }, [subscriptionFlows])

  const days = useMemo(() => {
    // Take existing intervals, maybe insert new day, drop all empty days and sort ascending
    const days = intervals
      .map(i => i.daysAwayFromEnding)
      .concat([newDay])
      .filter(i => i !== undefined && i !== null)
      .sort((a, b) => a! - b!)
    return days.filter((value, index, array) => array.indexOf(value) === index)
  }, [intervals, newDay])

  // Add a new day to timeline
  const addDayToTimeline = function () {
    closeAddDayForm()
    if (createDayForm.dayNumber !== null) {
      setNewDay(Number(createDayForm.dayNumber))
    }
  }
  const openAddDayForm = function () {
    setCreateDayForm({...createDayForm, open: true})
  }
  const closeAddDayForm = function () {
    setCreateDayForm({...createDayForm, open: false})
  }

  // Add a separation border after every table section (filters | user actions | timeline | actions)
  const filterCount = 4
  const userActionCount = userActionEvents.length
  const nonUserActionCount = days.length

  /******************************************
   * CUSTOM ELEMENTS
   ******************************************/

  const SplitTableRow = styled(TableRow)(({theme}) => ({
    [`.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.action.hover
    },
    [`.${tableCellClasses.head}:nth-of-type(${filterCount}), .${
      tableCellClasses.head
    }:nth-of-type(${filterCount + userActionCount}), .${tableCellClasses.head}:nth-of-type(${
      filterCount + userActionCount + nonUserActionCount
    })`]: {
      borderRight: `1px solid ${theme.palette.common.black}`
    },
    [`.${tableCellClasses.body}:nth-of-type(${filterCount}), .${
      tableCellClasses.body
    }:nth-of-type(${filterCount + userActionCount}), .${tableCellClasses.body}:nth-of-type(${
      filterCount + userActionCount + nonUserActionCount
    })`]: {
      borderRight: `1px solid ${theme.palette.common.black}`
    }
  }))

  const DarkTableCell = styled(TableCell)(({theme}) => ({
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    borderRight: `1px solid ${theme.palette.common.white}`
  }))

  if (loading || !subscriptionFlows) {
    return <Loader center />
  }

  return (
    <>
      <Modal open={createDayForm.open} onClose={closeAddDayForm}>
        <Modal.Header>
          <Modal.Title>New day</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Add a new column
          <InputNumber
            value={createDayForm.dayNumber}
            onChange={v => setCreateDayForm({...createDayForm, dayNumber: v})}
            step={1}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addDayToTimeline} appearance="primary">
            Add
          </Button>
          <Button onClick={closeAddDayForm} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <ListViewContainer>
        <ListViewHeader>
          <h2>
            <MdTune />
            {defaultFlowOnly
              ? t('subscriptionFlow.titleDefaultSettings')
              : `${memberPlan?.name || ''} ${t('subscriptionFlow.titleSettings')}`}
          </h2>
          <Typography variant="subtitle1">{t('subscriptionFlow.settingsDescription')}</Typography>
        </ListViewHeader>
        <ListViewActions>
          {!defaultFlowOnly && (
            <Button
              appearance="primary"
              onClick={() =>
                createSubscriptionFlow({
                  variables: {
                    subscriptionFlow: {
                      memberPlanId: memberPlanId!,
                      autoRenewal: [true, false],
                      paymentMethodIds: [],
                      periodicities: []
                    }
                  }
                })
              }>
              <MdAdd /> {t('subscriptionFlow.addNew')}
            </Button>
          )}
        </ListViewActions>
      </ListViewContainer>

      <TableContainer style={{marginTop: '16px'}}>
        <MailTemplatesContext.Provider value={mailTemplates?.mailTemplates || []}>
          <GraphqlClientContext.Provider
            value={{
              createSubscriptionInterval,
              updateSubscriptionInterval,
              deleteSubscriptionInterval
            }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <DarkTableCell align="center" colSpan={filterCount}>
                    Filters
                  </DarkTableCell>
                  <DarkTableCell align="center" colSpan={userActionCount}>
                    User Actions
                  </DarkTableCell>
                  <DarkTableCell align="center" colSpan={nonUserActionCount}>
                    Timeline
                  </DarkTableCell>
                  <DarkTableCell align="center">Actions</DarkTableCell>
                </TableRow>
                <SplitTableRow>
                  {!defaultFlowOnly && (
                    <>
                      {/* filter TODO: extract */}
                      <TableCell align="center">
                        <b>Memberplan</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>Payment Method</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>Periodicity</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>Auto Renewal?</b>
                      </TableCell>
                    </>
                  )}

                  {/* mail templates only TODO: extract */}
                  {userActionEvents.map(userActionEvent => (
                    <TableCell key={userActionEvent.subscriptionEventKey} align="center">
                      {userActionEvent.title}
                    </TableCell>
                  ))}

                  {/* individual flow */}
                  {days.map(day => (
                    <TableCell
                      key={`day-${day}`}
                      align="center"
                      style={day === 0 ? {backgroundColor: 'lightyellow'} : {}}>
                      Day {day}
                    </TableCell>
                  ))}

                  {/* actions */}
                  <TableCell align="center">
                    <IconButton
                      icon={<MdAdd />}
                      color="green"
                      appearance="primary"
                      circle
                      onClick={openAddDayForm}
                    />
                  </TableCell>
                </SplitTableRow>
              </TableHead>

              {/************************************************** TABLE BODY **************************************************/}
              <TableBody>
                {subscriptionFlows.subscriptionFlows.map(subscriptionFlow => (
                  <SplitTableRow key={subscriptionFlow.id}>
                    {/************************************************** FILTERS **************************************************/}
                    {!defaultFlowOnly && (
                      <>
                        <TableCell align="center">{subscriptionFlow.memberPlan?.name}</TableCell>
                        <TableCell align="center">
                          {paymentMethods && paymentMethods.paymentMethods && (
                            <CheckPicker
                              data={paymentMethods.paymentMethods.map(method => ({
                                label: method.name,
                                value: method.id
                              }))}
                              disabled={subscriptionFlow.default}
                              countable={false}
                              cleanable={false}
                              defaultValue={subscriptionFlow.paymentMethods.map(m => m.id)}
                              onChange={v => updateFlow(subscriptionFlow, {paymentMethodIds: v})}
                            />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <CheckPicker
                            data={Object.values(PaymentPeriodicity).map(item => ({
                              label: item,
                              value: item
                            }))}
                            disabled={subscriptionFlow.default}
                            countable={false}
                            cleanable={false}
                            defaultValue={subscriptionFlow.periodicities}
                            onChange={v => updateFlow(subscriptionFlow, {periodicities: v})}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <CheckPicker
                            data={[true, false].map(item => ({
                              label: item.toString(),
                              value: item
                            }))}
                            disabled={subscriptionFlow.default}
                            countable={false}
                            cleanable={false}
                            defaultValue={subscriptionFlow.autoRenewal}
                            onChange={v => updateFlow(subscriptionFlow, {autoRenewal: v})}
                          />
                        </TableCell>
                      </>
                    )}
                    {/************************************************** USER ACTIONS **************************************************/}
                    {userActionEvents.map(event => (
                      <TableCell key={event.subscriptionEventKey} align="center">
                        {mailTemplates && mailTemplates.mailTemplates && (
                          <MailTemplateSelect
                            mailTemplates={mailTemplates.mailTemplates}
                            subscriptionInterval={userActionIntervalFor(
                              subscriptionFlow,
                              event.subscriptionEventKey
                            )}
                            subscriptionFlow={subscriptionFlow}
                            event={event.subscriptionEventKey}
                          />
                        )}
                      </TableCell>
                    ))}

                    {/************************************************** TIMELINE **************************************************/}
                    {days &&
                      mailTemplates &&
                      days.map(day => {
                        const currentIntervals = nonUserActionIntervalsFor(subscriptionFlow, day!)
                        if (currentIntervals.length === 0) {
                          return (
                            <TableCell
                              key={`day-${day}`}
                              align="center"
                              style={day === 0 ? {backgroundColor: 'lightyellow'} : {}}>
                              <MailTemplateSelect
                                mailTemplates={mailTemplates.mailTemplates}
                                subscriptionInterval={undefined}
                                subscriptionFlow={subscriptionFlow}
                                event={SubscriptionEvent.Custom}
                              />
                            </TableCell>
                          )
                        }
                        return (
                          <TableCell
                            key={`day-${day}`}
                            align="center"
                            style={day === 0 ? {backgroundColor: 'lightyellow'} : {}}>
                            {currentIntervals.map(currentInterval => (
                              <Stack direction="column" spacing={6}>
                                {currentInterval.object.event !== SubscriptionEvent.Custom && (
                                  <Tag
                                    style={{
                                      backgroundColor: currentInterval.color.bg,
                                      color: currentInterval.color.fg
                                    }}>
                                    {currentInterval.icon}
                                    {currentInterval.title}
                                  </Tag>
                                )}
                                <MailTemplateSelect
                                  mailTemplates={mailTemplates.mailTemplates}
                                  subscriptionInterval={currentInterval}
                                  subscriptionFlow={subscriptionFlow}
                                  event={currentInterval.object.event}
                                />
                              </Stack>
                            ))}
                          </TableCell>
                        )
                      })}

                    {/************************************************** ACTIONS **************************************************/}
                    <TableCell align="center">
                      <IconButton
                        size="sm"
                        color="red"
                        circle
                        appearance="primary"
                        icon={<MdDelete />}
                        onClick={() =>
                          deleteSubscriptionFlow({
                            variables: {subscriptionFlowId: subscriptionFlow.id}
                          })
                        }
                      />
                    </TableCell>
                  </SplitTableRow>
                ))}
              </TableBody>
            </Table>
          </GraphqlClientContext.Provider>
        </MailTemplatesContext.Provider>
      </TableContainer>
    </>
  )
}
