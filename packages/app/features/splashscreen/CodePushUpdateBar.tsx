import useLocalization from 'app/provider/localization'
import { Text, useDripsyTheme, View } from 'dripsy'
import React from 'react'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import ProgressBar from './ProgressBar'

interface CodePushUpdateBar {
  progress: number
}

function CodePushUpdateBar<CodePushUpdateBar>({ progress = 0, ...rest }) {
  const percentage = Math.floor(progress * 100)

  const { theme } = useDripsyTheme()
  const { t } = useLocalization()

  return (
    <View
      sx={{
        position: 'absolute',
        bottom: getBottomSpace() + 10,
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
          color={theme.colors['$primary']}
        />
      </View>
    </View>
  )
}

export default CodePushUpdateBar
