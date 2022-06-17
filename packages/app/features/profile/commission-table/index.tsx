import { PageWithBackHeader } from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React from 'react'
import { Platform } from 'react-native'
import SimpleTable from './table/simpleTable'

const CommissionTable = () => {
  const { t } = useLocalization()

  return (
    <PageWithBackHeader
      header={{ title: t('commission.table') }}
      contentContainerStyle={{
        flexGrow: Platform.OS === 'web' ? 0 : 1,
        color: 'red',
      }}
    >
      <View sx={{ flex: 1 }}>
        <SimpleTable></SimpleTable>
      </View>
    </PageWithBackHeader>
  )
}

export default CommissionTable
