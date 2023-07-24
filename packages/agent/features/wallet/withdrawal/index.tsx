import useGetProfile from 'agent/hooks/useGetProfile'
import { useBankAccountListQuery } from 'agent/services/accountApi'
import { useUserInfoQuery } from 'agent/services/userApi'
import { ActivityIndicator, ScrollView } from 'dripsy'
import AgentWithdrawalForm from './AgentWithdrawalForm'
import AgentWithdrawalHistory from './AgentWithdrawalHistory'
import EmptyBankCard from './EmptyBankCard'

const AgentWithdrawalPage = () => {
  const { data: userData } = useUserInfoQuery()
  const balance = userData?.wallet.balance

  const { currency } = useGetProfile()

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
