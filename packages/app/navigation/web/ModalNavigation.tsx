import Icon from 'app/components/Icon'
import { Container, Text, View } from 'dripsy'
import { TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import { useRouter } from 'solito/router'
const ModalNavigation = ({ children, ...rest }) => {
  return (
    <Modal
      animationIn={'slideInRight'}
      animationOut={'slideOutRight'}
      isVisible={false}
      coverScreen
      style={{ margin: 0 }}
      {...rest}
    >
      <Container sx={{ flex: 1 }}>{children}</Container>
    </Modal>
  )
}

export default ModalNavigation
