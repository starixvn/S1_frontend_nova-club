import DataTable from 'app/components/DataTable/DataTable'
import DataTableCell from 'app/components/DataTable/DataTableCell'
import DataTableHeader from 'app/components/DataTable/DataTableHeader'
import DataTableRow from 'app/components/DataTable/DataTableRow'
import DataTableTitle from 'app/components/DataTable/DataTableTitle'
import Icon from 'app/components/Icon'
import Input from 'app/components/form/Input'
import useLocalization from 'app/provider/localization'
import { toThousandSeparator } from 'app/utils'
import { View } from 'dripsy'
import React from 'react'

const dummyData = []
const HistoryScreen = () => {
  const { t } = useLocalization()

  return (
    <View sx={{ flex: 1 }}>
      <View sx={{ p: 12 }}>
        <Input
          value="Monthly"
          action={({ color }) => <Icon name="down" color={color} />}
        />
      </View>
      <DataTable>
        <DataTableHeader size="small" containerStyle={{}}>
          <DataTableTitle>{t('leaderboard.rank').toUpperCase()}</DataTableTitle>
          <DataTableTitle>{t('profile.playerId').toUpperCase()}</DataTableTitle>
          <DataTableTitle>{t('common.points').toUpperCase()}</DataTableTitle>
          <DataTableTitle>{t('menu.tab.status').toUpperCase()}</DataTableTitle>
        </DataTableHeader>
        {dummyData.map((item) => (
          <DataTableRow key={item.rank}>
            <DataTableCell>{item.rank}</DataTableCell>
            <DataTableCell>{item.playerId}</DataTableCell>
            <DataTableCell textStyle={{ fontSize: 14 }}>
              {toThousandSeparator(item.points.toString())}
            </DataTableCell>
            <DataTableCell>-</DataTableCell>
          </DataTableRow>
        ))}
      </DataTable>
    </View>
  )
}

export default HistoryScreen
