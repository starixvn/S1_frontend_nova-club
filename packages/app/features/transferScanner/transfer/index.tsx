import MenuNotice from 'app/components/common/MenuNotice'
import { Button } from 'app/components/form/Button'
import IconButton from 'app/components/form/IconButton'
import InputBase, {
  INPUT_BASE_SPACE,
} from 'app/components/form/Input/InputBase'
import MoneyInput from 'app/components/form/Input/MoneyInput'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { TRANSFER_NOTES } from 'app/constant/notes'
import AvailableBalance from 'app/features/withdrawal/AvailableBalance'
import useAlert from 'app/hooks/useAlert'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import useLocalization from 'app/provider/localization'
import { SettingActions } from 'app/store/setting.slice'
import {
  toCleanAmount,
  toCurrency,
  toDisplayAmount,
  toRealAmount,
} from 'app/utils'
import { Currency } from 'app/utils/constant'
import validation from 'app/utils/validation'
import validationRule from 'app/utils/validationRule'
import { Text, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useDispatch } from 'react-redux'
import { usePlayerProfileQuery } from 'services/playerApi'
import {
  usePlayerBalanceQuery,
  useTransferMemberToMemberMutation,
} from 'services/walletApi'
import { createParam } from 'solito'
import { MotiLink } from 'solito/moti'
import * as Yup from 'yup'

type TransferValues = {
  referralId: string
  amount: string
  realAmount: number
}
const { useParam } = createParam<{ referralCode: string }>()

const TransferScreen = ({
  isIDTransfer = false,
}: {
  isIDTransfer?: boolean
}) => {
  const dispatch = useDispatch()
  const { openModal } = useModal()
  const { showAlert } = useAlert()
  const { push, back } = useContextualRouter()
  const { t } = useLocalization()
  const [referralCode] = useParam('referralCode')

  const [postTransferMemberToMember] = useTransferMemberToMemberMutation()

  const { data: balanceData } = usePlayerBalanceQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const playerBalance = balanceData?.data?.main.balance

  const { data: playerData } = usePlayerProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  })
  const currency = playerData?.currency as Currency
  const isPinExist = playerData?.pin_exist

  const onSubmit = async (
    { referralId, realAmount }: TransferValues,
    transferPin: string,
    actions: FormikHelpers<TransferValues>
  ) => {
    try {
      actions.setSubmitting(true)
      const { data, success, message } = await postTransferMemberToMember({
        amount: realAmount,
        transfer_pin: transferPin,
        to_invitation_code: referralId,
      })
        .unwrap()
        .catch((error) => {
          showAlert(error)
          return error
        })

      if (success) {
        Toast.show({ type: 'success', text1: message })
        actions.resetForm()
        back()
      }
    } catch (error) {
      showAlert(error)
    } finally {
      actions.setSubmitting(false)
    }
  }

  const formik = useFormik<TransferValues>({
    initialValues: {
      referralId: '',
      amount: '',
      realAmount: 0,
    },
    validationSchema: Yup.object({
      referralId: validation.referralCode,
      amount: validationRule.amount({
        min: toDisplayAmount(1, currency),
        max: toDisplayAmount(
          playerBalance !== '0' ? playerBalance : 1,
          currency
        ),
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
    setFieldValue,
    setValues,
    resetForm,
  } = formik

  useEffect(() => {
    setFieldValue('referralId', referralCode)
    if (referralCode === playerData?.referral_code)
      openModal('AlertModal', {
        message: t('status.qrTransferSelfError'),
        onClose: () => back(),
      })

    if (!referralCode) {
      resetForm()
    }
  }, [referralCode])

  useEffect(() => {
    !isPinExist && push('/pin/create-pin')

    return () => {
      !isIDTransfer && dispatch(SettingActions.toogleScan(true))
    }
  }, [isPinExist])

  function onAmountChanged(text: string) {
    if (text != null) {
      const { cleanText, amountNumber } = toCleanAmount(text.toString())
      setValues({
        ...values,
        amount: cleanText,
        realAmount: toRealAmount(amountNumber),
      })
    }
  }

  const handleMax = () => {
    const value = toCurrency(Number(playerBalance), currency, {
      symbol: false,
      hideTruncatedThousand: false,
    })

    setValues({
      ...values,
      amount: value.slice(0, -1),
      realAmount: toRealAmount(value.replaceAll(',', '')),
    })
  }

  const handleSubmit = () => {
    openModal('PinModal', {
      onConfirm: (value) => onSubmit(values, value, formik),
      onForgotPin: () => push('/pin/forgot-pin'),
    })
  }

  return (
    <PageWithBackHeader
      header={{
        title: t('menu.transfer'),
        actions: (
          <MenuNotice
            onPress={() => openModal('NoticeModal', { notice: TRANSFER_NOTES })}
          />
        ),
      }}
      hideHeader={isIDTransfer}
    >
      <View>
        <AvailableBalance />

        {isIDTransfer ? (
          <InputBase
            label={t('menu.tab.idTransfer')}
            placeholder={t('validation.enterId')}
            value={values.referralId}
            onChangeText={handleChange('referralId')}
            onBlur={handleBlur('referralId')}
            error={
              touched.referralId && errors.referralId
                ? t(errors.referralId, {
                    field: t('common.id'),
                  })
                : undefined
            }
          />
        ) : (
          <InputBase
            label={t('transfer.transferTo')}
            value={values.referralId ?? ''}
            editable={false}
          />
        )}

        <MoneyInput
          label={t('common.amount')}
          placeholder={t('common.enterAmount', {
            field: t('menu.transfer').toLowerCase(),
          })}
          keyboardType="number-pad"
          onChangeText={onAmountChanged}
          onBlur={handleBlur('amount')}
          value={values.amount}
          error={
            touched.amount && errors.amount
              ? t(errors.amount, {
                  field: t('common.amount'),
                  amount: toCurrency(values.realAmount ?? 1, currency, {
                    forceDecimal: false,
                    symbol: false,
                  }),
                  min: 1,
                })
              : undefined
          }
          action={
            <IconButton
              sx={{ p: INPUT_BASE_SPACE }}
              name="ac"
              size={18}
              color={'$lightCyan'}
              onPress={handleMax}
            />
          }
        />

        {!isPinExist && (
          <View sx={{ alignItems: 'flex-end', mx: '$4', my: '$6' }}>
            <TouchableOpacity onPress={() => push(`/pin/create-pin`)}>
              <Text
                variant="md"
                sx={{
                  fontSize: [14, 16],
                  opacity: 0.8,
                }}
              >
                {t('menu.createPin')}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View sx={{ mx: '$10', mb: '$10' }}>
          <Button
            rounded
            stretch
            loading={isSubmitting}
            disabled={!isValid || !dirty || !isPinExist}
            variant="lg"
            fill={{
              type: 'gradient',
              color: 'secondary',
              start: { x: 0, y: 0 },
              end: { x: 1, y: 0 },
            }}
            containerStyle={{
              my: '$4',
            }}
            onPress={handleSubmit}
          >
            <Button.Label>{t('menu.transfer')}</Button.Label>
          </Button>

          {!isPinExist && (
            <Text sx={{ textAlign: 'center', color: '$error' }}>
              {t('pin.note1')}
            </Text>
          )}
        </View>
      </View>
    </PageWithBackHeader>
  )
}

export default TransferScreen
