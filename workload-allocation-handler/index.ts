/* eslint-disable import/first */
/* eslint-disable import/prefer-default-export */
/*
 * Do appinsights first as it does some magic instrumentation work, i.e. it affects other 'require's
 * In particular, applicationinsights automatically collects bunyan logs
 */
import { buildAppInsightsClient, initialiseAppInsights } from './src/utils/azureAppInsights'

initialiseAppInsights()
buildAppInsightsClient()

import handlerFn from './src/handler'

export const handler = handlerFn
