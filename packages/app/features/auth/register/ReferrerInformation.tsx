import { skipToken } from '@reduxjs/toolkit/query/react'
import { DripsyGradient } from 'app/components/Gradient'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { isBannedTrackingCode } from 'app/utils/referralUtil'
import { Image, Text, View } from 'dripsy'
import { motify } from 'moti'
import { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAffiliateUsernameQuery } from 'services/contentApi'

const HEADER_IMAGE = require('../../../assets/images/header/avatar.png')
const MotifiedView = motify(View)()
function ReferrerInformation({ sx = {}, ...rest }) {
  const dispatch = useDispatch()
  const { t } = useLocalization()
  const referral = useAppSelector((s) => s.setting.referral)
  const isBanned = isBannedTrackingCode(referral?.trackingCode)
  const { error, isSuccess } = useAffiliateUsernameQuery(
    referral?.trackingCode && !isBanned ? referral.trackingCode : skipToken
  )

  useEffect(() => {
    if (!error?.success) {
      dispatch(SettingActions.setReferral({ trackingCode: '' }))
    }
  }, [dispatch, error])

  if (!isSuccess || isBanned) return null

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
            <Text>{referral?.trackingCode}</Text>
          </View>
        </View>
      </DripsyGradient>
    </MotifiedView>
  )
}

export default memo(ReferrerInformation)
