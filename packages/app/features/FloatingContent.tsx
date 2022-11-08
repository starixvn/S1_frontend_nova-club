import { CMS_CONTENT_URI, CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Image from 'app/components/common/Image'
import { Button } from 'app/components/form/Button'
import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import TextStroke from 'app/components/TextStroke'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { BOTTOM_NAV_HEIGHT } from 'app/navigation/BottomNavigation'
import FloatQr from 'app/navigation/FloatQr'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { SettingActions } from 'app/store/setting.slice'
import { ActionType, getAction } from 'app/utils/actionGenerator'
import { styled, Text, useDripsyTheme, View } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import { useState } from 'react'
import {
  ImageBackground,
  Linking,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native'
import { useModal } from 'react-native-modalfy'
import Svg, { SvgUri } from 'react-native-svg'
import { useDispatch } from 'react-redux'
import { Game } from 'services/contentApi.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import useSupportItemList from './customerSupport/useSupportItemList'

const FloatingContent = () => {
  const isSuggestions = useAppSelector((s) => s.setting.suggestions)

  const [isSupportMenuVisible, setSupportMenuVisible] = useState(false)
  // Google Pixel 5a require this insets to get accurate value
  const insets = useSafeArea()
  const { isCreditMember } = usePlayerProfileQuery()

  const dispatch = useDispatch()
  const { t } = useLocalization()
  const { openModal } = useModal()
  const { width } = useWindowDimensions()
  const { width: containerWidth, height: containerHeight } =
    useContainerDimension()
  const { theme } = useDripsyTheme()

  const launchVGaming = () => {
    const action = {
      type: ActionType.GAME,
      payload: {
        tags: [],
        name: {
          en: 'VGaming',
          vi: 'Fish Prawn Crab',
        },
        gc: 'Vgaming:3804',
        gpc: 'SABA',
        gtc: 'games',
        img: `${MEDIA_DOMAIN}/nvclub/nova-club/content/games/hotgames/Vgaming-FishPrawnCrabl.jpg`,
      } as Game,
    }

    getAction(action)()
  }

  const vGamingSize = Math.min(110, width * 0.2)

  const handleSuggestions = () => {
    dispatch(SettingActions.disableSuggestions(false))
  }

  const handleQr = () => {
    openModal('ReferralModal')
    dispatch(SettingActions.disableSuggestions(false))
  }

  return (
    <>
      <View
        sx={{
          right:
            Math.max(0, (width - theme.sizes.container) / 2) +
            Math.max(containerWidth * 0.2 - vGamingSize, 0) / 2,
          position: Platform.OS === 'web' ? 'fixed' : 'absolute',
          bottom: BOTTOM_NAV_HEIGHT + 25,
          alignItems: 'center',
        }}
      >
        <TouchableOpacity onPress={launchVGaming}>
          <Image
            source={{
              uri: `${MEDIA_DOMAIN}${CONTENT_URI}/Vgaming-icon.gif`,
            }}
            style={{
              width: vGamingSize,
              height: vGamingSize,
              marginBottom: 10,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Button
          onPress={() => {
            console.log('clicked')
            setSupportMenuVisible(true)
          }}
          rounded
          variant="lg"
          fill={{
            type: 'gradient',
            color: 'secondary',
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0 },
          }}
          containerStyle={{ width: 50, height: 50, px: 12 }}
        >
          {<Icon name="cs" size={30} />}
        </Button>
      </View>
      <AnimatePresence>
        {isSupportMenuVisible && (
          <SupportMenu setSupportMenuVisible={setSupportMenuVisible} />
        )}
      </AnimatePresence>

      {!isCreditMember && (
        <>
          {isSuggestions && (
            <TouchableOpacity
              sx={{
                position: Platform.OS === 'web' ? 'fixed' : 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: containerWidth,
                height: containerHeight,
              }}
              onPress={handleSuggestions}
            >
              <ImageBackground
                source={{
                  uri: `${MEDIA_DOMAIN}${CONTENT_URI}/blur.png`,
                }}
                style={{ flex: 1 }}
              />
              <View
                sx={{
                  position: Platform.OS === 'web' ? 'fixed' : 'absolute',
                  top: 75 + insets.top,
                  right: Math.max(0, (width - theme.sizes.container) / 2),
                  pb: 60,
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  zIndex: 10,
                }}
              >
                <Text
                  sx={{
                    fontSize: 14,
                    fontWeight: '900',
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  {t('referral.refer')}
                </Text>

                <Image
                  source={{
                    uri: `${MEDIA_DOMAIN}${CONTENT_URI}/ic_suggestions_arrow.png`,
                  }}
                  style={{
                    width: 36,
                    height: 36,
                    marginHorizontal: 12,
                  }}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          )}
          <View
            sx={{
              position: Platform.OS === 'web' ? 'fixed' : 'absolute',
              top: 120 + insets.top,
              right: Math.max(0, (width - theme.sizes.container) / 2),
            }}
          >
            <FloatQr onPress={handleQr} />
          </View>
        </>
      )}
    </>
  )
}

export default FloatingContent

const SupportMenu = ({ setSupportMenuVisible }) => {
  const { width } = useWindowDimensions()
  const mediaList = useSupportItemList()
  const { theme } = useDripsyTheme()
  const { t } = useLocalization()
  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor: 'rgba(0,0,0,0.8)',
          position: Platform.OS === 'web' ? 'fixed' : 'absolute',
        },
      ]}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          setSupportMenuVisible(false)
        }}
      >
        <View sx={{ width: '100%', height: '100%' }}>
          <View
            sx={{
              alignSelf: 'flex-end',
              mt: 'auto',
              mr: Math.max(0, (width - theme.sizes.container) / 2),
              mb: BOTTOM_NAV_HEIGHT + 25,
              pr: '$2',
            }}
          >
            <AnimatePresence>
              {mediaList.map((c, i) => {
                return (
                  <MotiView
                    delay={i * 100}
                    from={{ translateX: 100, opacity: 0 }}
                    animate={{ translateX: 0, opacity: 1 }}
                    key={c.label}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        if (Platform.OS !== 'web') Linking.openURL(c.href)
                      }}
                      sx={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        mb: '$3',
                      }}
                      href={c.href}
                      hrefAttrs={{
                        rel: 'noreferrer',
                        target: '_blank',
                      }}
                    >
                      <Text sx={{ mr: '$2', fontSize: 16 }}>
                        {t('contact.' + c.label)}
                      </Text>
                      <View
                        sx={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: '$2',
                        }}
                      >
                        <SupportIconWrap colors={c.bg}>
                          {c.icon ? (
                            <Icon name={c.icon} />
                          ) : (
                            <Image
                              source={c.image}
                              sx={{
                                width: 40,
                                height: 40,
                              }}
                            />
                          )}
                        </SupportIconWrap>
                      </View>
                    </TouchableOpacity>
                  </MotiView>
                )
              })}
            </AnimatePresence>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </MotiView>
  )
}

const SupportIconWrap = styled(DripsyGradient)(({ size = 45 }) => ({
  borderRadius: size * 0.5,
  borderWidth: 2,
  borderColor: '$PaleBlue',
  m: 1,
  height: size,
  aspectRatio: 1,
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
}))
