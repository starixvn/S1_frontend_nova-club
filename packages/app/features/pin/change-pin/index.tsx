import { Button } from 'app/components/form/Button'
import { PageWithBackHeader } from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { Text } from 'dripsy'
import React from 'react'
import UnderlinePinField from '../UnderlinePinField'

import * as Yup from 'yup'
import { FormikHelpers, useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { AlertActions } from 'app/store/alert.slice'
import { useRouter } from 'solito/router'
import validation from 'app/utils/validation'
import { useUpdateTransferPinMutation } from 'services/pinApi'

type ChangePinFormValues = {
  oldPin: string
  pin: string
  confirmPin: string
}

const ChangePinScreen = () => {
  const { t } = useLocalization()
  const { back } = useRouter()
  const dispatch = useDispatch()
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
        .catch((error) => dispatch(AlertActions.addError(error.message)))

      if (success) {
        dispatch(AlertActions.addSuccess(message))
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
    <PageWithBackHeader header={{ title: t('Change PIN') }}>
      <Text sx={{ fontSize: 24 }}>{t('pin.headerText1')}</Text>
      <Text>{t('pin.headerText2')}</Text>

      <UnderlinePinField
        title={t('pin.oldPin')}
        value={values.oldPin}
        setValue={handleChange('oldPin')}
        errorMsg={
          errors.oldPin
            ? t(errors.oldPin, { field: t('common.pin') })
            : undefined
        }
      />
      <UnderlinePinField
        title={t('pin.pin')}
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
                field: t('common.pin'),
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
    </PageWithBackHeader>
  )
}

export default ChangePinScreen
