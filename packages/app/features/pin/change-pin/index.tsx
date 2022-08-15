import { Button } from 'app/components/form/Button'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React from 'react'
import UnderlinePinField from '../UnderlinePinField'

import { AlertActions } from 'app/store/alert.slice'
import validation from 'app/utils/validation'
import { FormikHelpers, useFormik } from 'formik'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useDispatch } from 'react-redux'
import { useUpdateTransferPinMutation } from 'services/pinApi'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'

type ChangePinFormValues = {
  oldPin: string
  newPin: string
  confirmPin: string
}

const ChangePinScreen = () => {
  const { t } = useLocalization()
  const { back } = useRouter()
  const dispatch = useDispatch()
  const [updateTransferPin] = useUpdateTransferPinMutation()

  const onSubmit = async (
    { oldPin, newPin, confirmPin }: ChangePinFormValues,
    actions: FormikHelpers<ChangePinFormValues>
  ) => {
    try {
      actions.setSubmitting(true)
      const { data, success, message } = await updateTransferPin({
        old_pin: oldPin,
        pin: newPin,
        cpin: confirmPin,
      })
        .unwrap()
        .catch((error) => dispatch(AlertActions.addError(error.message)))

      if (success) {
        Toast.show({ type: 'success', text1: message })

        back()
      }
    } catch (e) {
      dispatch(AlertActions.addError('status.systemError'))
    } finally {
      actions.setSubmitting(false)
    }
  }

  const formik = useFormik<ChangePinFormValues>({
    initialValues: {
      oldPin: '',
      newPin: '',
      confirmPin: '',
    },
    validationSchema: Yup.object({
      oldPin: validation.pin,
      newPin: validation.pin,
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
        value={values.newPin}
        setValue={handleChange('newPin')}
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
        <Button.Label>{t('common.submit')}</Button.Label>
      </Button>
    </View>
  )
}

export default ChangePinScreen
