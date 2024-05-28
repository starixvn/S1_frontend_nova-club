import { useProfileNewEarnPtQuery } from 'agent/services/profileApi'
import validation, { USERNAME_MAX_LENGTH } from 'agent/utils/validation'
import KeyboardView from 'app/components/KeyboardView'
import { ActivityIndicator, Flex, ScrollView } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React, { useEffect, useMemo } from 'react'
import { useModal } from 'react-native-modalfy'
import * as Yup from 'yup'
import { AddNewPartnerArgs } from 'agent/services/partnerApi.type'
import { AddNewAgentArgs } from 'agent/services/agentApi.type'
import { AddNewShareholderArgs } from 'agent/services/shareholderApi.type'
import { useAppSelector } from 'app/provider/redux/store'
import Card from 'agent/components/Card'
import Input from 'agent/components/Input'
import Select, { Options } from 'agent/components/Select/Select'
import CheckBox from 'agent/components/CheckBox'
import { useAgentLocalization } from 'app/provider/localization'
import Button from 'agent/components/Button'
import { Currency } from 'utils/constant'

const EmptyOptions = []

export type NewFormValues = {
  earning?: number
  username: string
  password: string
  currency: Currency
  confirmPassword: string
  isAgentValidation: boolean
}

export enum ShareholderAgent {
  Agent = 'agent',
  Shareholder = 'shareholder',
  Partner = 'partner',
}

type AddContentProps<T> = {
  initialScreen: ShareholderAgent
  addNewAccount: T
  isLoading: boolean
}

const AddContent = <
  T extends (
    args: AddNewPartnerArgs | AddNewShareholderArgs | AddNewAgentArgs
  ) => any
>({
  initialScreen,
  addNewAccount,
  isLoading,
}: AddContentProps<T>) => {
  const { t } = useAgentLocalization()

  const isCheck = true
  const isShareholder =
    initialScreen === ShareholderAgent.Shareholder ||
    initialScreen === ShareholderAgent.Partner
  const inputWidth = isShareholder ? '48%' : '32%'

  const { openModal } = useModal()
  const currency = useAppSelector((s) => s.agent.currency)
  const { data, isLoading: isLoadingOptions } =
    useProfileNewEarnPtQuery(undefined)

  const onSubmit = async (
    {
      earning,
      username,
      password,
      confirmPassword,
      currency: selectedCurrency,
    }: NewFormValues,
    { resetForm }: FormikHelpers<NewFormValues>
  ) => {
    const { success } = await addNewAccount({
      currency: {
        [selectedCurrency]: {
          EARNP: isShareholder ? earning : undefined,
          CASH: '1',
          CREDIT: '1',
        },
      },
      username,
      password,
      confirmpassword: confirmPassword,
    })
      .unwrap()
      .catch((error) => {
        console.log('error', error)
        openModal('AgentAlertModal', { message: error.message })
        return error
      })

    if (success) {
      openModal('NewRegistrationModal', { username, password })
      resetForm()
    }
  }

  const formik = useFormik<NewFormValues>({
    enableReinitialize: true,
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      isAgentValidation: !isShareholder,
      currency,
    },
    validationSchema: Yup.object({
      earning: Yup.number().when('isAgentValidation', {
        is: false,
        then: () => validation.stringRequired,
      }),
      username: validation.username,
      password: validation.password,
      confirmPassword: validation.confirmPassword,
    }),
    onSubmit,
  })

  const {
    handleChange,
    handleBlur,
    setFieldValue,
    isSubmitting,
    values,
    errors,
    touched,
    isValid,
    dirty,
    submitForm,
  } = formik

  const currencyOptions = useMemo(() => {
    if (data)
      return Object.keys(data.currency).map((c) => ({
        label: c,
        value: c,
      })) as Options<Currency>[]
    else return EmptyOptions as Options<Currency>[]
  }, [data])

  const earningPtOptions = useMemo(() => {
    if (data) {
      let list = data.earnPercList[values.currency]
      return Object.keys(list).map((k) => ({
        label: k,
        value: list[k],
      })) as Options<number>[]
    } else return EmptyOptions as Options<number>[]
  }, [data, values.currency])

  useEffect(() => {
    /* set perc based on selected currency */
    if (data && data?.earnPerc && values.currency) {
      setFieldValue('earning', data.earnPerc[values.currency])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.currency, data?.earnPerc])

  return (
    <KeyboardView>
      <ScrollView sx={{ p: 12, bg: 'white' }}>
        <Card sx={{ mb: '$5' }}>
          {isLoadingOptions ? (
            <ActivityIndicator />
          ) : (
            <Flex
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
            >
              <Select
                label={t('profile.currency')}
                options={currencyOptions}
                placeholder={t('report.pt')}
                value={values.currency}
                onSelected={(val) => {
                  setFieldValue('currency', val)
                }}
                isRequired
                sx={{ width: inputWidth, mb: 12 }}
              />
              {isShareholder && earningPtOptions && (
                <Select
                  label={t('report.pt') + ' %'}
                  options={earningPtOptions}
                  placeholder={t('report.pt')}
                  value={values.earning}
                  onSelected={(val) => {
                    setFieldValue('earning', val)
                  }}
                  isRequired
                  sx={{ width: inputWidth, mb: 12 }}
                />
              )}
              <Input
                editable={false}
                label={isShareholder ? t('report.type') : '\u00A0'}
                leftInnerElement={<CheckBox isCheck={isCheck} />}
                value={t('common.cash')}
                containerProps={{
                  sx: { width: inputWidth, mb: 12 },
                }}
              />
              <Input
                editable={false}
                label="&nbsp;"
                leftInnerElement={
                  <CheckBox
                    isCheck={isCheck}
                    tickColor="#D1D1D1"
                    sx={{ bg: '#818384' }}
                  />
                }
                value={t('common.credit')}
                containerProps={{
                  sx: { width: inputWidth, mb: 12 },
                }}
              />
            </Flex>
          )}

          <Input
            label={t('common.username')}
            isRequired
            maxLength={USERNAME_MAX_LENGTH}
            placeholder={t('placeholder.enterUsername')}
            value={values.username}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            containerProps={{ sx: { mb: 12 } }}
            error={
              touched.username && errors.username
                ? t(errors.username, {
                    field: t('common.username'),
                  })
                : undefined
            }
          />
          <Input
            label={t('common.password')}
            isRequired
            placeholder={t('placeholder.enterNewPassword')}
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            secureTextEntry
            containerProps={{ sx: { mb: 12 } }}
            error={
              touched.password && errors.password
                ? t(errors.password, {
                    field: t('common.password'),
                  })
                : undefined
            }
          />
          <Input
            label={t('common.confirmPassword')}
            isRequired
            placeholder={t('placeholder.enterConfirmPassword')}
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            secureTextEntry
            containerProps={{ sx: { mb: 12 } }}
            autoComplete="password-new"
            error={
              touched.confirmPassword && errors.confirmPassword
                ? t(errors.confirmPassword, {
                    field: t('common.confirmPassword'),
                  })
                : undefined
            }
          />

          <Button
            elevation={1}
            leftIcon={{
              name: 'add-round',
              size: 16,
            }}
            onPress={submitForm}
            loading={isLoading}
            disabled={!dirty || !isValid}
            style={{ marginVertical: 24 }}
          >
            {t('common.create')}
          </Button>
        </Card>
      </ScrollView>
    </KeyboardView>
  )
}

export default AddContent
