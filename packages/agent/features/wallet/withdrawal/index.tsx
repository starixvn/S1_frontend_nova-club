import { useBankAccountListQuery } from 'agent/services/accountApi'
import { useProfileDetailQuery } from 'agent/services/profileApi'
import { useUserInfoQuery } from 'agent/services/userApi'
import { useAppSelector } from 'app/provider/redux/store'
import { ActivityIndicator, ScrollView } from 'dripsy'
import { Currency } from 'utils/constant'
import AgentWithdrawalForm from './AgentWithdrawalForm'
import AgentWithdrawalHistory from './AgentWithdrawalHistory'
import EmptyBankCard from './EmptyBankCard'

const AgentWithdrawalPage = () => {
  const { data: userData } = useUserInfoQuery()
  const balance = userData?.wallet.balance

  const currency = useAppSelector((s) => s.setting.currency)

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
          sx={{ width: '100%', bg: 'white' }}
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
