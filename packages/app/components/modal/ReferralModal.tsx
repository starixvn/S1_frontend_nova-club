import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import React, { Children, useCallback, useRef, useState } from 'react'
import { Button } from '../form/Button'
import ModalWrapper from './ModalWrapper'
import QRCode from 'react-native-qrcode-svg'
import { usePlayerProfileQuery } from 'services/playerApi'
import { Button as RNButton, PermissionsAndroid, Platform } from 'react-native'
import ViewShot, { captureRef } from 'react-native-view-shot'
import * as MediaLibrary from 'expo-media-library'
import useDownload from 'app/hooks/useDownload'
import Icon from '../Icon'
import IconButton from '../form/IconButton'
import { copyToClipboard } from 'app/utils'
import BouncePressable from 'app/pressable/BouncePressable'
import useShare from 'app/hooks/useShare'
import { RWebShare } from 'react-web-share'
import QRCodeGenerator from '../QRCodeGenerator'
import { DripsyGradient } from '../Gradient'
import { REFERRAL_DOMAIN } from '@env'

const ReferralModal = ({ modal: { closeModal } }) => {
  const { t } = useLocalization()
  const player = usePlayerProfileQuery()
  const ref = useRef()
  const referralLink = `${REFERRAL_DOMAIN}?ref=${player.data?.data?.referral_code}`
  const { width, height } = useContainerDimension()

  const { data } = usePlayerProfileQuery()
  const referralCode = data?.data?.referral_code

  const { appScreenshotDownload, webScreenshotDownload } = useDownload({
    ref,
    closeModal,
  })

  const shareOptions = {
    message: 'Share this referral link to receive rewards',
    url: referralLink,
    title: t('common.share'),
  }

  const { onShare } = useShare(shareOptions)

  return (
    <ModalWrapper sx={{ width: width * 0.8, p: 0 }}>
      <View
        sx={{
          bg: 'white',
          borderRadius: 12,
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <DripsyGradient gradient="PaleBlue" sx={{ p: '$4' }}>
          <Text sx={{ textAlign: 'center' }}>{t('referral.friend')}</Text>
        </DripsyGradient>

        <View sx={{ p: '5%' }}>
          <Text sx={{ color: 'black' }}>{t('referral.earn')}</Text>
          <View>
            <ViewScreenShot innerRef={ref} name={`Vui123-${referralCode}`}>
              <QRCodeGenerator isTransfer={false} referralLink={referralLink} />
            </ViewScreenShot>
          </View>

          <View
            sx={{
              bg: '#EEE',
              py: '$3',
              px: '$4',
              borderRadius: 50,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text sx={{ flex: 0.35, color: 'black', fontSize: 13 }}>
              {t('referral.link')}
            </Text>
            <Text
              numberOfLines={1}
              sx={{ flex: 0.65, color: 'black', fontSize: 13 }}
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
                onPress={
                  Platform.OS === 'web'
                    ? webScreenshotDownload
                    : appScreenshotDownload
                }
              />
              {Platform.OS === 'web' ? (
                <RWebShare
                  data={shareOptions}
                  onClick={() => console.info('share successful!')}
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
                    <span>Share</span>
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
        </View>
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
