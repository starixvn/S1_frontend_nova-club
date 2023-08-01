import Button from 'agent/components/Button'
import Input from 'agent/components/Input'
import useAgentAlert from 'agent/hooks/useAgentAlert'
import CommonBackHeader from 'agent/navigation/components/CommonBackHeader'
import { IResponse } from 'agent/services/common/agentAxiosBaseQuery'
import { useChangePasswordMutation } from 'agent/services/userApi'
import validation from 'agent/utils/validation'
import { useAgentLocalization } from 'app/provider/localization'
import { Flex, ScrollView } from 'dripsy'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'
import { AGENT_STACK_CONTENT_PADDING } from '../../constant/sizes'

interface ChangePasswordValues {
  oldPwd: string
  password: string
  confirmpassword: string
}

const AgentChangePassword = () => {
  const { t } = useAgentLocalization()
  const [isLoading, setIsLoading] = useState(false)
  const { showAlert } = useAgentAlert()
  const [changePassword] = useChangePasswordMutation()
  const { replace } = useRouter()

  const onSubmit = async ({
    oldPwd,
    password,
    confirmpassword,
  }: ChangePasswordValues) => {
    setIsLoading(true)

    try {
      const { success, message, result } = await changePassword({
        oldPwd,
        password,
        confirmpassword,
      })
        .unwrap()
        .catch((e): IResponse<[]> => {
          showAlert(e)
          return e
        })

      if (success && message) {
        showAlert(message)
        replace('/agent')
      }
    } catch (e) {
      showAlert(e)
    } finally {
      setIsLoading(false)
    }
  }

  const formik = useFormik<ChangePasswordValues>({
    initialValues: {
      oldPwd: '',
      password: '',
      confirmpassword: '',
    },
    validationSchema: Yup.object({
      oldPwd: validation.password,
      password: validation.password,
      confirmpassword: validation.confirmPassword,
    }),
    onSubmit,
  })

  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    isValid,
    dirty,
    submitForm,
  } = formik

  return (
    <>
      <CommonBackHeader title={'menu.changePass'} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: AGENT_STACK_CONTENT_PADDING,
        }}
      >
        <Flex
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Input
            label={t('common.oldPassword')}
            isRequired
            secureTextEntry
            placeholder={t('placeholder.enterOldPassword')}
            containerProps={{
              sx: { mb: '$3' },
            }}
            onChangeText={handleChange('oldPwd')}
            onBlur={handleBlur('oldPwd')}
            value={values.oldPwd}
            error={
              touched.oldPwd && errors.oldPwd
                ? t(errors.oldPwd, {
                    field: t('common.oldPassword'),
                  })
                : undefined
            }
          />
          <Input
            label={t('common.newPassword')}
            isRequired
            secureTextEntry
            placeholder={t('placeholder.enterNewPassword')}
            containerProps={{
              sx: { mb: '$3' },
            }}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            error={
              touched.password && errors.password
                ? t(errors.password, {
                    field: t('common.newPassword'),
                  })
                : undefined
            }
          />
          <Input
            label={t('common.confirmPassword')}
            isRequired
            secureTextEntry
            placeholder={t('placeholder.enterConfirmPassword')}
            containerProps={{
              sx: { mb: '$3' },
            }}
            onChangeText={handleChange('confirmpassword')}
            onBlur={handleBlur('confirmpassword')}
            value={values.confirmpassword}
            error={
              touched.confirmpassword && errors.confirmpassword
                ? t(errors.confirmpassword, {
                    field: t('common.confirmPassword'),
                  })
                : undefined
            }
          />

          <Button
            onPress={submitForm}
            loading={isLoading}
            sx={{ marginY: 20 }}
            disabled={!isValid || !dirty}
          >
            {t('common.submit')}
          </Button>
        </Flex>
      </ScrollView>
    </>
  )
}
export default AgentChangePassword
