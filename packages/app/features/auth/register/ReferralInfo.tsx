import ShadowButton from 'app/components/ShadowButton'
import Image from 'app/components/common/Image'
import useLocalization from 'app/provider/localization'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { isBannedTrackingCode } from 'app/utils/referralUtil'
import { Text, View } from 'dripsy'
import React, { useEffect } from 'react'
import { useAffiliateUsernameQuery } from 'services/contentApi'

const ReferralInfo = () => {
  const dispatch = useAppDispatch()
  const { t } = useLocalization()

  const currency = useAppSelector((s) => s.setting.currency)
  const referral = useAppSelector((s) => s.setting.referral)
  const isBanned = isBannedTrackingCode(referral?.trackingCode)

  const { error, isSuccess } = useAffiliateUsernameQuery(
    {
      trackingCode:
        referral?.trackingCode && !isBanned ? referral.trackingCode : '',
      currency,
    },
    { skip: !referral?.trackingCode }
  )

  useEffect(() => {
    if (error && !error?.success) {
      dispatch(SettingActions.setReferral({ trackingCode: '' }))
    }
  }, [dispatch, error])

  if (!isSuccess || isBanned) return null

  return (
    <ShadowButton isActive={true} safeRender stretch>
      <View sx={{ alignItems: 'flex-start' }}>
        <Text sx={{ fontWeight: 'bold' }}>
          {t('authentication.referrerInfo')}
        </Text>

        <View
          sx={{
            mt: '$1',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '$3',
          }}
        >
          <View sx={{ borderRadius: 50 }}>
            <Image
              alt="user-avatar"
              source={require('../../../assets/images/common/avatarx2.png')}
              sx={{ aspectRatio: 1, width: 34, height: 34, borderRadius: 50 }}
            />
          </View>

          <View>
            <Text sx={{ fontSize: '$1' }}>{referral?.trackingCode || ''}</Text>
          </View>
        </View>
      </View>
    </ShadowButton>
  )
}

export default ReferralInfo
