import HistoryListing from 'app/components/history/HistoryListing'
import useLocalization from 'app/provider/localization'
import {
  DateFilterOptions,
  ReportGameStatusOptions,
  ReportTransactionType,
} from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import { View } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { useLazyPlayerReportQuery } from 'services/playerApi'
import { ReportGameItem, ReportResult } from 'services/playerApi.type'
import FilterSelection from '../FilterSelection'
import GameHistoryItem from '../GameHistoryItem'

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

  const renderItem = ({ item }) => <GameHistoryItem item={item} />

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
        renderItem={renderItem}
      />
    </View>
  )
}

export default GameHistoryTab
