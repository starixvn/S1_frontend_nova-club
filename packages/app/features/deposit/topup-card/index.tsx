import { GradientBoxText } from 'app/components/GradientBoxText'
import useLocalization from 'app/provider/localization'
import { FlatList, styled, Text, View } from 'dripsy'
import React, { useState } from 'react'
import { FormikHelpers, useFormik } from 'formik'
import * as Yup from 'yup'
import validation from 'app/utils/validation'
import ValueCard from '../ValueCard'
import ImportantNotice from 'app/components/ImportantNotice'
import { Button } from 'app/components/form/Button'
import { toCurrency, toRealAmount } from 'app/utils'
import { DripsyGradient } from 'app/components/Gradient'
import { Gradient } from '@dripsy/gradient'
import { PageWithBackHeader } from 'app/components/layout/Page'

const dataPayment = [
  {
    id: 1,
    title: 'vietel',
    logo: require('app/assets/images/deposit/vietel.png'),
  },
  {
    id: 2,
    title: 'vinaphone',
    logo: require('app/assets/images/deposit/vinaphone.png'),
  },
  {
    id: 3,
    title: 'mobifone',
    logo: require('app/assets/images/deposit/mobifone.png'),
  },
]

const data1 = [
  '10k',
  '20k',
  '30k',
  '50k',
  '100k',
  '200k',
  '300k',
  '500k',
  '1000k',
]

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
  paymentMode: string
  cardValue: string
  realAmount: number
  cardCode: string
  cardSerialNo: string
}

