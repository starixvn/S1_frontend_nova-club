import CoinImage from 'app/assets/images/leaderboard/coin.png'
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
import { useGetLeaderboardQuery } from 'services/contentApi'
import { SolitoImage } from 'solito/image'

const LeaderboardTable = ({ maxRow = 10 }: { maxRow?: number }) => {
  const { t } = useLocalization()
  const { data } = useGetLeaderboardQuery()

  const leaderboardData = maxRow ? data?.slice(0, maxRow) : data

  const firstCellStyle = { flex: 2 / 12 }
  const secondCellStyle = { flex: 5 / 12 }
  const thirdCellStyle = { flex: 3 / 12 }
  const fourthCellStyle = { flex: 2 / 12 }

  return (
    <DataTable>
      <DataTableHeader sx={{}}>
        <DataTableTitle sx={firstCellStyle} numberOfLines={2}>
          {t('leaderboard.rank').toUpperCase()}
        </DataTableTitle>
        <DataTableTitle sx={secondCellStyle} numberOfLines={2}>
          {t('leaderboard.playerId').toUpperCase()}
        </DataTableTitle>
        <DataTableTitle sx={thirdCellStyle} numberOfLines={2}>
          {t('common.points').toUpperCase()}
        </DataTableTitle>
        <DataTableTitle sx={fourthCellStyle} numberOfLines={2}>
          {t('deposit.status').toUpperCase()}
        </DataTableTitle>
      </DataTableHeader>
      {leaderboardData &&
        leaderboardData.map((item, index) => (
          <DataTableRow key={item.rank} size="big">
            <DataTableCell center sx={firstCellStyle}>
              <SolitoImage
                src={getRankingImage(item.rank)}
                fill
                alt={`${item.rank}}`}
              />
            </DataTableCell>
            <DataTableCell
              sx={secondCellStyle}
              textStyle={{ fontSize: [12, 12, 13, 14] }}
            >
              {item.username}
            </DataTableCell>
            <DataTableCell center={false} sx={thirdCellStyle}>
              <Row sx={{ alignItems: 'center' }}>
                <SolitoImage
                  src={CoinImage}
                  height={18}
                  width={18}
                  alt={`${index} coin`}
                  style={{ marginRight: 12 }}
                />
                <Text sx={{ fontSize: [12, 12, 13, 14] }}>
                  {toThousandSeparator(item.points)}
                </Text>
              </Row>
            </DataTableCell>
            <DataTableCell sx={fourthCellStyle}>
              {item.status === 'r' ? (
                <Text>-</Text>
              ) : (
                <Icon
                  name="down"
                  color={getRankStatusImage(item.status)}
                  sx={{
                    transform: [
                      { rotate: item.status === 'u' ? '180deg' : '0deg' },
                    ],
                  }}
                />
              )}
            </DataTableCell>
          </DataTableRow>
        ))}
    </DataTable>
  )
}

export default LeaderboardTable
