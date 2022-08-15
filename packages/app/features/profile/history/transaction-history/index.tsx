import GradientBox from 'app/components/GradientBox'
import HistoryListing from 'app/components/history/HistoryListing'
import { getStatusColor } from 'app/config/status'
import useLocalization from 'app/provider/localization'
import { toCurrency } from 'app/utils'
import {
  Currency,
  DateFilterOptions,
  ReportDepositStatusOptions,
  ReportTransactionType,
  ReportTransactionTypeOptions,
} from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import { Text, useDripsyTheme, View } from 'dripsy'
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
const CELL_GAME_WIDTH = 1

type HistoryListingDataType = Exclude<
  ReportResult['rows'],
  ReportGameItem[]
>[number]

const TransactionHistoryTab = () => {
  const { t } = useLocalization()
  const { theme } = useDripsyTheme()
  const [fetchData, result] = useLazyPlayerReportQuery()
  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.data?.currency as Currency

  const [selected, setSelected] = useState({
    selectedStatus: ReportDepositStatusOptions[0],
    selectedDate: DateFilterOptions[0],
    selectedTransType: ReportTransactionTypeOptions[0],
    startDate: dayjsTz().startOf('date').toDate(),
    endDate: dayjsTz().endOf('date').toDate(),
  })

  const [fetchParams, setFetchParams] = useState({
    status: selected.selectedStatus?.value,
    time_from: dayjsTz(selected.startDate).toISOString(),
    time_to: dayjsTz(selected.endDate).toISOString(),
    trans_type: selected.selectedTransType?.value,
  })

  useEffect(() => {
    setFetchParams({
      status: selected.selectedStatus?.value,
      time_from: dayjsTz(selected.startDate).toISOString(),
      time_to: dayjsTz(selected.endDate).toISOString(),
      trans_type: selected.selectedTransType?.value,
    })
  }, [selected])

  const columns = {
    date: {
      label: t('menu.tab.date'),
      columnWidth: CELL_DATE_WIDTH,
    },
    game: {
      label: t('menu.tab.game'),
      columnWidth: CELL_GAME_WIDTH,
    },
    amount: {
      label: t('common.amount'),
      columnWidth: CELL_AMOUNT_WIDTH,
    },
    label: {
      label: t('menu.tab.status'),
      columnWidth: CELL_STATUS_WIDTH,
    },
  }

  const tableHeader = {
    [ReportTransactionType.REWARDS]: [
      columns.date,
      columns.game,
      columns.amount,
    ],
  }[selected.selectedTransType?.value || ''] || [
    columns.date,
    columns.amount,
    columns.label,
  ]

  const keyExtractor = (item: HistoryListingDataType, index: number) => {
    let uid = ''

    if ('tx_code' in item) {
      uid = item.tx_code
    } else if ('gp' in item) {
      uid = item.gp
    } else if ('secure_id' in item) {
      uid = item.secure_id
    }

    return `${index} History ${uid}`
  }

  return (
    <View sx={{ flex: 1, bg: '$secondary' }}>
      <FilterSelection
        selected={selected}
        setSelected={setSelected}
        isTransaction
      />
      <HistoryListing<HistoryListingDataType, typeof fetchParams>
        fetchParams={fetchParams}
        trigger={fetchData}
        result={result}
        header={tableHeader}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => {
          return renderItem(
            { item },
            currency,
            theme,
            fetchParams.trans_type === ReportTransactionType.REWARDS
          )
        }}
      />
    </View>
  )
}

const renderItem = ({ item }, currency, theme, isReward = false) => {
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

        {isReward && (
          <View style={{ flex: CELL_STATUS_WIDTH }}>
            <Text
              sx={{
                textAlign: 'center',
              }}
            >
              {item.gp}
            </Text>
          </View>
        )}

        <View style={{ flex: CELL_AMOUNT_WIDTH }}>
          <Text sx={{ textAlign: 'center' }}>
            {toCurrency(item.amount, currency, {
              symbol: false,
              hideTruncatedThousand: false,
            })}
          </Text>
        </View>

        {!isReward && (
          <View style={{ flex: CELL_STATUS_WIDTH }}>
            <Text
              sx={{
                textAlign: 'center',
                color: getStatusColor(item.status, theme),
              }}
            >
              {item.status}
            </Text>
          </View>
        )}
      </View>
    </GradientBox>
  )
}

export default TransactionHistoryTab
