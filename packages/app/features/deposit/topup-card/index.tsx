import { TextField } from 'app/components/TextField'
import useLocalization from 'app/provider/localization'
import { FlatList, ScrollView, styled, Text, View } from 'dripsy'
import React, { useState } from 'react'
import { FormikHelpers, useFormik } from 'formik'
import * as Yup from 'yup'
import validation from 'app/utils/validation'
import ValueCard from '../ValueCard'
import ImportantNotice from 'app/components/ImportantNotice'
import { Button } from 'app/components/form/Button'
import { toCleanAmount, toCleanCard, toCurrency, toRealAmount } from 'app/utils'
import { DripsyGradient } from 'app/components/Gradient'
import { PageWithBackHeader } from 'app/components/layout/Page'
import {
  useDepositPaymentListQuery,
  useSubmitDepositMutation,
} from 'services/deposit'
import { useDispatch } from 'react-redux'
import { AlertActions } from 'app/store/alert.slice'
import { useRouter } from 'solito/router'
import {
  DepositPaymentMethodCategoryId,
  MaxLength,
  TopUpCard,
} from 'app/utils/constant'
import { AutoBankItem, PlayerInputFieldsBank } from 'services/deposit.type'
import { useModal } from 'react-native-modalfy'
import KeyboardView from 'app/components/KeyboardView'
import { DEPOSIT_NOTES } from 'app/constant/notes'

const data1 = ['10k', '20k', '30k', '50k', '100k', '200k', '300k']

const data2 = ['10k', '20k', '30k', '50k', '100k', '200k', '300k', '500k']

const data3 = ['10k', '20k', '30k', '50k', '100k', '200k', '300k', '500k']

const NOTES = [
  'note.deposit.card1',
  'note.deposit.card2',
  'note.deposit.card3',
  'note.deposit.card4',
  'note.deposit.card5',
]

const NUM_COLUMN_PAYMENT = 3
const NUM_COLUMN_CARD = 4
const DEDUCTION_AMOUNT = 0.34
const ACTUAL_DEPOSIT_AMOUNT = 0.66

type TopupValues = {
  realAmount: number
  cardType: string
  cardValue: string
  cardCode: string
  cardSerialNo: string
}

type CardType = {
  value: string
  label: string
  logo: string
}

