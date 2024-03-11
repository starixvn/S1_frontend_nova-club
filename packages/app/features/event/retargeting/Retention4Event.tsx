import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Icon from 'app/components/Icon'
import IconButton from 'app/components/IconButton'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { Pressable, Row, View } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import React, { useMemo, useState } from 'react'
import { Linking, Platform, useWindowDimensions } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { useEligibleSpinQuery } from 'services/playerApi'
import { SolitoImage } from 'solito/image'
import { RETARGETING_TNC } from 'utils/constant'
import PacketClose from './PacketClose'
import PacketOpen from './PacketOpen'
import { BoldText } from './components/BoldText'
import useMediaList from './useMediaList'

const Retention4Event = () => {
  const { t } = useLocalization()
  const { width, height } = useWindowDimensions()
  const { openModal } = useModal()
  const isDesktop = useIsDesktop()
  const mediaList = useMediaList()
  const lang = useAppSelector((state) => state.setting.locale)
  const { data } = useEligibleSpinQuery({ code: '' })

  const [redeemed, setRedeemed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const titleTop = height > 700 ? '5%' : '2%'

  const angpaoWidth = height > 700 ? Math.min(width * 0.6, 300) : 200
  const logoWidth = Math.min(width * 0.5, 250)
  const titleWidth = Math.min(width * 0.9, 400)

  const handleOpenTnc = () => {
    openModal('NoticeModal', {
      title: t('common.tnc'),
      notice: RETARGETING_TNC,
    })
  }

  const handleRedeem = () => {
    setTimeout(() => {
      setRedeemed(!redeemed)
    }, 1000)
    setIsLoading(!isLoading)
    // openModal('AlertModal', { message: t('retargeting.limit') })
  }

  const AnimatedTitleOpen = useMemo(
    () => (
      <MotiView
        key="title-congrats"
        from={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
        }}
      >
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/retention4/title-congrats-${lang}.png`}
          width={titleWidth}
          height={titleWidth / (570 / 95)}
          alt=""
        />
      </MotiView>
    ),
    []
  )

  const AnimatedTitleClose = useMemo(
    () => (
      <MotiView
        key="title-share"
        from={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
        }}
      >
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/retention4/title-share-${lang}.png`}
          width={titleWidth}
          height={titleWidth / (570 / 95)}
          alt=""
        />
      </MotiView>
    ),
    []
  )

  return (
    <PageWithBackHeader
      header={{ title: t('retention') }}
      disableScrollView
      hideHeader={isDesktop}
    >
      <View sx={{ flex: 1, alignItems: 'center' }}>
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/retention4/bg.jpg`}
          fill
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
          contentPosition={'top center'}
          contentFit="fill"
          alt=""
        />

        <View sx={{ position: 'absolute', top: 12, right: 12 }}>
          <IconButton onPress={handleOpenTnc} name="tnc" size={30} />
        </View>
        <View
          sx={{ position: 'absolute', top: titleTop, alignItems: 'center' }}
        >
          <SolitoImage
            src={`${MEDIA_DOMAIN}${CONTENT_URI}/vui123-logo-${lang}.png`}
            width={logoWidth}
            height={logoWidth / (1000 / 350)}
            style={{ marginBottom: 24 }}
            alt=""
          />
          <AnimatePresence>
            {redeemed ? <>{AnimatedTitleOpen}</> : <>{AnimatedTitleClose}</>}
          </AnimatePresence>
        </View>

        <AnimatePresence>
          {redeemed ? (
            <PacketOpen angpaoWidth={angpaoWidth} onRedeem={handleRedeem} />
          ) : (
            <PacketClose
              angpaoWidth={angpaoWidth}
              isLoading={isLoading}
              onRedeem={handleRedeem}
            />
          )}
        </AnimatePresence>
        <SocialMedia mediaList={mediaList} />
      </View>
    </PageWithBackHeader>
  )
}

const SocialMedia = ({ mediaList }) => {
  const { t } = useLocalization()

  return (
    <View
      sx={{
        position: 'absolute',
        bottom: 12,
        alignItems: 'center',
      }}
    >
      <BoldText
        sx={{
          fontSize: 18,
          color: 'white',
          textShadowColor: 'rgba(0, 0, 0, 0.75)',
          textShadowOffset: { width: -1, height: 1 },
          textShadowRadius: 10,
        }}
      >
        {t('common.follow')}
      </BoldText>
      <Row
        sx={{
          width: 200,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          my: '$2',
        }}
      >
        {mediaList.map((item) => (
          <Pressable
            key={item.icon}
            onPress={() => {
              if (Platform.OS !== 'web') Linking.openURL(item.href)
            }}
            href={item.href}
            hrefAttrs={{
              rel: 'noreferrer',
              target: '_blank',
            }}
          >
            <View
              sx={{
                aspectRatio: 1 / 1,
                borderRadius: 50,
                bg: '#8E0109',
              }}
            >
              <Icon name={item.icon} size={18} style={{ padding: 12 }} />
            </View>
          </Pressable>
        ))}
      </Row>
    </View>
  )
}

export default Retention4Event
