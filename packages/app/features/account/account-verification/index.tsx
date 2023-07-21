import Button from 'app/components/common/Button'
import Input from 'app/components/form/Input'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import validation from 'app/utils/validation'
import { styled, Text, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React from 'react'
import { Platform } from 'react-native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { IResponse } from 'services/common/types'
import {
  usePlayerProfileQuery,
  usePlayerRealNameMutation,
} from 'services/playerApi'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'

type UpdateNameValueProps = {
  realName: string
}

const AccountVerification = () => {
  const { t } = useLocalization()
  const { data: playerData } = usePlayerProfileQuery()
  const [updatePlayerName] = usePlayerRealNameMutation()
  const { showAlert } = useAlert()
  const { replace, back } = useRouter()

  async function updateRealName(realName) {
    const { success, message } = await updatePlayerName({
      realName,
      username: playerData?.username ?? '',
    })
      .unwrap()
      .catch((e: IResponse) => {
        console.log('error', e)
        showAlert(e)
        return e
      })

    if (success) {
      Toast.show({ type: 'success', text1: message })
      return true
    }

    return false
  }

  const onSubmit = async (
    { realName }: UpdateNameValueProps,
    actions: FormikHelpers<UpdateNameValueProps>
  ) => {
    try {
      if (realName) {
        const sanitizedRealName = realName.trim().replace(/\s\s+/g, ' ')
        const success = await updateRealName(sanitizedRealName)

        if (success) {
          actions.resetForm()

          setTimeout(() => {
            if (Platform.OS === 'web') {
              replace('/deposit', undefined, { shallow: true })
            } else {
              replace('/deposit')
            }
          }, 150)
        }
      }
    } catch (error) {
      showAlert(t('status.systemError'))
    }
  }

  const formik = useFormik<UpdateNameValueProps>({
    enableReinitialize: true,
    initialValues: {
      realName: '',
    },
    validationSchema: Yup.object({
      realName: validation.vietnameseCharacter,
    }),
    onSubmit,
  })

  const {
    handleChange,
    handleBlur,
    isSubmitting,
    values,
    errors,
    isValid,
    dirty,
    submitForm,
  } = formik
  return (
    <PageWithBackHeader header={{ title: t('accountVerification.title') }}>
      <StyledView>
        <Text sx={{ paddingBottom: 20, paddingX: 10 }}>
          {t('accountVerification.secondaryTitle')}
        </Text>
        <Input
          //   label={t('accountVerification.realName')}
          value={values.realName}
          autoComplete="off"
          autoCorrect={false}
          spellCheck={false}
          onChangeText={handleChange('realName')}
          onBlur={handleBlur('realName')}
          placeholder={t('accountVerification.placeHolder')}
          error={
            errors.realName
              ? t(errors.realName, {
                  field: t('bank.accountName'),
                })
              : undefined
          }
        />
        <Text sx={{ paddingX: 10, color: '$error' }}>
          {t('accountVerification.remark')}
        </Text>
        <StyledButtonWrapper>
          <Button
            loading={isSubmitting}
            disabled={!isValid || !dirty}
            onPress={submitForm}
          >
            {t('common.next')}
          </Button>
        </StyledButtonWrapper>
      </StyledView>
    </PageWithBackHeader>
  )
}

export default AccountVerification

const StyledView = styled(View)(() => ({
  flex: 1,
  bg: '$secondary',
  pt: '$4',
  px: '$3',
}))

const StyledButtonWrapper = styled(View)(() => ({
  mt: '$5',
  mx: '$4',
}))
