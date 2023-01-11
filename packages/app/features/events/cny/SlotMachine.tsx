import Image, { MotifiedImage } from 'app/components/common/Image'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { View } from 'dripsy'
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
        <>
          <View
            sx={{
              pt: top,
              pb: bottom,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 100,
            }}
          >
            <SlotMachineRoll />
          </View>
          <Lantern />
          <Button title="Roll" onPress={handlePress} />
          <Cloud />
        </>
      </ImageBackground>
    </View>
  )
}

export default SlotMachine
