import { DEV_DOMAIN } from '@env'
import Icon from 'app/components/Icon'
import BouncePressable from 'app/components/pressable/BouncePressable'
import { LoginType } from 'app/features/auth/AuthTypeSelection'
import useAlert from 'app/hooks/useAlert'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { useDrawer } from 'app/hooks/useDrawer'
import useOnAppLogout from 'app/hooks/useOnAppLogout'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { copyToClipboard } from 'app/utils'
import { HEADER_HEIGHT } from 'app/utils/constant'
import { Pressable, ScrollView, Text, View, useResponsiveValue } from 'dripsy'
import React, { useEffect, useRef } from 'react'
import {
  ImageBackground,
  ScrollView as rScrollView,
  useWindowDimensions,
} from 'react-native'
import { usePlayerProfileQuery } from 'services/playerApi'
import { useRouter } from 'solito/router'
import DrawerReferral from './DrawerReferral'

export default function DrawerContent() {
  const { t } = useLocalization()
  const { push } = useRouter()
  const { top, bottom } = useSafeArea()
  const { height } = useContainerDimension()
  const { isOpen, toggleDrawer } = useDrawer()
  const { logout } = useOnAppLogout()
  const desktop = useResponsiveValue([false, false, false, true])
  const { showAlert } = useAlert()
  const scrollRef = useRef<rScrollView>(null)

  const isAgentLoggedIn = useAppSelector((s) => !!s.agent.access_token)
  const isLoggedIn = useAppSelector((s) => !!s.auth.info)
  const { isCreditMember, data: playerData } = usePlayerProfileQuery(
    undefined,
    { skip: !isLoggedIn }
  )
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
        playerData?.pin_exist
          ? push('/transfer/receive')
          : push('/account/manage-credentials/create-pin')
      },
    },
    {
      iconName: 'history',
      text: 'common.history',
      onPress: () => {
        push('/history/transaction')
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
    <View
      sx={{
        flex: 1,
        // display: 'flex',
        height: '100%',
        // flexDirection: 'column',
        // bg: 'yellow',
        // justifyContent: 'space-between',
      }}
    >
      <ScrollView
        sx={
          {
            // width: '100%',
            // position: 'absolute',
            // height: height - HEADER_HEIGHT - top,
            // borderTopWidth: 1,
            // borderColor: '$primary.600',
            // flex: 1,
            // bg: 'red',
          }
        }
        contentContainerSx={{
          // bg: '$primary.500',
          minHeight: 300,
          // bg: 'green',
          height: '100%',
          // flex: 1,
          // height,
        }}
        ref={scrollRef}
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
      </ScrollView>

      <DrawerReferral />
    </View>
  )
}
