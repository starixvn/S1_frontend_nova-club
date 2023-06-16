import ModalContent from 'app/components/modal/ModalContent'
import ModalWrapper from 'app/components/modal/ModalWrapper'
import RegisterScreen from 'app/features/auth/register/RegisterScreen'
import { View } from 'dripsy'

const RegisterModal = () => {
  return (
    <ModalWrapper sx={{ width: '100%' }}>
      <ModalContent isShowHeader={false}>
        <View>
          <RegisterScreen />
        </View>
      </ModalContent>
    </ModalWrapper>
  )
}

export default RegisterModal
