import { View } from 'dripsy'
import ModalWrapper from '../ModalWrapper'

type TransparentHeaderBackgroundProps = {
  children: React.ReactNode
}

const TransparentHeaderBackground = ({
  children,
}: TransparentHeaderBackgroundProps) => {
  return <View>{children}</View>
}

export default TransparentHeaderBackground
