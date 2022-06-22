/* eslint-disable import/no-extraneous-dependencies */
import { SQSEvent } from 'aws-lambda'
import { SNSMessage } from 'aws-lambda/trigger/sns'

import promClient from 'prom-client'
import logger from '../logger'
import { allocateCommunityManager, allocateEventManager, allocateRequirementManager } from './allocations'

promClient.collectDefaultMetrics()

export const handler = async (event: SQSEvent): Promise<void> => {
  // logger.debug(`Event: ${JSON.stringify(event, null, 2)}`)
  logger.debug(`Messages Received: ${event.Records.length}`)

  await Promise.all(
    event.Records.map(async record => {
      // Get values from message
      const body = JSON.parse(record.body) as SNSMessage

      // Determine message event type
      const eventType: string = body.MessageAttributes.eventType.Value

      // Debug logging
      logger.debug(`Body: ${JSON.stringify(body)}`)
      logger.debug(`Event Type: ${eventType}`)

      // Person Allocation
      if (eventType === 'person.community.manager.allocated') {
        await allocateCommunityManager(body)
      }

      // Event Allocation
      else if (eventType === 'event.manager.allocated') {
        await allocateEventManager(body)
      }

      // Requirement Allocation
      else if (eventType === 'requirement.manager.allocated') {
        await allocateRequirementManager(body)
      }
    })
  )
}

export default handler
