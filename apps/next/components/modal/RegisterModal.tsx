import LanguageSwitch from 'app/components/LanguageSwitch'
import Input from 'app/components/form/Input'
import ModalContent from 'app/components/modal/ModalContent'
import ModalWrapper from 'app/components/modal/ModalWrapper'
import CustomTabBar from 'app/components/navigation/CustomTabBar'
import AuthLayout from 'app/features/auth/AuthLayout'
import AuthBanner from 'app/features/auth/components/AuthBanner'
import AuthHeader from 'app/features/auth/components/AuthHeader'
import RegisterFormLayout from 'app/features/auth/register/RegisterFormLayout'
import RegisterScreen from 'app/features/auth/register/RegisterScreen'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { View } from 'dripsy'

const RegisterModal = (modal: {}) => {
  const { bottom } = useSafeArea()
  const BANNER_RATIO = 768 / 240
  return (
    <ModalWrapper isAuthModal>
      <ModalContent disableAction={false} isShowHeader={false} isAuthModal>
        <View sx={{ flex: 1, flexDirection: 'row' }}>
          <View sx={{ width: '50%' }}>
            <AuthHeader
              headerDesc={'ACCOUNT REGISTRATION'}
              onPress={() => console.log('first')}
            />
            <AuthBanner bannerRatio={BANNER_RATIO} />
            <View sx={{ alignItems: 'center', mb: bottom + 8 }}>
              <LanguageSwitch />
            </View>
          </View>
          <View sx={{ width: '50%' }}>
            <RegisterFormLayout />
          </View>
        </View>
      </ModalContent>
    </ModalWrapper>
  )
}

export default RegisterModal
