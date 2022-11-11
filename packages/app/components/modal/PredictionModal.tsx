import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useContextualRouting from 'app/hooks/useContextualRouting'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import React from 'react'
import { useRouter } from 'solito/router'
import Image from '../common/Image'

const PredictionModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useLocalization()
  const { width, height } = useContainerDimension()
  const onPress = getParam('onPress')

  const handlePress = () => {
    onPress()
    closeModal()
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image
        source={{
          uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/wc/wc-prediction.png`,
        }}
        style={{
          width: width * 0.9,
          minHeight: 200,
          aspectRatio: 64 / 75,
        }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  )
}

export default PredictionModal
