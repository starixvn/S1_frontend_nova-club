import { useUserInfoQuery } from 'agent/services/userApi'
import { ROLE } from 'agent/utils/helper'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import { Currency } from 'app/utils/constant'
import { ScrollView, View } from 'dripsy'
import AgentTransferForm from './AgentTransferForm'
import AgentTransferHistory from './AgentTransferHistory'

const AgentFundTransferPage = () => {
  const { push } = useContextualRouter()

  const { isAgent, currency, balance, hasPin } = useUserInfoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      isAgent: data?.role === ROLE.AGENT,
      currency: data?.wallet.currency as Currency,
      balance: data?.wallet.balance,
      hasPin: data?.has_pin,
    }),
  })
  // const hasPin = false

  // useEffect(() => {
  //   if (!hasPin) {
  //     push('/agent/create-pin')
  //   }
  // }, [hasPin, push])

  return (
    <ScrollView>
      <AgentTransferForm
        currency={currency}
        balance={balance ?? 0}
        isAgent={isAgent}
        hasPin={!!hasPin}
      />
      <AgentTransferHistory currency={currency} isAgent={isAgent} />
    </ScrollView>
  )
}

export default AgentFundTransferPage
