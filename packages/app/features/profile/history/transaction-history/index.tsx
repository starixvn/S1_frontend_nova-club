import { Text, View } from 'dripsy'
import React, { useEffect, useState } from 'react'
import HistoryListing from 'app/components/history/HistoryListing'
import { useLazyPlayerReportQuery } from 'services/playerApi'
import useLocalization from 'app/provider/localization'
import DateTimeCell from '../DateTimeCell'
import GradientBox from 'app/components/GradientBox'
import FilterSelection from '../FilterSelection'
import {
  DateFilter,
  ReportStatusDeposit,
  ReportTransactionType,
} from 'app/utils/constant'
import dayjs from 'dayjs'

const CELL_DATE_WIDTH = 0.4
const CELL_AMOUNT_WIDTH = 0.3
const CELL_STATUS_WIDTH = 0.3

const TransactionHistoryTab = () => {
  const { t } = useLocalization()
  const [fetchData, result] = useLazyPlayerReportQuery()

  const [selected, setSelected] = useState({
    selectedStatus: ReportStatusDeposit.ALL,
    selectedDate: DateFilter.TODAY,
    selectedTransType: ReportTransactionType.DEPOSIT,
    startDate: dayjs().startOf('date').toDate(),
    endDate: dayjs().endOf('date').toDate(),
  })

  const [fetchParams, setFetchParams] = useState({
    status: selected.selectedStatus,
    time_from: dayjs(selected.startDate).format('YYYY-MM-DD HH:mm:ss'),
    time_to: dayjs(selected.endDate).format('YYYY-MM-DD HH:mm:ss'),
    trans_type: selected.selectedTransType,
  })

  useEffect(() => {
    setFetchParams({
      status: selected.selectedStatus,
      time_from: dayjs(selected.startDate).format('YYYY-MM-DD HH:mm:ss'),
      time_to: dayjs(selected.endDate).format('YYYY-MM-DD HH:mm:ss'),
      trans_type: selected.selectedTransType,
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
    // <PageWithBackHeader header={{ title: 'menu.history' }}>
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
        header={tableHeader}
        keyExtractor={(item, index) => `${index} History ${item.name}`}
        renderItem={renderItem}
      />
    </View>
    // </PageWithBackHeader>
  )
}

const renderItem = ({ item }) => {
  const getStatusColor = (value: string) => {
    switch (value.toLowerCase()) {
      case ReportStatusDeposit.PENDING.toLowerCase():
        return '#13A9C8'
      default:
        return '#FFF'
    }
  }

  return (
    <GradientBox>
      <View
        sx={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', p: '$3' }}
      >
        <View style={{ flex: CELL_DATE_WIDTH, alignSelf: 'stretch' }}>
          <DateTimeCell date={item.date} />
        </View>
        <View style={{ flex: CELL_AMOUNT_WIDTH, alignSelf: 'stretch' }}>
          <Text sx={{ textAlign: 'center' }}>{item.amount}</Text>
        </View>
        <View style={{ flex: CELL_STATUS_WIDTH, alignSelf: 'stretch' }}>
          <Text
            sx={{ textAlign: 'center', color: getStatusColor(item.status) }}
          >
            {item.status}
          </Text>
        </View>
      </View>
    </GradientBox>
  )
}

export default TransactionHistoryTab
