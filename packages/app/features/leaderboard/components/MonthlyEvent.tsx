import DataTable from 'app/components/dataTable/DataTable'
import DataTableCell from 'app/components/dataTable/DataTableCell'
import DataTableHeader from 'app/components/dataTable/DataTableHeader'
import DataTableRow from 'app/components/dataTable/DataTableRow'
import DataTableTitle from 'app/components/dataTable/DataTableTitle'
import useLocalization from 'app/provider/localization'
import { toThousandSeparator } from 'app/utils'
import { Text, View } from 'dripsy'
import React from 'react'

const dummyData = [
  {
    rank: '1st',
    minPoints: 30000,
    bonus: 10000,
  },
  {
    rank: '2nd',
    minPoints: 25000,
    bonus: 8000,
  },
  {
    rank: '3rd',
    minPoints: 18000,
    bonus: 6000,
  },
  {
    rank: '4th',
    minPoints: 15000,
    bonus: 5000,
  },
  {
    rank: '5th',
    minPoints: 12000,
    bonus: 4000,
  },
  {
    rank: '6th',
    minPoints: 10000,
    bonus: 3000,
  },
  {
    rank: '7th',
    minPoints: 9000,
    bonus: 2000,
  },
  {
    rank: '8th',
    minPoints: 8000,
    bonus: 1000,
  },
  {
    rank: '9th',
    minPoints: 7000,
    bonus: 800,
  },
  {
    rank: '10th',
    minPoints: 5000,
    bonus: 500,
  },
]
const MonthlyEvent = () => {
  const { t } = useLocalization()
  return (
    <View>
      <Text sx={{ textAlign: 'center', p: 12 }}>
        {t('leaderboard.monthlyEvent').toUpperCase()}
      </Text>

      <DataTable>
        <DataTableHeader size="small" sx={{}}>
          <DataTableTitle center={false} sx={{ px: 12 }}>
            {t('menu.leaderboard').toUpperCase()}
          </DataTableTitle>
          <DataTableTitle>
            {t('leaderboard.minPoints').toUpperCase()}
          </DataTableTitle>
          <DataTableTitle>{t('common.bonus').toUpperCase()}</DataTableTitle>
        </DataTableHeader>
        {dummyData.map((item) => (
          <DataTableRow key={item.rank}>
            <DataTableCell sx={{ px: 12 }}>
              {item.rank.toUpperCase()}
            </DataTableCell>
            <DataTableCell>
              {toThousandSeparator(item.minPoints.toString())}
            </DataTableCell>
            <DataTableCell>
              {toThousandSeparator(item.bonus.toString())}
            </DataTableCell>
          </DataTableRow>
        ))}
      </DataTable>
    </View>
  )
}

export default MonthlyEvent
