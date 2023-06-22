import { PageWithBackHeader } from 'app/components/layouts/Page'
import MenuNotice from 'app/components/navigation/MenuNotice'
import useLocalization from 'app/provider/localization'
import { ReportCommonStatus, WITHDRAWAL_NOTES } from 'app/utils/constant'
import { View, styled } from 'dripsy'
import React from 'react'
import { useModal } from 'react-native-modalfy'
import { WITHDRAWAL_TYPE } from 'services/playerApi.type'
import { useRouter } from 'solito/router'
import WithdrawalForm from './components/WithdrawalForm'
import WithdrawalTransactions from './components/WithdrawalTransactions'
import AvailableBalance from './components/AvailableBalance'

const BankWithdrawalScreen = () => {
  const { t } = useLocalization()
  const { openModal } = useModal()

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
        <WithdrawalForm isCrypto={false} />
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
