import { Text, useDripsyTheme, View } from 'dripsy'
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
  Currency,
  DateFilter,
  DateFilterOptions,
  ReportDepositStatus,
  ReportDepositStatusOptions,
  ReportTransactionType,
  ReportTransactionTypeOptions,
} from 'app/utils/constant'
import dayjs from 'dayjs'
import { ReportTransactionItem } from 'services/playerApi.type'
import { toCurrency } from 'app/utils'
import { getStatusColor } from 'app/config/status'

const CELL_DATE_WIDTH = 1
const CELL_AMOUNT_WIDTH = 1
const CELL_STATUS_WIDTH = 1

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
    startDate: dayjs().startOf('date').toDate(),
    endDate: dayjs().endOf('date').toDate(),
  })

  const [fetchParams, setFetchParams] = useState({
    status: selected.selectedStatus?.value,
    time_from: dayjs(selected.startDate).format('YYYY-MM-DD HH:mm:ss'),
    time_to: dayjs(selected.endDate).format('YYYY-MM-DD HH:mm:ss'),
    trans_type: selected.selectedTransType?.value,
  })

  useEffect(() => {
    setFetchParams({
      status: selected.selectedStatus?.value,
      time_from: dayjs(selected.startDate).format('YYYY-MM-DD HH:mm:ss'),
      time_to: dayjs(selected.endDate).format('YYYY-MM-DD HH:mm:ss'),
      trans_type: selected.selectedTransType?.value,
    })
  }, [selected])

  const tableHeader = [
    {
      label: t('menu.tab.date'),
      columnWidth: CELL_DATE_WIDTH,
    },
    {
      label: t('common.amount'),
      columnWidth: CELL_AMOUNT_WIDTH,
    },
    {
      label: t('menu.tab.status'),
      columnWidth: CELL_STATUS_WIDTH,
    },
  ]

  return (
    <View sx={{ flex: 1, bg: '$secondary' }}>
      <FilterSelection
        selected={selected}
        setSelected={setSelected}
        isTransaction
      />
      <HistoryListing
        fetchParams={fetchParams}
        trigger={fetchData}
        result={result}
        header={
          selected.selectedTransType?.value === ReportTransactionType.REWARDS
            ? tableHeader.slice(0, -1)
            : tableHeader
        }
        keyExtractor={(item, index) => `${index} History ${item.name}`}
        renderItem={({ item }) =>
          renderItem(
            { item },
            currency,
            theme,
            selected.selectedTransType?.value === ReportTransactionType.REWARDS
          )
        }
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
