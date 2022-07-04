import { Text, View } from 'dripsy'
import React, { useEffect, useState } from 'react'
import HistoryListing from 'app/components/history/HistoryListing'
import { useLazyPlayerReportQuery } from 'services/playerApi'
import useLocalization from 'app/provider/localization'
import DateTimeCell from '../DateTimeCell'
import GradientBox from 'app/components/GradientBox'
import FilterSelection, { ProviderList } from '../FilterSelection'
import {
  DateFilter,
  GameProvider,
  GameStatusMapper,
  ReportGameStatus,
  ReportDepositStatus,
  ReportTransactionType,
  ReportGameStatusOptions,
  DateFilterOptions,
} from 'app/utils/constant'
import dayjs from 'dayjs'
import { ReportGameItem } from 'services/playerApi.type'

const CELL_DATE_WIDTH = 1
const CELL_AMOUNT_WIDTH = 1
const CELL_STATUS_WIDTH = 1

const GameHistoryTab = () => {
  const { t } = useLocalization()
  const [fetchData, result] = useLazyPlayerReportQuery()

  const [selected, setSelected] = useState({
    selectedGameStatus: ReportGameStatusOptions[0],
    selectedDate: DateFilterOptions[0],
    selectedGame: ProviderList[0],
    startDate: dayjs().startOf('month').toDate(),
    endDate: dayjs().endOf('date').toDate(),
  })

  const [fetchParams, setFetchParams] = useState({
    status: selected.selectedGameStatus?.value,
    time_from: dayjs(selected.startDate).format('YYYY-MM-DD HH:mm:ss'),
    time_to: dayjs(selected.endDate).format('YYYY-MM-DD HH:mm:ss'),
    trans_type: ReportTransactionType.GAME,
  })

  useEffect(() => {
    setFetchParams({
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
        renderItem={(item) => renderItem(item, t)}
      />
    </View>
  )
}

const renderItem = ({ item }, t: { item: ReportGameItem }) => {
  return (
    <GradientBox>
      <View
        sx={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', p: '$3' }}
      >
        <View style={{ flex: CELL_DATE_WIDTH, alignSelf: 'stretch' }}>
          <DateTimeCell date={item.date} />
        </View>
        <View style={{ flex: CELL_AMOUNT_WIDTH, alignSelf: 'stretch' }}>
          <Text sx={{ textAlign: 'center' }}>{item.game_provider_code}</Text>
        </View>
        <View style={{ flex: CELL_STATUS_WIDTH, alignSelf: 'stretch' }}>
          <Text sx={{ textAlign: 'center' }}>{item.bet}</Text>
          <Text
            sx={{
              textAlign: 'center',
              color: item.winloss.includes('-') ? '#BE0A16' : '#00FF19',
            }}
          >
            {item.winloss.includes('-') ? item.winloss : `+${item.winloss}`}
          </Text>
        </View>
      </View>
    </GradientBox>
  )
}
export default GameHistoryTab
