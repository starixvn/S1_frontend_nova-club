import Icon from 'app/components/Icon'
import { Text, View } from 'dripsy'
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
      {children}
    </Modal>
  )
}

export default ModalNavigation
