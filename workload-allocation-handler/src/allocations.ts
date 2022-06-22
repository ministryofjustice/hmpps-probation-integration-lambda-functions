/* eslint-disable import/no-extraneous-dependencies */
import { SNSMessage } from 'aws-lambda/trigger/sns'
import ParameterStore from './data/parameterStore'

import HmppsWorkload, {
  AllocationMessage,
  PersonManagerDetails,
  EventManagerDetails,
  RequirementManagerDetails,
} from './services/hmppsWorkload'
import HmppsAuthClient from './data/hmppsAuthClient'
import DeliusApi from './services/deliusApi'

const hmppsAuthClient = new HmppsAuthClient(new ParameterStore())
const deliusApi = new DeliusApi()
const hmppsWorkload = new HmppsWorkload()

const parseAllocation = (body: SNSMessage) => {
  const message = JSON.parse(body.Message) as AllocationMessage
  const username = message.senderReference?.identifiers?.find(id => id.type === 'username')?.value
  const crn = message.personReference.identifiers.find(id => id.type === 'CRN').value
  const detailUrl = new URL(message.detailUrl)

  return { username, crn, detailUrl }
}

export const allocateCommunityManager = async (body: SNSMessage) => {
  const { username, crn, detailUrl } = parseAllocation(body)

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

export const allocateEventManager = async (body: SNSMessage) => {
  const { username, crn, detailUrl } = parseAllocation(body)

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

export const allocateRequirementManager = async (body: SNSMessage) => {
  const { username, crn, detailUrl } = parseAllocation(body)

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
