import Page, { PageWithBackHeader } from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React from 'react'
import { Platform } from 'react-native'
import SimpleTable from './table/simpleTable'

const CommissionTable = () => {
  const { t } = useLocalization()

  let showHeader = true
  if (Platform.OS === 'web' && window.ReactNativeWebView !== null) {
    showHeader = false
  }

  const Container = showHeader ? PageWithBackHeader : Page

  return (
    <Container
      header={{ title: t('commission.table') }}
      contentContainerStyle={{
        flexGrow: Platform.OS === 'web' ? 0 : 1,
      }}
    >
      <View sx={{ flex: 1 }}>
        <SimpleTable></SimpleTable>
      </View>
    </Container>
  )
}

export default CommissionTable
