import Input from 'app/components/form/Input'
import InputLabel from 'app/components/form/InputLabel'
import { getBankLogo } from 'app/config/bank'
import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import {
  toCleanAmount,
  toCurrency,
  toDisplayAmount,
  toRealAmount,
} from 'app/utils'
import { Currency } from 'app/utils/constant'
import validation from 'app/utils/validation'
import { Pressable, Text, View, styled, useResponsiveValue } from 'dripsy'
import * as ImagePicker from 'expo-image-picker'
import { FormikHelpers, useFormik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { TextInput } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import {
  useDepositPaymentListQuery,
  useSubmitManualDepositMutation,
} from 'services/deposit'
import { ManualBankItem } from 'services/deposit.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import * as Yup from 'yup'
import BankSlipUpload, {
  BankSlipUploadMethod,
} from '../component/BankSlipUpload'
import HorizontalSelectBankCardGrid from '../component/HorizontalSelectBankCardGrid'
import AccountDetail from './AccountDetail'
import SelectWithCardGrid from 'app/components/select/SelectWithCardGrid'

type BankTransferValues = {
  bank: ManualBankItem | undefined
  amount: string
  realAmount: number
}

const BankTransferForm = () => {
  const { t } = useLocalization()
  const { showAlert } = useAlert()
  const { openModal } = useModal()
  const [receipt, setReceipt] = useState<ImagePicker.ImagePickerAsset>()
  const [limit, setLimit] = useState({ minAmount: 0, maxAmount: 0 })
  const bankSlipUploadRef = useRef<BankSlipUploadMethod>(null)
  const amountFieldRef = useRef<TextInput>(null)
  const { data, isLoading, isFetching } = useDepositPaymentListQuery({
    is_mobile: 1,
  })
  const [submitDeposit] = useSubmitManualDepositMutation()
  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.currency as Currency
  const depositPayment = data?.data?.result.manual.find(
    (el) => el.category_id === DepositPaymentMethodCategoryId.LOCAL_BANK
  )

  const horizontalMode = useResponsiveValue([false, false, false, true, true])

  const sheetData =
    depositPayment?.list.map((item) => {
      return {
        label: item.bank_acc_name,
        value: item.bankTypeId.toString(),
        icon: getBankLogo(item.bank_code),
      }
    }) ?? []

  const handleSelected = (value) => {
    const item = depositPayment?.list?.find(
      (el) => el.bankTypeId.toString() === value
    )

    setFieldValue('bank', item)
  }

  const onSubmit = async (
    { bank, amount, realAmount }: BankTransferValues,
    actions: FormikHelpers<BankTransferValues>
  ) => {
    try {
      const depositResp = await submitDeposit({
        acc_name: bank?.bank_acc_name ?? '',
        amount: realAmount,
        bank_type_id: bank?.bankTypeId ?? 0,
        payment_account_id: bank?.pay_acc_id ?? 0,
      })
        .unwrap()
        .catch((error) => {
          showAlert(error)
          return null
        })
      if (depositResp) {
        const { success, data, message } = depositResp
        if (success && data) {
          if (receipt)
            if (bankSlipUploadRef.current)
              await bankSlipUploadRef.current.uploadBankSlip(data.secure_id)

          Toast.show({ type: 'success', text1: message })
          setReceipt(undefined)
          actions.resetForm()
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  const formik = useFormik<BankTransferValues>({
    initialValues: {
      bank: undefined,
      amount: '',
      realAmount: 0,
    },
    validationSchema: Yup.object({
      realAmount: validation.amount,
      bank: validation.bank,
      amount: validation.amountMinMax({
        min: toDisplayAmount(limit.minAmount, currency),
        max: toDisplayAmount(limit.maxAmount, currency),
      }),
    }),
    onSubmit,
  })

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
    values,
    errors,
    touched,
    isValid,
    dirty,
    setValues,
    setFieldValue,
  } = formik

  useEffect(() => {
    const bank = values.bank
    if (bank)
      setLimit({
        minAmount: Number(bank.minDeposit) ?? 0,
        maxAmount: Number(bank.maxDeposit) ?? 0,
      })
  }, [values.bank])

  function onAmountChanged(text: string) {
    if (text != null) {
      const { cleanText, amountNumber } = toCleanAmount(text)
      setValues({
        ...values,
        amount: cleanText,
        realAmount: toRealAmount(amountNumber),
      })
    }
  }

  function handleConfirmDeposit() {
    openModal('DepositConfirmationModal', {
      amount: values.realAmount,
      callback: () => handleSubmit(),
    })
  }

  return (
    <View sx={{ pt: '$3' }}>
      <View sx={{ px: horizontalMode ? 0 : '$4' }}>
        {horizontalMode ? (
          <View>
            <InputLabel label={t('bank.bank')} />
            <View
              sx={{
                flex: 1,
                flexDirection: 'column',
                borderWidth: 1,
                borderRadius: 15,
                borderColor: '$primary.200',
                p: 19,
              }}
            >
              <Text sx={{ m: '$2', fontSize: 20, fontWeight: 'bold' }}>
                {values.bank?.bank_branch}
              </Text>
              <View sx={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {sheetData &&
                  sheetData.map((e, i) => {
                    return (
                      <View key={i} sx={{ width: '25%' }}>
                        <HorizontalSelectBankCardGrid
                          key={i}
                          item={e}
                          onPress={() => handleSelected(e.value)}
                          selected={
                            e.value === values.bank?.bankTypeId.toString()
                          }
                        />
                      </View>
                    )
                  })}
              </View>
            </View>
          </View>
        ) : (
          <SelectWithCardGrid
            label={t('bank.bankAccount')}
            placeholder={t('placeholder.plsSelectBank')}
            options={sheetData}
            value={values.bank?.bankTypeId.toString() ?? ''}
            sx={{
              width: '100%',
              mb: '$3',
            }}
            onSelected={(e) => {
              handleSelected(e)
            }}
            _input={{
              error:
                touched.bank && errors.bank ? (
                  <Text sx={{ color: errors.bank && '$secondary.500' }}>
                    {t(errors.bank, {
                      field: t('common.bank'),
                    })}
                  </Text>
                ) : undefined,
            }}
          />
        )}
      </View>

      <View
        sx={{
          pt: horizontalMode ? '$4' : 0,
        }}
      >
        {values.bank && (
          <AccountDetail
            accountName={values.bank.bank_acc_name}
            accountNumber={values.bank.bank_acc_no}
            qrCode={values.bank.bankQR}
          />
        )}
      </View>

      <View sx={{ px: horizontalMode ? 0 : '$4' }}>
        <Input
          label={t('deposit.depositAmount')}
          placeholder={t('validation.minMaxLimit', {
            min: toCurrency(limit.minAmount ?? 0, currency, {
              symbol: false,
              forceDecimal: false,
            }),
            max: toCurrency(limit.maxAmount ?? 0, currency, {
              symbol: false,
              forceDecimal: false,
            }),
          })}
          value={values.amount}
          onBlur={handleBlur('amount')}
          onChangeText={onAmountChanged}
          ref={amountFieldRef}
          action={() => (
            <>
              <Text sx={{ color: '$secondary.100' }}>
                = {values.amount ? values.amount : 0}K
              </Text>
            </>
          )}
          error={
            touched.amount && errors.amount
              ? t(errors.amount, {
                  field: t('common.amount'),
                  amount: toCurrency(values.realAmount ?? 0, currency, {
                    forceDecimal: false,
                    symbol: false,
                  }),
                  min: toCurrency(limit.minAmount ?? 0, currency, {
                    forceDecimal: false,
                    symbol: false,
                  }),
                })
              : undefined
          }
        />
        <BankSlipUpload
          ref={bankSlipUploadRef}
          value={receipt}
          onChange={(f) => {
            setReceipt(f)
          }}
        />
        <ButtonContainer
          sx={{ bg: '$secondary.500', marginTop: 65 }}
          disabled={!isValid || !dirty}
          onPress={handleConfirmDeposit}
        >
          <ButtonText>{t('common.next')}</ButtonText>
        </ButtonContainer>
      </View>
    </View>
  )
}

const ButtonContainer = styled(Pressable)({
  borderRadius: 15,
  mb: 20,
  alignItems: 'center',
})

const ButtonText = styled(Text)({
  width: '100%',
  py: 15,
  px: 25,
  textAlign: 'center',
  textTransform: 'uppercase',
  fontWeight: 'bold',
})

export default BankTransferForm
