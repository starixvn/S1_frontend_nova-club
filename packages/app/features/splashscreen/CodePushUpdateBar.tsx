import useLocalization from 'app/provider/localization'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Text, useDripsyTheme, View } from 'dripsy'
import React from 'react'
import ProgressBar from './ProgressBar'

interface CodePushUpdateBar {
  progress: number
}

function CodePushUpdateBar<CodePushUpdateBar>({ progress = 0, ...rest }) {
  const percentage = Math.floor(progress * 100)

  const { theme } = useDripsyTheme()
  const { t } = useLocalization()
  const { bottom } = useSafeArea()

  return (
    <View
      sx={{
        position: 'absolute',
        bottom: bottom + 10,
        left: 0,
        right: 0,
        mx: '20%',
      }}
    >
      <Text
        sx={{ fontSize: 14, color: 'white', mb: '$1', textAlign: 'center' }}
      >
        {`${t('common.loading')} (${percentage}%)`}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <ProgressBar
          progress={progress}
          bgColor={'#c2c2c2'}
          color={theme.colors['$primary']['300']}
        />
      </View>
    </View>
  )
}

export default CodePushUpdateBar
