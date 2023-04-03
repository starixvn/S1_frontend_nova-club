import Button from 'agent/components/Button'
import Card from 'agent/components/Card'
import CheckBox from 'agent/components/CheckBox'
import Input from 'agent/components/Input'
import Select from 'agent/components/Select/Select'
import { EarningOptions } from 'agent/constant/select'
import { PASSWORD_MAX_LENGTH } from 'agent/utils/validation'
import useLocalization from 'app/provider/localization'
import { Flex } from 'dripsy'
import { FormikProps } from 'formik'
import React from 'react'

export enum ShareholderAgent {
  Agent = 'agent',
  Shareholder = 'shareholder',
}

type CreateFormProps<T> = {
  screen: ShareholderAgent
  isLoading: boolean
  formik: FormikProps<T>
}

const CreateForm = <T,>({
  screen = ShareholderAgent.Shareholder,
  isLoading,
  formik,
}: CreateFormProps<T>) => {
  const { t } = useLocalization()
  const isCheck = true
  const isShareholder = screen === ShareholderAgent.Shareholder
  const inputWidth = isShareholder ? '48%' : '32%'

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

  return (
    <Card>
      <Flex
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Input
          editable={false}
          label={t('profile.currency')}
          value="VND"
          containerProps={{
            sx: { width: inputWidth, mb: 12 },
          }}
        />
        {isShareholder && (
          <Select
            label={t('report.earning') + ' %'}
            options={EarningOptions}
            placeholder={t('report.earning')}
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
          label={isShareholder ? t('report.type') : ' '}
          leftInnerElement={
            <CheckBox
              isCheck={isCheck}
              tickColor="#D1D1D1"
              sx={{ bg: '#818384' }}
            />
          }
          value="Cash"
          containerProps={{
            sx: { width: inputWidth, mb: 12 },
          }}
        />
        <Input
          editable={false}
          label=" "
          leftInnerElement={
            <CheckBox
              isCheck={isCheck}
              tickColor="#D1D1D1"
              sx={{ bg: '#818384' }}
            />
          }
          value="Credit"
          containerProps={{
            sx: { width: inputWidth, mb: 12 },
          }}
        />
      </Flex>

      <Input
        label={t('common.username')}
        isRequired
        placeholder={t('common.enterUsername')}
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
        placeholder={t('common.enterNewPassword')}
        value={values.password}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        maxLength={PASSWORD_MAX_LENGTH}
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
        value={values.confirmPassword}
        onChangeText={handleChange('confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        maxLength={PASSWORD_MAX_LENGTH}
        secureTextEntry
        containerProps={{ sx: { mb: 12 } }}
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
  )
}

export default CreateForm
