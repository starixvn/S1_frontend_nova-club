import useLocalization from 'app/provider/localization'
import validation from 'app/utils/validation'
import { View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React from 'react'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useUpdateTransferPinMutation } from 'services/pinApi'
import * as Yup from 'yup'
import UnderlinePinField from '../UnderlinePinField'
import { useRouter } from 'solito/router'
import Button from 'app/components/common/Button'

type ChangePinFormValues = {
  oldPin: string
  pin: string
  confirmPin: string
}

const ChangePinScreen = () => {
  const { t } = useLocalization()
  const { back } = useRouter()
  // const { showAlert } = useAlert()
  const [updateTransferPin] = useUpdateTransferPinMutation()

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
          // showAlert(error)
          return error
        })

      if (success) {
        Toast.show({ type: 'success', text1: message })

        back()
      }
    } catch (error) {
      // showAlert(error)
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
    submitForm,
  } = formik

  return (
    <View sx={{ flex: 1 }}>
      <UnderlinePinField
        title={t('manageCredentials.pin.oldPin')}
        value={values.oldPin}
        setValue={handleChange('oldPin')}
        errorMsg={
          errors.oldPin
            ? t(errors.oldPin, { field: t('common.pin') })
            : undefined
        }
      />
      <UnderlinePinField
        title={t('manageCredentials.pin.newPin')}
        value={values.pin}
        setValue={handleChange('pin')}
      />
      <UnderlinePinField
        title={t('manageCredentials.pin.confirmPin')}
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
      <Button
        title={t('common.submit')}
        onPress={submitForm}
        disabled={!isValid || !dirty}
        sx={{ mt: '$4', mx: '$4' }}
      />
    </View>
  )
}

export default ChangePinScreen
