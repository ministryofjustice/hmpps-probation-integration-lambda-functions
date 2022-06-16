/* eslint-disable import/no-extraneous-dependencies */
import { Context, SQSEvent } from 'aws-lambda'
import promClient from 'prom-client'
import logger from '../logger'
import HmppsAuthClient from './data/hmppsAuthClient'
import DeliusApi from './services/deliusApi'
import HmppsWorkload, { AllocationMessage } from './services/hmppsWorkload'
import ParameterStore from './data/parameterStore'

promClient.collectDefaultMetrics()

const hmppsAuthClient = new HmppsAuthClient(new ParameterStore())
const deliusApi = new DeliusApi()
const hmppsWorkload = new HmppsWorkload()

const handler = async (event: SQSEvent, context: Context): Promise<void> => {
  logger.debug(`Event: ${JSON.stringify(event, null, 2)}`)
  logger.debug(`Context: ${JSON.stringify(context, null, 2)}`)

  // Get values from message
  const message = JSON.parse(event.Records[0].body) as AllocationMessage
  const username = message.senderReference?.identifiers?.find(id => id.type === 'username')?.value
  const crn = message.personReference.identifiers.find(id => id.type === 'CRN').value
  const detailUrl = new URL(message.detailUrl)

  // Get token from HMPPS Auth
  const token = await hmppsAuthClient.getSystemClientToken(username)

  // Get current state of allocation
  const allocation = await hmppsWorkload.getPersonAllocationDetail(detailUrl, token)

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

export default handler
