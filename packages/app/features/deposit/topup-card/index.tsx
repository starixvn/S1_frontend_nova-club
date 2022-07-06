import { TextField } from 'app/components/TextField'
import useLocalization from 'app/provider/localization'
import { FlatList, styled, Text, View } from 'dripsy'
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
import { AlertActions } from 'app/store/alert'
import { useRouter } from 'solito/router'
import { DepositPaymentMethodCategoryId, TopUpCard } from 'app/utils/constant'
import { PlayerInputFieldsBank } from 'services/deposit.type'
import { useModal } from 'react-native-modalfy'

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
  const paymentGateway = data?.data?.result.auto.find(
    (el) => el.category_id === DepositPaymentMethodCategoryId.TOP_UP
  )
  const inputFields = Object.values(
    paymentGateway?.list[0].player_input_fields ?? {}
  )

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
        bank_type_id: paymentGateway?.list[0]?.bankTypeId ?? 0,
        card_code: parseInt(cardCode),
        card_seri: parseInt(cardSerialNo),
        card_type: cardType,
        deposit_from: paymentGateway?.list[0]?.deposit_from ?? 0,
        fail_url: 'https://stage.gball8.com/',
        home_url: 'https://stage.gball8.com/',
        process_url: 'https://stage.gball8.com/',
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
      dispatch(AlertActions.addError('common.systemError'))
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
      const { cleanText, amountNumber } = toCleanCard(text)
      setValues({
        ...values,
        cardCode: cleanText,
      })
    }
  }

  function onCardSerialNoChanged(text: string) {
    if (text != null) {
      const { cleanText, amountNumber } = toCleanCard(text)
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
    <PageWithBackHeader header={{ title: t('deposit.depositMethod.topUp') }}>
      <StyledView>
        <View>
          <StyledViewPayment>
            <FlatList
              data={cardTypeList}
              ListHeaderComponent={
                <StyledTextTitle>{t('deposit.paymentMode')}</StyledTextTitle>
              }
              numColumns={NUM_COLUMN_PAYMENT}
              keyExtractor={(item) => `${item.value}`}
              renderItem={({ item }: { item: CardType }) => (
                <ValueCard
                  item={item}
                  isActive={item.value === values.cardType}
                  onPress={(card) => setFieldValue('cardType', card.value)}
                  containerStyle={{ flex: 1 / NUM_COLUMN_PAYMENT }}
                />
              )}
              extraData={values.cardType}
            />
          </StyledViewPayment>

          <StyledViewCard>
            <FlatList
              data={data1}
              ListHeaderComponent={
                <StyledTextTitle>{t('deposit.cardValue')}</StyledTextTitle>
              }
              numColumns={NUM_COLUMN_CARD}
              keyExtractor={(item, index) => `${index} ${item}`}
              renderItem={({ item }) => (
                <ValueCard
                  item={item}
                  isActive={item === values.cardValue}
                  onPress={(card) => onCardValueChanged(card)}
                  containerStyle={{ flex: 1 / NUM_COLUMN_CARD }}
                />
              )}
            />
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
              }}
              error={
                touched.cardCode && errors.cardCode
                  ? errors.cardCode
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
              }}
              error={
                touched.cardSerialNo && errors.cardSerialNo
                  ? errors.cardSerialNo
                  : undefined
              }
              containerStyle={{ my: '$3' }}
            />
          </TextField>

          <ImportantNotice keys={NOTES} module="deposit" />
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
                    -Math.round(values.realAmount * DEDUCTION_AMOUNT)
                  )}
                </Text>
              </StyledViewTextWrapper>
              <StyledViewTextWrapper>
                <Text sx={{ flex: 1 }}>{t('deposit.actualDeposit')}</Text>
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
