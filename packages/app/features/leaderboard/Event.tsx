import { ScrollView, View } from 'dripsy'
import React from 'react'
import MonthlyEvent from './components/MonthlyEvent'
import PointsCalculation from './components/PointsCalculation'
import useLocalization from 'app/provider/localization'
import DesktopPageContainer from 'desktop-ext/components/layout/DesktopPage'
import isDesktop from 'app/utils/isDesktop'
import Button from 'app/components/common/Button'

const EventScreen = () => {
  const { t } = useLocalization()
  const desktop = isDesktop()

  return (
    <DesktopPageContainer>
      <View sx={{ flexGrow: 1 }}>
        <PointsCalculation />

        {/* <MonthlyEvent /> */}

        <View sx={{ my: 48, px: '$4', alignItems: 'center' }}>
          <Button
            onPress={() => console.log('press')}
            sx={{
              ...(desktop
                ? {
                    width: '60%',
                    minWidth: 350,
                  }
                : { width: '100%' }),
            }}
          >
            {t('common.tnc')}
          </Button>
        </View>
      </View>
    </DesktopPageContainer>
  )
}

export default EventScreen
