import Button from 'app/components/common/Button'
import FormContainer from 'app/components/form/FormContainer'
import useAlert from 'app/hooks/useAlert'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import validation from 'app/utils/validation'
import { View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React, { useEffect, useMemo } from 'react'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useUpdateTransferPinMutation } from 'services/pinApi'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'
import UnderlinePinField from '../UnderlinePinField'

type ChangePinFormValues = {
  oldPin: string
  pin: string
  confirmPin: string
}

const ChangePinScreen = () => {
  const { t } = useLocalization()
  const { back } = useRouter()
  const { showAlert } = useAlert()
  const [updateTransferPin] = useUpdateTransferPinMutation()
  const desktop = useIsDesktop()

  const lang = useAppSelector((s) => s.setting.locale)

  useEffect(() => {
    resetForm()
  }, [lang])

  const onSubmit = async (
    { oldPin, pin, confirmPin }: ChangePinFormValues,
    actions: FormikHelpers<ChangePinFormValues>
  ) => {
    try {
      actions.setSubmitting(true)
      const { data, success, message } = await updateTransferPin({
        old_pin: oldPin,
        pin: pin,
        cpin: confirmPin,
      })
        .unwrap()
        .catch((error) => {
          showAlert(error)
          return error
        })

      if (success) {
        Toast.show({ type: 'success', text1: message })

        back()
      }
    } catch (error) {
      showAlert(error)
    } finally {
      actions.setSubmitting(false)
    }
  }

  const formik = useFormik<ChangePinFormValues>({
    initialValues: {
      oldPin: '',
      pin: '',
      confirmPin: '',
    },
    validationSchema: Yup.object({
      oldPin: validation.pin,
      pin: validation.pin,
      confirmPin: validation.confirmPin,
    }),
    onSubmit,
  })

  const {
    handleChange,
    isSubmitting,
    values,
    errors,
    isValid,
    dirty,
    resetForm,
    submitForm,
  } = formik

  const memoPin = useMemo(
    () => (
      <>
        <UnderlinePinField
          label={t('manageCredentials.pin.oldPin')}
          value={values.oldPin}
          setValue={handleChange('oldPin')}
          errorMsg={
            errors.oldPin
              ? t(errors.oldPin, { field: t('common.pin') })
              : undefined
          }
        />
        <UnderlinePinField
          label={t('manageCredentials.pin.newPin')}
          value={values.pin}
          setValue={handleChange('pin')}
        />
        <UnderlinePinField
          label={t('manageCredentials.pin.confirmPin')}
          value={values.confirmPin}
          setValue={handleChange('confirmPin')}
          errorMsg={
            values.confirmPin.length === 6 && errors.confirmPin
              ? t(errors.confirmPin, {
                  field: t('common.pin'),
                })
              : undefined
          }
        />
      </>
    ),
    [values, errors]
  )

  return (
    <FormContainer>
      {memoPin}
      <View sx={{ flexDirection: 'row', justifyContent: 'center' }}>
        {desktop && <View sx={{ width: '20%', minWidth: 100 }} />}
        <Button
          onPress={submitForm}
          disabled={!isValid || !dirty}
          sx={{
            mt: '$4',
            py: '$2',
            ...(desktop
              ? {
                  width: '55%',
                  maxWidth: 350,
                }
              : { width: '80%', maxWidth: 350 }),
          }}
        >
          {t('common.submit')}
        </Button>
      </View>
    </FormContainer>
  )
}

export default ChangePinScreen
