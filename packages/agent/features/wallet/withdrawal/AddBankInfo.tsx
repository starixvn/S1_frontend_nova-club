import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { useNavigation } from '@react-navigation/native'
import Button from 'agent/components/Button'
import Input from 'agent/components/Input'
import SelectWithCardGrid from 'agent/components/Select/SelectWithCardGrid'
import Text from 'agent/components/Text'
import useAgentAlert from 'agent/hooks/useAgentAlert'
import CommonBackHeader from 'agent/navigation/components/CommonBackHeader'
import {
  useAddBankAccountMutation,
  useLookupBankCodeQuery,
  useSendOTPMutation,
} from 'agent/services/accountApi'
import { IResponse } from 'agent/services/common/agentAxiosBaseQuery'
import { useUserInfoQuery } from 'agent/services/userApi'
import validation, { getErrorMessage } from 'agent/utils/validation'
import {
  AGENT_STACK_CONTENT_PADDING,
  AGENT_STACK_CONTENT_PADDING_WEB,
} from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import useLocalization from 'app/provider/localization'
import { Currency } from 'app/utils/constant'
import { ActivityIndicator, ScrollView, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import { useState } from 'react'
import { Platform } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useModal } from 'react-native-modalfy'
import * as Yup from 'yup'

interface AddBankInfoValues {
  bankCard: string
  accountNumber: string
  accountName: string
  mobileNumber: string
  otp?: string
}

const AddBankInfoForm = () => {
  const { currency } = useUserInfoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      currency: data?.wallet.currency as Currency,
    }),
  })
  const [isLoading, setIsLoading] = useState(false)
  const [otpField, setOtpField] = useState(false)
  const [otpLoading, setOtpLoading] = useState(false)
  const { showAlert } = useAgentAlert()
  const { openModal } = useModal()
  const { t } = useLocalization()
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
  const formik = useFormik<AddBankInfoValues>({
    initialValues: {
      bankCard: '',
      accountNumber: '',
      accountName: '',
      mobileNumber: '',
      otp: '',
    },
    validationSchema: Yup.object({
      bankCard: validation.stringRequired,
      accountNumber: validation.accountNo,
      accountName: validation.accountName,
      mobileNumber: validation.phoneNumber,
      otp: validation.stringRequired,
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
  } = formik

  const handleSendOtp = async (mobile_no: string) => {
    try {
      setOtpLoading(true)
      const { message, success } = await sendOtp({
        mobile_no,
      })
        .unwrap()
        .catch((error): IResponse<void> => {
          showAlert(error)
          return error
        })
      setOtpLoading(false)
      if (success) {
        showAlert(message)
        setOtpField(true)
      }
    } catch (err) {
      openModal('AgentAlertModal', {
        message: getErrorMessage(err),
      })
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
  return (
    <>
      <CommonBackHeader title="wallet.addBank" />
      <ScrollView
        contentContainerStyle={{
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingTop:
            Platform.OS === 'web'
              ? AGENT_STACK_CONTENT_PADDING_WEB
              : AGENT_STACK_CONTENT_PADDING,
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
                    field: 'accountNumber',
                  })
                : undefined
            }
            onChangeText={handleChange('accountNumber')}
            onBlur={handleBlur('accountNumber')}
            keyboardType={'numeric'}
            value={values.accountNumber}
          />
          <Input
            label={t('common.accountName')}
            containerProps={{
              sx: { mb: '$3' },
            }}
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
          <Input
            leftOuterElementProps={{
              sx: { backgroundColor: '$secondaryAgent', marginRight: 1 },
            }}
            leftOuterElement={
              <Text sx={{ paddingX: '$4', color: 'black' }}>
                {t('common.countryCode')}
              </Text>
            }
            rightOuterElementProps={{
              sx: { bg: !values.mobileNumber ? '$disabled' : '$primary' },
            }}
            rightOuterElement={
              <>
                {otpLoading ? (
                  <View sx={{ minWidth: 100 }}>
                    <ActivityIndicator color={'white'} />
                  </View>
                ) : (
                  <TouchableOpacity
                    disabled={!values.mobileNumber ? true : false}
                    onPress={() => handleSendOtp(values.mobileNumber)}
                    style={{ minWidth: 100 }}
                  >
                    <Text sx={{ paddingX: '$4', color: 'white' }}>
                      {t('common.send') + ' ' + t('common.otp')}
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            }
            label={t('common.mobileNumber')}
            containerProps={{
              sx: { mb: '$3' },
            }}
            isRequired
            error={
              touched.mobileNumber && errors.mobileNumber
                ? t(errors.mobileNumber, {
                    field: 'mobileNumber',
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
                    field: 'otp',
                  })
                : undefined
            }
            onChangeText={handleChange('otp')}
            onBlur={handleBlur('otp')}
            keyboardType={'numeric'}
            value={values.otp}
          />

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
