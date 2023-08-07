import { DEV_DOMAIN } from '@env'
import Icon from 'app/components/Icon'
import BouncePressable from 'app/components/pressable/BouncePressable'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { copyToClipboard } from 'app/utils'
import { Text, View } from 'dripsy'
import React from 'react'
import { ImageBackground } from 'react-native'
import { usePlayerProfileQuery } from 'services/playerApi'

const DrawerReferral = () => {
  const { t } = useLocalization()
  const { bottom } = useSafeArea()
  const { height } = useContainerDimension()

  const isLoggedIn = useAppSelector((s) => !!s.auth.info)
  const { data: playerData } = usePlayerProfileQuery(undefined, {
    skip: !isLoggedIn,
  })

  const referralLink = `${DEV_DOMAIN}/download?ref=${playerData?.referral_code}`

  return (
    <View
      sx={{
        height: height - 325 + bottom,
        // bg: 'red',
        justifyContent: 'flex-end',
      }}
    >
      <ImageBackground
        source={require('../../../assets/images/banner_referral.jpg')}
        style={{
          // aspectRatio: 380 / 600,
          maxHeight: 380,
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: 'green',
        }}
        resizeMode="cover"
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
              sx={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}
            >
              {t('referral.shareMessage')}
            </Text>
            <Text
              sx={{
                fontSize: 10,
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
              <Text sx={{ fontSize: 10, mx: '$1', fontWeight: 'bold' }}>
                {t('common.copy')}
              </Text>
              <Icon
                name={'copy'}
                color={'white'}
                size={14}
                sx={{ padding: 5, mx: '$1' }}
              />
            </BouncePressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default DrawerReferral
