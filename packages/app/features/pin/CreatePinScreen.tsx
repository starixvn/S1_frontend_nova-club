import { PageWithBackHeader } from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React, { useEffect } from 'react'
import UnderlinePinField from './UnderlinePinField'
import * as Yup from 'yup'
import validation from 'app/utils/validation'
import { Button } from 'app/components/form/Button'
import { useCreateTransferPinMutation } from 'services/pinApi'
import { useDispatch } from 'react-redux'
import { AlertActions } from 'app/store/alert.slice'
import { useRouter } from 'solito/router'
import { useLazyPlayerProfileQuery } from 'services/playerApi'

type PinFormValues = {
  pin: string
  confirmPin: string
}
const CreatePinScreen = ({ hideHeader = false }) => {
  const { t } = useLocalization()
  const { back } = useRouter()
  const dispatch = useDispatch()
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
        .catch((error) => dispatch(AlertActions.addError(error.message)))

      if (success) {
        dispatch(AlertActions.addSuccess(message))
        await fetchProfile()
        actions.resetForm()
        back()
      }
    } catch (e) {
      dispatch(AlertActions.addError('status.systemError'))
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
      <View sx={{ flex: 1, p: '$4' }}>
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
