import { CONTENT_URI, MEDIA_DOMAIN, REFERRAL_DOMAIN } from '@env'
import { useAppSelector } from 'app/provider/redux/store'
import { View } from 'dripsy'
import React from 'react'
import { Linking } from 'react-native'
import { SolitoImage } from 'solito/image'
import BouncePressable from './pressable/BouncePressable'
import useDefaultParamSelector from 'app/hooks/useDefaultParamSelector'

const DownloadButton = () => {
  const referral = useAppSelector((s) => s.setting.referral)
  const { currency, locale } = useDefaultParamSelector()

  const handleDownload = () => {
    Linking.openURL(
      `${REFERRAL_DOMAIN}?ref=${referral?.trackingCode}&currency=${currency}`
    )
  }

  return (
    <BouncePressable onPress={handleDownload}>
      <View sx={{ alignItems: 'center', mb: '$3' }}>
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/download/button-download-${locale}.gif`}
          width={160}
          height={48}
          alt=""
        />
      </View>
    </BouncePressable>
  )
}

export default DownloadButton
