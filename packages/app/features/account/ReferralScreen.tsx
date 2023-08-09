import FormContainer from 'app/components/form/FormContainer'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import DrawerReferral from 'app/components/navigation/drawer/DrawerReferral'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React from 'react'
import ReferralSection from '../home/Referral/ReferralSection'

const ReferralScreen = () => {
  const { t } = useLocalization()
  const desktop = useIsDesktop()

  return (
    <PageWithBackHeader
      header={{ title: t('referral.title') }}
      disableScrollView
      hideHeader={desktop}
    >
      <FormContainer>
        {desktop ? (
          <View
            sx={{
              height: 400,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ReferralSection />
          </View>
        ) : (
          <View
            sx={{
              // width: '80%',
              margin: 'auto',
            }}
          >
            <DrawerReferral imageHeight={'100%'} />
          </View>
        )}
      </FormContainer>
    </PageWithBackHeader>
  )
}

export default ReferralScreen
