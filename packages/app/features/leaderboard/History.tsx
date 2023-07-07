import DataTable from 'app/components/dataTable/DataTable'
import DataTableHeader from 'app/components/dataTable/DataTableHeader'
import DataTableTitle from 'app/components/dataTable/DataTableTitle'
import FormContainer from 'app/components/form/FormContainer'
import SelectList from 'app/components/select/SelectList'
import useLocalization from 'app/provider/localization'
import { DateFilterOptions } from 'app/utils/constant'
import isDesktop from 'app/utils/isDesktop'
import { Row, View } from 'dripsy'
import React, { useState } from 'react'

const dummyData = []
const HistoryScreen = () => {
  const { t } = useLocalization()
  const desktop = isDesktop()

  const [date, setDate] = useState(DateFilterOptions[4]?.value)

  const options = DateFilterOptions.slice(0, -1)
  return (
    <FormContainer padding>
      <View sx={{ flexGrow: 1 }}>
        <View sx={{ pt: 12, px: [12, 12, 12, 0] }}>
          <SelectList
            label={t('common.date')}
            placeholder=""
            enabledLabel={false}
            options={options}
            value={date}
            onSelected={setDate}
          />
        </View>
        <DataTable>
          <DataTableHeader size="small">
            <DataTableTitle>
              {t('leaderboard.rank').toUpperCase()}
            </DataTableTitle>
            <DataTableTitle>
              {t('profile.playerId').toUpperCase()}
            </DataTableTitle>
            <DataTableTitle>{t('common.points').toUpperCase()}</DataTableTitle>
            <DataTableTitle>
              {t('menu.tab.status').toUpperCase()}
            </DataTableTitle>
          </DataTableHeader>
          {/* {dummyData.map((item) => (
          <DataTableRow key={item.rank}>
            <DataTableCell>{item.rank}</DataTableCell>
            <DataTableCell>{item.playerId}</DataTableCell>
            <DataTableCell textStyle={{ fontSize: 14 }}>
              {toThousandSeparator(item.points.toString())}
            </DataTableCell>
            <DataTableCell>-</DataTableCell>
          </DataTableRow>
        ))} */}
        </DataTable>
      </View>
    </FormContainer>
  )
}

export default HistoryScreen
