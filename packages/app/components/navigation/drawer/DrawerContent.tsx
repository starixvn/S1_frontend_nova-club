import { DEV_DOMAIN } from '@env'
import Icon from 'app/components/Icon'
import IconButton from 'app/components/IconButton'
import useAlert from 'app/hooks/useAlert'
import { useDrawer } from 'app/hooks/useDrawer'
import useOnAppLogout from 'app/hooks/useOnAppLogout'
import useLocalization from 'app/provider/localization'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { copyToClipboard } from 'app/utils'
import isDesktop from 'app/utils/isDesktop'
import { Pressable, ScrollView, Text, View } from 'dripsy'
import React, { useEffect, useRef } from 'react'
import { ImageBackground, useWindowDimensions } from 'react-native'
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
  const scrollRef = useRef()

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
    if (isOpen) {
      scrollRef?.current.scrollTo({ animated: false, offset: 0 })
    }
    // scrollRef?.current?.scrollToOffset({ animated: true, offset: 0 })
  }, [isOpen])

  const MENU_LIST = [
    {
      iconName: 'agent',
      text: 'AgentLogin',
      onPress: () => {
        push('/auth/login?t=agent')
      },
    },
    {
      iconName: 'deposit',
      text: 'Deposit',
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
      text: 'Withdrawal',
      onPress: () => {
        push('/withdrawal')
      },
    },
    {
      iconName: 'transfer',
      text: 'Transfer',
      onPress: () => {
        push('/transfer')
      },
    },
    {
      iconName: 'history',
      text: 'History',
      onPress: () => {
        push('/history')
      },
    },
    {
      iconName: 'cs',
      text: 'Customer Support',
      onPress: () => {
        push('/account/customer-support')
      },
    },
    {
      iconName: 'logout',
      text: 'Logout',
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
        bg: '$primary.500',
        flex: 1,
        width: '100%',
        height,
        position: 'absolute',
      }}
      contentContainerSx={{
        paddingTop: top,
        paddingBottom: bottom,
      }}
      ref={scrollRef}
    >
      <View
        sx={{
          flex: 1,
          minHeight: height - top - bottom,
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
                  paddingHorizontal: 10,
                }}
                onPress={() => {
                  item.onPress && item.onPress()
                  handleDismiss()
                }}
              >
                <View sx={{ alignItems: 'flex-start' }}>
                  <Icon
                    name={item.iconName}
                    color={'white'}
                    size={30}
                    sx={{ p: 10 }}
                  />
                </View>
                <View sx={{ flex: 1, alignItems: 'flex-end' }}>
                  <Text
                    numberOfLines={1}
                    sx={{ alignItems: 'flex-end', fontSize: 16 }}
                  >
                    {item.text}
                  </Text>
                </View>
              </Pressable>
            )
          })}
        </View>
        <View>
          <ImageBackground
            source={require('../../../assets/images/banner_referral.jpg')}
            style={{ aspectRatio: 760 / 1200 }}
            resizeMode="contain"
          >
            <View
              sx={{
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View
                sx={{
                  minHeight: '30%',
                  width: '75%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingX: 5,
                  paddingY: 10,
                }}
              >
                <Text sx={{ fontSize: 20, fontWeight: '500' }}>
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
                <Pressable
                  sx={{
                    bg: '$primary.500',
                    padding: 10,
                    borderRadius: 20,
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => copyToClipboard(referralLink)}
                >
                  <Text sx={{ fontSize: 14 }}>{t('common.copy')}</Text>
                  <IconButton
                    name={'copy'}
                    color={'white'}
                    size={12}
                    sx={{ padding: 5 }}
                  />
                </Pressable>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    </ScrollView>
  )
}
