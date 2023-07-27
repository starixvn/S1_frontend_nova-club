import { DEV_DOMAIN } from '@env'
import Icon from 'app/components/Icon'
import BouncePressable from 'app/components/pressable/BouncePressable'
import { LoginType } from 'app/features/auth/AuthTypeSelection'
import useAlert from 'app/hooks/useAlert'
import { useDrawer } from 'app/hooks/useDrawer'
import useOnAppLogout from 'app/hooks/useOnAppLogout'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { copyToClipboard } from 'app/utils'
import { HEADER_HEIGHT } from 'app/utils/constant'
import isDesktop from 'app/utils/isDesktop'
import { Pressable, ScrollView, Text, View, useResponsiveValue } from 'dripsy'
import React, { useEffect, useRef } from 'react'
import {
  ImageBackground,
  useWindowDimensions,
  ScrollView as rScrollView,
} from 'react-native'
import { usePlayerProfileQuery } from 'services/playerApi'
import { useRouter } from 'solito/router'

export default function DrawerContent() {
  const { t } = useLocalization()
  const { push } = useRouter()
  const { top, bottom } = useSafeArea()
  const { height } = useWindowDimensions()
  const { isOpen, toggleDrawer } = useDrawer()
  const { logout } = useOnAppLogout()
  const desktop = isDesktop()
  const { showAlert } = useAlert()
  const scrollRef = useRef<rScrollView>(null)

  const isAgentLoggedIn = useAppSelector((s) => !!s.agent.access_token)
  const { isCreditMember, data: playerData } = usePlayerProfileQuery()
  const referralLink = `${DEV_DOMAIN}/download?ref=${playerData?.referral_code}`
  const isPlayerName = !!playerData?.firstName
  const handleDesktopAccountVerification = () => {
    showAlert(
      t('accountVerification.secondaryTitle') +
        '\n' +
        t('accountVerification.remark')
    )
    push('/account/profile-details')
  }

  useEffect(() => {
    if (isOpen && scrollRef?.current) {
      scrollRef?.current.scrollTo({ animated: false })
    }
  }, [isOpen])

  const MENU_LIST = [
    {
      iconName: 'agent',
      text: 'common.agentLogin',
      onPress: () => {
        try {
          if (isAgentLoggedIn) {
            push('/agent/profile')
          } else {
            push({
              pathname: '/auth/login',
              query: {
                t: LoginType.Agent,
              },
            })
          }
        } catch (e) {
          console.log('Failed to open Agent url')
        }
      },
    },
    {
      iconName: 'deposit',
      text: 'common.deposit',
      onPress: () => {
        isPlayerName
          ? push('/deposit')
          : desktop
          ? handleDesktopAccountVerification()
          : push('/account/account-verification')
      },
    },
    {
      iconName: 'withdraw',
      text: 'common.withdraw',
      onPress: () => {
        push('/withdrawal')
      },
    },
    {
      iconName: 'transfer',
      text: 'common.transfer',
      onPress: () => {
        push('/transfer')
      },
    },
    {
      iconName: 'history',
      text: 'common.history',
      onPress: () => {
        push('/history')
      },
    },
    {
      iconName: 'cs',
      text: 'contact.customerSupport',
      onPress: () => {
        push('/account/customer-support')
      },
    },
    {
      iconName: 'logout',
      text: 'common.logout',
      onPress: async () => {
        try {
          await logout()
        } catch (error) {
          console.error(error)
        }
      },
    },
  ]

  const handleDismiss = () => {
    toggleDrawer()
  }

  return (
    <ScrollView
      sx={{
        flex: 1,
        width: '100%',
        height: height,
        position: 'absolute',
      }}
      contentContainerSx={{
        mt: HEADER_HEIGHT + top,
        bg: '$primary.500',
      }}
      ref={scrollRef}
    >
      <View
        sx={{
          flex: 1,
          minHeight: height * 0.4,
          justifyContent: 'space-between',
        }}
      >
        <View>
          {MENU_LIST.map((item, index) => {
            return (
              <Pressable
                key={index}
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  px: '$3',
                  py: 8,
                }}
                onPress={() => {
                  item.onPress && item.onPress()
                  handleDismiss()
                }}
              >
                <View sx={{ alignItems: 'flex-start' }}>
                  <Icon name={item.iconName} color={'white'} size={24} />
                </View>
                <View sx={{ flex: 1, alignItems: 'flex-end' }}>
                  <Text
                    numberOfLines={1}
                    sx={{ alignItems: 'flex-end', fontSize: 16 }}
                  >
                    {t(item.text)}
                  </Text>
                </View>
              </Pressable>
            )
          })}
        </View>
        <View
          sx={{
            minHeight: height * 0.57,
            justifyContent: 'flex-end',
          }}
        >
          <ImageBackground
            source={require('../../../assets/images/banner_referral.jpg')}
            style={{
              aspectRatio: 760 / 1200,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            resizeMode="contain"
          >
            <View
              sx={{
                height: '35%',
                width: '80%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                sx={{
                  px: '$2',
                  py: '$3',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  width: '100%',
                }}
              >
                <Text
                  sx={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}
                >
                  {t('referral.shareMessage')}
                </Text>
                <Text
                  sx={{
                    fontSize: 12,
                    fontWeight: '700',
                    textAlign: 'center',
                    marginTop: 10,
                  }}
                >
                  {t('referral.shareContent')}
                </Text>
                <BouncePressable
                  onPress={() => copyToClipboard(referralLink)}
                  sx={{
                    bg: 'rgba(255,255,255,0.3)',
                    borderRadius: 20,
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    px: '$3',
                    py: 1,
                  }}
                >
                  <Text sx={{ fontSize: 14, mx: '$1', fontWeight: 'bold' }}>
                    {t('common.copy')}
                  </Text>
                  <Icon
                    name={'copy'}
                    color={'white'}
                    size={20}
                    sx={{ padding: 5, mx: '$1' }}
                  />
                </BouncePressable>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    </ScrollView>
  )
}
