import { PageWithBackHeader } from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React from 'react'
import AutoDepositForm from '../components/AutoDepositForm'
import { DepositPaymentMethodCategoryId } from 'app/utils/constant'
import withContextualNav from 'app/navigation/web/withContextualNav'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
const NOTES = ['note.momo1', 'note.momo2', 'note.momo3', 'note.momo4']

const MomoScreen = () => {
  const { t } = useLocalization()

  return (
    <PageWithBackHeader header={{ title: t('deposit.depositMethod.momo') }}>
      <View sx={{ flex: 1 }}>
        <AutoDepositForm
          notes={NOTES}
          module="momo"
          DepositCategoryId={DepositPaymentMethodCategoryId.MOMO}
        />
      </View>
    </PageWithBackHeader>
  )
}

export default withContextualNav(MomoScreen, ContextualModuleKey.DepositMomo)
