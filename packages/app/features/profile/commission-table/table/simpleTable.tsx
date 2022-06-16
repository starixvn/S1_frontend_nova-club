import { View } from 'dripsy'
import React from 'react'
import WebView from 'react-native-webview'
import { DEV_DOMAIN } from '@env'

const COMMISSION_TABLE_URL = DEV_DOMAIN + '/profile/commission-table'

const SimpleTable = () => {
  return (
    <View sx={{ flex: 1 }}>
      <WebView source={{ uri: COMMISSION_TABLE_URL }} startInLoadingState />
    </View>
  )
}

export default SimpleTable
