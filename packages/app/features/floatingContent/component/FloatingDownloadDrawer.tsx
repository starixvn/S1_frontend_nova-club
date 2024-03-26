import { Pressable, styled, View } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import { memo } from 'react'
import PlinkoEvent from './event/PlinkoEvent'
import LiveChatButton from './LiveChatButton'
import isDesktop from 'app/utils/isDesktop'
import QRCode from 'react-native-qrcode-svg'
import { REFERRAL_DOMAIN } from '@env'
import { Linking, Platform } from 'react-native'
import { Text } from 'dripsy'
import useLocalization from 'app/provider/localization'
import { getOs } from 'utils/platform'

interface FloatingContentSwitchProps {
  visible: boolean
  size: number
  floatingDrawerOffset: number
  isDesktop: boolean
  floatingDrawerHeight: number
}
interface FloatingContentContainerProps {
  bottom: number
  height: number
  isDesktop: boolean
}

const FloatingDownloadDrawer = ({
  visible,
  size,
  floatingDrawerOffset,
  isDesktop,
  floatingDrawerHeight,
}: FloatingContentSwitchProps) => {
  const { t } = useLocalization()
  const maintenance = false // getOs() // This was forced to true when app download link was unavailable at appstore.

  return (
    <FloatingContentContainer
      pointerEvents={visible ? 'auto' : 'none'}
      bottom={floatingDrawerOffset}
      height={floatingDrawerHeight}
      isDesktop={isDesktop}
    >
      <AnimatePresence>
        {visible && (
          <ContentOverlay
            from={{ transform: [{ translateX: -100 }], opacity: 0 }}
            animate={{ transform: [{ translateX: 0 }], opacity: 1 }}
            exit={{ transform: [{ translateX: -100 }], opacity: 0 }}
            transition={{ type: 'timing', duration: 500 }}
          >
            <ContentOffset>
              <Pressable onPress={() => Linking.openURL(REFERRAL_DOMAIN)}>
                <QRCode
                  value={REFERRAL_DOMAIN}
                  size={100}
                  ecl="H"
                  quietZone={12}
                />
              </Pressable>

              {maintenance && (
                <View
                  pointerEvents="none"
                  sx={{
                    width: 102,
                    aspectRatio: 1 / 1,
                    bg: 'rgba(0,0,0,0.8)',
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                  }}
                >
                  <Text sx={{ textAlign: 'center' }}>
                    {t('common.underMaintenance')}
                  </Text>
                </View>
              )}

              <Text sx={{ textAlign: 'center', mt: '$2', fontWeight: 'bold' }}>
                {t('forceDownload.downloadApp')}
              </Text>
            </ContentOffset>
          </ContentOverlay>
        )}
      </AnimatePresence>
    </FloatingContentContainer>
  )
}
const FloatingContentContainer = styled(View)(
  ({ bottom, height, isDesktop }: FloatingContentContainerProps) => ({
    zIndex: 2,
    left: 0,
    top: 60,
    position: 'absolute',
    height: 140,
    width: 140,
    overflow: 'hidden',
  })
)
const ContentOverlay = styled(MotiView)({
  backgroundColor: 'rgba(30,30,30,0.7)',
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
  height: '100%',
})
const ContentOffset = styled(View)({
  py: '$2',
  pl: '$4',
  pr: '$3',
  alignItems: 'center',
  // bg: 'red',
})
export default memo(FloatingDownloadDrawer)
