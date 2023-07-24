import { ButtonProps } from 'react-native'

export interface ModalAction {
  label: string
  onPress?: () => void
  disableAutoClose?: boolean
  disabled?: boolean
  loading?: boolean
  props?: ButtonProps
}
