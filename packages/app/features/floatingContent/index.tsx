import { View } from 'dripsy'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { usePlayerProfileQuery } from 'services/playerApi'
import FloatingContentSwitch from './FloatingContentSwitch'
import FloatingQr from './FloatingQr'

const FloatingContent = () => {
  const { isCreditMember } = usePlayerProfileQuery()

  return (
    <>
      <FloatingContentSwitch />
      {!isCreditMember && <FloatingQr />}
    </>
  )
}

export default FloatingContent
