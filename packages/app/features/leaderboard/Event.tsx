import Button from 'app/components/common/Button'
import FormContainer from 'app/components/form/FormContainer'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React from 'react'
import PointsCalculation from './components/PointsCalculation'

const EventScreen = () => {
  const { t } = useLocalization()
  const desktop = useIsDesktop()

  return (
    <FormContainer hidePadding>
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
    </FormContainer>
  )
}

export default EventScreen
