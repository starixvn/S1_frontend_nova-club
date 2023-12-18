import HistoryListing from 'app/components/history/HistoryListing'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { ReportGameStatusOptions } from 'app/utils/constant'
import dayjs from 'dayjs'
import { View, useResponsiveValue } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { useLazyPlayerReportQuery } from 'services/playerApi'
import { ReportGameItem, ReportResult } from 'services/playerApi.type'
import { DateFilterOptions, ReportTransactionType } from 'utils/constant'
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
  const desktop = useIsDesktop()
  const responsiveWidth = useResponsiveValue(['100%', '100%', '100%', '90%'])

  const [fetchData, result] = useLazyPlayerReportQuery()

  const [selected, setSelected] = useState({
    selectedGame: ReportGameStatusOptions[0]?.value,
    selectedDate: DateFilterOptions[0]?.value,
    selectedGameStatus: ReportGameStatusOptions[0]?.value,
    startDate: dayjs().startOf('date').toDate(),
    endDate: dayjs().endOf('date').toDate(),
  })

  const [fetchParams, setFetchParams] = useState({
    game_provider_code: selected.selectedGame,
    status: selected.selectedGameStatus,
    time_from: selected.startDate.toISOString(),
    time_to: selected.endDate.toISOString(),
    trans_type: ReportTransactionType.GAME,
  })

  useEffect(() => {
    setFetchParams({
      game_provider_code: selected.selectedGame,
      status: selected.selectedGameStatus,
      time_from: selected.startDate.toISOString(),
      time_to: selected.endDate.toISOString(),
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
