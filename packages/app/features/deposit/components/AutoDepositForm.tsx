import { DEV_DOMAIN } from '@env'
import { Button } from 'app/components/form/Button'
import InputBase from 'app/components/form/Input/InputBase'
import Select from 'app/components/form/Input/Select'
import { TextField } from 'app/components/TextField'
import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import { ACTION_SHEET_ID } from 'app/constant/actionSheet'
import { MAP_CRYPTO_PROTOCOL } from 'app/constant/bank'
import useAlert from 'app/hooks/useAlert'
import useCheckMobile from 'app/hooks/useCheckMobile'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import useLocalization from 'app/provider/localization'
import { toCurrency, toDisplayAmount } from 'app/utils'
import { Currency } from 'app/utils/constant'
import validation from 'app/utils/validation'
import validationRule from 'app/utils/validationRule'
import { View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useModal } from 'react-native-modalfy'
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
import { usePlayerProfileQuery } from 'services/playerApi'
import * as Yup from 'yup'
import FieldAmount from './FieldAmount'
import FieldSelectBank from './FieldSelectBank'

export type AutoDepositValues = {
  bank: SelectOptions | null
  selectedChannel: AutoBankItem | null
  amount: string
  realAmount: number
}

const AutoDepositForm = ({ module, DepositCategoryId }) => {
  const { t } = useLocalization()
  const { push } = useContextualRouter()
  const { showAlert } = useAlert()
  const { openModal } = useModal()
  const [postSubmitDeposit] = useSubmitDepositMutation()
  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.currency as Currency

  const { isMobile } = useCheckMobile()
  const { data, isLoading, isFetching } = useDepositPaymentListQuery({
    is_mobile: isMobile ? 0 : 1,
  })

  const depositPayment = data?.data?.result.auto.find(
    (el) => el.category_id === DepositCategoryId
  )

  const channelOptions = depositPayment?.list.map(
    (item: AutoBankItem, index: number) => {
      return {
        label:
          depositPayment.category_id === DepositPaymentMethodCategoryId.CRYPTO
            ? MAP_CRYPTO_PROTOCOL[item.bankTypeId]
            : `${t('deposit.channel')} ${index + 1}`,
        value: index,
      }
    }
  )

  const [selectedValues, setSelectedValues] = useState(0)
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
      const result = await postSubmitDeposit({
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
        .catch((error) => showAlert(error))

      if (result?.success) {
        if (DepositCategoryId === DepositPaymentMethodCategoryId.CRYPTO) {
          openModal('DepositCryptoModal', {
            data: result.data,
            persistent: true,
          })
        } else {
          const params = {
            title: depositPayment?.category_text,
            depositUrl: encodeURIComponent(result?.data?.url),
          }

          push('/deposit/deposit-loader', params, { as: 'payment' })
        }
      }
    } catch (error) {
      showAlert(error)
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

  const { isSubmitting, isValid, dirty, submitForm, setFieldValue } = formik

  const handleSelected = (value) => {
    setSelectedValues(value.value)
    formik.resetForm()
  }

  // useEffect(() => {
  //   const cryptoData = {
  //     invoice_amount: '122000',
  //     invoice_currency: 'VND',
  //     message: 'Successfully created payment record',
  //     payment_address: 'TAagYfEtVwA1VUDR3dn2tmEfv3QRYbutus',
  //     payment_amount: '5.148302',
  //     payment_token: 'TRC20-USDT',
  //     rates: '0.00004219919672',
  //     transaction_id: 'D856250278715',
  //     type: 8,
  //   }
  //   openModal('DepositCryptoModal', { data: cryptoData, persistent: true })
  // }, [])

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
          headerTitle: t('deposit.channel'),
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
      </View>
    </TextField>
  )
}

export default AutoDepositForm
