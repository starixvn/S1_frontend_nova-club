import { TextField } from 'app/components/TextField'
import { AlertActions } from 'app/store/alert'
import { FormikHelpers, useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SelectOptions } from 'services/common/types'
import {
  useDepositPaymentListQuery,
  useSubmitDepositMutation,
} from 'services/deposit'
import {
  AutoBankItem,
  PlayerInputFieldsAmount,
  PlayerInputFieldsBank,
} from 'services/deposit.type'
import { useRouter } from 'solito/router'
import FieldAmount from './FieldAmount'
import FieldSelectBank from './FieldSelectBank'
import * as Yup from 'yup'
import validation from 'app/utils/validation'
import { View } from 'dripsy'
import ImportantNotice from 'app/components/ImportantNotice'
import { Button } from 'app/components/form/Button'
import useLocalization from 'app/provider/localization'
import validationRule from 'app/utils/validationRule'
import { toDisplayAmount } from 'app/utils'
import { Currency } from 'app/utils/constant'
import useContextualRouting from 'app/hooks/useContextualRouting'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import { useModal } from 'react-native-modalfy'
import { usePlayerProfileQuery } from 'services/playerApi'

export type AutoDepositValues = {
  bank: SelectOptions | null
  paymentGateway: AutoBankItem | null
  amount: string
  realAmount: number
}

const AutoDepositForm = ({ notes, module, DepositCategoryId }) => {
  const { makeContextualHref } = useContextualRouting(
    ContextualModuleKey.Deposit
  )
  const to = makeContextualHref('deposit-loader')

  const { t } = useLocalization()
  const { push } = useRouter()
  const dispatch = useDispatch()
  const { openModal, closeModal } = useModal()
  const [postSubmitDeposit] = useSubmitDepositMutation()
  const { data, isLoading, isFetching } = useDepositPaymentListQuery()

  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.data?.currency as Currency

  const depositPayment = data?.data?.result.auto.find(
    (el) => el.category_id === DepositCategoryId
  )
  const paymentGateway = depositPayment?.list[0]
  // const paymentGateway = depositPayment?.list.find((el) =>
  //   el.bank_name_local.includes('COPAY')
  // )
  const inputFields = Object.values(paymentGateway?.player_input_fields ?? {})

  const fieldBank = inputFields.find(
    (el: PlayerInputFieldsBank) => el.type === 'bank_list'
  ) as PlayerInputFieldsBank

  const fieldAmount = inputFields.find(
    (el: PlayerInputFieldsAmount) => el.type === 'float_amount'
  ) as PlayerInputFieldsAmount

  const minAmount = paymentGateway?.minDeposit
  const maxAmount = paymentGateway?.maxDeposit

  useEffect(() => {
    paymentGateway && setFieldValue('paymentGateway', paymentGateway)
  }, [paymentGateway])

  const onSubmit = async (
    { bank, paymentGateway, realAmount }: AutoDepositValues,
    actions: FormikHelpers<AutoDepositValues>
  ) => {
    try {
      actions.setSubmitting(true)
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
        payment_account_id: paymentGateway?.pay_acc_id ?? 0,
        success_url: 'https://stage.gball8.com/',
      })
        .unwrap()
        .catch((error) => dispatch(AlertActions.addError(error.message)))

      if (success) {
        const params = {
          title: depositPayment?.category_text,
          depositUrl: data.url,
        }

        push(makeContextualHref('deposit-loader', params), {
          pathname: '/deposit/deposit-loader',
          query: params,
        })

        // dispatch(AlertActions.addSuccess(message))
        // actions.resetForm()
      }
    } catch (e) {
      dispatch(AlertActions.addError('common.systemError'))
    } finally {
      actions.setSubmitting(false)
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
      amount: validationRule.amount({
        min: toDisplayAmount(minAmount, currency),
        max: toDisplayAmount(maxAmount, currency),
      }),
    }),
    onSubmit,
  })

  const {
    handleChange,
    handleBlur,
    isSubmitting,
    values,
    errors,
    touched,
    isValid,
    dirty,
    submitForm,
    setValues,
    setFieldValue,
  } = formik

  function handleConfirmDeposit() {
    openModal('DepositConfirmationModal', {
      amount: values.realAmount,
      callback: () => onSubmit(values, formik),
    })
  }

  return (
    <TextField labelWidth={0}>
      <FieldSelectBank
        field={fieldBank}
        isLoading={isLoading || isFetching}
        formik={formik}
      />
      <FieldAmount
        field={fieldAmount}
        minAmount={minAmount ?? ''}
        maxAmount={maxAmount ?? ''}
        formik={formik}
      />

      <View sx={{ flex: 1, m: '$4', justifyContent: 'space-between' }}>
        <ImportantNotice keys={notes} module={module} />

        <Button
          rounded
          stretch
          loading={isSubmitting}
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
    </TextField>
  )
}

export default AutoDepositForm
