import MenuNotice from 'app/components/common/MenuNotice'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { ACTION_SHEET_ID } from 'app/constant/actionSheet'
import { FLAG_PAYMENT_TYPE_BANK } from 'app/constant/bank'
import { WITHDRAWAL_NOTES } from 'app/constant/notes'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import useLocalization from 'app/provider/localization'
import { ReportCommonStatus } from 'app/utils/constant'
import { styled, View } from 'dripsy'
import React from 'react'
import { SheetManager } from 'react-native-actions-sheet'
import { useModal } from 'react-native-modalfy'
import { usePlayerBankQuery } from 'services/bank'
import { WITHDRAWAL_TYPE } from 'services/playerApi.type'
import AvailableBalance from './AvailableBalance'
import WithdrawalForm from './components/WithdrawalForm'
import WithdrawalTransactions from './WithdrawalTransactions'

const BankWithdrawalPage = () => {
  const { t } = useLocalization()
  const { push } = useContextualRouter()
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
    SheetManager.hide(ACTION_SHEET_ID.WITHDRAWAL)

    push('/profile/bank-account/add-bank-account')
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

        <WithdrawalTransactions
          status={ReportCommonStatus.PENDING}
          withdrawalType={WITHDRAWAL_TYPE.BANK}
        />
      </StyledView>
    </PageWithBackHeader>
  )
}

const StyledView = styled(View)(() => ({
  flex: 1,
  bg: '$secondary',
}))

export default BankWithdrawalPage
