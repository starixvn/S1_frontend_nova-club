import Input from 'app/components/form/Input'
import Select from 'app/components/select/Select'
import SelectWithDropdown from 'app/components/select/SelectWithDropdown'
import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import { MAP_CRYPTO_PROTOCOL } from 'app/constants/crypto'
import useLocalization from 'app/provider/localization'
import {
  toCleanAmount,
  toCurrency,
  toDisplayAmount,
  toRealAmount,
} from 'app/utils'
import { Currency } from 'app/utils/constant'
import validation from 'app/utils/validation'
import { Text, View, styled, useResponsiveValue } from 'dripsy'
import { useFormik } from 'formik'
import { useState } from 'react'
import { Pressable } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { SelectOptions } from 'services/common/types'
import { useDepositPaymentListQuery } from 'services/deposit'
import { AutoBankItem } from 'services/deposit.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import * as Yup from 'yup'

type OnlineBankingValues = {
  bank: SelectOptions | null
  selectedChannel: AutoBankItem | null
  amount: string
  realAmount: number
}

const OnlineBankingForm = () => {
  const { t } = useLocalization()
  const { openModal } = useModal()
  const horizontalMode = useResponsiveValue([false, false, false, true, true])
  //   const [channelOptions, setChannelOptions] = useState<SelectOptions[]>([])
  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.currency as Currency
  const { data, isLoading, isFetching } = useDepositPaymentListQuery({
    is_mobile: 1,
  })

  const depositPayment = data?.data?.result.auto.find(
    (el) => el.category_id === DepositPaymentMethodCategoryId.ONLINE_BANK
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

  const minAmount = selectedChannel?.minDeposit
  const maxAmount = selectedChannel?.maxDeposit

  const onSubmit = async () => {}

  const formik = useFormik<OnlineBankingValues>({
    initialValues: {
      bank: null,
      selectedChannel: null,
      amount: '',
      realAmount: 0,
    },
    validationSchema: Yup.object({
      bank: validation.bank,
      amount: validation.amountMinMax({
        min: toDisplayAmount(minAmount, currency),
        max: toDisplayAmount(maxAmount, currency),
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

  const handleSelected = (value) => {
    console.log(value)
    setSelectedValues(value)
    formik.resetForm()
  }

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
    <View sx={{ width: '90%', alignSelf: 'center', px: '$4' }}>
      <SelectWithDropdown
        label={t('deposit.selectChannel')}
        placeholder={t('deposit.selectChannel')}
        value={selectedValues}
        options={channelOptions}
        onSelected={handleSelected}
      />
      <View
        sx={{
          //   px: horizontalMode ? '$4' : 0,
          pt: horizontalMode ? '$4' : 0,
        }}
      >
        {selectedValues && (
          <View
            sx={{
              bg: '$primary.200',
              py: 2,
              px: horizontalMode ? 2 : 0,
              mb: 20,
            }}
          >
            <View
              sx={{
                bg: '$primary.500',
                flexDirection: 'row',
                py: '$3',
                px: '$4',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text>Min/Max Limit :</Text>
              <View
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View>
                  <Text>{'20K/20,000K'}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
      <View>
        <Text>Select Bank</Text>
      </View>
      <View
        sx={
          {
            //   px: '$4',
          }
        }
      >
        <Input
          label="Deposit Amount"
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
          value={values.amount.toString()}
          onBlur={handleBlur('amount')}
          onChangeText={onAmountChanged}
          //   ref={amountFieldRef}
          action={() => (
            <Text sx={{ color: '$secondary.100' }}>
              = {values.amount ? values.amount : 0}K
            </Text>
          )}
          error={
            touched.amount && errors.amount
              ? t(errors.amount, {
                  field: t('common.amount'),
                })
              : undefined
          }
        />

        <ButtonContainer
          sx={{ bg: '$secondary.500', marginTop: 65 }}
          disabled={!isValid || !dirty}
          onPress={handleConfirmDeposit}
        >
          <ButtonText>Next</ButtonText>
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

export default OnlineBankingForm
