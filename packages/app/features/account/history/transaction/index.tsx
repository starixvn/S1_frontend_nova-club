import HistoryListing from 'app/components/history/HistoryListing'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import {
  DateFilterOptions,
  ReportDepositStatusOptions,
  ReportTransactionType,
  ReportTransactionTypeOptions,
} from 'utils/constant'
import dayjsTz from 'app/utils/dayjs'
import isDesktop from 'app/utils/isDesktop'
import dayjs from 'dayjs'
import { Text, View, useResponsiveValue } from 'dripsy'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useLazyPlayerReportQuery } from 'services/playerApi'
import { ReportGameItem, ReportResult } from 'services/playerApi.type'
import AdjustmentHistoryItem from '../AdjustmentHistoryItem'
import BonusHistoryItem from '../BonusHistoryItem'
import DepositHistoryItem from '../DepositHistoryItem'
import FilterSelection from '../FilterSelection'
import RebateHistoryItem from '../RebateHistoryItem'
import ReferralHistoryItem from '../ReferralHistoryItem'
import TransferHistoryItem from '../TransferHistoryItem'
import WithdrawalHistoryItem from '../WithdrawalHistoryItem'
import DesktopAdjustmentHistoryItem, {
  AdjustmentTableHeader,
} from '../dekstop/DesktopAdjustmentHistoryItem'
import DesktopBonusHistoryItem, {
  BonusTableHeader,
} from '../dekstop/DesktopBonusHistoryItem'
import DesktopDepositHistoryItem, {
  DepositTableHeader,
} from '../dekstop/DesktopDepositHistoryItem'
import DesktopRebateHistoryItem, {
  RebateTableHeader,
} from '../dekstop/DesktopRebateHistoryItem'
import DesktopReferralHistoryItem, {
  ReferralTableHeader,
} from '../dekstop/DesktopReferralHistoryItem'
import DesktopTransferHistoryItem, {
  TransferTableHeader,
} from '../dekstop/DesktopTransferHistoryItem'
import DesktopWithdrawalHistoryItem, {
  WithdrawalTableHeader,
} from '../dekstop/DesktopWithdrawalHistoryItem'
import useIsDesktop from 'app/hooks/useIsDesktop'

type HistoryListingDataType = Exclude<
  ReportResult['rows'],
  ReportGameItem[]
>[number]

const TransactionHistory = () => {
  const { t } = useLocalization()
  const desktop = useIsDesktop()
  const responsiveWidth = useResponsiveValue(['100%', '100%', '100%', '90%'])

  const [fetchData, result] = useLazyPlayerReportQuery()
  const updatedSlipId = useAppSelector((state) => state.deposit.updatedSlipId)

  const [selected, setSelected] = useState({
    selectedStatus: ReportDepositStatusOptions[0]?.value,
    selectedDate: DateFilterOptions[0]?.value,
    selectedTransType: ReportTransactionTypeOptions[0]?.value,
    startDate: dayjsTz(undefined, 'Asia/Shanghai').startOf('date').toDate(),
    endDate: dayjsTz(undefined, 'Asia/Shanghai').endOf('date').toDate(),
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

  useEffect(() => {
    setFetchParams({
      status: selected.selectedStatus,
      time_from: dayjsTz(selected.startDate).toISOString(),
      time_to: dayjsTz(selected.endDate).toISOString(),
      trans_type: selected.selectedTransType,
      is_reward_group_by:
        selected.selectedTransType === ReportTransactionType.REBATE
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

  const getTableHeader = () => {
    const headerLabel =
      ReportTransactionTypeOptions.find(
        (el) => el.value === selected.selectedTransType
      )?.label || 'N/A'

    return [
      {
        label: t(headerLabel),
        textStyle: { flex: 1, textAlign: 'left', px: '$3' },
      },
    ]
  }

  const renderHeader = useMemo(() => {
    switch (selected.selectedTransType) {
      case ReportTransactionType.DEPOSIT:
        return desktop ? DepositTableHeader : getTableHeader()
      case ReportTransactionType.WITHDRAWAL:
        return desktop ? WithdrawalTableHeader : getTableHeader()
      case ReportTransactionType.REBATE:
        return desktop ? RebateTableHeader : getTableHeader()
      case ReportTransactionType.REFERRAL:
        return desktop ? ReferralTableHeader : getTableHeader()
      case ReportTransactionType.TRANSFER:
        return desktop ? TransferTableHeader : getTableHeader()
      case ReportTransactionType.ADJUSTMENT:
        return desktop ? AdjustmentTableHeader : getTableHeader()
      case ReportTransactionType.BONUS:
        return desktop ? BonusTableHeader : getTableHeader()
      default:
        return desktop ? WithdrawalTableHeader : getTableHeader()
    }
  }, [selected.selectedTransType])

  const renderItem = useCallback(
    ({ item, index }) => {
      switch (selected.selectedTransType) {
        case ReportTransactionType.DEPOSIT:
          return desktop ? (
            <DesktopDepositHistoryItem key={index} item={item} index={index} />
          ) : (
            <DepositHistoryItem item={item} />
          )

        case ReportTransactionType.WITHDRAWAL:
          return desktop ? (
            <DesktopWithdrawalHistoryItem item={item} index={index} />
          ) : (
            <WithdrawalHistoryItem item={item} />
          )

        case ReportTransactionType.REBATE:
          return desktop ? (
            <DesktopRebateHistoryItem item={item} index={index} />
          ) : (
            <RebateHistoryItem item={item} />
          )
        case ReportTransactionType.REFERRAL:
          return desktop ? (
            <DesktopReferralHistoryItem item={item} index={index} />
          ) : (
            <ReferralHistoryItem item={item} />
          )
        case ReportTransactionType.TRANSFER:
          return desktop ? (
            <DesktopTransferHistoryItem item={item} index={index} />
          ) : (
            <TransferHistoryItem item={item} />
          )
        case ReportTransactionType.ADJUSTMENT:
          return desktop ? (
            <DesktopAdjustmentHistoryItem item={item} index={index} />
          ) : (
            <AdjustmentHistoryItem item={item} />
          )
        case ReportTransactionType.BONUS:
          return desktop ? (
            <DesktopBonusHistoryItem item={item} index={index} />
          ) : (
            <BonusHistoryItem item={item} />
          )
        default:
          return <WithdrawalHistoryItem item={item} />
      }
    },
    [selected.selectedTransType]
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
      <FilterSelection
        selected={selected}
        setSelected={setSelected}
        isTransaction
      />
      {desktop && (
        <Text sx={{ py: '$3', fontWeight: 'bold' }}>{`${
          getTableHeader()[0]?.label
        } ${t('common.history')} :`}</Text>
      )}
      <HistoryListing<HistoryListingDataType, typeof fetchParams>
        fetchParams={fetchParams}
        trigger={fetchData}
        result={result}
        keyExtractor={keyExtractor}
        header={renderHeader}
        renderItem={renderItem}
        updatedSlipId={updatedSlipId}
      />
    </View>
  )
}

export default TransactionHistory
