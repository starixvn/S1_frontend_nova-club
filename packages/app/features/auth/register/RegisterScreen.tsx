import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import validation from 'app/utils/validation'
import { useFormik } from 'formik'
import { MotiView, useDynamicAnimation } from 'moti'
import { useEffect, useMemo, useState } from 'react'
import { createParam } from 'solito'
import * as Yup from 'yup'
import AuthLayout from '../AuthLayout'
import { LoginType } from '../AuthTypeSelection'
import RegisterForm from './RegisterForm'
import AccountVerificationForm from './AccountVerificationForm'
import { View } from 'dripsy'
import CustomTabBar from 'app/components/navigation/CustomTabBar'

const { useParam } = createParam<{ t: LoginType }>()

export type RegisterFormValues = {
  username: string
  password: string
  confirmPassword: string
  contactNumber: string
  verifyCode: string
  terms: boolean
}

const onSubmit = async (registerValues: RegisterFormValues) => {
  try {
    // handle register
  } catch (e) {
    console.log(e)
  }
}

const RegisterScreen = () => {
  const { t } = useLocalization()
  const { width } = useContainerDimension()
  const [routes] = useState([
    { key: 'first', title: t('common.player'), index: 0 },
    { key: 'second', title: t('common.agent'), index: 1 },
  ])
  const [type, setIsAgentLogin] = useParam('t', { initial: LoginType.Member })
  const [index, setIndex] = useState(0)

  const isAgentLogin = useMemo(() => type === LoginType.Agent, [type])

  const handlePress = (value) => {
    setIsAgentLogin(index === 0 ? LoginType.Agent : LoginType.Member)
    setIndex(value)
  }

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      contactNumber: '',
      verifyCode: '',
      terms: false,
    },
    validationSchema: Yup.object({
      username: validation.username,
      password: validation.password,
      confirmPassword: validation.confirmPassword,
      contactNumber: validation.phoneNumber,
      verifyCode: validation.verifyCode,
      terms: Yup.bool()
        .required('validation.required')
        .oneOf([true], 'validation.checked'),
    }),
    onSubmit,
  })

  const onRegisterSuccess = () => {
    animationState.animateTo({
      translateX: -width,
    })
  }

  const onBack = () => {
    animationState.animateTo({
      translateX: 0,
    })
  }

  const animationState = useDynamicAnimation(() => {
    return {
      translateX: 0,
    }
  })

  useEffect(() => {
    const currentX = animationState.current?.translateX

    console.log(currentX)

    if (typeof currentX === 'number' && currentX < 0) {
      animationState.animateTo({
        translateX: -width,
      })
    }
  }, [width])

  return (
    <View sx={{ flexDirection: 'row', flex: 1, overflow: 'hidden' }}>
      <MotiView
        state={animationState}
        transition={{
          type: 'timing',
          duration: 400,
        }}
        style={{ width }}
      >
        <AuthLayout>
          <View sx={{ width: '100%' }}>
            <CustomTabBar
              currentIndex={index}
              onPress={handlePress}
              routes={routes}
            />
          </View>
          <RegisterForm
            isAgent={isAgentLogin}
            formik={formik}
            onSuccess={onRegisterSuccess}
          />
        </AuthLayout>
      </MotiView>

      <MotiView
        state={animationState}
        transition={{
          type: 'timing',
          duration: 400,
        }}
        style={{ width }}
      >
        <AuthLayout onBack={onBack}>
          <AccountVerificationForm isAgent={isAgentLogin} formik={formik} />
        </AuthLayout>
      </MotiView>
    </View>
  )
}

export default RegisterScreen
