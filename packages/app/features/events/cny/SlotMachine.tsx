import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { View } from 'dripsy'
import { ImageBackground } from 'react-native'
import SlotMachineRoll from './SlotMachineRoll'

const SlotMachine = () => {
  const { top, bottom } = useSafeArea
  return (
    <View sx={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../assets/images/events/cny/bg-cloud.png')}
        style={{ flex: 1 }}
      >
        <View
          sx={{
            pt: top,
            pb: bottom,
            alignItems: 'center',
            marginTop: 100,
          }}
        >
          <SlotMachineRoll />
        </View>
      </ImageBackground>
    </View>
  )
}

export default SlotMachine
