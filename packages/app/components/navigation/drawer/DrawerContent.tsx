import Icon from 'app/components/Icon'
import { LoginType } from 'app/features/auth/AuthLayout'
import useAlert from 'app/hooks/useAlert'
import { useDrawer } from 'app/hooks/useDrawer'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useOnAppLogout from 'app/hooks/useOnAppLogout'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { Pressable, ScrollView, Text, View } from 'dripsy'
import React, { useEffect, useRef } from 'react'
import { ScrollView as rScrollView } from 'react-native'
import { usePlayerProfileQuery } from 'services/playerApi'
import { useRouter } from 'solito/router'
import DrawerReferral from './DrawerReferral'
import CodePushStatus from './CodePushStatus'
import Button from 'app/components/common/Button'

export default function DrawerContent() {
  const { t } = useLocalization()
  const { push } = useRouter()
  const { isOpen, toggleDrawer } = useDrawer()
  const { logout } = useOnAppLogout()
  const desktop = useIsDesktop()
  const { showAlert } = useAlert()
  const scrollRef = useRef<rScrollView>(null)

  const isAgentLoggedIn = useAppSelector((s) => !!s.agent.access_token)
  const isLoggedIn = useAppSelector((s) => !!s.auth.info)
  const { data: playerData } = usePlayerProfileQuery(undefined, {
    skip: !isLoggedIn,
  })
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
  ]

  const handleDismiss = () => {
    toggleDrawer()
  }

  return (
    <View
      sx={{
        flex: 1,
        justifyContent: 'space-between',
      }}
    >
      <ScrollView
        sx={{}}
        contentContainerSx={{
          flexGrow: 1,
        }}
        ref={scrollRef}
        bounces={false}
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
        <Button
          leftIcon={{ name: 'logout' }}
          sx={{
            alignSelf: 'center',
            bg: '$placeholder',
            borderRadius: 30,
            my: '$3',
          }}
          onPress={async () => {
            try {
              handleDismiss()
              await logout()
            } catch (error) {
              console.error(error)
            }
          }}
        >
          {t('common.logout')}
        </Button>
        <CodePushStatus />
      </ScrollView>

      <DrawerReferral />
    </View>
  )
}
