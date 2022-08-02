import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import React from 'react'
import QRCode from 'react-native-qrcode-svg'
import { usePlayerProfileQuery } from 'services/playerApi'

const QRCodeGenerator = ({ isTransfer = true }) => {
  const { t } = useLocalization()
  const { width, height } = useContainerDimension()

  const { data } = usePlayerProfileQuery()
  const username = data?.data?.username
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
      <Text sx={{ color: '$black' }}>{username}</Text>
      <QRCode
        value={referralCode}
        size={width * 0.5}
        logo={require('../assets/nclub-appicon.png')}
        ecl="H"
        quietZone={12}
        logoBackgroundColor="white"
        logoMargin={4}
        logoBorderRadius={100}
      />
      {isTransfer && <Text sx={{ color: '$black' }}>{t('notes.qr.n1')}</Text>}
    </View>
  )
}

export default QRCodeGenerator
