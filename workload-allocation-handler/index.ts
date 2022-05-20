/* eslint-disable import/first */
/*
 * Do appinsights first as it does some magic instrumentation work, i.e. it affects other 'require's
 * In particular, applicationinsights automatically collects bunyan logs
 */
import { buildAppInsightsClient, initialiseAppInsights } from './src/utils/azureAppInsights'
import handler from './src/handler'

initialiseAppInsights()
buildAppInsightsClient()

export default { handler }