const TopUpCardScreen = () => {
  const { t } = useLocalization()
  const dispatch = useDispatch()
  const { back } = useRouter()
  const { openModal } = useModal()
  const [postSubmitDeposit] = useSubmitDepositMutation()
  const { data, isLoading, isFetching } = useDepositPaymentListQuery()

  const depositPayment = data?.data?.result.auto.find(
    (el) => el.category_id === DepositPaymentMethodCategoryId.TOP_UP
  )

  const paymentGateway = depositPayment?.list[0] as AutoBankItem
  const inputFields = Object.values(paymentGateway?.player_input_fields ?? {})
  const vendorFee =
    parseFloat(paymentGateway?.deposit_fee_percentage) +
    parseFloat(paymentGateway?.vendor_percentage)

  const topUpFields = inputFields.find(
    (el: PlayerInputFieldsBank) => el.type === 'topup_card_list'
  ) as PlayerInputFieldsBank

  const cardTypeList = Object.keys(topUpFields?.topup_card_tree ?? {}).map(
    (key) => {
      const getCardLogo = (key) => {
        switch (key) {
          case TopUpCard.MOBIFONE:
            return require('app/assets/images/deposit/mobifone.png')
          case TopUpCard.VIETTEL:
            return require('app/assets/images/deposit/vietel.png')
          case TopUpCard.VINAPHONE:
            return require('app/assets/images/deposit/vinaphone.png')

          default:
            return ''
        }
      }

      return {
        value: key,
        label: topUpFields?.topup_card_tree[key],
        logo: getCardLogo(key),
      }
    }
  )

  const onSubmit = async (
    { realAmount, cardType, cardCode, cardSerialNo }: TopupValues,
    actions: FormikHelpers<TopupValues>
  ) => {
    try {
      const { data, success, message } = await postSubmitDeposit({
        amount: realAmount,
        bank: '',
        bank_type_id: paymentGateway?.bankTypeId ?? 0,
        card_code: parseInt(cardCode.replaceAll(' ', '')),
        card_seri: parseInt(cardSerialNo.replaceAll(' ', '')),
        card_type: cardType,
        deposit_from: paymentGateway?.deposit_from ?? 0,
        fail_url: 'https://stage.gball8.com/',
        home_url: 'https://stage.gball8.com/',
        process_url: 'https://stage.gball8.com/',
        payment_account_id: paymentGateway?.pay_acc_id ?? 0,
        name: '',
        success_url: 'https://stage.gball8.com/',
      })
        .unwrap()
        .catch(({ message }) => dispatch(AlertActions.addError(message)))

      if (success) {
        dispatch(AlertActions.addSuccess(message))
        actions.resetForm()
      }
    } catch (e) {
      dispatch(AlertActions.addError('status.systemError'))
    }
  }

  const formik = useFormik<TopupValues>({
    initialValues: {
      realAmount: 0,
      cardType: TopUpCard.MOBIFONE ?? '',
      cardValue: '',
      cardCode: '',
      cardSerialNo: '',
    },
    validationSchema: Yup.object({
      cardType: validation.cardType,
      realAmount: validation.amount,
      cardValue: validation.cardValue,
      cardCode: validation.cardCode,
      cardSerialNo: validation.cardSerialNo,
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

  function onCardValueChanged(text: string) {
    if (text != null) {
      const { cleanText, amountNumber } = toCleanAmount(text)
      setValues({
        ...values,
        cardValue: text,
        realAmount: toRealAmount(amountNumber),
      })
    }
  }
  function onCardCodeChanged(text: string) {
    if (text != null) {
      const cleanText = toCleanCard(text)
      setValues({
        ...values,
        cardCode: cleanText,
      })
    }
  }

  function onCardSerialNoChanged(text: string) {
    if (text != null) {
      const cleanText = toCleanCard(text)
      setValues({
        ...values,
        cardSerialNo: cleanText,
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
      header={{ title: t('deposit.depositMethod.topUp') }}
      // disableScrollView
    >
      <KeyboardView>
        <View sx={{ flex: 1 }}>
          <View>
            <StyledTextTitle>{t('deposit.paymentMode')}</StyledTextTitle>
            <StyledViewPayment>
              {cardTypeList.map((item) => (
                <ValueCard
                  key={item.value}
                  item={item}
                  isActive={item.value === values.cardType}
                  onPress={(card) => setFieldValue('cardType', card.value)}
                  containerStyle={{ width: '33%' }}
                />
              ))}
            </StyledViewPayment>

            <StyledTextTitle>{t('deposit.cardValue')}</StyledTextTitle>
            <StyledViewCard>
              {data1.map((item) => (
                <ValueCard
                  key={item}
                  item={item}
                  isActive={item === values.cardValue}
                  onPress={(card) => onCardValueChanged(card)}
                  containerStyle={{ width: '25%' }}
                />
              ))}
            </StyledViewCard>

            <TextField labelWidth={0}>
              <TextField.TextInput
                label=""
                _input={{
                  placeholder: t('deposit.cardCode'),
                  value: values.cardCode,
                  keyboardType: 'number-pad',
                  onChangeText: onCardCodeChanged,
                  onBlur: handleBlur('cardCode'),
                  maxLength: MaxLength.CARD,
                }}
                error={
                  touched.cardCode && errors.cardCode
                    ? t(errors.cardCode, {
                        field: t('deposit.cardCode'),
                      })
                    : undefined
                }
                containerStyle={{ my: '$3' }}
              />
              <TextField.TextInput
                label=""
                _input={{
                  placeholder: t('deposit.cardSerialNo'),
                  value: values.cardSerialNo,
                  keyboardType: 'number-pad',
                  onChangeText: onCardSerialNoChanged,
                  onBlur: handleBlur('cardSerialNo'),
                  maxLength: MaxLength.CARD,
                }}
                error={
                  touched.cardSerialNo && errors.cardSerialNo
                    ? t(errors.cardSerialNo, {
                        field: t('deposit.cardSerialNo'),
                      })
                    : undefined
                }
                containerStyle={{ my: '$3' }}
              />
            </TextField>
            <ImportantNotice
              keys={DEPOSIT_NOTES}
              module="deposit"
              isExpandable
            />
          </View>
          <StyledViewButtonWrapper
            colors={
              values.realAmount !== 0
                ? ['#066D9A', '#05232E']
                : ['#00000000', '#00000000']
            }
            isValid={values.realAmount !== 0}
          >
            {values.realAmount !== 0 && (
              <View sx={{ mb: '$3' }}>
                <StyledViewTextWrapper>
                  <Text sx={{ flex: 1 }}>{t('deposit.deduction')}</Text>
                  <Text>
                    {toCurrency(
                      -Math.round(values.realAmount * (vendorFee / 100))
                    )}
                  </Text>
                </StyledViewTextWrapper>
                <StyledViewTextWrapper>
                  <Text sx={{ flex: 1 }}>{t('deposit.actualDeposit')}</Text>
                  <Text>
                    {toCurrency(
                      Math.round(values.realAmount * (1 - vendorFee / 100))
                    )}
                  </Text>
                </StyledViewTextWrapper>
              </View>
            )}

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
              sx={{
                my: '$10',
              }}
              onPress={submitForm}
            >
              <Button.Label>{t('common.next')}</Button.Label>
            </Button>
          </StyledViewButtonWrapper>
        </View>
      </KeyboardView>
    </PageWithBackHeader>
  )
}

const StyledViewPayment = styled(View)(() => ({
  mx: '$3',
  flexDirection: 'row',
}))
const StyledViewCard = styled(View)(() => ({
  mx: '$3',
  my: '$2',
  flexDirection: 'row',
  flexWrap: 'wrap',
}))

const StyledTextTitle = styled(Text)(() => ({
  opacity: 0.5,
  mx: '$4',
  mt: '$4',
}))

const StyledViewTextWrapper = styled(View)(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  mx: '$3',
  mb: '$2',
}))

const StyledViewButtonWrapper = styled(DripsyGradient)(
  ({ isValid }: { isValid: boolean }) => ({
    py: '$10',
    px: '$8',
    overflow: 'hidden',
    borderColor: isValid ? '$border2' : '$transparent',
    borderRadius: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopWidth: 1,
  })
)
export default TopUpCardScreen
