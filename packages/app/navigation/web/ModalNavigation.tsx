import { Container } from 'dripsy'
import { useLayoutEffect } from 'react'
import { Platform } from 'react-native'
import Modal from 'react-native-modal'

const ModalNavigation = ({ children, ...rest }) => {
  useLayoutEffect(() => {
    if (Platform.OS === 'web') {
      const { isVisible } = rest

      if (isVisible) {
        document.documentElement.classList.add('overflow-y-hidden')
      }
    }

    return () => {
      if (Platform.OS === 'web') {
        document.documentElement.classList.remove('overflow-y-hidden')
      }
    }
  }, [rest.isVisible])

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
