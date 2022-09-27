import { TextField } from 'app/components/TextField'
import { AlertActions } from 'app/store/alert.slice'
import { FormikHelpers, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
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
import validation, { getErrorMessage } from 'app/utils/validation'
import { View } from 'dripsy'
import ImportantNotice from 'app/components/ImportantNotice'
import { Button } from 'app/components/form/Button'
import useLocalization from 'app/provider/localization'
import validationRule from 'app/utils/validationRule'
import { toCurrency, toDisplayAmount } from 'app/utils'
import { Currency } from 'app/utils/constant'
import useContextualRouting from 'app/hooks/useContextualRouting'
import { useModal } from 'react-native-modalfy'
import { usePlayerProfileQuery } from 'services/playerApi'
import { DEPOSIT_NOTES } from 'app/constant/notes'
import Select from 'app/components/form/Input/Select'
import InputBase from 'app/components/form/Input/InputBase'
import { DEV_DOMAIN } from '@env'
import { ACTION_SHEET_ID } from 'app/constant/actionSheet'

export type AutoDepositValues = {
  bank: SelectOptions | null
  selectedChannel: AutoBankItem | null
  amount: string
  realAmount: number
}

const AutoDepositForm = ({ module, DepositCategoryId }) => {
  const { makeContextualHref } = useContextualRouting()
  const to = makeContextualHref('deposit-loader')

  const { t } = useLocalization()
  const { push } = useRouter()
  const dispatch = useDispatch()
  const { openModal, closeModal } = useModal()
  const [postSubmitDeposit] = useSubmitDepositMutation()
  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.data?.currency as Currency

  const { data, isLoading, isFetching } = useDepositPaymentListQuery()

  const depositPayment = data?.data?.result.auto.find(
    (el) => el.category_id === DepositCategoryId
  )
  const channelOptions = depositPayment?.list.map((_, index) => {
    return {
      label: `${t('deposit.channel')} ${index + 1}`,
      value: index,
    }
  })

  const [selectedValues, setSelectedValues] = useState(0)
  // const [selectedChannel, setSelectedChannel] = useState(
  //   depositPayment?.list[0]
  // )
  const selectedChannel = depositPayment?.list[selectedValues]
  const inputFields = Object.values(selectedChannel?.player_input_fields ?? {})

  const fieldBank = inputFields.find(
    (el: PlayerInputFieldsBank) => el.type === 'bank_list'
  ) as PlayerInputFieldsBank

  const fieldAmount = inputFields.find(
    (el: PlayerInputFieldsAmount) => el.type === 'float_amount'
  ) as PlayerInputFieldsAmount

  const minAmount = selectedChannel?.minDeposit
  const maxAmount = selectedChannel?.maxDeposit

  useEffect(() => {
    selectedChannel && setFieldValue('selectedChannel', selectedChannel)
  }, [selectedChannel])

  const onSubmit = async (
    { bank, selectedChannel, realAmount }: AutoDepositValues,
    actions: FormikHelpers<AutoDepositValues>
  ) => {
    try {
      actions.setSubmitting(true)
      const { data, success, message } = await postSubmitDeposit({
        amount: realAmount,
        bank: bank?.value ?? '',
        bank_type_id: selectedChannel?.bankTypeId ?? 0,
        card_code: 0,
        card_seri: 0,
        card_type: '',
        deposit_from: selectedChannel?.deposit_from ?? 0,
        fail_url: DEV_DOMAIN,
        home_url: DEV_DOMAIN,
        process_url: DEV_DOMAIN,
        name: '',
        payment_account_id: selectedChannel?.pay_acc_id ?? 0,
        success_url: DEV_DOMAIN,
      })
        .unwrap()
        .catch((error) =>
          openModal('AlertModal', { message: getErrorMessage(error) })
        )

      if (success) {
        const params = {
          title: depositPayment?.category_text,
          depositUrl: data.url,
        }

        push(makeContextualHref('deposit-loader', params), {
          pathname: '/deposit/deposit-loader',
          query: params,
        })
      }
    } catch (error) {
      openModal('AlertModal', { message: getErrorMessage(error) })
    } finally {
      actions.setSubmitting(false)
    }
  }

  const formik = useFormik<AutoDepositValues>({
    initialValues: {
      bank: null,
      selectedChannel: null,
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

  const handleSelected = (value) => {
    setSelectedValues(value)
    // setSelectedChannel(depositPayment?.list[value])
    console.log('value', depositPayment?.list[value])
  }

  return (
    <TextField labelWidth={0}>
      <Select
        label={t('deposit.selectChannel')}
        placeholder={t('deposit.selectChannel')}
        value={(channelOptions && channelOptions[selectedValues]?.label) ?? ''}
        loading={isLoading || isFetching}
        options={channelOptions}
        onSelected={handleSelected}
        sx={{ mt: '$2', mb: 0 }}
        _actionSheet={{
          sheetId: ACTION_SHEET_ID.CHANNEL,
          headerTitle: t('bank.bank'),
        }}
      />

      <InputBase
        removeBorder
        label={t('deposit.minMaxLimit')}
        sx={{ mb: 0 }}
        value={`${toCurrency(minAmount ?? 0, currency, {
          symbol: false,
          forceDecimal: false,
        })} / ${toCurrency(maxAmount ?? 0, currency, {
          symbol: false,
          forceDecimal: false,
        })}`}
        editable={false}
      />
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

      <View sx={{ flex: 1, justifyContent: 'space-between' }}>
        {/* <ImportantNotice keys={DEPOSIT_NOTES} module={module} /> */}

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
            m: '$10',
          }}
          onPress={submitForm}
        >
          <Button.Label>{t('common.next')}</Button.Label>
        </Button>

        <Button
          onPress={() => {
            openModal('AlertModal', { message: getErrorMessage('error') })
          }}
        >
          <Button.Label>Modal</Button.Label>
        </Button>
      </View>
    </TextField>
  )
}

export default AutoDepositForm
