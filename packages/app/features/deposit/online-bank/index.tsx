import { Button } from 'app/components/form/Button'
import ImportantNotice from 'app/components/ImportantNotice'
import { PageWithBackHeader } from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { useSubmitDepositMutation } from 'services/deposit'
import { AlertActions } from 'app/store/alert'
import validation from 'app/utils/validation'
import { View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { AutoBankItem } from 'services/deposit.type'
import AutoDepositForm from '../components/AutoDepositForm'
import { DepositPaymentMethodCategoryId } from 'app/utils/constant'
import { SelectOptions } from 'services/common/types'
import { useRouter } from 'solito/router'

const NOTES = ['note.d1', 'note.d2', 'note.d3', 'note.d4']
export type AutoDepositValues = {
  bank: SelectOptions | null
  paymentGateway: AutoBankItem | null
  amount: string
  realAmount: number
}

const OnlineBankScreen = () => {
  const { t } = useLocalization()
  const { back } = useRouter()
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
        process_url: 'https://stage.gball8.com/',
        name: '',
        success_url: 'https://stage.gball8.com/',
      })
        .unwrap()
        .catch((error) => dispatch(AlertActions.addError(error.message)))

      if (success) {
        dispatch(AlertActions.addSuccess(message))
        actions.resetForm()
        back()
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
    <PageWithBackHeader
      header={{ title: t('deposit.depositMethod.onlineBanking') }}
    >
      <View sx={{ flex: 1 }}>
        <AutoDepositForm
          formik={formik}
          DepositCategoryId={DepositPaymentMethodCategoryId.ONLINE_BANK}
        />

        <View sx={{ flex: 1, m: '$4', justifyContent: 'space-between' }}>
          <ImportantNotice keys={NOTES} module="deposit" />

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

export default OnlineBankScreen
