import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { ScrollView, View } from 'dripsy'
import { ImageBackground } from 'react-native'
import SlotMachineRoll from './SlotMachineRoll'

const SlotMachine = () => {
  const { top, bottom } = useSafeArea()
  return (
    <View sx={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../assets/images/events/cny/bg-cloud.png')}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            sx={{
              pt: top,
              pb: bottom,
              alignItems: 'center',
              marginTop: '5%',
            }}
          >
            <SlotMachineRoll />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

export default SlotMachine
