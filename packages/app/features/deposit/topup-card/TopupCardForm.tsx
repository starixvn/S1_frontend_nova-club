import { CONTENT_URI, DEV_DOMAIN, MEDIA_DOMAIN } from '@env'
import Button from 'app/components/common/Button'
import Input from 'app/components/form/Input'
import SelectWithCardGrid from 'app/components/select/SelectWithCardGrid'
import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import useAlert from 'app/hooks/useAlert'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { toCleanAmount, toCleanCard, toCurrency, toRealAmount } from 'app/utils'
import validation from 'app/utils/validation'
import BankSelection from 'desktop-ext/features/withdrawal/components/BankSelection'
import { Text, View, styled } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import { Pressable } from 'react-native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import {
  useDepositPaymentListQuery,
  useSubmitDepositMutation,
} from 'services/deposit'
import { AutoBankItem, PlayerInputFieldsBank } from 'services/deposit.type'
import { MaxLength, TopUpCard } from 'utils/constant'
import * as Yup from 'yup'
import useDepositFailedMessage, {
  FailedMessageModule,
} from '../tools/useDepositFailedMessage'
import ValueCard from './ValueCard'

type TopupValues = {
  realAmount: number
  cardType: string
  cardValue: string
  cardCode: string
  cardSerialNo: string
}

const cardAmount = ['10k', '20k', '30k', '50k', '100k', '200k', '300k']
// const mobifoneImg = require(`${MEDIA_DOMAIN}${CONTENT_URI}/v2/payment-provider/mobifone.png`)

const TopupCardForm = () => {
  const { t } = useLocalization()
  const { showAlert } = useAlert()
  const [postSubmitDeposit] = useSubmitDepositMutation()
  const currency = useAppSelector((state) => state.setting.currency)
  const horizontalMode = useIsDesktop()
  const { data } = useDepositPaymentListQuery({
    is_mobile: horizontalMode ? 1 : 0,
  })
  const { dispatchDepositFailedMessage } = useDepositFailedMessage()

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
            return `${MEDIA_DOMAIN}${CONTENT_URI}/v2/payment-provider/mobifone.png`
          case TopUpCard.VIETTEL:
            return `${MEDIA_DOMAIN}${CONTENT_URI}/v2/payment-provider/vietel.png`
          case TopUpCard.VINAPHONE:
            return `${MEDIA_DOMAIN}${CONTENT_URI}/v2/payment-provider/vinaphone.png`

          default:
            return ''
        }
      }

      return {
        value: key,
        label: topUpFields?.topup_card_tree[key],
        icon: getCardLogo(key),
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
          dispatchDepositFailedMessage(error, {
            module: FailedMessageModule.topUpCard,
          })
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
    handleSubmit,
    handleBlur,
    submitForm,
    isSubmitting,
    values,
    errors,
    touched,
    isValid,
    dirty,
    setValues,
    setFieldValue,
  } = formik

  function onCardValueChanged(text: string) {
    if (text != null) {
      const { cleanText, amountNumber } = toCleanAmount(text.toString())
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
  const handleSelected = (value) => {
    setFieldValue('cardType', value)
  }

  return (
    <View sx={{ pt: '$3' }}>
      <View sx={{ px: horizontalMode ? 0 : '$4' }}>
        {horizontalMode ? (
          <BankSelection
            label={t('deposit.paymentMode')}
            subtitle=""
            list={cardTypeList}
            selected={values.cardType}
            onPress={handleSelected}
            imageMode="contain"
          />
        ) : (
          <SelectWithCardGrid
            label={t('deposit.paymentMode')}
            placeholder={t('placeholder.paymentMode')}
            options={cardTypeList}
            value={values.cardType ?? ''}
            sx={{
              width: '100%',
              mb: '$3',
            }}
            onSelected={(e) => setFieldValue('cardType', e)}
            _input={{
              error:
                touched.cardType && errors.cardType ? (
                  <Text sx={{ color: errors.cardType && '$secondary.500' }}>
                    {t(errors.cardType, {
                      field: t('bank.paymentMode'),
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
        <ValueCardContainer isHorizontal={horizontalMode}>
          <View
            sx={{
              bg: '$primary.500',
              flexDirection: 'column',
              py: '$3',
              px: '$4',
            }}
          >
            <Text>{t('deposit.cardValue')}</Text>
            <View
              sx={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 4,
              }}
            >
              {cardAmount.map((item) => (
                <View key={item} sx={{ width: '23%' }}>
                  <ValueCard
                    key={item}
                    value={item}
                    onPress={(e) => {
                      onCardValueChanged(e)
                    }}
                  />
                </View>
              ))}
            </View>
          </View>
        </ValueCardContainer>
      </View>
      <View sx={{ px: horizontalMode ? 0 : '$4' }}>
        <Input
          label={t('deposit.cardCode')}
          value={values.cardCode}
          onBlur={handleBlur('cardCode')}
          onChangeText={onCardCodeChanged}
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
        <Input
          label={t('deposit.cardSerialNo')}
          value={values.cardSerialNo}
          onBlur={handleBlur('cardSerialNo')}
          onChangeText={onCardSerialNoChanged}
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

        {values.realAmount !== 0 && (
          <View sx={{ mb: '$3' }}>
            <View>
              <Text sx={{ flex: 1 }}>{t('deposit.deduction')}</Text>
              <Text>
                {toCurrency(
                  Math.round(values.realAmount * (vendorFee / 100)),
                  currency,
                  { negative: true }
                )}
              </Text>
            </View>
            <View>
              <Text sx={{ flex: 1 }}>{t('deposit.actualDeposit')}</Text>
              <Text>
                {toCurrency(
                  Math.round(values.realAmount * (1 - vendorFee / 100))
                )}
              </Text>
            </View>
          </View>
        )}

        <Button
          loading={isSubmitting}
          disabled={!isValid || !dirty}
          onPress={submitForm}
          sx={{ mt: 65 }}
        >
          <ButtonText>{t('common.next')}</ButtonText>
        </Button>
      </View>
    </View>
  )
}

const ValueCardContainer = styled(View)(
  ({ isHorizontal }: { isHorizontal: boolean }) => ({
    py: 2,
    px: isHorizontal ? 2 : 0,
    bg: '$primary.200',
    mb: 20,
  })
)

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

export default TopupCardForm
