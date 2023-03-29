import { DEV_DOMAIN } from '@env'
import MenuNotice from 'app/components/common/MenuNotice'
import { Button } from 'app/components/form/Button'
import InputBase from 'app/components/form/Input/InputBase'
import { DripsyGradient } from 'app/components/Gradient'
import KeyboardView from 'app/components/KeyboardView'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import { TOPUP_NOTES } from 'app/constant/notes'
import useAlert from 'app/hooks/useAlert'
import useCheckMobile from 'app/hooks/useCheckMobile'
import useLocalization from 'app/provider/localization'
import { toCleanAmount, toCleanCard, toCurrency, toRealAmount } from 'app/utils'
import { MaxLength, TopUpCard } from 'app/utils/constant'
import validation from 'app/utils/validation'
import { styled, Text, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React from 'react'
import { Platform } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import {
  useDepositPaymentListQuery,
  useSubmitDepositMutation,
} from 'services/deposit'
import { AutoBankItem, PlayerInputFieldsBank } from 'services/deposit.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import * as Yup from 'yup'
import ValueCard from '../ValueCard'

const data1 = ['10k', '20k', '30k', '50k', '100k', '200k', '300k']

type TopupValues = {
  realAmount: number
  cardType: string
  cardValue: string
  cardCode: string
  cardSerialNo: string
}

const TopUpCardScreen = () => {
  const { t } = useLocalization()
  const { showAlert } = useAlert()
  const { openModal } = useModal()
  const [postSubmitDeposit] = useSubmitDepositMutation()
  const { currency } = usePlayerProfileQuery()
  const { isMobile } = useCheckMobile()
  const { data } = useDepositPaymentListQuery({
    is_mobile: isMobile ? 0 : 1,
  })

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
      const { data, message, success } = await postSubmitDeposit({
        amount: realAmount,
        bank: '',
        bank_type_id: paymentGateway?.bankTypeId ?? 0,
        card_code: parseInt(cardCode.replace(/\s+/g, '')),
        card_seri: parseInt(cardSerialNo.replace(/\s+/g, '')),
        card_type: cardType,
        deposit_from: paymentGateway?.deposit_from ?? 0,
        fail_url: DEV_DOMAIN,
        home_url: DEV_DOMAIN,
        process_url: DEV_DOMAIN,
        payment_account_id: paymentGateway?.pay_acc_id ?? 0,
        name: '',
        success_url: DEV_DOMAIN,
      })
        .unwrap()
        .catch((error) => {
          showAlert(error)
          return error
        })

      if (success) {
        Toast.show({ type: 'success', text1: message })
        actions.resetForm()
      }
    } catch (error) {
      showAlert(error)
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

  return (
    <PageWithBackHeader
      header={{
        title: t('deposit.depositMethod.topUp'),
        actions: (
          <MenuNotice
            onPress={() => openModal('NoticeModal', { notice: TOPUP_NOTES })}
          />
        ),
      }}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <KeyboardView contentContainerStyle={{ flex: 1 }}>
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

            <InputBase
              label={t('deposit.cardCode')}
              value={values.cardCode}
              onChangeText={onCardCodeChanged}
              onBlur={handleBlur('cardCode')}
              keyboardType="number-pad"
              maxLength={MaxLength.CARD}
              error={
                touched.cardCode && errors.cardCode
                  ? t(errors.cardCode, {
                      field: t('deposit.cardCode'),
                    })
                  : undefined
              }
            />
            <InputBase
              label={t('deposit.cardSerialNo')}
              value={values.cardSerialNo}
              onChangeText={onCardSerialNoChanged}
              onBlur={handleBlur('cardSerialNo')}
              keyboardType="number-pad"
              maxLength={MaxLength.CARD}
              error={
                touched.cardSerialNo && errors.cardSerialNo
                  ? t(errors.cardSerialNo, {
                      field: t('deposit.cardSerialNo'),
                    })
                  : undefined
              }
            />

            {/* <ImportantNotice keys={DEPOSIT_NOTES} module="deposit" /> */}
          </View>
          {/* `minHeight: 220` to make smaller screen some padding top alike effect */}
          <View sx={{ flex: 1, justifyContent: 'flex-end', minHeight: 220 }}>
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
                        Math.round(values.realAmount * (vendorFee / 100)),
                        currency,
                        { negative: true }
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
    borderColor: isValid ? '$borderBlue' : '$transparent',
    borderRadius: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopWidth: 1,
  })
)
export default TopUpCardScreen
