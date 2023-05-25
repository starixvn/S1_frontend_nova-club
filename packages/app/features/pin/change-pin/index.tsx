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
        title={t('pin.oldPin')}
        value={values.oldPin}
        setValue={handleChange('oldPin')}
        errorMsg={
          errors.oldPin ? t(errors.oldPin, { field: t('pin.pin') }) : undefined
        }
      />
      <UnderlinePinField
        title={t('pin.newPin')}
        value={values.pin}
        setValue={handleChange('pin')}
      />
      <UnderlinePinField
        title={t('pin.confirmPin')}
        value={values.confirmPin}
        setValue={handleChange('confirmPin')}
        errorMsg={
          values.confirmPin.length === 6 && errors.confirmPin
            ? t(errors.confirmPin, {
                field: t('pin.pin'),
              })
            : undefined
        }
      />

      {/* <Button
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
        <Button.Label>{t('common.submit')}</Button.Label>
      </Button> */}
    </View>
  )
}

export default ChangePinScreen
