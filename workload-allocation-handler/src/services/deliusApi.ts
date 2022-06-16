import { Response } from 'superagent'
import logger from '../../logger'
import config from '../config'
import RestClient from '../data/restClient'

interface AllocationRequest {
  staffCode: string
  teamCode: string
  datetime: Date
  reason: string
}

export default class DeliusApi {
  private static restClient(token: string): RestClient {
    return new RestClient('Delius API Client', config.apis.deliusApi, token)
  }

  async allocatePerson(crn: string, allocation: AllocationRequest, token: string): Promise<void> {
    const response = (await DeliusApi.restClient(token).post({
      path: `/v1/offenders/${crn}/allocations`,
      data: { ...allocation },
      responseType: 'json',
      raw: true,
    })) as Response
    logger.info(`Call to post allocations endpoint: Status=${response.status} Body=${response.body}`)
  }
}
