import logger from '../../logger'
import config from '../config'
import RestClient from '../data/restClient'

export interface AllocationMessage {
  eventType: string
  version: number
  description: string
  detailUrl: string
  occurredAt: Date
  additionalInformation: Map<string, unknown>
  personReference: {
    identifiers: [
      {
        type: string
        value: string
      }
    ]
  }
  senderReference: {
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

export default class HmppsWorkload {
  private static restClient(token: string): RestClient {
    return new RestClient('HMPPS Workload', config.apis.hmppsWorkload, token)
  }

  async getPersonAllocation(allocationId: string, token: string): Promise<PersonManagerDetails> {
    const response = (await HmppsWorkload.restClient(token).get({
      path: `/allocation/person/${allocationId}`,
      raw: true,
    })) as Response
    logger.info(`Call to get allocation endpoint: Status=${response.status} Body=${response.body}`)
    return (await response.json()) as Promise<PersonManagerDetails>
  }
}
