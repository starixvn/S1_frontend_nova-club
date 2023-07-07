import FormContainer from 'app/components/form/FormContainer'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import isDesktop from 'app/utils/isDesktop'
import { View } from 'dripsy'
import React from 'react'
import ReferralSection from '../home/Referral/ReferralSection'

const ReferralScreen = () => {
  const { t } = useLocalization()
  const desktop = isDesktop()

  return (
    <PageWithBackHeader
      header={{ title: t('referral.title') }}
      disableScrollView
      hideHeader={desktop}
    >
      <FormContainer>
        <View
          sx={{
            height: 400,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ReferralSection />
        </View>
      </FormContainer>
    </PageWithBackHeader>
  )
}

export default ReferralScreen
