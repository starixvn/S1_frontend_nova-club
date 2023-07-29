import useLocalization from 'app/provider/localization'
import validation from 'app/utils/validation'
import { Text, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React, { useEffect } from 'react'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useCreateTransferPinMutation } from 'services/pinApi'
import { useLazyPlayerProfileQuery } from 'services/playerApi'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'
import UnderlinePinField from './UnderlinePinField'
import Button from 'app/components/common/Button'
import useAlert from 'app/hooks/useAlert'
import isDesktop from 'app/utils/isDesktop'
import FormContainer from 'app/components/form/FormContainer'
import { PageWithBackHeader } from 'app/components/layouts/Page'

type PinFormValues = {
  pin: string
  confirmPin: string
}
const CreatePinScreen = ({ isTab = false }) => {
  const { t } = useLocalization()
  const { back } = useRouter()
  const { showAlert } = useAlert()
  const [fetchProfile] = useLazyPlayerProfileQuery()
  const [postCreateTransferPin] = useCreateTransferPinMutation()
  const desktop = isDesktop()

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
      header={{ title: t('manageCredentials.pin.createPin') }}
      disableScrollView
      hideHeader={desktop || isTab}
    >
      <FormContainer>
        <Text sx={{ fontSize: 24 }}>
          {t('manageCredentials.pin.create6Pin')}
        </Text>
        <Text sx={{ mb: '$3' }}>{t('manageCredentials.pin.securePin')}</Text>
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
                  field: t('manageCredentials.pin.newPin'),
                })
              : undefined
          }
        />

        <Button
          onPress={submitForm}
          disabled={!isValid || !dirty}
          sx={{ mt: '$3' }}
        >
          {t('common.submit')}
        </Button>
      </FormContainer>
    </PageWithBackHeader>
  )
}

export default CreatePinScreen
