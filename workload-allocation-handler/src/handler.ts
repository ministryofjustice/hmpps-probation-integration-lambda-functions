/* eslint-disable import/no-extraneous-dependencies */
import { Context, SQSEvent } from 'aws-lambda'
import { SNSMessage } from 'aws-lambda/trigger/sns'
import promClient from 'prom-client'
import logger from '../logger'
import HmppsAuthClient from './data/hmppsAuthClient'
import DeliusApi from './services/deliusApi'
import HmppsWorkload, {
  AllocationMessage,
  PersonManagerDetails,
  EventManagerDetails,
  RequirementManagerDetails,
} from './services/hmppsWorkload'
import ParameterStore from './data/parameterStore'

promClient.collectDefaultMetrics()

const hmppsAuthClient = new HmppsAuthClient(new ParameterStore())
const deliusApi = new DeliusApi()
const hmppsWorkload = new HmppsWorkload()

const handler = async (event: SQSEvent, context: Context): Promise<void> => {
  logger.debug(`Event: ${JSON.stringify(event, null, 2)}`)
  logger.debug(`Context: ${JSON.stringify(context, null, 2)}`)

  // Get values from message
  const body = JSON.parse(event.Records[0].body) as SNSMessage

  // Determine message event type
  const eventType: string = body.MessageAttributes.eventType.Value

  // Person Allocation
  if (eventType === 'person.community.manager.allocated') {
    const message = JSON.parse(body.Message) as AllocationMessage
    const username = message.senderReference?.identifiers?.find(id => id.type === 'username')?.value
    const crn = message.personReference.identifiers.find(id => id.type === 'CRN').value
    const detailUrl = new URL(message.detailUrl)

    // Get token from HMPPS Auth
    const token = await hmppsAuthClient.getSystemClientToken(username)

    // Get current state of allocation
    const allocation: PersonManagerDetails = await hmppsWorkload.getPersonAllocationDetail(detailUrl, token)

    // Create the allocation in Delius
    await deliusApi.allocatePerson(
      crn,
      {
        datetime: allocation.createdDate,
        staffCode: allocation.staffCode,
        teamCode: allocation.teamCode,
        reason: 'OTH', // "Other"
      },
      token
    )
  }

  // Event Allocation
  if (eventType === 'event.community.manager.allocated') {
    const message = JSON.parse(body.Message) as AllocationMessage
    const username = message.senderReference?.identifiers?.find(id => id.type === 'username')?.value
    const crn = message.personReference.identifiers.find(id => id.type === 'CRN').value
    const detailUrl = new URL(message.detailUrl)

    // Get token from HMPPS Auth
    const token = await hmppsAuthClient.getSystemClientToken(username)

    // Get current state of allocation
    const allocation: EventManagerDetails = await hmppsWorkload.getEventAllocationDetail(detailUrl, token)

    // Create the allocation in Delius
    await deliusApi.allocateEvent(
      crn,
      allocation.eventId,
      {
        datetime: allocation.createdDate,
        staffCode: allocation.staffCode,
        teamCode: allocation.teamCode,
        reason: 'OTH', // "Other"
      },
      token
    )
  }

  // Requirement Allocation
  if (eventType === 'requirement.community.manager.allocated') {
    const message = JSON.parse(body.Message) as AllocationMessage
    const username = message.senderReference?.identifiers?.find(id => id.type === 'username')?.value
    const crn = message.personReference.identifiers.find(id => id.type === 'CRN').value
    const detailUrl = new URL(message.detailUrl)

    // Get token from HMPPS Auth
    const token = await hmppsAuthClient.getSystemClientToken(username)

    // Get current state of allocation
    const allocation: RequirementManagerDetails = await hmppsWorkload.getRequirementAllocationDetail(detailUrl, token)

    // Create the allocation in Delius
    await deliusApi.allocateRequirement(
      crn,
      allocation.requirementId,
      {
        datetime: allocation.createdDate,
        staffCode: allocation.staffCode,
        teamCode: allocation.teamCode,
        reason: 'OTH', // "Other"
      },
      token
    )
  }
}

export default handler
