import Icon from 'app/components/Icon'
import { ROUNDED_LOGO } from 'app/components/QRCodeGenerator'
import ViewScreenShot, {
  ViewScreenShotMethods,
} from 'app/components/ViewScreenShot'
import BouncePressable from 'app/components/pressable/BouncePressable'
import withShare from 'app/hoc/withShare'
import useLocalization from 'app/provider/localization'
import { Text, View, useResponsiveValue } from 'dripsy'
import { useRef } from 'react'
import { useWindowDimensions } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

type ReferralQrCodeProps = {
  referralLink: string
  referralCode?: string
}

const ReferralQrCode = ({
  referralLink,
  referralCode,
}: ReferralQrCodeProps) => {
  const { t } = useLocalization()
  const horizontalMode = useResponsiveValue([false, false, false, true, true])

  const { height, width } = useWindowDimensions()
  const xRatio = 100
  const yRatio = 100
  const scale = horizontalMode
    ? Math.min(width / 6 / xRatio, height / 7 / yRatio)
    : Math.min(width / 4 / xRatio, height / 4 / yRatio)
  const enlargedWidth = Math.floor(scale * xRatio)

  const iconScale = horizontalMode
    ? Math.min(width / 45 / xRatio, height / 45 / yRatio)
    : Math.min(width / 27 / xRatio, height / 27 / yRatio)
  const iconSize = Math.floor(iconScale * xRatio)

  const ref = useRef<ViewScreenShotMethods>(null)

  const handleDownload = () => {
    ref?.current?.download()
  }

  return (
    <View
      sx={{
        borderWidth: horizontalMode ? 0 : 1,
        borderColor: '$primary.100',
        borderRadius: 10,
        marginVertical: 10,
        alignContent: 'center',
        justifyContent: 'center',
        p: horizontalMode ? 0 : 5,
      }}
    >
      <View
        sx={{
          alignItems: 'center',
          marginVertical: 10,
          p: horizontalMode ? 0 : 5,
        }}
      >
        <Text
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {t('referral.qrCode')}
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <ViewScreenShot ref={ref} fileName={`Vui123-${referralCode}`}>
          <QRCode
            value={referralLink}
            size={enlargedWidth}
            logo={ROUNDED_LOGO}
            ecl="H"
            quietZone={12}
            logoBackgroundColor="white"
            // logoMargin={4}
            logoBorderRadius={100}
          />
        </ViewScreenShot>
      </View>
      <View
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 10,
        }}
      >
        <View sx={{ alignItems: 'center', flex: 0.5 }}>
          <ActionButton
            icon={'dl-round'}
            iconSize={iconSize}
            title={t('common.download')}
            onPress={handleDownload}
          />
          {/* <IconButton
            name={'dl-round'}
            color={'white'}
            size={iconSize}
            sx={{ padding: 5 }}
            onPress={handleDownload}
          />
          <Text sx={{ fontSize: 10 }}>{t('common.download')}</Text> */}
        </View>
        <View sx={{ alignItems: 'center', flex: 0.5 }}>
          <ShareButton
            icon="tf"
            title={t('referral.share')}
            iconSize={iconSize}
            options={{
              message: t('referral.shareMessage'),
              url: referralLink,
              title: t('referral.share'),
            }}
          />
        </View>
      </View>
    </View>
  )
}

const ActionButton = ({ icon, iconSize, title, onPress }) => {
  return (
    <BouncePressable
      sx={{ color: 'black', alignItems: 'center' }}
      onPress={onPress}
    >
      <Icon size={iconSize} name={icon} color="white" />
      <Text sx={{ color: 'white', fontSize: 10, mt: '$1' }}>{title}</Text>
    </BouncePressable>
  )
}

const ShareButton = withShare(ActionButton)

export default ReferralQrCode
