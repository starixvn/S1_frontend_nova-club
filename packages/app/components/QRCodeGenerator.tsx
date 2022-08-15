import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import React from 'react'
import QRCode from 'react-native-qrcode-svg'
import { usePlayerProfileQuery } from 'services/playerApi'

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

  const { data } = usePlayerProfileQuery()
  const referralCode = data?.data?.referral_code

  return (
    <View
      sx={{
        alignItems: 'center',
        bg: 'white',
        aspectRatio: 1,
        justifyContent: 'space-evenly',
      }}
    >
      <QRCode
        value={isTransfer ? referralCode : referralLink}
        size={width * 0.5}
        logo={require('../assets/images/auth-logo.png')}
        ecl="H"
        quietZone={12}
        logoBackgroundColor="white"
        // logoMargin={4}
        logoBorderRadius={100}
      />
      {isTransfer && (
        <Text sx={{ color: '$black', textAlign: 'center' }}>
          {t('notes.qr.n1')}
        </Text>
      )}
    </View>
  )
}

export default QRCodeGenerator
