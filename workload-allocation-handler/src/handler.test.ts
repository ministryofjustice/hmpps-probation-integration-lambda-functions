import { SQSEvent, SQSRecord } from 'aws-lambda'
import { handler } from './handler'
import { allocateCommunityManager, allocateEventManager, allocateRequirementManager } from './allocations'

jest.mock('./allocations.ts')

describe('Test person allocation handler', () => {
  const record: Partial<SQSRecord> = {
    body: '{ "MessageAttributes": { "eventType": { "Value": "person.community.manager.allocated" } } }',
  }

  it('Verifies successful dispatch', async () => {
    const event: SQSEvent = {
      Records: [record as SQSRecord],
    }

    // Run the handler
    await handler(event)

    // Check that allocateCommunityManager was called
    expect(allocateCommunityManager).toHaveBeenCalled()
  })
})

describe('Test event allocation handler', () => {
  const record: Partial<SQSRecord> = {
    body: '{ "MessageAttributes": { "eventType": { "Value": "event.manager.allocated" } } }',
  }

  it('Verifies successful dispatch', async () => {
    const event: SQSEvent = {
      Records: [record as SQSRecord],
    }

    // Run the handler
    await handler(event)

    // Check that allocateEventManager was called
    expect(allocateEventManager).toHaveBeenCalled()
  })
})

describe('Test requirement allocation handler', () => {
  const record: Partial<SQSRecord> = {
    body: '{ "MessageAttributes": { "eventType": { "Value": "requirement.manager.allocated" } } }',
  }

  it('Verifies successful dispatch', async () => {
    const event: SQSEvent = {
      Records: [record as SQSRecord],
    }

    // Run the handler
    await handler(event)

    // Check that allocateRequirementManager was called
    expect(allocateRequirementManager).toHaveBeenCalled()
  })
})
