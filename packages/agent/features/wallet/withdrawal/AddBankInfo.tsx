import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Button from 'agent/components/Button'
import Input from 'agent/components/Input'
import SelectWithCardGrid from 'agent/components/Select/SelectWithCardGrid'
import Text from 'agent/components/Text'
import TimerButton, {
  ITimerButtonForwardRef,
} from 'agent/components/TimerButton'
import useAgentAlert from 'agent/hooks/useAgentAlert'
import CommonBackHeader from 'agent/navigation/components/CommonBackHeader'
import {
  useAddBankAccountMutation,
  useLookupBankCodeQuery,
  useSendOTPMutation,
} from 'agent/services/accountApi'
import { IResponse } from 'agent/services/common/agentAxiosBaseQuery'
import { useUserInfoQuery } from 'agent/services/userApi'
import validation, {
  getErrorMessage,
  removeAgentPhoneNumPrefix,
} from 'agent/utils/validation'
import { AGENT_STACK_CONTENT_PADDING } from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import { useAgentLocalization } from 'app/provider/localization'
import { Currency } from 'app/utils/constant'
import { ScrollView, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { useModal } from 'react-native-modalfy'
import * as Yup from 'yup'

interface AddBankInfoValues {
  bankCard: string
  accountNumber: string
  accountName: string
  mobileNumber: string
  otp?: string
  hasVerified: number
}

const AddBankInfoForm = () => {
  const { currency, hasVerified, phoneNo, realName } = useUserInfoQuery(
    undefined,
    {
      selectFromResult: ({ data }) => ({
        currency: data?.wallet.currency as Currency,
        hasVerified: data?.has_verified_wd,
        phoneNo: data?.mobile_no,
        realName: data?.name,
      }),
    }
  )
  const OTPRef = useRef<ITimerButtonForwardRef>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [otpField, setOtpField] = useState(false)
  const { showAlert } = useAgentAlert()
  const { openModal } = useModal()
  const { t } = useAgentLocalization()
  const { data: bankList, isLoading: bankListLoading } =
    useLookupBankCodeQuery()
  const [newBankAccount] = useAddBankAccountMutation()
  const [sendOtp] = useSendOTPMutation()
  const { back } = useContextualRouter()
  const { height } = useContainerDimension()

  const onSubmit = async (
    {
      bankCard,
      accountNumber,
      accountName,
      mobileNumber,
      otp,
    }: AddBankInfoValues,
    { setStatus }: FormikHelpers<AddBankInfoValues>
  ) => {
    try {
      setIsLoading(true)
      const { result, message, success } = await newBankAccount({
        currency,
        bank_code: bankCard,
        acc_no: parseInt(accountNumber),
        acc_name: accountName,
        OTP: otp ?? '',
      })
        .unwrap()
        .catch((error) => {
          showAlert(error)
          return error
        })

      if (success) {
        showAlert(message)
        back()
      }
    } catch (err) {
      console.log('error')
    } finally {
      setIsLoading(false)
    }
  }
  const validationSchema = Yup.object({
    bankCard: validation.stringRequired,
    accountNumber: validation.accountNo,
    accountName: validation.accountName,
    mobileNumber: Yup.string().when('hasVerified', {
      is: (hasVerified) => {
        return hasVerified === 1
      },
      then: Yup.string(),
      otherwise: validation.phoneNumber,
    }),
    otp: Yup.string().when('hasVerified', {
      is: (hasVerified) => {
        return hasVerified === 1
      },
      then: Yup.string(),
      otherwise: validation.stringRequired,
    }),
  })

  const formik = useFormik<AddBankInfoValues>({
    initialValues: {
      bankCard: '',
      accountNumber: '',
      accountName: realName ?? '',
      mobileNumber: '',
      otp: '',
      hasVerified: hasVerified ?? 0,
    },
    validationSchema,
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
  } = formik

  async function handleSendOtp() {
    try {
      setIsLoading(true)
      const { message, success } = await sendOtp({
        mobile_no: values.mobileNumber,
      })
        .unwrap()
        .catch((error): IResponse<void> => {
          showAlert(error)
          return error
        })
      if (success) {
        OTPRef.current?.startOtpTimer()
        setOtpField(true)
      }
    } catch (err) {
      openModal('AgentAlertModal', {
        message: getErrorMessage(err),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelected = (e) => {
    const item = bankList?.result?.data.lookup.find((el) => {
      return el.bank_code === e
    })
    setFieldValue('bankCard', item?.bank_code)
  }

  const sheetData =
    bankList?.result?.data.lookup.map((item) => {
      return {
        label: item.bank_code,
        value: item.bank_code,
        icon: `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.bank_icon}`,
      }
    }) ?? []

  useEffect(() => {
    if (phoneNo) {
      const formattedPhoneNum = removeAgentPhoneNumPrefix(phoneNo)
      setFieldValue('mobileNumber', formattedPhoneNum, false)
    }
    if (realName) {
      setFieldValue('accountName', realName, false)
    }
  }, [phoneNo, realName, setFieldValue])

  return (
    <>
      <CommonBackHeader title="wallet.addBank" />
      <ScrollView
        contentContainerStyle={{
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingTop: AGENT_STACK_CONTENT_PADDING,
          minHeight: height,
        }}
      >
        <View sx={{ alignItems: 'center' }}>
          <SelectWithCardGrid
            label={t('common.bankCard')}
            placeholder={t('common.selectBank')}
            loading={bankListLoading}
            options={sheetData}
            value={values.bankCard}
            sx={{ width: '100%', mb: '$3' }}
            onSelected={(e) => handleSelected(e)}
          />
          <Input
            label={t('common.accountNumber')}
            containerProps={{
              sx: { mb: '$3' },
            }}
            placeholder={t('common.enterAccountNumber')}
            error={
              touched.accountNumber && errors.accountNumber
                ? t(errors.accountNumber, {
                    field: t('common.accountNumber'),
                  })
                : undefined
            }
            isRequired
            onChangeText={handleChange('accountNumber')}
            onBlur={handleBlur('accountNumber')}
            keyboardType={'numeric'}
            value={values.accountNumber}
          />
          <Input
            editable={realName ? false : true}
            label={t('common.accountName')}
            containerProps={{ sx: { mb: hasVerified ? '$10' : '$3' } }}
            placeholder={t('common.enterAccountName')}
            error={
              touched.accountName && errors.accountName
                ? t(errors.accountName, {
                    field: 'accountName',
                  })
                : undefined
            }
            onChangeText={handleChange('accountName')}
            onBlur={handleBlur('accountName')}
            value={values.accountName}
          />
          {hasVerified ? null : (
            <>
              <Input
                editable={phoneNo ? false : true}
                leftOuterElementProps={{
                  sx: { backgroundColor: '$secondaryAgent', marginRight: 1 },
                }}
                leftOuterElement={
                  <Text sx={{ paddingX: '$4', color: 'black' }}>
                    {t('common.countryCode')}
                  </Text>
                }
                rightOuterElementProps={{
                  sx: {
                    bg: !values.mobileNumber ? '$disabled' : '$primaryAgent',
                  },
                }}
                rightOuterElement={
                  <TimerButton
                    accessibilityRole="button"
                    ref={OTPRef}
                    title={t('common.send') + ' ' + t('common.otp')}
                    loading={isLoading}
                    onPress={handleSendOtp}
                    sx={{
                      width: 'auto',
                      backgroundColor: '$primaryAgent',
                      m: 0,
                      px: '$3',
                      minWidth: 75,
                      flexGrow: 1,
                      borderRadius: 0,
                    }}
                    _text={{ sx: { color: '$white' } }}
                  />
                }
                label={t('common.mobileNumber')}
                containerProps={{
                  sx: { mb: '$3' },
                }}
                isRequired
                error={
                  touched.mobileNumber && errors.mobileNumber
                    ? t(errors.mobileNumber, {
                        field: t('common.mobileNumber'),
                      })
                    : undefined
                }
                onChangeText={handleChange('mobileNumber')}
                onBlur={handleBlur('mobileNumber')}
                keyboardType={'numeric'}
                value={values.mobileNumber}
              />
              <Input
                label={t('common.enter') + ' ' + t('common.otp')}
                editable={otpField}
                containerProps={{
                  sx: { mb: '$10' },
                }}
                isRequired
                error={
                  touched.otp && errors.otp
                    ? t(errors.otp, {
                        field: t('common.mobileNumber') + ' ' + t('common.otp'),
                      })
                    : undefined
                }
                onChangeText={handleChange('otp')}
                onBlur={handleBlur('otp')}
                keyboardType={'numeric'}
                value={values.otp}
              />
            </>
          )}

          <Button
            onPress={submitForm}
            loading={isLoading}
            sx={{ width: 150 }}
            disabled={!isValid || !dirty}
          >
            <Text sx={{ fontWeight: 'bold', py: '$1', color: 'white' }}>
              {t('common.submit')}
            </Text>
          </Button>
        </View>
      </ScrollView>
    </>
  )
}

export default AddBankInfoForm
