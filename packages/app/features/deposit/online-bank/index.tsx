import { PageWithBackHeader } from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React from 'react'
import AutoDepositForm from '../components/AutoDepositForm'
import { DepositPaymentMethodCategoryId } from 'app/utils/constant'
import withContextualNav from 'app/navigation/web/withContextualNav'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'

const NOTES = ['note.d1', 'note.d2', 'note.d3', 'note.d4']

const OnlineBankScreen = () => {
  const { t } = useLocalization()

  return (
    <PageWithBackHeader
      header={{ title: t('deposit.depositMethod.onlineBanking') }}
    >
      <View sx={{ flex: 1 }}>
        <AutoDepositForm
          notes={NOTES}
          module="deposit"
          DepositCategoryId={DepositPaymentMethodCategoryId.ONLINE_BANK}
        />
      </View>
    </PageWithBackHeader>
  )
}

export default withContextualNav(
  OnlineBankScreen,
  ContextualModuleKey.DepositOnline
)
