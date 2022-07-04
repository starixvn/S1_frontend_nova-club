import { PageWithBackHeader } from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { AlertActions } from 'app/store/alert'
import * as Yup from 'yup'
import validation from 'app/utils/validation'
import { View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useSubmitDepositMutation } from 'services/deposit'
import { AutoDepositValues } from '../online-bank'
import AutoDepositForm from '../components/AutoDepositForm'
import { DepositPaymentMethodCategoryId } from 'app/utils/constant'
import ImportantNotice from 'app/components/ImportantNotice'
import { Button } from 'app/components/form/Button'
import { useRouter } from 'solito/router'
import withContextualNav from 'app/navigation/web/withContextualNav'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'

const NOTES = ['note.qr1', 'note.qr2', 'note.qr3', 'note.qr4']

const QrTransferScreen = () => {
  const { t } = useLocalization()
  return (
    <PageWithBackHeader header={{ title: t('deposit.depositMethod.qrCode') }}>
      <View sx={{ flex: 1 }}>
        <AutoDepositForm
          notes={NOTES}
          module="qrTransfer"
          DepositCategoryId={DepositPaymentMethodCategoryId.QR_CODE}
        />
      </View>
    </PageWithBackHeader>
  )
}

export default withContextualNav(
  QrTransferScreen,
  ContextualModuleKey.DepositQr
)
