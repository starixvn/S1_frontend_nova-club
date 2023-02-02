import { useBankAccountListQuery } from 'agent/services/accountApi'
import { useUserInfoQuery } from 'agent/services/userApi'
import { Currency } from 'app/utils/constant'
import { ActivityIndicator, ScrollView } from 'dripsy'
import AgentWithdrawalForm from './AgentWithdrawalForm'
import AgentWithdrawalHistory from './AgentWithdrawalHistory'
import EmptyBankCard from './EmptyBankCard'

const AgentWithdrawalPage = () => {
  const { balance, currency } = useUserInfoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      balance: data?.result?.data.wallet.balance,
      currency: data?.result?.data.wallet.currency as Currency,
    }),
  })
  const { data: bankListData, isLoading: bankListLoading } =
    useBankAccountListQuery()

  return (
    <>
      {bankListLoading ? (
        <ActivityIndicator
          sx={{
            position: 'absolute',
            left: '47%',
            top: '40%',
          }}
        />
      ) : (
        <ScrollView
          sx={{ width: '100%' }}
          contentContainerSx={{ margin: 0, padding: 0 }}
        >
          {bankListData?.result?.recordsTotal ? (
            <>
              <AgentWithdrawalForm
                currency={currency}
                balance={balance ?? 0}
                bankListData={bankListData}
                bankListLoading={bankListLoading}
              />
              <AgentWithdrawalHistory currency={currency} />
            </>
          ) : (
            <EmptyBankCard />
          )}
        </ScrollView>
      )}
    </>
  )
}

export default AgentWithdrawalPage