const TopUpCardScreen = () => {
  const { t } = useLocalization()
  const [selectedPayment, setSelectedPayment] = useState()
  const [selectedCard, setSelectedCard] = useState()

  const onSubmit = async (
    { paymentMode, cardValue, realAmount, cardCode, cardSerialNo }: TopupValues,
    actions: FormikHelpers<TopupValues>
  ) => {
    console.log(
      '🚀 ~ file: index.tsx ~ line 42 ~ TopUpCardScreen ~ paymentMode',
      paymentMode
    )
    console.log(
      '🚀 ~ file: index.tsx ~ line 42 ~ TopUpCardScreen ~ cardValue',
      cardValue
    )
    console.log(
      '🚀 ~ file: index.tsx ~ line 75 ~ TopUpCardScreen ~ realAmount',
      realAmount
    )
    console.log(
      '🚀 ~ file: index.tsx ~ line 42 ~ TopUpCardScreen ~ cardCode',
      cardCode
    )
    console.log(
      '🚀 ~ file: index.tsx ~ line 42 ~ TopUpCardScreen ~ cardSerialNo',
      cardSerialNo
    )
  }

  const formik = useFormik<TopupValues>({
    initialValues: {
      paymentMode: dataPayment[0].title,
      cardValue: '',
      realAmount: 0,
      cardCode: '',
      cardSerialNo: '',
    },
    validationSchema: Yup.object({
      paymentMode: validation.paymentMode,
      cardValue: validation.cardValue,
      realAmount: validation.amount,
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

  function onAmountChanged(text: string) {
    console.log('text', text)
    if (text != null) {
      const cleanText = text.replace(/[^0-9]/g, '')
      if (cleanText === values.cardValue) return
      let amountNumber = parseFloat(cleanText)
      if (isNaN(amountNumber)) amountNumber = 0
      setValues({
        ...values,
        cardValue: text,
        realAmount: toRealAmount(amountNumber),
      })
    }
  }
  function onCardCodeChanged(text: string) {
    if (text != null) {
      const cleanText = text.replace(/[^0-9]/g, '')
      if (cleanText === values.cardCode) return
      let amountNumber = parseFloat(cleanText)
      if (isNaN(amountNumber)) amountNumber = 0
      setValues({
        ...values,
        cardCode: cleanText,
      })
    }
  }

  function onCardSerialNoChanged(text: string) {
    if (text != null) {
      const cleanText = text.replace(/[^0-9]/g, '')
      if (cleanText === values.cardSerialNo) return
      let amountNumber = parseFloat(cleanText)
      if (isNaN(amountNumber)) amountNumber = 0
      setValues({
        ...values,
        cardSerialNo: cleanText,
      })
    }
  }

  return (
    <PageWithBackHeader header={{ title: 'Topup Card' }}>
      <StyledView>
        <View>
          <StyledViewPayment>
            <FlatList
              data={dataPayment}
              ListHeaderComponent={
                <StyledTextTitle>{t('deposit.paymentMode')}</StyledTextTitle>
              }
              numColumns={NUM_COLUMN_PAYMENT}
              keyExtractor={(item, index) => `${index} ${item.id}`}
              renderItem={({ item }) => (
                <ValueCard
                  item={item}
                  isActive={item.title === values.paymentMode}
                  onPress={(card) => setFieldValue('paymentMode', card.title)}
                  containerStyle={{ flex: 1 / NUM_COLUMN_PAYMENT }}
                />
              )}
            />
          </StyledViewPayment>

          <StyledViewCard>
            <FlatList
              data={
                values.paymentMode === 'vietel'
                  ? data1
                  : values.paymentMode === 'vinaphone'
                  ? data2
                  : data3
              }
              ListHeaderComponent={
                <StyledTextTitle>{t('deposit.cardValue')}</StyledTextTitle>
              }
              numColumns={NUM_COLUMN_CARD}
              keyExtractor={(item, index) => `${index} ${item.id}`}
              renderItem={({ item }) => (
                <ValueCard
                  item={item}
                  isActive={item === values.cardValue}
                  onPress={(card) => onAmountChanged(card)}
                  containerStyle={{ flex: 1 / NUM_COLUMN_CARD }}
                />
              )}
            />
          </StyledViewCard>

          <GradientBoxText labelWidth={0}>
            <GradientBoxText.TextInput
              label=""
              _input={{
                placeholder: t('deposit.cardCode'),
                value: values.cardCode,
                keyboardType: 'number-pad',
                onChangeText: onCardCodeChanged,
                onBlur: handleBlur('cardCode'),
              }}
              error={
                touched.cardCode && errors.cardCode
                  ? errors.cardCode
                  : undefined
              }
              containerStyle={{ my: '$3' }}
            />
            <GradientBoxText.TextInput
              label=""
              _input={{
                placeholder: t('deposit.cardSerialNo'),
                value: values.cardSerialNo,
                keyboardType: 'number-pad',
                onChangeText: onCardSerialNoChanged,
                onBlur: handleBlur('cardSerialNo'),
              }}
              error={
                touched.cardSerialNo && errors.cardSerialNo
                  ? errors.cardSerialNo
                  : undefined
              }
              containerStyle={{ my: '$3' }}
            />
          </GradientBoxText>

          <ImportantNotice keys={NOTES} module="deposit" />
        </View>

        <StyledViewButtonWrapper
          colors={values.realAmount !== 0 ? ['#066D9A', '#05232E'] : ['', '']}
          isValid={values.realAmount !== 0}
        >
          {values.realAmount !== 0 && (
            <View sx={{ mb: '$3' }}>
              <StyledViewTextWrapper>
                <Text sx={{ flex: 1 }}>Deduction</Text>
                {/* <Text>VND</Text> */}
                <Text>
                  {toCurrency(
                    -Math.round(values.realAmount * DEDUCTION_AMOUNT)
                  )}
                </Text>
              </StyledViewTextWrapper>
              <StyledViewTextWrapper>
                <Text sx={{ flex: 1 }}>Actual Deposit</Text>
                <Text>
                  {toCurrency(
                    Math.round(values.realAmount * ACTUAL_DEPOSIT_AMOUNT)
                  )}
                </Text>
              </StyledViewTextWrapper>
            </View>
          )}

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
            sx={{
              my: '$10',
            }}
            onPress={submitForm}
          >
            <Button.Label>Next</Button.Label>
          </Button>
        </StyledViewButtonWrapper>
      </StyledView>
    </PageWithBackHeader>
  )
}

const StyledView = styled(View)(() => ({
  flex: 1,
}))
const StyledViewPayment = styled(View)(() => ({
  mx: '$3',
  my: '$4',
}))
const StyledViewCard = styled(View)(() => ({
  mx: '$3',
  my: '$2',
}))

const StyledTextTitle = styled(Text)(() => ({
  opacity: 0.5,
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
    borderColor: isValid ? '$border2' : '$transparent',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 2,
    borderBottomWidth: 0,
  })
)
export default TopUpCardScreen
