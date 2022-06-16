/* eslint-disable import/no-extraneous-dependencies */
import { SSM } from 'aws-sdk'

export default class ParameterStore {
  async getParameter(name: string): Promise<string> {
    const ssm = new SSM()
    const result = await ssm.getParameter({ Name: name, WithDecryption: true }).promise()
    return result.Parameter.Value
  }
}
