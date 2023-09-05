import { DEV_DOMAIN } from '@env'
import FormContainer from 'app/components/form/FormContainer'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { toCurrency, toThousandSeparator } from 'app/utils'
import { Currency } from 'utils/constant'
import { ScrollView, View } from 'dripsy'
import React from 'react'
import {
  usePlayerOverviewSummaryQuery,
  usePlayerProfileQuery,
} from 'services/playerApi'
import ReferralCommission from '../home/Referral/components/ReferralCommission'
import ReferralLink from '../home/Referral/components/ReferralLink'
import ReferralQrCode from '../home/Referral/components/ReferralQrCode'
import ReferralStatus from '../home/Referral/components/ReferralStatus'
import ReferralStep from '../home/Referral/components/ReferralStep'
import ReferralBanner from '../home/Referral/components/Referralbanner'

const ReferralScreen = () => {
  const { t } = useLocalization()
  const desktop = useIsDesktop()

  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.currency as Currency

  const { token } = useAppSelector((state) => state.auth.info) || {}
  const { data, isFetching } = usePlayerOverviewSummaryQuery(undefined, {
    skip: !token,
  })

  const referralCode = playerData?.referral_code
  const referralLink = `${DEV_DOMAIN}/download?ref=${referralCode}`

  const referralFriend = data?.data?.registered ?? 0
  const referralComm = `VND ${toThousandSeparator(data?.data?.ref_comm || '')}`

  return (
    <PageWithBackHeader
      header={{ title: t('referral.title') }}
      disableScrollView
      hideHeader={desktop}
    >
      {desktop ? (
        <View
          sx={{
            minHeight: 600,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <View sx={{ width: '80%' }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                sx={{
                  mr: 10,
                  paddingHorizontal: 50,
                  flex: 1,
                }}
              >
                <ReferralStatus
                  refComm={referralComm}
                  refFriend={referralFriend}
                />
                <ReferralLink referralLink={referralLink} />
              </View>
              <View
                sx={{
                  paddingHorizontal: 50,
                }}
              >
                <ReferralQrCode
                  referralLink={referralLink}
                  referralCode={referralCode}
                />
              </View>
            </View>
            <ReferralStep />
            <ReferralCommission />
          </View>
        </View>
      ) : (
        <ScrollView>
          <ReferralBanner />
          <FormContainer>
            <View
              sx={{
                // width: '80%',
                margin: 'auto',
              }}
            >
              <ReferralLink referralLink={referralLink} />
              <View style={{ flexDirection: 'row' }}>
                <View sx={{ flex: 0.4 }}>
                  <ReferralQrCode
                    referralLink={referralLink}
                    referralCode={referralCode}
                  />
                </View>
                <View sx={{ flex: 0.6, ml: 10 }}>
                  <ReferralStatus
                    refComm={referralComm}
                    refFriend={referralFriend}
                  />
                  <ReferralCommission />
                </View>
              </View>
              <ReferralStep />
            </View>
          </FormContainer>
        </ScrollView>
      )}
    </PageWithBackHeader>
  )
}

export default ReferralScreen
