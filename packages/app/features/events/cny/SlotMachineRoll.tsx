import Image from 'app/components/common/Image'
import { View } from 'dripsy'

const SlotMachineRoll = () => {
  return (
    <View style={{ position: 'relative' }}>
      <Image
        source={require('../../../assets/images/events/cny/cat.png')}
        style={{
          borderWidth: 1,
          width: '15%',
          aspectRatio: 1,
          position: 'absolute',
          top: '60%',
          left: '10%',
          //   transform: [
          //     {
          //       rotateX: '0.7rad',
          //     },
          //   ],
        }}
      />
      <Image
        source={require('../../../assets/images/events/cny/slot-machine.png')}
        style={{ width: '80%', aspectRatio: 659 / 386 }}
      />
    </View>
  )
}

export default SlotMachineRoll
