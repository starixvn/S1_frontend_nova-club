import Icon from 'app/components/Icon'
import IconButton from 'app/components/IconButton'
import { useDrawer } from 'app/hooks/useDrawer'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { copyToClipboard } from 'app/utils'
import { Pressable, ScrollView, Text, View } from 'dripsy'
import React from 'react'
import { ImageBackground, useWindowDimensions } from 'react-native'
import { usePlayerProfileQuery } from 'services/playerApi'
import { useRouter } from 'solito/router'

export default function DrawerContent() {
  const { push } = useRouter()
  const { top, bottom } = useSafeArea()
  const { height } = useWindowDimensions()
  const { isOpen, toggleDrawer } = useDrawer()

  const { isCreditMember, data: playerData } = usePlayerProfileQuery()

  const isPlayerName = !!playerData?.firstName

  const MENU_LIST = [
    {
      iconName: 'agent',
      text: 'AgentLogin',
      onPress: () => {
        push('/deposit')
      },
    },
    {
      iconName: 'deposit',
      text: 'Deposit',
      onPress: () => {
        push('/deposit')
        // isPlayerName ? push('/deposit') : push(`/profile/account-verification`)
      },
    },
    {
      iconName: 'withdraw',
      text: 'Withdrawal',
      onPress: () => {
        push('/deposit')
      },
    },
    {
      iconName: 'transfer',
      text: 'Transfer',
      onPress: () => {
        push('/deposit')
      },
    },
    {
      iconName: 'history',
      text: 'History',
      onPress: () => {
        push('/deposit')
      },
    },
    {
      iconName: 'cs',
      text: 'Customer Support',
      onPress: () => {
        push('/deposit')
      },
    },
    {
      iconName: 'logout',
      text: 'Logout',
      onPress: () => {
        push('/deposit')
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
        height: '100%',
        position: 'absolute',
      }}
      contentContainerSx={{
        paddingTop: top,
        paddingBottom: bottom,
      }}
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
            source={require('../../../assets/images/imageB.png')}
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
                  borderWidth: 2,
                  borderRadius: 15,
                  bg: 'rgb(0,0,0,0.6)',
                  borderColor: 'yellow',
                  minHeight: '30%',
                  width: '75%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingX: 5,
                  paddingY: 10,
                }}
              >
                <Text sx={{ fontSize: 20, fontWeight: '500' }}>
                  Share & Earn
                </Text>
                <Text
                  sx={{
                    fontSize: 12,
                    fontWeight: '700',
                    textAlign: 'center',
                    marginTop: 10,
                  }}
                >
                  Get exclusive referral bonuses when your friend signs up using
                  your referral code
                </Text>
                <View
                  sx={{
                    bg: '$primary.500',
                    padding: 10,
                    borderRadius: 20,
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text sx={{ fontSize: 14 }}>A1234567890</Text>
                  <IconButton
                    name={'copy'}
                    color={'white'}
                    size={12}
                    sx={{ padding: 5 }}
                    onPress={() => copyToClipboard('123')}
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    </ScrollView>
  )
}
