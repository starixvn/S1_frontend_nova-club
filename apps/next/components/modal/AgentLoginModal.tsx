import LanguageSwitch from 'app/components/LanguageSwitch'
import ModalContent from 'app/components/modal/ModalContent'
import ModalWrapper from 'app/components/modal/ModalWrapper'
import AuthBanner from 'app/features/auth/components/AuthBanner'
import AuthHeader from 'app/features/auth/components/AuthHeader'
import LoginForm from 'app/features/auth/login/LoginForm'
import useLocalization from 'app/provider/localization'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { View } from 'dripsy'

const RegisterModal = (modal: {}) => {
  const { bottom } = useSafeArea()
  const BANNER_RATIO = 768 / 240
  const { t } = useLocalization()
  return (
    <ModalWrapper isAuthModal>
      <ModalContent disableAction={false} isShowHeader={false} isAuthModal>
        <View sx={{ flex: 1, flexDirection: 'row' }}>
          <View sx={{ width: '50%' }}>
            <AuthHeader
              headerDesc={t('authentication.accountReg')}
              onPress={() => console.log('first')}
            />
            <AuthBanner bannerRatio={BANNER_RATIO} />
            <View sx={{ alignItems: 'center', mb: bottom + 8 }}>
              <LanguageSwitch />
            </View>
          </View>
          <View sx={{ width: '50%' }}>
            <LoginForm isAgent />
          </View>
        </View>
      </ModalContent>
    </ModalWrapper>
  )
}

export default RegisterModal
