import Image, { MotifiedImage } from 'app/components/common/Image'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { ScrollView, View } from 'dripsy'
import { Button, ImageBackground } from 'react-native'
import { useModal } from 'react-native-modalfy'
import Cloud from './Cloud'
import Lantern from './Latern'

import SlotMachineRoll from './SlotMachineRoll'

const SlotMachine = () => {
  const { top, bottom } = useSafeArea()
  const { openModal } = useModal()

  const handlePress = () => {
    openModal('CnyWinModal', { amount: 1888000 })
  }

  return (
    <View sx={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../assets/images/events/cny/bg.png')}
        style={{ flex: 1 }}
      >
        <Lantern />
        <Cloud />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            sx={{
              pt: top,
              pb: bottom,
              alignItems: 'center',
              marginTop: '25%',
              justifyContent: 'center',
              marginBottom: 300,
              zIndex: 100,
            }}
          >
            <SlotMachineRoll />
          </View>
          <Button title="Roll" onPress={handlePress} />
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

export default SlotMachine
