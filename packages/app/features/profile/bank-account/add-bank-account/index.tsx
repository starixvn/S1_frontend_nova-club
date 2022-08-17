import { Button } from 'app/components/form/Button'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { TextField } from 'app/components/TextField'
import TimerButton, { ITimerButtonForwardRef } from 'app/components/TimerButton'
import { ACTION_SHEET_ID } from 'app/constant/actionSheet'
import useLocalization from 'app/provider/localization'
import { AlertActions } from 'app/store/alert.slice'
import { toCleanCard } from 'app/utils'
import { MaxLength } from 'app/utils/constant'
import validation, { getErrorMessage } from 'app/utils/validation'
import { styled, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React, { useRef } from 'react'
import { TextInput } from 'react-native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useDispatch } from 'react-redux'
import {
  useAddPlayerBankAccMutation,
  useWithdrawalBankQuery,
} from 'services/bank'
import { WithdrawalBankResult } from 'services/bank.type'
import {
  usePlayerProfileQuery,
  useSendUpdateProfileOTPMutation,
  useUpdateProfileMutation,
} from 'services/playerApi'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'
const actionSheetId = ACTION_SHEET_ID.ADD_BANK_ACCOUNT

type AddBankAccountValues = {
  realName?: string
  otp?: string
  bank: WithdrawalBankResult | undefined
  accountNo: string
}

const AddBankAccountScreen = () => {
  const dispatch = useDispatch()
  const { t } = useLocalization()
  const { back } = useRouter()
  const { data, isLoading, isFetching, isSuccess } = useWithdrawalBankQuery()
  const [postAddWithdrawalBankAcc] = useAddPlayerBankAccMutation()
  const { data: playerData } = usePlayerProfileQuery()
  const isRealNameAvailable = playerData?.data?.firstName?.length > 0
  const [sendOtp, { isLoading: isOtpLoading }] =
    useSendUpdateProfileOTPMutation()
  const [updateProfile] = useUpdateProfileMutation()

  const otpFieldRef = useRef<TextInput>(null)
  const OTPRef = useRef<ITimerButtonForwardRef>(null)

  async function updateRealName(realName, otp) {
    const { data, success, message } = await updateProfile({
      field: 'realName',
      value: realName,
      verify_code: otp,
    })

    if (success) {
      return
    } else return message
  }

  const onSubmit = async (
    { bank, accountNo, realName, otp }: AddBankAccountValues,
    actions: FormikHelpers<AddBankAccountValues>
  ) => {
    try {
      if (!isRealNameAvailable && realName && otp) {
        const error = await updateRealName(realName, otp)
        if (error) {
          dispatch(AlertActions.addError(error))
          return
        }
      }

      const { data, success, message } = await postAddWithdrawalBankAcc({
        bank_acc_name: bank?.bank_name ?? '',
        bank_acc_num: accountNo.replaceAll(' ', ''),
        bank_address: bank?.bank_code ?? '',
        bank_type_id: bank?.id ?? 0,
        branch: bank?.bank_code ?? '',
        city: bank?.bank_code ?? '',
        province: bank?.bank_code ?? '',
      })
        .unwrap()
        .catch((error) => dispatch(AlertActions.addError(error.message)))

      if (success) {
        Toast.show({
          type: 'success',
          text1: message,
        })
        actions.resetForm()

        back()
      }
    } catch (e) {
      dispatch(AlertActions.addError('status.systemError'))
    }
  }

  const sendOTP = async () => {
    try {
      const { data, message, success } = await sendOtp().unwrap()

      OTPRef.current?.startOtpTimer()

      if (success) {
        Toast.show({ type: 'success', text1: message })
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      dispatch(AlertActions.addAlert({ message: errorMessage }))
    }
  }

  const formik = useFormik<AddBankAccountValues>({
    enableReinitialize: true,
    initialValues: {
      bank: undefined,
      accountNo: '',
    },
    validationSchema: Yup.object({
      bank: validation.bank,
      accountNo: validation.accountNo,
      realName: !isRealNameAvailable ? validation.stringRequired : undefined,
      otp: !isRealNameAvailable ? validation.stringRequired : undefined,
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

  function onCardChanged(text: string) {
    if (text != null) {
      const cleanText = toCleanCard(text)
      setValues({
        ...values,
        accountNo: cleanText,
      })
    }
  }

  return (
    <PageWithBackHeader header={{ title: t('bank.addBankAccount') }}>
      <StyledView>
        {playerData?.data?.firstName.length === 0 && (
          <>
            <TextField labelWidth={0.55}>
              <TextField.TextInput
                label="bank.accountName"
                _input={{
                  placeholder: t('validation.realName'),
                  value: values.realName,
                  onChangeText: handleChange('realName'),
                  onBlur: handleBlur('realName'),
                }}
              />
            </TextField>
            <TextField labelWidth={0.55}>
              <TextField.TextInput
                label="OTP"
                _input={{
                  placeholder: t('auth.enterOtp'),
                  value: values.otp,
                  onChangeText: handleChange('otp'),
                  onBlur: handleBlur('otp'),
                }}
                right={
                  <TimerButton
                    accessibilityRole="button"
                    ref={OTPRef}
                    title={t('common.send')}
                    loading={isOtpLoading}
                    onPress={sendOTP}
                    sx={{
                      width: 'auto',
                      backgroundColor: '$gray',
                      m: 0,
                      px: '$3',
                      minWidth: 53,
                    }}
                    _text={{
                      sx: {
                        color: '$black',
                      },
                    }}
                  />
                }
              />
            </TextField>
          </>
        )}

        <TextField.Select
          label="bank.bank"
          _input={{
            placeholder: t('bank.selectBank'),
            value: values.bank?.bank_name ?? '',
          }}
          _dataList={{
            data: data,
            isLoading: isLoading || isFetching,
            key: 'id',
            titleType: 'bank_code',
            onPress: (item) => setFieldValue('bank', item),
          }}
          _actionSheet={{
            id: actionSheetId,
            headerTitle: t('bank.bank'),
          }}
        />

        <TextField.TextInput
          label="bank.accountNo"
          _input={{
            placeholder: t('bank.enterAccountNo'),
            value: values.accountNo,
            onChangeText: onCardChanged,
            onBlur: handleBlur('accountNo'),
            keyboardType: 'number-pad',
            maxLength: MaxLength.CARD,
          }}
          error={
            touched.accountNo && errors.accountNo
              ? t(errors.accountNo, {
                  field: t('bank.accountNo'),
                })
              : undefined
          }
          containerStyle={{ my: '$0' }}
        />
        <StyledButtonWrapper>
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
            onPress={submitForm}
          >
            <Button.Label>{t('common.next')}</Button.Label>
          </Button>
        </StyledButtonWrapper>
      </StyledView>
    </PageWithBackHeader>
  )
}

const StyledView = styled(View)(() => ({
  flex: 1,
  bg: '$secondary',
  pt: '$6',
}))

const StyledButtonWrapper = styled(View)(() => ({
  my: '$10',
  mx: '$6',
}))
export default AddBankAccountScreen
