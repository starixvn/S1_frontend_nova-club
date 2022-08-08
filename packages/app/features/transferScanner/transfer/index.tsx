import Header from 'app/components/common/Header'
import { Button } from 'app/components/form/Button'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { TextField } from 'app/components/TextField'
import useLocalization from 'app/provider/localization'
import { AlertActions } from 'app/store/alert.slice'
import { toCleanAmount, toCurrency, toRealAmount } from 'app/utils'
import { Currency } from 'app/utils/constant'
import validation from 'app/utils/validation'
import { Text, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  useAffiliateUsernameQuery,
  useLazyAffiliateUsernameQuery,
} from 'services/contentApi'
import { usePlayerProfileQuery } from 'services/playerApi'
import {
  usePlayerBalanceQuery,
  useTransferMemberToMemberMutation,
} from 'services/walletApi'
import { createParam } from 'solito'
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
  const { back } = useRouter()
  const { t } = useLocalization()
  const [referralCode] = useParam('referralCode')

  const [postTransferMemberToMember] = useTransferMemberToMemberMutation()

  const { data } = usePlayerBalanceQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const [fetchUsername, { data: playerData, isError, error }] =
    useLazyAffiliateUsernameQuery()

  const currency = playerData?.data?.currency as Currency

  const onSubmit = async (
    { referralId, realAmount }: TransferValues,
    actions: FormikHelpers<TransferValues>
  ) => {
    try {
      actions.setSubmitting(true)
      const { data, success, message } = await postTransferMemberToMember({
        amount: realAmount,
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
  }, [playerData])

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

  return (
    <View sx={{ flex: 1, bg: '$secondary' }}>
      {!isIDTransfer && <Header title={t('menu.transfer')} />}
      <View>
        <View
          sx={{
            p: '$4',
            flex: 1,
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
                placeholder: t('validation.enterReferral'),
                value: values.referralId,
                onChangeText: handleChange('referralId'),
                onBlur: handleBlur('referralId'),
                sx: { textAlign: 'right' },
              }}
              error={
                touched.referralId && errors.referralId
                  ? t(errors.referralId, {
                      field: t('referral.referralId'),
                    })
                  : undefined
              }
              sx={{ mt: '$0', mb: '$4' }}
            />
          ) : (
            <TextField.Label
              label="transfer.transferTo"
              value={playerData?.data?.username ?? ''}
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
          onPress={submitForm}
        >
          <Button.Label>{t('menu.transfer')}</Button.Label>
        </Button>
      </View>
    </View>
  )
}

export default TransferScreen
