import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Icon from 'app/components/Icon'
import DataTable from 'app/components/dataTable/DataTable'
import DataTableCell from 'app/components/dataTable/DataTableCell'
import DataTableHeader from 'app/components/dataTable/DataTableHeader'
import DataTableRow from 'app/components/dataTable/DataTableRow'
import DataTableTitle from 'app/components/dataTable/DataTableTitle'
import { getRankStatusImage } from 'app/config/leaderboard'
import useFocusedSelector from 'app/hooks/useFocusedSelector'
import useLocalization from 'app/provider/localization'
import { Row, Text } from 'dripsy'
import React from 'react'
import { useGetLeaderboardQuery } from 'services/contentApi'
import { SolitoImage } from 'solito/image'

const LeaderboardTable = ({ maxRow = 10 }: { maxRow?: number }) => {
  const { t } = useLocalization()
  const currency = useFocusedSelector((s) => s.setting.currency)
  const { data } = useGetLeaderboardQuery(currency)

  const leaderboardData = maxRow ? data?.slice(0, maxRow) : data

  const firstCellStyle = { flex: 2 / 12 }
  const secondCellStyle = { flex: 3 / 12 }
  const thirdCellStyle = { flex: 4 / 12 }
  const fourthCellStyle = { flex: 2 / 12 }

  return (
    <DataTable>
      <DataTableHeader sx={{}}>
        <DataTableTitle sx={firstCellStyle} numberOfLines={2}>
          {t('leaderboard.rank').toUpperCase()}
        </DataTableTitle>
        <DataTableTitle sx={secondCellStyle} numberOfLines={2}>
          {t('common.playerName').toUpperCase()}
        </DataTableTitle>
        <DataTableTitle sx={thirdCellStyle} numberOfLines={2}>
          {t('common.amount').toUpperCase()}
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
                src={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/leaderboard/${item.rank}.png`}
                fill
                alt={`${item.rank}}`}
              />
            </DataTableCell>
            <DataTableCell
              sx={secondCellStyle}
              textStyle={{ fontSize: [12, 12, 13, 14], flex: 1 }}
            >
              {item.username}
            </DataTableCell>
            <DataTableCell center={false} sx={thirdCellStyle}>
              <Row sx={{ alignItems: 'center', maxWidth: '80%' }}>
                <SolitoImage
                  src={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/leaderboard/coin.png`}
                  height={18}
                  width={18}
                  alt={`${index} coin`}
                  style={{ marginRight: 12 }}
                />
                <Text
                  sx={{
                    fontSize: [12, 12, 13, 14],
                    maxWidth: '100%',
                    // bg: 'red',
                  }}
                >
                  {item.points}
                </Text>
              </Row>
            </DataTableCell>
            <DataTableCell sx={fourthCellStyle}>
              {item.status === 'r' ? (
                <Text sx={{ flex: 1, textAlign: 'center' }}>-</Text>
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
