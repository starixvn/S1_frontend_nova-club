import Icon from 'app/components/Icon'
import { Text, View } from 'dripsy'
import { TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import { useRouter } from 'solito/router'
const ModalNavigation = ({ children, ...rest }) => {
  const { back } = useRouter()
  return (
    <Modal
      animationIn={'slideInRight'}
      animationOut={'slideOutRight'}
      isVisible={false}
      coverScreen
      style={{ margin: 0 }}
      {...rest}
    >
      <TouchableOpacity onPress={() => back()}>
        <Icon name="lc" />
        <Text>Back</Text>
      </TouchableOpacity>
      <View>{children}</View>
    </Modal>
  )
}

export default ModalNavigation
