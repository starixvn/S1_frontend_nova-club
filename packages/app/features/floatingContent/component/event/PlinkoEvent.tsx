import { DEV_DOMAIN } from '@env'
import Image from 'app/components/common/Image'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { useAppSelector } from 'app/provider/redux/store'
import { Pressable, Text, View, useResponsiveValue } from 'dripsy'
import { MotiView } from 'moti'
import React from 'react'
import { Linking } from 'react-native'
import { useCheckTicketSpinQuery } from 'services/eventApi'
import { useRouter } from 'solito/router'

const PlinkoEvent = ({ size }: { size: number }) => {
  const { push } = useRouter()
  const { token } = useAppSelector((state) => state.auth.info) || {}
  const { width } = useContainerDimension()
  const iconSize = Math.min(100, width * 0.3)
  const isDesktop = useResponsiveValue([false, false, false, true, true])

  const { balance, isFetching } = useCheckTicketSpinQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: (s) => ({ ...s, balance: s.data?.data }),
    skip: !token,
  })

  const handlePress = () => {
    if (isDesktop) {
      Linking.openURL(`${DEV_DOMAIN}/event/plinko`)
    } else push('/event/plinko')
  }

  return (
    <MotiView
      from={{ translateY: -10 }}
      animate={{ translateY: 10 }}
      transition={{
        type: 'timing',
        loop: true,
        duration: 2000,
      }}
    >
      <Pressable
        onPress={handlePress}
        sx={{
          justifyContent: 'center',
          mb: 10,
          ml: -5,
          bg: 'rgba(30,30,30,0.01)',
        }}
      >
        <Image
          source={
            token
              ? require('app/assets/images/plinko/HAB_Button.png')
              : require('app/assets/images/plinko/btnStart.png')
          }
          style={{
            width: iconSize,
            height: iconSize,
          }}
          resizeMode="contain"
          alt="Plinko-Event"
        />
        {token ? (
          <View
            sx={{
              position: 'absolute',
              top: -26,
              bottom: 0,
              left: 0,
              right: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              sx={{
                fontSize: 12,
                lineHeight: 16,
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#f9ff59',
                //   zIndex: 99,
              }}
            >
              {balance?.totalBalance
                ? balance?.totalBalance > 99
                  ? '99+'
                  : balance?.totalBalance
                : 0}
            </Text>
          </View>
        ) : null}
      </Pressable>
    </MotiView>
  )
}
export default PlinkoEvent
