import Icon from 'app/components/Icon'
import DataTable from 'app/components/dataTable/DataTable'
import DataTableCell from 'app/components/dataTable/DataTableCell'
import DataTableHeader from 'app/components/dataTable/DataTableHeader'
import DataTableRow from 'app/components/dataTable/DataTableRow'
import DataTableTitle from 'app/components/dataTable/DataTableTitle'
import { getRankStatusImage, getRankingImage } from 'app/config/leaderboard'
import useLocalization from 'app/provider/localization'
import { toThousandSeparator } from 'app/utils'
import { Row, Text, View } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'
import CoinImage from 'app/assets/images/leaderboard/coin.png'

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

const LeaderboardTable = ({ maxRow }) => {
  const { t } = useLocalization()

  const leaderboardData = maxRow ? dummyData.slice(0, maxRow) : dummyData

  const firstCellStyle = { flex: 2 / 12 }
  const secondCellStyle = { flex: 4 / 12 }
  const thirdCellStyle = { flex: 4 / 12 }
  const fourthCellStyle = { flex: 2 / 12 }

  return (
    <>
      <View sx={{ height: 1, bg: '$primary.100' }} />
      <DataTable>
        <DataTableHeader size="small" containerStyle={{}}>
          <DataTableTitle containerStyle={firstCellStyle}>
            {t('leaderboard.rank').toUpperCase()}
          </DataTableTitle>
          <DataTableTitle containerStyle={secondCellStyle}>
            {t('profile.playerId').toUpperCase()}
          </DataTableTitle>
          <DataTableTitle center={false} containerStyle={thirdCellStyle}>
            {t('common.points').toUpperCase()}
          </DataTableTitle>
          <DataTableTitle containerStyle={fourthCellStyle}>
            {t('menu.tab.status').toUpperCase()}
          </DataTableTitle>
        </DataTableHeader>
        {leaderboardData.map((item, index) => (
          <DataTableRow key={item.rank}>
            <DataTableCell center containerStyle={firstCellStyle}>
              <SolitoImage
                src={getRankingImage(index + 1)}
                fill
                alt="item.playerId"
              />
            </DataTableCell>
            <DataTableCell containerStyle={secondCellStyle}>
              {item.playerId}
            </DataTableCell>
            <DataTableCell center={false} containerStyle={thirdCellStyle}>
              <Row sx={{ alignItems: 'center' }}>
                <SolitoImage
                  src={CoinImage}
                  height={18}
                  width={18}
                  alt={`${index} coin`}
                  style={{ marginRight: 12 }}
                />
                <Text sx={{ fontSize: 14 }}>
                  {toThousandSeparator(item.points.toString())}
                </Text>
              </Row>
            </DataTableCell>
            <DataTableCell containerStyle={fourthCellStyle}>
              {item.status === 0 ? (
                <Text>-</Text>
              ) : (
                <Icon
                  name="down"
                  color={getRankStatusImage(item.status)}
                  sx={{
                    transform: [
                      { rotate: item.status === 1 ? '180deg' : '0deg' },
                    ],
                  }}
                />
              )}
            </DataTableCell>
          </DataTableRow>
        ))}
      </DataTable>
    </>
  )
}

export default LeaderboardTable
