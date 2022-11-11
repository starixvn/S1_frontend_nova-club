import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useContextualRouting from 'app/hooks/useContextualRouting'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { ActivityIndicator, View } from 'dripsy'
import React, { useState } from 'react'
import { useRouter } from 'solito/router'
import Image from '../common/Image'
import SkeletonPlaceholder from '../skeleton/SkeletonPlaceholder'

const PredictionModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useLocalization()
  const { width, height } = useContainerDimension()
  const onPress = getParam('onPress')
  const [isLoading, setLoading] = useState(true)

  const handlePress = () => {
    onPress()
    closeModal()
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        sx={{
          width: width * 0.9,
          minHeight: 200,
          aspectRatio: 64 / 75,
        }}
      >
        <Image
          source={{
            uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/wc/wc-prediction.png`,
          }}
          style={{
            flex: 1,
          }}
          onLoadEnd={() => setLoading(false)}
          resizeMode="contain"
        />
        {isLoading ? (
          <View
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator
              size="large"
              color="white"
              sx={{ position: 'absolute' }}
            />
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  )
}

export default PredictionModal
