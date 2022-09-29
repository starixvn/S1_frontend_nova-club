import { DEV_DOMAIN } from '@env'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useDownload from 'app/hooks/useDownload'
import useShare from 'app/hooks/useShare'
import BouncePressable from 'app/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { copyToClipboard } from 'app/utils'
import { ScrollView, Text, View } from 'dripsy'
import React, { useRef } from 'react'
import { Platform } from 'react-native'
import ViewShot from 'react-native-view-shot'
import { RWebShare } from 'react-web-share'
import { usePlayerProfileQuery } from 'services/playerApi'
import { Button } from '../form/Button'
import IconButton from '../form/IconButton'
import { DripsyGradient } from '../Gradient'
import Icon from '../Icon'
import QRCodeGenerator from '../QRCodeGenerator'
import ModalWrapper from './ModalWrapper'

const ReferralModal = ({ modal: { closeModal } }) => {
  const { t } = useLocalization()
  const player = usePlayerProfileQuery()
  const ref = useRef()

  const referralLink = `${DEV_DOMAIN}/download?ref=${player.data?.data?.referral_code}`
  const { width, height } = useContainerDimension()

  const { data } = usePlayerProfileQuery()
  const referralCode = data?.data?.referral_code

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

  return (
    <ModalWrapper>
      <View
        sx={{
          bg: 'white',
          borderRadius: 12,
          width: Math.min(width * 0.8, 400),
          marginLeft: 'auto',
          marginRight: 'auto',
          maxHeight: '100%',
        }}
      >
        <DripsyGradient gradient="PaleBlue" sx={{ p: '$4' }}>
          <Text sx={{ textAlign: 'center' }}>{t('referral.friend')}</Text>
        </DripsyGradient>

        <ScrollView contentContainerStyle={{ padding: '5%' }}>
          <Text sx={{ color: 'black' }}>{t('referral.earn')}</Text>
          <View>
            <ViewScreenShot innerRef={ref} name={`Vui123-${referralCode}`}>
              <QRCodeGenerator isTransfer={false} referralLink={referralLink} />
            </ViewScreenShot>
          </View>

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

          <View>
            <View
              sx={{
                my: '$8',
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
                    <Icon
                      size={22}
                      name="share"
                      color="black"
                      sx={{ mb: '$1' }}
                    />
                    <span>{t('common.share')}</span>
                  </button>
                </RWebShare>
              ) : (
                <ActionButton
                  icon="share"
                  title={t('common.share')}
                  onPress={onShare}
                />
              )}
            </View>

            <Button
              rounded
              stretch
              variant="lg"
              fill={{
                type: 'gradient',
                color: 'secondary',
                start: { x: 0, y: 0 },
                end: { x: 1, y: 0 },
              }}
              onPress={closeModal}
            >
              <Button.Label>{t('common.close')}</Button.Label>
            </Button>
          </View>
        </ScrollView>
      </View>
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
      <Text sx={{ color: '$black', fontSize: 12, mt: '$1' }}>{title}</Text>
    </BouncePressable>
  )
}

export default ReferralModal
