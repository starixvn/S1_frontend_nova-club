import React from 'react'
import ReferralSection from '../home/Referral/ReferralSection'
import DesktopPageContainer from 'desktop-ext/components/layout/DesktopPage'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import isDesktop from 'app/utils/isDesktop'
import { View } from 'dripsy'

const ReferralScreen = () => {
  const { t } = useLocalization()
  const desktop = isDesktop()

  return (
    <PageWithBackHeader
      header={{ title: t('referral.title') }}
      disableScrollView
      hideHeader={desktop}
    >
      <DesktopPageContainer>
        <View
          sx={{
            height: 400,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ReferralSection />
        </View>
      </DesktopPageContainer>
    </PageWithBackHeader>
  )
}

export default ReferralScreen
