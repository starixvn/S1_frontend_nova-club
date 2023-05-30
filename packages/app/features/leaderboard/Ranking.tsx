import DataTable from 'app/components/dataTable/DataTable'
import DataTableCell from 'app/components/dataTable/DataTableCell'
import DataTableHeader from 'app/components/dataTable/DataTableHeader'
import DataTableRow from 'app/components/dataTable/DataTableRow'
import DataTableTitle from 'app/components/dataTable/DataTableTitle'
import useLocalization from 'app/provider/localization'
import { toThousandSeparator } from 'app/utils'
import dayjs from 'dayjs'
import { Text, View } from 'dripsy'
import React from 'react'

const dummyData = [
  {
    rank: '1st',
    playerId: 'player 1',
    points: 999999.11,
    status: 0,
  },
  {
    rank: '2nd',
    playerId: 'player 2',
    points: 888888.22,
    status: 1,
  },
  {
    rank: '3rd',
    playerId: 'player 3',
    points: 777777.33,
    status: 2,
  },
  {
    rank: '4th',
    playerId: 'player 4',
    points: 666666.44,
    status: 0,
  },
  {
    rank: '5th',
    playerId: 'player 5',
    points: 555555.55,
    status: 0,
  },
  {
    rank: '6th',
    playerId: 'player 6',
    points: 444444.66,
    status: 0,
  },
  {
    rank: '7th',
    playerId: 'player 7',
    points: 333333.77,
    status: 0,
  },
  {
    rank: '8th',
    playerId: 'player 8',
    points: 222222.8,
    status: 0,
  },
  {
    rank: '9th',
    playerId: 'player 9',
    points: 111111.99,
    status: 0,
  },
  {
    rank: '10th',
    playerId: 'player 10',
    points: 100000.0,
    status: 0,
  },
]

const RankingScreen = () => {
  const { t } = useLocalization()

  return (
    <View sx={{ flex: 1 }}>
      <Text sx={{ textAlign: 'center', p: 12 }}>
        {t('leaderboard.top10').toUpperCase()}
      </Text>

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

      <Text sx={{ textAlign: 'center', p: 12 }}>
        {`${t('common.lastUpdated')} ${dayjs().format('YYYY-MM-DD')}`}
      </Text>
    </View>
  )
}

export default RankingScreen
