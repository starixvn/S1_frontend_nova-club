import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { ROOT_DOMAIN } from 'utils/constant/domain'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { useAppSelector } from 'app/provider/redux/store'
import { Pressable, Text, View } from 'dripsy'
import React from 'react'
import { Linking } from 'react-native'
import { useCheckTicketSpinQuery } from 'services/eventApi'
import { SolitoImage } from 'solito/image'
import { useRouter } from 'solito/router'

const MidAutumnFloat = ({ size }: { size: number }) => {
  const { push } = useRouter()
  const { token } = useAppSelector((state) => state.auth.info) || {}
  const { width } = useContainerDimension()
  const iconSize = Math.min(100, width * 0.3)
  const isDesktop = useIsDesktop()

  const { balance, isFetching } = useCheckTicketSpinQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: (s) => ({ ...s, balance: s.data?.data }),
    skip: !token,
  })

  const handlePress = () => {
    if (isDesktop) {
      Linking.openURL(`${ROOT_DOMAIN}/event/mid-autumn`)
    } else push('/event/mid-autumn')
  }

  return (
    <Pressable
      onPress={handlePress}
      sx={{
        justifyContent: 'center',
        mb: 10,
        ml: -5,
        bg: 'rgba(30,30,30,0.01)',
      }}
    >
      <SolitoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/mid-autumn/floating-midautumn.gif`}
        width={iconSize}
        height={iconSize}
        resizeMode="contain"
        alt="Plinko-Event"
      />
      {token ? (
        <View
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            sx={{
              fontSize: 20,
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#000000',
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
  )
}
export default MidAutumnFloat
