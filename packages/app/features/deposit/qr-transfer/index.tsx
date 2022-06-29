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

const NOTES = ['note.qr1', 'note.qr2', 'note.qr3', 'note.qr4']

const QrTransferScreen = () => {
  const { t } = useLocalization()
  const dispatch = useDispatch()

  const [postSubmitDeposit] = useSubmitDepositMutation()

  const onSubmit = async (
    { bank, paymentGateway, realAmount }: AutoDepositValues,
    actions: FormikHelpers<AutoDepositValues>
  ) => {
    try {
      const { data, success, message } = await postSubmitDeposit({
        amount: realAmount,
        bank: bank?.value ?? '',
        bank_type_id: paymentGateway?.bankTypeId ?? 0,
        card_code: 0,
        card_seri: 0,
        card_type: '',
        deposit_from: paymentGateway?.deposit_from ?? 0,
        fail_url: 'https://stage.gball8.com/',
        home_url: 'https://stage.gball8.com/',
        name: '',
        success_url: 'https://stage.gball8.com/',
      })
        .unwrap()
        .catch((error) => dispatch(AlertActions.addError(error.message)))

      if (success) {
        dispatch(AlertActions.addSuccess(message))
        actions.resetForm()
      }
    } catch (e) {
      dispatch(AlertActions.addError('common.systemError'))
    }
  }

  const formik = useFormik<AutoDepositValues>({
    initialValues: {
      bank: null,
      paymentGateway: null,
      amount: '',
      realAmount: 0,
    },
    validationSchema: Yup.object({
      realAmount: validation.amount,
    }),
    onSubmit,
  })

  const { isValid, dirty, submitForm } = formik
  return (
    <PageWithBackHeader header={{ title: 'deposit.depositMethod.qrCode' }}>
      <View sx={{ flex: 1 }}>
        <AutoDepositForm
          formik={formik}
          DepositCategoryId={DepositPaymentMethodCategoryId.QR_CODE}
        />

        <View sx={{ flex: 1, m: '$4', justifyContent: 'space-between' }}>
          <ImportantNotice keys={NOTES} module="momo" />

          <Button
            rounded
            stretch
            disabled={!isValid || !dirty}
            variant="lg"
            fill={{
              type: 'gradient',
              color: 'secondary',
              start: { x: 0, y: 0 },
              end: { x: 1, y: 0 },
            }}
            containerStyle={{
              my: '$10',
            }}
            onPress={submitForm}
          >
            <Button.Label>{t('common.next')}</Button.Label>
          </Button>
        </View>
      </View>
    </PageWithBackHeader>
  )
}

export default QrTransferScreen
