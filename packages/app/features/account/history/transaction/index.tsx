import HistoryListing from 'app/components/history/HistoryListing'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import {
  DateFilterOptions,
  ReportDepositStatusOptions,
  ReportTransactionType,
  ReportTransactionTypeOptions,
} from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import isDesktop from 'app/utils/isDesktop'
import dayjs from 'dayjs'
import { View, useResponsiveValue } from 'dripsy'
import React, { useCallback, useEffect, useState } from 'react'
import { useLazyPlayerReportQuery } from 'services/playerApi'
import { ReportGameItem, ReportResult } from 'services/playerApi.type'
import BonusHistoryItem from '../BonusHistoryItem'
import DepositHistoryItem from '../DepositHistoryItem'
import FilterSelection from '../FilterSelection'
import ReferralHistoryItem from '../ReferralHistoryItem'
import RewardHistoryItem from '../RewardHistoryItem'
import TransferHistoryItem from '../TransferHistoryItem'
import WithdrawalHistoryItem from '../WithdrawalHistoryItem'
import DesktopDepositHistoryItem from '../dekstop/DesktopDepositHistoryItem'

type HistoryListingDataType = Exclude<
  ReportResult['rows'],
  ReportGameItem[]
>[number]

const TransactionHistory = () => {
  const { t } = useLocalization()
  const desktop = isDesktop()
  const responsiveWidth = useResponsiveValue(['100%', '100%', '100%', '90%'])

  const [fetchData, result] = useLazyPlayerReportQuery()
  const updatedSlipId = useAppSelector((state) => state.deposit.updatedSlipId)

  const [selected, setSelected] = useState({
    selectedStatus: ReportDepositStatusOptions[0]?.value,
    selectedDate: DateFilterOptions[0],
    selectedTransType: ReportTransactionTypeOptions[0]?.value,
    startDate: dayjs().startOf('date').toDate(),
    endDate: dayjs().endOf('date').toDate(),
    time_from: '',
    time_to: '',
  })

  const [fetchParams, setFetchParams] = useState({
    status: selected.selectedStatus,
    time_from: dayjsTz(selected.startDate).toISOString(),
    time_to: dayjsTz(selected.endDate).toISOString(),
    trans_type: selected.selectedTransType,
    is_reward_group_by: false,
  })

  const headerLabel =
    ReportTransactionTypeOptions.find(
      (el) => el.value === selected.selectedTransType
    )?.label || 'N/A'

  useEffect(() => {
    setFetchParams({
      status: selected.selectedStatus,
      time_from: dayjsTz(selected.startDate).toISOString(),
      time_to: dayjsTz(selected.endDate).toISOString(),
      trans_type: selected.selectedTransType,
      is_reward_group_by:
        selected.selectedTransType === ReportTransactionType.REWARDS
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
    ({ item, index }) => {
      switch (selected.selectedTransType) {
        case ReportTransactionType.DEPOSIT:
          return desktop ? (
            <DesktopDepositHistoryItem item={item} index={index} />
          ) : (
            <DepositHistoryItem item={item} index={index} />
          )
        case ReportTransactionType.WITHDRAWAL:
          return <WithdrawalHistoryItem item={item} />
        case ReportTransactionType.REWARDS:
          return <RewardHistoryItem item={item} />
        case ReportTransactionType.REFERRAL:
          return <ReferralHistoryItem item={item} />
        case ReportTransactionType.TRANSFER:
          return <TransferHistoryItem item={item} />
        case ReportTransactionType.BONUS:
          return <BonusHistoryItem item={item} />
        default:
          return <WithdrawalHistoryItem item={item} />
      }
    },
    [selected.selectedTransType]
  )
  return (
    <View
      sx={{ flex: 1, bg: '$secondary', width: responsiveWidth, mx: 'auto' }}
    >
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
          {
            label: t(headerLabel),
            columnWidth: 1,
          },
        ]}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        updatedSlipId={updatedSlipId}
      />
    </View>
  )
}

export default TransactionHistory
