import GradientBox from 'app/components/GradientBox'
import HistoryListing from 'app/components/history/HistoryListing'
import useLocalization from 'app/provider/localization'
import { toThousandSeparator } from 'app/utils'
import {
  Currency,
  DateFilterOptions,
  ReportGameStatusOptions,
  ReportTransactionType,
} from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import { Text, View } from 'dripsy'
import React, { useEffect, useState } from 'react'
import {
  useLazyPlayerReportQuery,
  usePlayerProfileQuery,
} from 'services/playerApi'
import { ReportGameItem, ReportResult } from 'services/playerApi.type'
import DateTimeCell from '../DateTimeCell'
import FilterSelection from '../FilterSelection'

const CELL_DATE_WIDTH = 1
const CELL_AMOUNT_WIDTH = 1
const CELL_STATUS_WIDTH = 1

type HistoryListingDataType = Extract<
  ReportResult['rows'],
  ReportGameItem[]
>[number]

const GameHistoryTab = () => {
  const { t } = useLocalization()
  const [fetchData, result] = useLazyPlayerReportQuery()
  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.data?.currency as Currency

  const [selected, setSelected] = useState({
    selectedGame: ReportGameStatusOptions[0],
    selectedDate: DateFilterOptions[0],
    selectedGameStatus: ReportGameStatusOptions[0],
    startDate: dayjsTz().startOf('date').toDate(),
    endDate: dayjsTz().endOf('date').toDate(),
  })

  const [fetchParams, setFetchParams] = useState({
    game_provider_code: selected.selectedGame?.value,
    status: selected.selectedGameStatus?.value,
    time_from: dayjsTz(selected.startDate).toISOString(),
    time_to: dayjsTz(selected.endDate).toISOString(),
    trans_type: ReportTransactionType.GAME,
  })

  useEffect(() => {
    setFetchParams({
      game_provider_code: selected.selectedGame?.value,
      status: selected.selectedGameStatus?.value,
      time_from: dayjsTz(selected.startDate).toISOString(),
      time_to: dayjsTz(selected.endDate).toISOString(),
      trans_type: ReportTransactionType.GAME,
    })
  }, [selected])

  const tableHeader = [
    {
      label: t('menu.tab.date'),
      columnWidth: CELL_DATE_WIDTH,
    },
    {
      label: t('menu.tab.game'),
      columnWidth: CELL_AMOUNT_WIDTH,
    },
    {
      label: t('menu.tab.win/loss'),
      columnWidth: CELL_STATUS_WIDTH,
    },
  ]

  return (
    <View sx={{ flex: 1, bg: '$secondary' }}>
      <FilterSelection selected={selected} setSelected={setSelected} />
      <HistoryListing<HistoryListingDataType, typeof fetchParams>
        fetchParams={fetchParams}
        trigger={fetchData}
        result={result}
        header={tableHeader}
        keyExtractor={(item, index) =>
          `${index} History ${item.game_provider_code}`
        }
        renderItem={({ item }) => renderItem({ item }, currency)}
      />
    </View>
  )
}

const renderItem = ({ item }, currency) => {
  return (
    <GradientBox>
      <View
        sx={{
          flex: 1,
          alignSelf: 'stretch',
          flexDirection: 'row',
          p: '$3',
          alignItems: 'center',
        }}
      >
        <View style={{ flex: CELL_DATE_WIDTH }}>
          <DateTimeCell date={item.date} />
        </View>
        <View style={{ flex: CELL_AMOUNT_WIDTH }}>
          <Text sx={{ textAlign: 'center' }}>{item.game_provider_code}</Text>
        </View>
        <View style={{ flex: CELL_STATUS_WIDTH }}>
          <Text sx={{ textAlign: 'center' }}>
            {toThousandSeparator(item.bet)}
          </Text>
          <Text
            sx={{
              textAlign: 'center',
              color: item.winloss.includes('-') ? '#BE0A16' : '#00FF19',
            }}
          >
            {item.winloss.includes('-')
              ? toThousandSeparator(item.winloss)
              : `+${toThousandSeparator(item.winloss)}`}
            {/* {item.winloss.includes('-')
              ? toCurrency(item.winloss, currency, {
                  symbol: false,
                  hideTruncatedThousand: false,
                })
              : `+${toCurrency(item.winloss, currency, {
                  symbol: false,
                  hideTruncatedThousand: false,
                })}`} */}
          </Text>
        </View>
      </View>
    </GradientBox>
  )
}
export default GameHistoryTab
