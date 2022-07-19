import { Text, View } from 'dripsy'
import React, { useEffect, useState } from 'react'
import HistoryListing from 'app/components/history/HistoryListing'
import {
  useLazyPlayerReportQuery,
  usePlayerProfileQuery,
} from 'services/playerApi'
import useLocalization from 'app/provider/localization'
import DateTimeCell from '../DateTimeCell'
import GradientBox from 'app/components/GradientBox'
import FilterSelection from '../FilterSelection'
import {
  ReportTransactionType,
  ReportGameStatusOptions,
  DateFilterOptions,
  Currency,
} from 'app/utils/constant'
import dayjs from 'dayjs'
import { ReportGameItem } from 'services/playerApi.type'
import { toCurrency } from 'app/utils'

const CELL_DATE_WIDTH = 1
const CELL_AMOUNT_WIDTH = 1
const CELL_STATUS_WIDTH = 1

const GameHistoryTab = () => {
  const { t } = useLocalization()
  const [fetchData, result] = useLazyPlayerReportQuery()
  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.data?.currency as Currency

  const [selected, setSelected] = useState({
    selectedGame: ReportGameStatusOptions[0],
    selectedDate: DateFilterOptions[0],
    selectedGameStatus: ReportGameStatusOptions[0],
    startDate: dayjs().startOf('month').toDate(),
    endDate: dayjs().endOf('date').toDate(),
  })

  const [fetchParams, setFetchParams] = useState({
    game_provider_code: selected.selectedGame?.value,
    status: selected.selectedGameStatus?.value,
    time_from: dayjs(selected.startDate).format('YYYY-MM-DD HH:mm:ss'),
    time_to: dayjs(selected.endDate).format('YYYY-MM-DD HH:mm:ss'),
    trans_type: ReportTransactionType.GAME,
  })

  useEffect(() => {
    setFetchParams({
      game_provider_code: selected.selectedGame?.value,
      status: selected.selectedGameStatus?.value,
      time_from: dayjs(selected.startDate).format('YYYY-MM-DD HH:mm:ss'),
      time_to: dayjs(selected.endDate).format('YYYY-MM-DD HH:mm:ss'),
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
      <HistoryListing
        fetchParams={fetchParams}
        trigger={fetchData}
        result={result}
        header={tableHeader}
        keyExtractor={(item, index) => `${index} History ${item.name}`}
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
          <Text sx={{ textAlign: 'center' }}>{item.bet}</Text>
          <Text
            sx={{
              textAlign: 'center',
              color: item.winloss.includes('-') ? '#BE0A16' : '#00FF19',
            }}
          >
            {item.winloss.includes('-')
              ? toCurrency(item.winloss, currency, {
                  symbol: false,
                  hideTruncatedThousand: false,
                })
              : `+${toCurrency(item.winloss, currency, {
                  symbol: false,
                  hideTruncatedThousand: false,
                })}`}
          </Text>
        </View>
      </View>
    </GradientBox>
  )
}
export default GameHistoryTab
