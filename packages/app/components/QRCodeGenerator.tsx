import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { Text, View, useResponsiveValue } from 'dripsy'
import React from 'react'
import QRCode from 'react-native-qrcode-svg'
import { usePlayerProfileQuery } from 'services/playerApi'

export const ROUNDED_LOGO = `https://static-stage.gball8.com/nvclub/nova-club/content/logo-rounded.png`

type QRCodeGeneratorProps = {
  isTransfer?: boolean
  referralLink?: string
}
const QRCodeGenerator = ({
  isTransfer = true,
  referralLink,
}: QRCodeGeneratorProps) => {
  const { t } = useLocalization()
  const { width, height } = useContainerDimension()
  const widthMultiplier = useResponsiveValue([0.7])
  const { data } = usePlayerProfileQuery()
  const referralCode = data?.referral_code

  return (
    <View sx={{ alignItems: 'center', p: '$3' }}>
      <QRCode
        value={isTransfer ? referralCode : referralLink}
        size={Math.min(width * widthMultiplier, 250)}
        logo={ROUNDED_LOGO}
        ecl="H"
        quietZone={12}
        logoBackgroundColor="white"
        // logoMargin={4}
        logoBorderRadius={100}
      />
    </View>
  )
}

export default QRCodeGenerator
