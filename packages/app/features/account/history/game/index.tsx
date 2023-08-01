import HistoryListing from 'app/components/history/HistoryListing'
import useLocalization from 'app/provider/localization'
import {
  DateFilterOptions,
  ReportGameStatusOptions,
  ReportTransactionType,
} from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import isDesktop from 'app/utils/isDesktop'
import { View, useResponsiveValue } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { useLazyPlayerReportQuery } from 'services/playerApi'
import { ReportGameItem, ReportResult } from 'services/playerApi.type'
import FilterSelection from '../FilterSelection'
import GameHistoryItem from '../GameHistoryItem'
import DesktopGameHistoryItem, {
  GameTableHeader,
} from '../dekstop/DesktopGameHistoryItem'

type HistoryListingDataType = Extract<
  ReportResult['rows'],
  ReportGameItem[]
>[number]

const GameHistory = () => {
  const { t } = useLocalization()
  const desktop = isDesktop()
  const responsiveWidth = useResponsiveValue(['100%', '100%', '100%', '90%'])

  const [fetchData, result] = useLazyPlayerReportQuery()

  const [selected, setSelected] = useState({
    selectedGame: ReportGameStatusOptions[0]?.value,
    selectedDate: DateFilterOptions[0]?.value,
    selectedGameStatus: ReportGameStatusOptions[0]?.value,
    startDate: dayjsTz().startOf('date').toDate(),
    endDate: dayjsTz().endOf('date').toDate(),
  })

  const [fetchParams, setFetchParams] = useState({
    game_provider_code: selected.selectedGame,
    status: selected.selectedGameStatus,
    time_from: dayjsTz(selected.startDate).toISOString(),
    time_to: dayjsTz(selected.endDate).toISOString(),
    trans_type: ReportTransactionType.GAME,
  })

  useEffect(() => {
    setFetchParams({
      game_provider_code: selected.selectedGame,
      status: selected.selectedGameStatus,
      time_from: dayjsTz(selected.startDate).toISOString(),
      time_to: dayjsTz(selected.endDate).toISOString(),
      trans_type: ReportTransactionType.GAME,
    })
  }, [selected])

  const tableHeader = desktop ? GameTableHeader : GameTableHeader.slice(1)
  const renderItem = ({ item, index }) =>
    desktop ? (
      <DesktopGameHistoryItem item={item} index={index} />
    ) : (
      <GameHistoryItem item={item} />
    )

  return (
    <View
      sx={{
        flex: 300,
        bg: '$secondary',
        width: responsiveWidth,
        mx: 'auto',
        py: '$pagePadding',
      }}
    >
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

export default GameHistory
