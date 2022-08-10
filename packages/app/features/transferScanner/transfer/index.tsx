import Header from 'app/components/common/Header'
import { Button } from 'app/components/form/Button'
import ImportantNotice from 'app/components/ImportantNotice'
import { TextField } from 'app/components/TextField'
import { useIsFocused } from 'app/hooks/isFocus/useIsFocused'
import useContextualRouting from 'app/hooks/useContextualRouting'
import useLocalization from 'app/provider/localization'
import { AlertActions } from 'app/store/alert.slice'
import { toCleanAmount, toCurrency, toRealAmount } from 'app/utils'
import { Currency } from 'app/utils/constant'
import validation from 'app/utils/validation'
import { Text, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'
import { useLazyAffiliateUsernameQuery } from 'services/contentApi'
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

const NOTES = ['pin.note1']
const TransferScreen = ({
  isIDTransfer = false,
}: {
  isIDTransfer?: boolean
}) => {
  const dispatch = useDispatch()
  const { openModal } = useModal()
  const { push } = useRouter()
  const { t } = useLocalization()
  const isFocus = useIsFocused()
  const [referralCode] = useParam('referralCode')

  const [postTransferMemberToMember] = useTransferMemberToMemberMutation()

  const { data } = usePlayerBalanceQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const [fetchUsername, { data: userData, isError, error }] =
    useLazyAffiliateUsernameQuery()
  const { data: playerData, refetch } = usePlayerProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  })
  const currency = userData?.data?.currency as Currency
  const isPinExist = playerData?.data?.pin_exist

  const { makeContextualHref } = useContextualRouting()
  const toCreatePin = makeContextualHref('create-pin')
  const toForgotPin = makeContextualHref('forgot-pin')

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
        to_invitation_code: isIDTransfer ? referralId : referralCode,
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
      referralId: isIDTransfer ? validation.referralCode : null,
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
    setValues,
  } = formik

  useEffect(() => {
    referralCode && fetchUsername(referralCode)
  }, [])

  useEffect(() => {
    if (isError) {
      dispatch(AlertActions.addError(error))
    }
  }, [userData])

  useEffect(() => {
    !isPinExist && push(toCreatePin, '/pin/create-pin')
  }, [isPinExist])

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

  const handleSubmit = () => {
    openModal('PinModal', {
      onConfirm: (value) => onSubmit(values, value, formik),
      onForgotPin: () => push(toForgotPin, '/pin/forgot-pin'),
    })
  }

  return (
    <View sx={{ flex: 1, bg: '$secondary' }}>
      {!isIDTransfer && <Header title={t('menu.transfer')} />}
      <View>
        <View
          sx={{
            p: '$4',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text>{t('transfer.avaiableAmount')}:</Text>
          <Text>
            {toCurrency(Number(data?.data?.main.balance), currency, {
              symbol: false,
              hideTruncatedThousand: false,
            })}
          </Text>
        </View>
        <TextField labelWidth={0.7}>
          {isIDTransfer ? (
            <TextField.TextInput
              label="menu.tab.idTransfer"
              _input={{
                placeholder: t('validation.enterId'),
                value: values.referralId,
                onChangeText: handleChange('referralId'),
                onBlur: handleBlur('referralId'),
                sx: { textAlign: 'right' },
              }}
              error={
                touched.referralId && errors.referralId
                  ? t(errors.referralId, {
                      field: t('common.id'),
                    })
                  : undefined
              }
              sx={{ mt: '$0', mb: '$4' }}
            />
          ) : (
            <TextField.Label
              label="transfer.transferTo"
              value={userData?.data?.username ?? ''}
              textSx={{ textAlign: 'right' }}
              sx={{ my: 0 }}
            />
          )}
          <TextField.TextInput
            label="common.amount"
            isAmount
            _input={{
              placeholder: t('common.enterAmount', {
                field: t('menu.transfer').toLowerCase(),
              }),
              value: values.amount,
              keyboardType: 'number-pad',
              onChangeText: onAmountChanged,
              onBlur: handleBlur('amount'),
            }}
            error={
              touched.amount && errors.amount
                ? t(errors.amount, {
                    field: t('common.amount'),
                  })
                : undefined
            }
            sx={{ mt: '$0', mb: '$4' }}
          />
        </TextField>

        {!isPinExist && (
          <View sx={{ alignItems: 'flex-end', mx: '$4' }}>
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
                {t('pin.createPin')}
              </Text>
            </MotiLink>
          </View>
        )}

        <ImportantNotice keys={NOTES} module="transfer" />
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
          onPress={handleSubmit}
        >
          <Button.Label>{t('menu.transfer')}</Button.Label>
        </Button>

        {/* <Text sx={{ mx: '$10' }}>{t('pin.note1')}</Text> */}
      </View>
    </View>
  )
}

export default TransferScreen
