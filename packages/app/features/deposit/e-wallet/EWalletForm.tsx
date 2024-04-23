import { DEV_DOMAIN } from '@env'
import { createSelector } from '@reduxjs/toolkit'
import MoneyInput from 'app/components/MoneyInput'
import Button from 'app/components/common/Button'
import { Options } from 'app/components/select/Select'
import SelectWithCardGrid from 'app/components/select/SelectWithCardGrid'
import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import EmptyAccount from 'app/features/withdrawal/components/EmptyAccount'
import useWithdrawalBankSelection from 'app/features/withdrawal/hooks/useWithdrawalBankSelection'
import useAlert from 'app/hooks/useAlert'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import {
  depositCurrencyDisplay,
  isThousandCurrency,
  toDisplayAmount,
} from 'app/utils'
import validation from 'app/utils/validation'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import BankSelection from 'desktop-ext/features/withdrawal/components/BankSelection'
import { Pressable, Text, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import { Dictionary } from 'lodash'
import groupBy from 'lodash/groupBy'
import { useEffect, useMemo, useState } from 'react'
import { useModal } from 'react-native-modalfy'
import { PlayerBankResult } from 'services/bank.type'
import { IResponse } from 'services/common/types'
import {
  useDepositPaymentListQuery,
  useGetAvailableDepositAmountQuery,
  useSubmitDepositMutation,
} from 'services/deposit'
import { AutoBankItem, DepositPaymentListResult } from 'services/deposit.type'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'
import DailyMax from '../component/DailyMax'
import useDepositFailedMessage from '../tools/useDepositFailedMessage'
import { onAmountChanged } from '../utils'
import useEWalletSelections from './useEWalletSelections'

dayjs.extend(duration)

type EWalletFormValues = {
  amount?: string
  bank?: PlayerBankResult
  realAmount: number
}

const EWalletForm = () => {
  const { push } = useRouter()
  const { t } = useLocalization()
  const [paymentMethodKey, setPaymentMethodKey] = useState<string>()
  const [paymentGatewayIndex, setPaymentGatewayIndex] = useState<number>(0)

  const { showAlert } = useAlert()
  const { openModal } = useModal()
  const [postSubmitDeposit] = useSubmitDepositMutation()
  const currency = useAppSelector((state) => state.setting.currency)
  const horizontalMode = useIsDesktop()

  const { dispatchDepositFailedMessage } = useDepositFailedMessage()
  const { eWalletMethods } = useDepositPaymentListQuery(
    {
      is_mobile: horizontalMode ? 1 : 0,
    },
    {
      selectFromResult: (s) => {
        return {
          ...s,
          eWalletMethods: selectPaymentMethodsEwallet(s.data),
        }
      },
    }
  )

  const { paymentMethodsSelections, paymentGatewaySelections } =
    useEWalletSelections(eWalletMethods, paymentMethodKey)
  const { playerBankList, bankSelections } = useWithdrawalBankSelection()

  const { data: dailyData } = useGetAvailableDepositAmountQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  useEffect(() => {
    /* auto select first method */
    if (!paymentMethodKey) {
      const keys = Object.keys(eWalletMethods)
      if (keys.length > 0) setPaymentMethodKey(keys[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eWalletMethods])

  const onSubmit = async (
    { bank, realAmount }: EWalletFormValues,
    actions: FormikHelpers<EWalletFormValues>
  ) => {
    try {
      if (bank && selectedPaymentGateway) {
        actions.setSubmitting(true)
        const result = await postSubmitDeposit({
          amount: realAmount,
          bank: '',
          player_bank_details_id: bank.PlayerBankDetailsId,
          bank_type_id: selectedPaymentGateway.bankTypeId ?? 0,
          card_code: 0,
          card_seri: 0,
          card_type: '',
          deposit_from: selectedPaymentGateway.deposit_from ?? 0,
          fail_url: DEV_DOMAIN,
          home_url: DEV_DOMAIN,
          process_url: DEV_DOMAIN,
          name: '',
          payment_account_id: selectedPaymentGateway.pay_acc_id ?? 0,
          success_url: DEV_DOMAIN,
        })
          .unwrap()
          .catch((error) => {
            dispatchDepositFailedMessage(error)
            return null
          })

        if (result?.success) {
          openModal('DepositEWalletModal', {
            eWalletInfo: {
              bankAccount: '9110947841',
              bankAccountName: 'Donloh Shrimp Sales Co. Ltd.',
              bank: 'KTB',
              referenceId: 'TK240418922352A7B6',
              transactionId: 'D529891545024',
              amount: '1000.00',
              deposit_amount: '1000.00',
              depositAmount: '1000.00',
              type: 'qr',
              qrString:
                '00020101021253037645802TH29370016A0000006770101110213090556600758154071000.00630404AC',
              channel: 'Hardcoded Speed Pay',
              method: 'Hardcoded PROMPT PAY',
              currency,
            },
          })

          formik.resetForm()

          let keys = Object.keys(eWalletMethods)
          if (keys.length > 0) {
            setPaymentMethodKey(keys[0])
          }
          setPaymentGatewayIndex(0)
        }
      }
    } catch (error) {
      showAlert(error)
    } finally {
      actions.setSubmitting(false)
    }
  }

  const selectedPaymentGateway = useMemo(() => {
    if (eWalletMethods && paymentMethodKey) {
      const selectedMethod = eWalletMethods[paymentMethodKey] as AutoBankItem[]
      if (selectedMethod != null) {
        return selectedMethod[paymentGatewayIndex] as AutoBankItem
      }
    }
  }, [eWalletMethods, paymentMethodKey, paymentGatewayIndex])

  const isShowingK = useMemo(() => isThousandCurrency(currency), [currency])

  const minAmount = Number(selectedPaymentGateway?.minDeposit) ?? 0
  const maxAmount = Number(selectedPaymentGateway?.maxDeposit) ?? 0

  const formik = useFormik<EWalletFormValues>({
    enableReinitialize: true,
    initialValues: {
      realAmount: 0,
      amount: '',
    },
    validationSchema: Yup.object({
      realAmount: validation.amount,
      bank: validation.bank,
      amount: validation.amountMinMax({
        min: toDisplayAmount(minAmount, currency),
        max: toDisplayAmount(maxAmount, currency),
      }),
    }),
    onSubmit,
  })

  const {
    values,
    isSubmitting,
    isValid,
    handleChange,
    setValues,
    handleBlur,
    errors,
    dirty,
    handleSubmit,
    touched,
    setFieldValue,
  } = formik

  function onBankSelected(value) {
    const item = playerBankList?.find((el) => el.BankAccountNumber === value)

    setValues({
      ...values,
      bank: item,
      amount: '',
      realAmount: 0,
    })
  }

  function onPaymentMethodChanged(method: string) {
    setPaymentMethodKey(method)
    setPaymentGatewayIndex(0)
  }

  const renderEmpty = useMemo(
    () => (closeActionSheet) => {
      return (
        <View sx={{ p: '$4', width: '100%', height: '100%' }}>
          <EmptyAccount
            label={t('bank.addBankAccount')}
            onClose={() => push('/account/bank/add-bank-account')}
            onCloseActionSheet={closeActionSheet}
          />
        </View>
      )
    },
    [t]
  )

  return (
    <View sx={{ pt: '$3' }}>
      <View sx={{ px: horizontalMode ? 0 : '$4' }}>
        <Pressable
          onPress={(e) => {
            formik.resetForm()
          }}
        >
          <Text>asdff</Text>
        </Pressable>
        <DailyMax
          type="deposit"
          amount={dailyData?.current}
          dailyMax={dailyData?.max}
        />
        {horizontalMode ? (
          <>
            <BankSelection
              label={t('deposit.paymentMethod')}
              list={paymentMethodsSelections}
              selected={paymentMethodKey}
              onPress={onPaymentMethodChanged}
              imageMode="cover"
            />
            <BankSelection
              label={t('deposit.selectChannel')}
              list={paymentGatewaySelections}
              selected={paymentGatewayIndex?.toString()}
              onPress={(e) => setPaymentGatewayIndex(Number(e))}
              imageMode="cover"
            />
            <BankSelection
              label={t('bank.bank')}
              subtitle={t('bank.selectBank')}
              list={bankSelections}
              selected={values.bank?.BankAccountNumber ?? ''}
              onPress={(e) => onBankSelected(e)}
              onAddNewAccount={() => push('/account/bank/add-bank-account')}
              imageMode="cover"
            />
          </>
        ) : (
          <>
            <SelectWithCardGrid
              label={t('deposit.paymentMethod')}
              placeholder={t('deposit.paymentMethod')}
              options={paymentMethodsSelections}
              value={paymentMethodKey}
              onSelected={onPaymentMethodChanged}
            />
            <SelectWithCardGrid<string>
              label={t('deposit.selectChannel')}
              placeholder={t('deposit.selectChannel')}
              options={paymentGatewaySelections as Options<string>[]}
              value={paymentGatewayIndex.toString()}
              onSelected={handleChange('pgIndex')}
            />
            <SelectWithCardGrid
              label={t('bank.bankAccount')}
              subtitle={values.bank?.BankName}
              placeholder={t('placeholder.plsSelectBank')}
              options={bankSelections}
              value={values.bank?.BankAccountNumber ?? ''}
              sx={{ width: '100%', mb: '$3' }}
              onSelected={(e) => onBankSelected(e)}
              renderEmpty={renderEmpty}
            />
          </>
        )}

        <MoneyInput
          label={t('common.amount')}
          placeholder={t('validation.minMaxLimit', {
            min: depositCurrencyDisplay(minAmount, currency),
            max: depositCurrencyDisplay(maxAmount, currency),
          })}
          isThousandCurrency={isShowingK}
          keyboardType={'number-pad'}
          onChangeText={(t) => onAmountChanged(t, setFieldValue, currency)}
          onBlur={handleBlur('amount')}
          value={values.amount}
          error={
            touched.amount && errors.amount
              ? t(errors.amount, {
                  field: t('common.amount'),
                  amount: depositCurrencyDisplay(values.realAmount, currency),
                  min: depositCurrencyDisplay(minAmount, currency),
                })
              : undefined
          }
        />
        <View sx={{ flex: 1, marginTop: 65, justifyContent: 'space-between' }}>
          <Button
            loading={isSubmitting}
            disabled={!isValid || !dirty}
            onPress={() => handleSubmit()}
          >
            <Text>{t('common.next')}</Text>
          </Button>
        </View>
      </View>
    </View>
  )
}

export default EWalletForm

/* Filter then Group by  
- LNWPAY_EWALLET_PROMPTPAY_PAYMENT_API -> PROMPTPAY_PAYMENT_API
- LNWPAY_EWALLET_TRUEMONEY_PAYMENT_API -> TRUEMONEY_PAYMENT_API
*/
const EmptyDict = {} as Dictionary<AutoBankItem[]>
const selectPaymentMethodsEwallet = createSelector(
  (res: IResponse<DepositPaymentListResult> | undefined) =>
    res?.data?.result.auto,
  (data) => {
    if (data) {
      const eWalletPaymentMethod = data.find(
        (pg) => pg.category_id === DepositPaymentMethodCategoryId.E_WALLET
      )

      if (eWalletPaymentMethod) {
        return groupBy<AutoBankItem>(
          eWalletPaymentMethod.list as AutoBankItem[],
          (item: AutoBankItem) => {
            const match = item.bank_name_local.match(/(?<=EWALLET_)\w+/g)
            return match ? match[0] : null
          }
        )
      }
    }

    return EmptyDict
  }
)
