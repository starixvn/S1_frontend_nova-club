import { Gradient } from '@dripsy/gradient'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Image from 'app/components/common/Image'

const SlotMachineFrame = () => {
  return (
    <>
      <Image
        source={{
          uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/spinMania/slot.gif`,
        }}
        resizeMode="contain"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          // right: '-3%',
          // top: '-22%',
          zIndex: 3,
        }}
      />
      <Gradient
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.65)']}
        sx={{
          height: 40,
          position: 'absolute',
          zIndex: 2,
          width: '75%',
          bottom: '10%',
          alignSelf: 'center',
        }}
      />

      {/* <Gradient
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        colors={[
          'rgba(255,255,255,0.0)',
          'rgba(251,230,96,0.7)',
          'rgba(251,230,96,0.9)',
          'rgba(251,230,96,0.6)',
          'rgba(251,230,96,0.3)',
          'rgba(255,255,255,0.0)',
        ]}
        sx={{
          height: 35,
          position: 'absolute',
          zIndex: 2,
          width: '74%',
          top: '50%',
          alignSelf: 'center',
        }}
      /> */}
      <Gradient
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0)']}
        sx={{
          height: 20,
          position: 'absolute',
          zIndex: 1,
          width: '75%',
          top: '45%',
          alignSelf: 'center',
        }}
      />
    </>
  )
}

export default SlotMachineFrame
