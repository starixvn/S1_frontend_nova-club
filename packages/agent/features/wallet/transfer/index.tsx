import { useUserInfoQuery } from 'agent/services/userApi'
import { ROLE } from 'agent/utils/helper'
import { useIsFocused } from 'app/hooks/isFocus/useIsFocused'
import { useAppSelector } from 'app/provider/redux/store'
import { ScrollView } from 'dripsy'
import { useEffect } from 'react'
import { useRouter } from 'solito/router'
import { Currency } from 'utils/constant'
import AgentTransferForm from './AgentTransferForm'
import AgentTransferHistory from './AgentTransferHistory'

const AgentFundTransferPage = () => {
  const { push } = useRouter()
  const isFocus = useIsFocused()

  const currency = useAppSelector((s) => s.agent.currency)

  const { isAgent, balance, hasPin, isFetching, isUninitialized } =
    useUserInfoQuery(undefined, {
      selectFromResult: ({ data, isFetching, isUninitialized }) => ({
        isAgent: data?.role === ROLE.AGENT,
        currency: data?.wallet.currency as Currency,
        balance: data?.wallet.balance,
        hasPin: data?.has_pin,
        isFetching,
        isUninitialized,
      }),
    })
  useEffect(() => {
    if (isFetching || isUninitialized || !isFocus) return
    if (!hasPin) {
      push('/agent/create-pin')
    } else {
      push('/agent/wallet/transfer')
    }
  }, [isFocus, isFetching])

  if (!hasPin || isUninitialized || isFetching) {
    return null
  }

  return (
    <ScrollView sx={{ bg: 'white' }}>
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
