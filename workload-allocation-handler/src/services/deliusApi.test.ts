import nock from 'nock'

import config from '../config'
import DeliusApi from './deliusApi'

describe('deliusApiClient', () => {
  let fakeDeliusApi: nock.Scope
  let deliusApiClient: DeliusApi

  beforeEach(() => {
    fakeDeliusApi = nock(config.apis.deliusApi.url)
    deliusApiClient = new DeliusApi()
  })

  afterEach(() => {
    jest.resetAllMocks()
    nock.cleanAll()
  })

  describe('allocatePerson', () => {
    it('should call the correct endpoint', async () => {
      fakeDeliusApi
        .post('/v1/offenders/A123456/allocations')
        .matchHeader('Authorization', 'Bearer access-token')
        .reply(200, '{ "id": 1 }')
      await deliusApiClient.allocatePerson(
        'A123456',
        {
          datetime: new Date(),
          staffCode: 'N01A001',
          teamCode: 'N01TEAM',
          reason: 'TEST',
        },
        'access-token'
      )
    })
  })

  describe('allocateEvent', () => {
    it('should call the correct endpoint', async () => {
      fakeDeliusApi
        .post('/v1/offenders/A123456/events/111111/allocations')
        .matchHeader('Authorization', 'Bearer access-token')
        .reply(200, '{ "id": 1 }')
      await deliusApiClient.allocateEvent(
        'A123456',
        111111,
        {
          datetime: new Date(),
          staffCode: 'N01A001',
          teamCode: 'N01TEAM',
          reason: 'TEST',
        },
        'access-token'
      )
    })
  })

  describe('allocateRequirement', () => {
    it('should call the correct endpoint', async () => {
      fakeDeliusApi
        .post('/v1/offenders/A123456/requirements/111111/allocations')
        .matchHeader('Authorization', 'Bearer access-token')
        .reply(200, '{ "id": 1 }')
      await deliusApiClient.allocateRequirement(
        'A123456',
        111111,
        {
          datetime: new Date(),
          staffCode: 'N01A001',
          teamCode: 'N01TEAM',
          reason: 'TEST',
        },
        'access-token'
      )
    })
  })
})
