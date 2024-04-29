import { createSelector } from '@reduxjs/toolkit'
import MoneyInput from 'app/components/MoneyInput'
import Button from 'app/components/common/Button'
import { Options } from 'app/components/select/Select'
import SelectWithCardGrid from 'app/components/select/SelectWithCardGrid'
import { DepositMethodId, PaymentMethodDict } from 'app/config/deposit'
import { ROOT_DOMAIN } from 'app/constants/domain'
import EmptyAccount from 'app/features/withdrawal/components/EmptyAccount'
import useWithdrawalBankSelection from 'app/features/withdrawal/hooks/useWithdrawalBankSelection'
import useAlert from 'app/hooks/useAlert'
import useCheckMobile from 'app/hooks/useCheckMobile'
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
import { Text, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import { isArray } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useModal } from 'react-native-modalfy'
import { PlayerBankResult } from 'services/bank.type'
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
import { Linking, Platform } from 'react-native'

dayjs.extend(duration)

type EWalletFormValues = {
  amount?: string
  bank?: PlayerBankResult
  realAmount: number
}

const EWalletForm = () => {
  const { push } = useRouter()
  const { t } = useLocalization()
  const [categoryId, setCategoryId] = useState<string>()
  const [paymentGatewayIndex, setPaymentGatewayIndex] = useState<number>(0)

  const { showAlert } = useAlert()
  const { openModal } = useModal()
  const horizontalMode = useIsDesktop()
  const { isMobile } = useCheckMobile()

  const currency = useAppSelector((state) => state.setting.currency)

  const [postSubmitDeposit] = useSubmitDepositMutation()
  const { dispatchDepositFailedMessage } = useDepositFailedMessage()
  const { eWalletMethods } = useDepositPaymentListQuery(
    {
      is_mobile: isMobile ? 1 : 0,
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
    useEWalletSelections(eWalletMethods, categoryId)
  const { playerBankList, bankSelections } = useWithdrawalBankSelection()

  const { data: dailyData } = useGetAvailableDepositAmountQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  useEffect(() => {
    /* auto select first method */
    if (
      !categoryId &&
      eWalletMethods &&
      eWalletMethods.length > 0 &&
      eWalletMethods[0]
    ) {
      setCategoryId(eWalletMethods[0].category_id.toString())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eWalletMethods])

  const onSubmit = async (
    { bank, realAmount }: EWalletFormValues,
    actions: FormikHelpers<EWalletFormValues>
  ) => {
    try {
      if (selectedPaymentGateway) {
        actions.setSubmitting(true)
        const result = await postSubmitDeposit({
          amount: realAmount,
          bank: '',
          player_bank_details_id: isBankSelectionRequired
            ? bank?.PlayerBankDetailsId
            : 0,
          bank_type_id: selectedPaymentGateway.bankTypeId ?? 0,
          card_code: 0,
          card_seri: 0,
          card_type: '',
          deposit_from: selectedPaymentGateway.deposit_from ?? 0,
          fail_url: ROOT_DOMAIN,
          home_url: ROOT_DOMAIN,
          process_url: ROOT_DOMAIN,
          name: '',
          payment_account_id: selectedPaymentGateway.pay_acc_id ?? 0,
          success_url: ROOT_DOMAIN,
        })
          .unwrap()
          .catch((error) => {
            dispatchDepositFailedMessage(error)
            return null
          })

        if (result?.success) {
          const type = result?.data?.type

          /* Pre shared value */
          let methodName = ''
          if (eWalletMethods) {
            const category = eWalletMethods.find(
              (pg) => pg.category_id.toString() === categoryId
            )
            if (category) methodName = category.category_text
          }

          switch (type) {
            case 1: {
              if (Platform.OS === 'web') {
                Linking.openURL(result?.data?.url ?? '')
              } else {
                const params = {
                  title: methodName,
                  depositUrl: encodeURIComponent(result?.data?.url ?? ''),
                }

                push('/deposit/deposit-loader', {
                  pathname: '/deposit/deposit-loader',
                  query: params,
                })
              }
              break
            }
            case 3: {
              openModal('DepositEWalletModal', {
                eWalletInfo: {
                  ...result.data,
                  channel: selectedPaymentGateway.payment_account_name,
                  method: methodName,
                  currency,
                },
              })

              break
            }
          }

          formik.resetForm()

          if (
            isArray(eWalletMethods) &&
            eWalletMethods.length > 0 &&
            eWalletMethods[0]
          ) {
            setCategoryId(eWalletMethods[0].category_id.toString())
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
    if (eWalletMethods && categoryId) {
      const selectedMethod = eWalletMethods.find(
        (c) => c.category_id.toString() === categoryId
      )

      if (selectedMethod != null) {
        return selectedMethod.list[paymentGatewayIndex] as AutoBankItem
      }
    }
  }, [eWalletMethods, categoryId, paymentGatewayIndex])

  const isShowingK = useMemo(() => isThousandCurrency(currency), [currency])

  const minAmount = Number(selectedPaymentGateway?.minDeposit) ?? 0
  const maxAmount = Number(selectedPaymentGateway?.maxDeposit) ?? 0

  const isBankSelectionRequired = useMemo(() => {
    return (
      selectedPaymentGateway &&
      Object.values(selectedPaymentGateway.player_input_fields).some(
        (f) => f.field_name === 'display_player_withdrawal_bank_input'
      )
    )
  }, [selectedPaymentGateway])

  const formik = useFormik<EWalletFormValues>({
    enableReinitialize: true,
    initialValues: {
      realAmount: 0,
      amount: '',
    },
    validationSchema: Yup.object({
      realAmount: validation.amount,
      bank: isBankSelectionRequired ? validation.bank : Yup.object(),
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

  function onPaymentMethodChanged(categoryId: string) {
    setCategoryId(categoryId)
    setPaymentGatewayIndex(0)
  }

  function onPaymentGatewayIndexChanged(v: string) {
    formik.resetForm()
    setPaymentGatewayIndex(Number(v))
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
              selected={categoryId}
              onPress={onPaymentMethodChanged}
              imageMode="cover"
            />
            {!!categoryId && (
              <BankSelection
                label={t('deposit.selectChannel')}
                list={paymentGatewaySelections}
                selected={paymentGatewayIndex?.toString()}
                onPress={onPaymentGatewayIndexChanged}
                imageMode="cover"
              />
            )}
            {isBankSelectionRequired && (
              <BankSelection
                label={t('bank.bank')}
                subtitle={t('bank.selectBank')}
                list={bankSelections}
                selected={values.bank?.BankAccountNumber ?? ''}
                onPress={(e) => onBankSelected(e)}
                onAddNewAccount={() => push('/account/bank/add-bank-account')}
                imageMode="cover"
              />
            )}
          </>
        ) : (
          <>
            <SelectWithCardGrid
              label={t('deposit.paymentMethod')}
              placeholder={t('deposit.paymentMethod')}
              options={paymentMethodsSelections}
              value={categoryId}
              onSelected={onPaymentMethodChanged}
            />
            {!!categoryId && (
              <SelectWithCardGrid<string>
                label={t('deposit.selectChannel')}
                placeholder={t('deposit.selectChannel')}
                options={paymentGatewaySelections as Options<string>[]}
                value={paymentGatewayIndex.toString()}
                onSelected={onPaymentGatewayIndexChanged}
              />
            )}
            {isBankSelectionRequired && (
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
            )}
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
const selectPaymentMethodsEwallet = createSelector(
  (res: DepositPaymentListResult | undefined) => res?.result.auto,
  (data) => {
    if (data) {
      const setting = PaymentMethodDict[DepositMethodId.E_WALLET]

      return data.filter((pg) =>
        typeof setting.categoryId === 'number'
          ? pg.category_id === setting.categoryId
          : setting.categoryId.includes(pg.category_id)
      )
    }
  }
)
