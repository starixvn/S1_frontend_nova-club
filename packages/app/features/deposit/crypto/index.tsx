import MenuNotice from 'app/components/common/MenuNotice'
import { Button } from 'app/components/form/Button'
import GradientBox from 'app/components/GradientBox'
import Icon from 'app/components/Icon'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { TextField } from 'app/components/TextField'
import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import { DEPOSIT_NOTES } from 'app/constant/notes'
import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import {
  toCleanAmount,
  toCurrency,
  toDisplayAmount,
  toRealAmount,
} from 'app/utils'
import { Currency, MaxLength } from 'app/utils/constant'
import validation from 'app/utils/validation'
import validationRule from 'app/utils/validationRule'
import { styled, Text, TextInput, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React from 'react'
import { useModal } from 'react-native-modalfy'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import {
  useDepositPaymentListQuery,
  useSubmitManualDepositMutation,
} from 'services/deposit'
import { ManualBankItem } from 'services/deposit.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import * as Yup from 'yup'

const ICON_SIZE = 50
const NOTES = [
  'note.deposit.crypto1',
  'note.deposit.crypto2',
  'note.deposit.crypto3',
]

type CryptoValues = {
  amount: string
  realAmount: number
}
const CryptoScreen = () => {
  const { t } = useLocalization()
  const { showAlert } = useAlert()
  const { openModal } = useModal()
  const [postSubmitManualDeposit] = useSubmitManualDepositMutation()
  const { data, isLoading, isFetching } = useDepositPaymentListQuery()

  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.data?.currency as Currency

  const depositPayment = data?.data?.result.manual.find(
    (el) => el.category_id === DepositPaymentMethodCategoryId.CRYPTO
  )
  const bank = depositPayment?.list[0] as ManualBankItem

  const minAmount = bank?.minDeposit ?? 0
  const maxAmount = bank?.maxDeposit ?? 0

  const onSubmit = async (
    { realAmount }: CryptoValues,
    actions: FormikHelpers<CryptoValues>
  ) => {
    try {
      actions.setSubmitting(true)
      const { data, success, message } = await postSubmitManualDeposit({
        acc_name: bank?.bank_acc_name ?? '',
        amount: realAmount,
        bank_type_id: bank?.bankTypeId ?? 0,
      })
        .unwrap()
        .catch((error) => showAlert(error))

      if (success) {
        Toast.show({ type: 'success', text1: message })
        actions.resetForm()
      }
    } catch (error) {
      showAlert(error)
    } finally {
      actions.setSubmitting(false)
    }
  }

  const formik = useFormik<CryptoValues>({
    initialValues: {
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
  console.log('🚀 ~ file: index.tsx ~ line 114 ~ CryptoScreen ~ errors', errors)

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
      callback: () => submitForm(),
    })
  }

  return (
    <PageWithBackHeader
      header={{
        title: t('deposit.depositMethod.crypto'),
        actions: (
          <MenuNotice
            onPress={() => openModal('NoticeModal', { notice: DEPOSIT_NOTES })}
          />
        ),
      }}
    >
      <View sx={{ flex: 1, bg: '$secondary' }}>
        <Text sx={{ p: '$2' }}>{t('deposit.selectChannel')}</Text>
        <GradientBox>
          <View sx={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconWrap>
              <Icon name="lc" size={ICON_SIZE * 0.6} />
            </IconWrap>
            <View sx={{ justifyContent: 'center' }}>
              <Text>{bank?.bank_acc_no}</Text>
              <TextInput
                placeholderTextColor={'$border'}
                placeholder={t('validation.minMaxLimit', {
                  min: toCurrency(minAmount ?? 0, currency, {
                    symbol: false,
                    forceDecimal: false,
                  }),
                  max: toCurrency(maxAmount ?? 0, currency, {
                    symbol: false,
                    forceDecimal: false,
                  }),
                })}
                value={values.amount}
                keyboardType={'number-pad'}
                onChangeText={onAmountChanged}
                onBlur={handleBlur('amount')}
                maxLength={MaxLength.AMOUNT}
              />
            </View>
            <Text
              sx={{
                color: '#FFFBAE',
                position: 'absolute',
                right: '$4',
              }}
            >
              {`= ${values.amount ? values.amount : 0} K`}
            </Text>
          </View>
        </GradientBox>

        <TextField>
          <TextField.Error
            error={
              touched.amount && errors.amount
                ? t(errors.amount, {
                    field: t('common.amount'),
                    amount: toCurrency(values.realAmount ?? 0, currency, {
                      forceDecimal: false,
                      symbol: false,
                    }),
                    min: toCurrency(minAmount ?? 0, currency, {
                      forceDecimal: false,
                      symbol: false,
                    }),
                  })
                : undefined
            }
          />
        </TextField>

        {/* <ImportantNotice keys={NOTES} module="crypto" /> */}

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
          onPress={handleConfirmDeposit}
        >
          <Button.Label>{t('common.next')}</Button.Label>
        </Button>
      </View>
    </PageWithBackHeader>
  )
}

const IconWrap = styled(View)({
  height: ICON_SIZE,
  width: ICON_SIZE,
  borderRadius: ICON_SIZE,
  borderWidth: 2,
  borderColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  m: '$3',
  bg: '#36A07B',
})
export default CryptoScreen
