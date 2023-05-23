import useContainerDimension from 'app/hooks/useContainerDimension'
import useDownload from 'app/hooks/useDownload'
import useShare from 'app/hooks/useShare'
import useLocalization from 'app/provider/localization'
import { copyToClipboard } from 'app/utils'
import { Pressable, ScrollView, Text, View, useDripsyTheme } from 'dripsy'
import React, { useRef } from 'react'
import { Platform } from 'react-native'
import ViewShot from 'react-native-view-shot'
import { usePlayerProfileQuery } from 'services/playerApi'
import { DripsyGradient } from '../Gradient'
import Icon from '../Icon'
import IconButton from '../IconButton'
import QRCodeGenerator from '../QRCodeGenerator'
import BouncePressable from '../pressable/BouncePressable'
import ModalWrapper from './ModalWrapper'
import { RWebShare } from 'react-web-share'

const DEV_DOMAIN = 'https://stage.gball8.com'

const ReferralModal = ({ modal: { closeModal, getParam } }) => {
  const { theme } = useDripsyTheme()
  const TITLE = 'Important Notice'

  const { t } = useLocalization()
  const { data } = usePlayerProfileQuery()
  const ref = useRef()
  const referralCode = data?.referral_code

  const referralLink = `${DEV_DOMAIN}/download?ref=${referralCode}`
  const { width, height } = useContainerDimension()

  const { appScreenshotDownload, webScreenshotDownload } = useDownload({
    ref,
    closeModal,
  })

  const shareOptions = {
    message: t('referral.shareMessage'),
    url: referralLink,
    title: t('common.share'),
  }

  const { onShare } = useShare(shareOptions)
  const handleDownload = () => {
    Platform.OS === 'web' ? webScreenshotDownload() : appScreenshotDownload()
  }

  //   useEffect(() => {
  //     return () => {
  //       onClose && onClose()
  //     }
  //   }, [])

  return (
    <ModalWrapper>
      <>
        <DripsyGradient
          gradient={'surface'}
          sx={{ alignItems: 'center', py: '$3' }}
        >
          <Text>Friend Referral</Text>
        </DripsyGradient>
        <ScrollView
          contentContainerStyle={{ padding: '5%', backgroundColor: 'white' }}
        >
          <Text sx={{ color: 'black' }}>Share & Earn</Text>
          <ViewScreenShot innerRef={ref} name={`Vui123-${referralCode}`}>
            <QRCodeGenerator isTransfer={false} referralLink={referralLink} />
          </ViewScreenShot>

          <View
            sx={{
              bg: '#EEE',
              py: '$2',
              px: '$3',
              borderRadius: 12,
            }}
          >
            <Text
              sx={{
                color: 'black',
                fontSize: 13,
                fontWeight: 'bold',
              }}
            >
              {t('referral.link')}
            </Text>
            <View sx={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                numberOfLines={1}
                sx={{ flex: 1, color: 'black', fontSize: 13 }}
              >
                {referralLink}
              </Text>
              <IconButton
                name="copy"
                size={20}
                color="black"
                sx={{ ml: '$1' }}
                onPress={() => copyToClipboard(referralLink)}
              />
            </View>
          </View>
          <View
            sx={{
              my: '$3',
              mx: '$4',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <ActionButton
              icon="dl-round"
              title={t('common.download')}
              onPress={handleDownload}
            />
            {Platform.OS === 'web' ? (
              <RWebShare
                data={shareOptions}
                onClick={() => console.info('Share successful!')}
              >
                <button
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'transparent',
                    border: 'none',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: 12,
                  }}
                >
                  <Icon size={22} name="tf" color="black" sx={{ mb: '$1' }} />
                  <span>{t('common.share')}</span>
                </button>
              </RWebShare>
            ) : (
              <ActionButton
                icon="tf"
                title={t('common.share')}
                onPress={onShare}
              />
            )}
          </View>
          <Pressable onPress={() => closeModal()}>
            <DripsyGradient
              gradient={'surface'}
              sx={{ alignItems: 'center', borderRadius: 15, py: '$3' }}
            >
              <Text sx={{}}>Close</Text>
            </DripsyGradient>
          </Pressable>
        </ScrollView>
      </>
    </ModalWrapper>
  )
}

const ViewScreenShot = ({ innerRef, name, children }) => {
  return Platform.OS === 'web' ? (
    <View ref={innerRef}>{children}</View>
  ) : (
    <ViewShot
      ref={innerRef}
      options={{
        fileName: { name },
        format: 'png',
        quality: 0.9,
      }}
    >
      {children}
    </ViewShot>
  )
}

const ActionButton = ({ icon, title, onPress }) => {
  return (
    <BouncePressable
      sx={{ color: 'black', alignItems: 'center' }}
      onPress={onPress}
    >
      <Icon size={22} name={icon} color="black" />
      <Text sx={{ color: 'black', fontSize: 12, mt: '$1' }}>{title}</Text>
    </BouncePressable>
  )
}
export default ReferralModal
