/**
 * @deprecated Zyntex CRM has been replaced with Thrivia CRM (thrivia.io).
 * All dispatches are forwarded directly to Thrivia CRM.
 */
import {
  sendLeadToThriviaCRM,
  checkThriviaCRMConnection,
  ThriviaLeadInput,
  getThriviaApiKey,
  getThriviaEndpoint
} from './thrivia-crm'

export type ZyntexLeadInput = ThriviaLeadInput

/**
 * @deprecated Use sendLeadToThriviaCRM from '@/lib/thrivia-crm' instead.
 */
export async function sendLeadToZyntexCRM(
  data: ZyntexLeadInput
): Promise<{ success: boolean; leadId?: string; error?: string }> {
  return sendLeadToThriviaCRM(data)
}

/**
 * @deprecated Use checkThriviaCRMConnection from '@/lib/thrivia-crm' instead.
 */
export async function checkZyntexCRMConnection() {
  const result = await checkThriviaCRMConnection()
  return {
    ...result,
    apiKey: getThriviaApiKey(),
    webhookUrl: getThriviaEndpoint(),
    orgName: 'Travel Tribes'
  }
}
