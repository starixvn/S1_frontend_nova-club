import Header from 'app/components/common/Header'
import MenuNotice from 'app/components/common/MenuNotice'
import { Button } from 'app/components/form/Button'
import IconButton from 'app/components/form/IconButton'
import InputBase from 'app/components/form/Input/InputBase'
import MoneyInput from 'app/components/form/Input/MoneyInput'
import Page, { PageWithBackHeader } from 'app/components/layout/Page'
import { TRANSFER_NOTES } from 'app/constant/notes'
import { MARGIN_TEXT_CENTERING } from 'app/constant/sizes'
import AvailableBalance from 'app/features/withdrawal/AvailableBalance'
import { useIsFocused } from 'app/hooks/isFocus/useIsFocused'
import useContextualRouting from 'app/hooks/useContextualRouting'
import useLocalization from 'app/provider/localization'
import { AlertActions } from 'app/store/alert.slice'
import { SettingActions } from 'app/store/setting.slice'
import { toCleanAmount, toCurrency, toRealAmount } from 'app/utils'
import { Currency } from 'app/utils/constant'
import validation from 'app/utils/validation'
import { Text, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'
import { useAffiliateUsernameQuery } from 'services/contentApi'
import { usePlayerProfileQuery } from 'services/playerApi'
import {
  usePlayerBalanceQuery,
  useTransferMemberToMemberMutation,
} from 'services/walletApi'
import { createParam } from 'solito'
import { MotiLink } from 'solito/moti'
import { useRouter } from 'solito/router'
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
  const { push, back } = useRouter()
  const { t } = useLocalization()
  const isFocus = useIsFocused()
  const [referralCode] = useParam('referralCode')

  const [postTransferMemberToMember] = useTransferMemberToMemberMutation()

  const { data: balanceData } = usePlayerBalanceQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const playerBalance = balanceData?.data?.main.balance

  const { data: playerData, refetch } = usePlayerProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  })
  const currency = playerData?.data?.currency as Currency
  const isPinExist = playerData?.data?.pin_exist

  const { makeContextualHref } = useContextualRouting()
  const toCreatePin = makeContextualHref('create-pin')
  const toForgotPin = makeContextualHref('forgot-pin')

  useEffect(() => {
    setFieldValue('referralId', referralCode)
    if (referralCode === playerData?.data?.referral_code)
      openModal('AlertDialogModal', {
        message: t('status.qrTransferSelfError'),
        onClose: () => back(),
      })
  }, [referralCode])

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
        .catch((error) => dispatch(AlertActions.addError(error.message)))

      if (success) {
        dispatch(AlertActions.addSuccess(message))
        actions.resetForm()
      }
    } catch (e) {
      dispatch(AlertActions.addError('status.systemError'))
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
      amount: validation.amount,
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
  } = formik

  useEffect(() => {
    !isPinExist && push(toCreatePin, '/pin/create-pin')

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
      onForgotPin: () => push(toForgotPin, '/pin/forgot-pin'),
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
                })
              : undefined
          }
          action={
            <View sx={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                numberOfLines={1}
                sx={{
                  fontWeight: 'bold',
                  color: '#FFFBAE',
                  mr: '$2',
                  mb: MARGIN_TEXT_CENTERING,
                }}
              >
                {`= ${values.amount ? values.amount : 0}K`}
              </Text>
              <IconButton
                name="ac"
                size={18}
                color={'$lightCyan'}
                onPress={handleMax}
              />
            </View>
          }
        />

        {!isPinExist && (
          <View sx={{ alignItems: 'flex-end', mx: '$4', my: '$6' }}>
            <MotiLink
              href={toCreatePin}
              as={`/pin/create-pin`}
              animate={({ hovered, pressed }) => {
                'worklet'
                return {
                  scale: pressed ? 0.9 : hovered ? 1.1 : 1,
                }
              }}
            >
              <Text
                variant="md"
                sx={{
                  fontSize: [14, 16],
                  opacity: 0.8,
                }}
              >
                {t('menu.createPin')}
              </Text>
            </MotiLink>
          </View>
        )}

        <View sx={{ mx: '$10' }}>
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
