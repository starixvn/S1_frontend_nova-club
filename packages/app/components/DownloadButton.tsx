import { CONTENT_URI, MEDIA_DOMAIN, REFERRAL_DOMAIN } from '@env'
import { useAppSelector } from 'app/provider/redux/store'
import { View } from 'dripsy'
import React from 'react'
import { Linking } from 'react-native'
import { SolitoImage } from 'solito/image'
import BouncePressable from './pressable/BouncePressable'

const DownloadButton = () => {
  const lang = useAppSelector((state) => state.setting.locale)

  const handleDownload = () => {
    Linking.openURL(REFERRAL_DOMAIN)
  }

  return (
    <BouncePressable onPress={handleDownload}>
      <View sx={{ alignItems: 'center', mb: '$3' }}>
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/download/button-download-${lang}.gif`}
          width={160}
          height={48}
          alt=""
        />
      </View>
    </BouncePressable>
  )
}

export default DownloadButton
