import { useUserInfoQuery } from 'agent/services/userApi'
import { ROLE } from 'agent/utils/helper'
import { useIsFocused } from 'app/hooks/isFocus/useIsFocused'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import { Currency } from 'app/utils/constant'
import { ScrollView } from 'dripsy'
import { useEffect } from 'react'
import AgentTransferForm from './AgentTransferForm'
import AgentTransferHistory from './AgentTransferHistory'

const AgentFundTransferPage = () => {
  const { push } = useContextualRouter()
  const isFocus = useIsFocused()

  const { isAgent, currency, balance, hasPin, isFetching } = useUserInfoQuery(
    undefined,
    {
      selectFromResult: ({ data, isFetching }) => ({
        isAgent: data?.role === ROLE.AGENT,
        currency: data?.wallet.currency as Currency,
        balance: data?.wallet.balance,
        hasPin: data?.has_pin,
        isFetching,
      }),
    }
  )
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!hasPin && !isFetching) {
        push('/agent/create-pin')
      } else {
        push('/agent/wallet/transfer')
      }
    }, 500)
    return () => clearTimeout(timeout)
  }, [isFocus, isFetching])

  if (!hasPin) {
    return null
  }
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
