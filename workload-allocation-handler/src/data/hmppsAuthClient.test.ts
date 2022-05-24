import nock from 'nock'

import config from '../config'
import HmppsAuthClient from './hmppsAuthClient'
import ParameterStore from './parameterStore'

jest.mock('./parameterStore')

const username = 'Bob'
const token = { access_token: 'token-1', expires_in: 300 }

describe('hmppsAuthClient', () => {
  let parameterStore: ParameterStore
  let fakeHmppsAuthApi: nock.Scope
  let hmppsAuthClient: HmppsAuthClient

  beforeEach(() => {
    parameterStore = { getParameter: jest.fn(() => Promise.resolve('test')) }
    fakeHmppsAuthApi = nock(config.apis.hmppsAuth.url)
    hmppsAuthClient = new HmppsAuthClient(parameterStore)
  })

  afterEach(() => {
    jest.resetAllMocks()
    nock.cleanAll()
  })

  describe('getSystemClientToken', () => {
    it('should return token from HMPPS Auth with username', async () => {
      fakeHmppsAuthApi
        .post(`/oauth/token`, 'grant_type=client_credentials&username=Bob')
        .basicAuth({ user: 'test', pass: 'test' })
        .matchHeader('Content-Type', 'application/x-www-form-urlencoded')
        .reply(200, token)

      const output = await hmppsAuthClient.getSystemClientToken(username)

      expect(output).toEqual(token.access_token)
    })

    it('should return token from HMPPS Auth without username', async () => {
      fakeHmppsAuthApi
        .post(`/oauth/token`, 'grant_type=client_credentials')
        .basicAuth({ user: 'test', pass: 'test' })
        .matchHeader('Content-Type', 'application/x-www-form-urlencoded')
        .reply(200, token)

      const output = await hmppsAuthClient.getSystemClientToken()

      expect(output).toEqual(token.access_token)
    })
  })
})
