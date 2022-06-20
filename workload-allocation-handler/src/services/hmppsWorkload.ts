import { Response } from 'superagent'
import logger from '../../logger'
import config from '../config'
import RestClient from '../data/restClient'

export interface AllocationMessage {
  eventType: string
  version: number
  description: string
  detailUrl: string
  occurredAt: Date
  additionalInformation: {
    allocationId: string
  }
  personReference: {
    identifiers: [
      {
        type: string
        value: string
      }
    ]
  }
  senderReference?: {
    // TODO this isn't part of the spec yet
    identifiers: [
      {
        type: string
        value: string
      }
    ]
  }
}

interface PersonManagerDetails {
  id: string
  staffId: number
  staffCode: string
  teamCode: string
  providerCode: string
  createdBy: string
  createdDate: Date
  crn: string
  personName: string
  staffGrade: string
  staffEmail: string
  staffForename: string
  staffSurname: string
}

interface EventManagerDetails {
  id: string
  staffId: number
  staffCode: string
  teamCode: string
  providerCode: string
  createdBy: string
  createdDate: Date
  eventId: number
}

interface RequirementManagerDetails {
  id: string
  staffId: number
  staffCode: string
  teamCode: string
  providerCode: string
  createdBy: string
  createdDate: Date
  eventId: number
  requirementId: number
}

export default class HmppsWorkload {
  private static restClient(token: string): RestClient {
    return new RestClient('HMPPS Workload', config.apis.hmppsWorkload, token)
  }

  async getPersonAllocationDetail(detailUrl: URL, token: string): Promise<PersonManagerDetails> {
    if (!detailUrl.toString().startsWith(config.apis.hmppsWorkload.url)) {
      logger.warn("Provided detailUrl doesn't match configured URL for HMPPS Workload API")
    }
    const response = (await HmppsWorkload.restClient(token).get({
      path: new URL(detailUrl).pathname,
      raw: true,
    })) as Response
    logger.info(`Call to get allocation endpoint: Status=${response.status} Body=${JSON.stringify(response.body)}`)
    return response.body as PersonManagerDetails
  }

  async getEventAllocationDetail(detailUrl: URL, token: string): Promise<EventManagerDetails> {
    if (!detailUrl.toString().startsWith(config.apis.hmppsWorkload.url)) {
      logger.warn("Provided detailUrl doesn't match configured URL for HMPPS Workload API")
    }
    const response = (await HmppsWorkload.restClient(token).get({
      path: new URL(detailUrl).pathname,
      raw: true,
    })) as Response
    logger.info(`Call to get allocation endpoint: Status=${response.status} Body=${JSON.stringify(response.body)}`)
    return response.body as EventManagerDetails
  }

  async getRequirementAllocationDetail(detailUrl: URL, token: string): Promise<RequirementManagerDetails> {
    if (!detailUrl.toString().startsWith(config.apis.hmppsWorkload.url)) {
      logger.warn("Provided detailUrl doesn't match configured URL for HMPPS Workload API")
    }
    const response = (await HmppsWorkload.restClient(token).get({
      path: new URL(detailUrl).pathname,
      raw: true,
    })) as Response
    logger.info(`Call to get allocation endpoint: Status=${response.status} Body=${JSON.stringify(response.body)}`)
    return response.body as RequirementManagerDetails
  }
}
