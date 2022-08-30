import { Button } from 'app/components/form/Button'
import InputBase from 'app/components/form/Input/InputBase'
import Select from 'app/components/form/Input/Select'
import { PageWithBackHeader } from 'app/components/layout/Page'
import TimerButton, { ITimerButtonForwardRef } from 'app/components/TimerButton'
import { getBankLogo } from 'app/config/bank'
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
  const {
    data: bankData,
    isLoading,
    isFetching,
    isSuccess,
  } = useWithdrawalBankQuery()
  const [postAddWithdrawalBankAcc] = useAddPlayerBankAccMutation()
  const { data: playerData } = usePlayerProfileQuery()
  const isRealNameAvailable = playerData?.data?.firstName?.length > 0
  const [sendOtp, { isLoading: isOtpLoading }] =
    useSendUpdateProfileOTPMutation()
  const [updateProfile] = useUpdateProfileMutation()

  const otpFieldRef = useRef<TextInput>(null)
  const OTPRef = useRef<ITimerButtonForwardRef>(null)

  const sheetData = bankData?.data?.map((item) => {
    return {
      label: item.bank_name,
      value: item.bank_code,
      icon: getBankLogo(item.bank_code),
    }
  })

  async function updateRealName(realName, otp) {
    const { data, success, message } = await updateProfile({
      field: 'firstName',
      value: realName,
      verify_code: otp,
    })
      .unwrap()
      .catch((error) => {
        dispatch(AlertActions.addError(error.message))
        return error
      })

    if (success) {
      Toast.show({ type: 'success', text1: message })
      return
    } else {
      return message
    }
  }

  const onSubmit = async (
    { bank, accountNo, realName, otp }: AddBankAccountValues,
    actions: FormikHelpers<AddBankAccountValues>
  ) => {
    try {
      if (!isRealNameAvailable && realName && otp) {
        const error = await updateRealName(realName, otp)

        if (error) {
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
        Toast.show({ type: 'success', text1: message })
        actions.resetForm()

        setTimeout(() => {
          back()
        }, 150)
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

  const handleSelected = (value) => {
    const item = bankData?.data?.find((el) => el.bank_code === value)
    setFieldValue('bank', item)
  }

  return (
    <PageWithBackHeader header={{ title: t('bank.addBankAccount') }}>
      <StyledView>
        {playerData?.data?.firstName.length === 0 && (
          <>
            <InputBase
              label={t('bank.accountName')}
              value={values.realName}
              onChangeText={handleChange('realName')}
              onBlur={handleBlur('realName')}
              error={
                touched.realName && errors.realName
                  ? t(errors.realName, {
                      field: t('bank.accountName'),
                    })
                  : undefined
              }
            />
            <InputBase
              label={t('OTP')}
              value={values.otp}
              maxLength={6}
              onChangeText={handleChange('otp')}
              onBlur={handleBlur('otp')}
              error={
                touched.otp && errors.otp
                  ? t(errors.otp, {
                      field: t('OTP'),
                    })
                  : undefined
              }
              action={
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
          </>
        )}

        <Select
          label={t('bank.bank')}
          value={values.bank?.bank_name ?? ''}
          loading={isLoading || isFetching}
          options={sheetData}
          onSelected={handleSelected}
          isHorizontalActionSheet
          sx={{ mb: '$2' }}
          _actionSheet={{
            sheetId: ACTION_SHEET_ID.ADD_BANK_ACCOUNT,
            headerTitle: t('bank.bank'),
          }}
        />

        <InputBase
          label={t('bank.accountNo')}
          value={values.accountNo}
          onChangeText={onCardChanged}
          onBlur={handleBlur('accountNo')}
          keyboardType="number-pad"
          maxLength={MaxLength.CARD}
          error={
            touched.accountNo && errors.accountNo
              ? t(errors.accountNo, {
                  field: t('bank.accountNo'),
                })
              : undefined
          }
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
