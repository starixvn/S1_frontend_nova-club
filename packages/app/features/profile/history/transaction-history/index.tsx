import HistoryListing from 'app/components/history/HistoryListing'
import useLocalization from 'app/provider/localization'
import {
  DateFilterOptions,
  ReportDepositStatusOptions,
  ReportTransactionType,
  ReportTransactionTypeOptions,
} from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import dayjs from 'dayjs'
import { View } from 'dripsy'
import React, { useCallback, useEffect, useState } from 'react'
import {
  useLazyPlayerReportQuery,
  usePlayerProfileQuery,
} from 'services/playerApi'
import { ReportGameItem, ReportResult } from 'services/playerApi.type'
import DepositHistoryItem from '../DepositHistoryItem'
import FilterSelection from '../FilterSelection'
import ReferralHistoryItem from '../ReferralHistoryItem'
import RewardHistoryItem from '../RewardHistoryItem'
import TransferHistoryItem from '../TransferHistoryItem'
import WithdrawalHistoryItem from '../WithdrawalHistoryItem'

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
    startDate: dayjs().startOf('date').toDate(),
    endDate: dayjs().endOf('date').toDate(),
  })

  const [fetchParams, setFetchParams] = useState({
    status: selected.selectedStatus?.value,
    time_from: dayjsTz(selected.startDate).toISOString(),
    time_to: dayjsTz(selected.endDate).toISOString(),
    trans_type: selected.selectedTransType?.value,
    is_reward_group_by: false,
  })

  useEffect(() => {
    setFetchParams({
      status: selected.selectedStatus?.value,
      time_from: dayjsTz(selected.startDate).toISOString(),
      time_to: dayjsTz(selected.endDate).toISOString(),
      trans_type: selected.selectedTransType?.value,
      is_reward_group_by:
        selected.selectedTransType?.value === ReportTransactionType.REWARDS
          ? true
          : false,
    })
  }, [selected])

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
        case ReportTransactionType.REFERRAL:
          return <ReferralHistoryItem item={item} />
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
