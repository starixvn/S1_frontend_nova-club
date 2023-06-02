import { PageWithBackHeader } from 'app/components/layouts/Page'
import MenuNotice from 'app/components/navigation/MenuNotice'
import { FLAG_PAYMENT_TYPE_BANK } from 'app/constants/crypto'
import useLocalization from 'app/provider/localization'
import { ReportCommonStatus, WITHDRAWAL_NOTES } from 'app/utils/constant'
import { View, styled } from 'dripsy'
import React from 'react'
import { useModal } from 'react-native-modalfy'
import { usePlayerBankQuery } from 'services/bank'
import { WITHDRAWAL_TYPE } from 'services/playerApi.type'
import { useRouter } from 'solito/router'
import AvailableBalance from './components/AvailableBalance'
import WithdrawalTransactions from './components/WithdrawalTransactions'
import WithdrawalForm from './components/WithdrawalForm'

const BankWithdrawalScreen = () => {
  const { t } = useLocalization()
  const { push } = useRouter()
  const { openModal } = useModal()

  const { bankData, isLoading, isFetching } = usePlayerBankQuery(undefined, {
    selectFromResult: (s) => ({
      ...s,
      bankData: s.data?.data?.filter(
        (b) => b.PaymentTypeFlag === FLAG_PAYMENT_TYPE_BANK
      ),
    }),
  })

  const handleGoToBankPress = () => {
    push('/account/profile/bank/add-bank-account')
  }

  return (
    <PageWithBackHeader
      header={{
        title: t('menu.bankWithdraw'),
        actions: (
          <MenuNotice
            onPress={() =>
              openModal('NoticeModal', { notice: WITHDRAWAL_NOTES })
            }
          />
        ),
      }}
    >
      <StyledView>
        <AvailableBalance />

        <WithdrawalForm
          bankData={bankData}
          bankLoading={isLoading || isFetching}
          onGoToBank={handleGoToBankPress}
          isCrypto={false}
        />
      </StyledView>
      <WithdrawalTransactions
        status={ReportCommonStatus.PENDING}
        withdrawalType={WITHDRAWAL_TYPE.BANK}
      />
    </PageWithBackHeader>
  )
}

const StyledView = styled(View)(() => ({
  flex: 1,
  p: '$pagePadding',
}))

export default BankWithdrawalScreen
