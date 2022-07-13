import { DripsyGradient } from 'app/components/Gradient'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { ActivityIndicator, Image, styled, Text, View } from 'dripsy'
import { memo, useEffect } from 'react'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { motify } from 'moti'
import { useAffiliateUsernameQuery } from 'services/contentApi'
const HEADER_IMAGE = require('../../../assets/images/register/referral-avatar.png')
const MotifiedView = motify(View)()
function ReferrerInformation({ sx = {}, ...rest }) {
  const { t } = useLocalization()
  const referral = useAppSelector((s) => s.setting.referral)
  const { error } = useAffiliateUsernameQuery(
    !referral || referral.username ? skipToken : referral.trackingCode,
    {
      // only retry when trackingCode is there but no username
      pollingInterval: referral && !referral.username ? 15000 : 0,
    }
  )

  const display = error?.message || referral?.username

  return (
    <MotifiedView
      from={{
        height: 0,
      }}
      animate={{
        height: 70,
      }}
      sx={{
        borderBottomWidth: 1.5,
        borderBottomColor: '$cyan',
        height: 70,
        ...sx,
      }}
      {...rest}
    >
      <DripsyGradient
        gradient={'lightOceanBlue'}
        sx={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={HEADER_IMAGE}
          // accessibilityLabel="n88 app logo"
          sx={{
            width: 50,
            height: 50,
          }}
        />

        <View sx={{ ml: '$3' }}>
          <Text sx={{ color: '$oceanBlue' }}>{t('auth.referrerInfo')}</Text>
          <View
            sx={{
              height: 25,
              alignItems: 'flex-start',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {display ? (
              <Text sx={{ color: error ? '$error' : undefined }}>
                {display}
              </Text>
            ) : (
              <ActivityIndicator color="$lightCyan" size={'small'} />
            )}
          </View>
        </View>
      </DripsyGradient>
    </MotifiedView>
  )
}

export default memo(ReferrerInformation)
