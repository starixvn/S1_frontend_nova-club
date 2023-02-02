import { Button } from 'app/components/form/Button'
import { PageWithBackHeader } from 'app/components/layout/Page'
import useAlert from 'app/hooks/useAlert'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import useLocalization from 'app/provider/localization'
import validation from 'app/utils/validation'
import { Text, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React, { useEffect } from 'react'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useCreateTransferPinMutation } from 'services/pinApi'
import { useLazyPlayerProfileQuery } from 'services/playerApi'
import * as Yup from 'yup'
import UnderlinePinField from './UnderlinePinField'

type PinFormValues = {
  pin: string
  confirmPin: string
}
const CreatePinScreen = ({ hideHeader = false }) => {
  const { t } = useLocalization()
  const { back } = useContextualRouter()
  const { showAlert } = useAlert()
  const [fetchProfile] = useLazyPlayerProfileQuery()
  const [postCreateTransferPin] = useCreateTransferPinMutation()

  useEffect(() => {
    return () => {
      fetchProfile()
    }
  }, [])

  const onSubmit = async (
    { pin, confirmPin }: PinFormValues,
    actions: FormikHelpers<PinFormValues>
  ) => {
    try {
      actions.setSubmitting(true)
      const { data, success, message } = await postCreateTransferPin({
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
        await fetchProfile()
        actions.resetForm()
        back()
      }
    } catch (error) {
      showAlert(error)
    } finally {
      actions.setSubmitting(false)
    }
  }

  const formik = useFormik<PinFormValues>({
    initialValues: {
      pin: '',
      confirmPin: '',
    },
    validationSchema: Yup.object({
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
    <PageWithBackHeader
      header={{ title: t('menu.createPin') }}
      hideHeader={hideHeader}
    >
      <View sx={{ flex: 1, p: '$4', mb: '$10' }}>
        <Text sx={{ fontSize: 24 }}>{t('pin.headerText1')}</Text>
        <Text>{t('pin.headerText2')}</Text>
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
                  field: t('pin.newPin'),
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
    </PageWithBackHeader>
  )
}

export default CreatePinScreen
