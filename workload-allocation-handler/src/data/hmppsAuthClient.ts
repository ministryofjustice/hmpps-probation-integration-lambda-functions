import superagent from 'superagent'
import { URLSearchParams } from 'url'

import logger from '../../logger'
import config from '../config'
import RestClient from './restClient'
import ParameterStore from './parameterStore'

const timeoutSpec = config.apis.hmppsAuth.timeout
const hmppsAuthUrl = config.apis.hmppsAuth.url

export default class HmppsAuthClient {
  constructor(private parameterStore: ParameterStore) {}

  private static restClient(token: string): RestClient {
    return new RestClient('HMPPS Auth Client', config.apis.hmppsAuth, token)
  }

  async getSystemClientToken(username?: string): Promise<string> {
    const [clientId, clientSecret] = await Promise.all([
      this.parameterStore.getParameter(config.apis.hmppsAuth.clientIdParameter),
      this.parameterStore.getParameter(config.apis.hmppsAuth.clientSecretParamater),
    ])

    const grantRequest = new URLSearchParams({
      grant_type: 'client_credentials',
      ...(username && { username }),
    }).toString()

    logger.info(`${grantRequest} HMPPS Auth request for client id '${clientId}'`)

    const response = await superagent
      .post(`${hmppsAuthUrl}/oauth/token`)
      .auth(clientId, clientSecret)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(grantRequest)
      .timeout(timeoutSpec)
    return response.body.access_token
  }
}
