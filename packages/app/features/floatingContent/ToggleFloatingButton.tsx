import Icon from 'app/components/Icon'
import { View } from 'dripsy'
import { MotiView } from 'moti'
import { TouchableOpacity } from 'react-native-gesture-handler'
const ToggleFloatingButton = ({ setIsOpen, isOpen }) => {
  return (
    <TouchableOpacity
      onPress={() => setIsOpen(!isOpen)}
      style={{
        height: 80,
        width: 25,
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <View
        sx={{
          height: 60,
          backgroundColor: '#33a0d0',
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          width: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MotiView
          animate={{
            transform: [{ rotateZ: isOpen ? '0deg' : '180deg' }],
          }}
          transition={{ type: 'timing', duration: 500 }}
        >
          <Icon name={'chevleft'} size={10} />
        </MotiView>
      </View>
    </TouchableOpacity>
  )
}

export default ToggleFloatingButton
