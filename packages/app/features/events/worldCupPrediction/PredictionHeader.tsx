import { Gradient } from '@dripsy/gradient'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Image from 'app/components/common/Image'
import IconButton from 'app/components/form/IconButton'
import useContainerDimension from 'app/hooks/useContainerDimension'
import BouncePressable from 'app/pressable/BouncePressable'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { View } from 'dripsy'
import { useRouter } from 'solito/router'

const PredictionHeader = () => {
  const { top, left } = useSafeArea()
  const { back } = useRouter()
  const onGoBack = () => {
    back()
  }

  const { width } = useContainerDimension()
  const logoImage = Math.min(width * 0.4, 360)
  return (
    <View
      nativeID="pageback-header"
      sx={{
        borderBottomWidth: 1,
        borderBottomColor: '#33A0D0',
      }}
    >
      <Gradient
        sx={{
          paddingTop: top,
        }}
        gradient={'PaleBlue'}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View
          sx={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            py: ['$3', '$5'],
            position: 'relative',
          }}
        >
          <View sx={{ position: 'absolute', left: '3%', zIndex: 1 }}>
            <IconButton
              size={22}
              onPress={onGoBack}
              name="chevleft"
              color="#9CD9FA"
            />
          </View>
          <Image
            source={{
              uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/wc/predict-logo.png`,
            }}
            sx={{
              width: logoImage,
              aspectRatio: 360 / 133,
            }}
          />
        </View>
      </Gradient>
    </View>
  )
}

export default PredictionHeader
