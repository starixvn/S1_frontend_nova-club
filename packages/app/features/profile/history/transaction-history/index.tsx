import HistoryEmpty from 'app/components/history/HistoryEmpty'
import HistoryListing from 'app/components/history/HistoryListing'
import useLocalization from 'app/provider/localization'
import {
  Currency,
  DateFilterOptions,
  ReportDepositStatusOptions,
  ReportTransactionType,
  ReportTransactionTypeOptions,
} from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import { useDripsyTheme, View } from 'dripsy'
import React, { useCallback, useEffect, useState } from 'react'
import {
  useLazyPlayerReportQuery,
  usePlayerProfileQuery,
} from 'services/playerApi'
import { ReportGameItem, ReportResult } from 'services/playerApi.type'
import DepositHistoryItem from '../DepositHistoryItem'
import FilterSelection from '../FilterSelection'
import RewardHistoryItem from '../RewardHistoryItem'
import TransferHistoryItem from '../TransferHistoryItem'
import WithdrawalHistoryItem from '../WithdrawalHistoryItem'

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
  const [fetchData, result] = useLazyPlayerReportQuery()
  const { data: playerData } = usePlayerProfileQuery()

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
    payment: {
      label: t('deposit.paymentMode'),
      columnWidth: CELL_DATE_WIDTH,
    },
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
    transferTo: {
      label: t('transfer.transferTo'),
      columnWidth: CELL_STATUS_WIDTH,
    },
  }

  const tableHeader = {
    [ReportTransactionType.DEPOSIT]: [
      columns.payment,
      columns.date,
      columns.label,
    ],
    [ReportTransactionType.REWARDS]: [
      columns.date,
      columns.game,
      columns.amount,
    ],
    [ReportTransactionType.TRANSFER]: [
      columns.date,
      columns.transferTo,
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

  const renderItem = useCallback(
    ({ item }) => {
      switch (selected.selectedTransType?.value) {
        case ReportTransactionType.DEPOSIT:
          return <DepositHistoryItem item={item} />
        case ReportTransactionType.WITHDRAWAL:
          return <WithdrawalHistoryItem item={item} />
        case ReportTransactionType.REWARDS:
          return <RewardHistoryItem item={item} />
        case ReportTransactionType.TRANSFER:
          return <TransferHistoryItem item={item} />

        default:
          return <WithdrawalHistoryItem item={item} />
      }
    },
    [selected.selectedTransType?.value]
  )

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
        // header={tableHeader}
        header={[
          { label: t(selected.selectedTransType?.label), columnWidth: 1 },
        ]}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  )
}

export default TransactionHistoryTab
