import TableListing, { LIMIT } from 'agent/components/DataTable/TableListing'
import {
  DateFilter,
  DateFilterOptions,
  TypeFilter,
} from 'agent/constant/select'
import useTableListing from 'agent/hooks/useTableListing'
import { useTransactionReportQuery } from 'agent/services/reportApi'
import { TransactionReportResult } from 'agent/services/reportApi.type'
import DataTable from 'app/components/dataTable/DataTable'
import { DateTimeField } from 'app/components/dataTable/DataTableCell'
import { useAgentLocalization } from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { toThousandSeparator } from 'app/utils'
import { Currency } from 'app/utils/constant'
import dayjs from 'dayjs'
import { View } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { useModal } from 'react-native-modalfy'
import AgentFloatingContent from '../floatingContent'

export type TransactionFilterOptions = {
  initial: boolean
  date: DateFilter | string | undefined
  startDate: Date | string
  endDate: Date | string
  type: TypeFilter[]
}

const TransactionScreen = () => {
  const { t } = useAgentLocalization()
  const lang = useAppSelector((state) => state.setting?.locale)
  const [offset, setOffset] = useState(0)
  const [filter, setFilter] = useState<TransactionFilterOptions>({
    initial: true,
    date: DateFilterOptions[4]?.value,
    startDate: dayjs().startOf('month').toDate(),
    endDate: dayjs().endOf('date').toDate(),
    type: [1, 2, 3, 4],
  })

  const { openModal } = useModal()

  const { reportData, totalData, isFetching, refetch } =
    useTransactionReportQuery(
      {
        start: offset * LIMIT,
        length: LIMIT,
        date_from: `${dayjs(filter.startDate).format(
          'YYYY-MM-DD HH:mm:ss Z'
        )} to ${dayjs(filter.endDate).format('YYYY-MM-DD HH:mm:ss Z')}`,
        currency: Currency.VND,
        transaction_type: filter.type.toString(),
      },
      {
        selectFromResult: ({ data, isFetching }) => ({
          isFetching,
          reportData: data?.result?.data,
          totalData: data?.result?.recordsFiltered,
        }),
      }
    )

  useEffect(() => {
    refetch()
  }, [lang])

  const { onLoadMore, onRefresh } = useTableListing({
    offset,
    setOffset,
    LIMIT,
    totalData,
    isFetching,
    refetch,
  })

  const onRenderHeader = () => (
    <DataTable.Header>
      <DataTable.Title bordered center>
        {t('common.date')}
      </DataTable.Title>
      <DataTable.Title center bordered>
        {t('report.transactionType')}
      </DataTable.Title>
      <DataTable.Title center>{t('common.amount')}</DataTable.Title>
    </DataTable.Header>
  )

  const onRenderItem = ({
    item,
    index,
  }: {
    item: TransactionReportResult
    index: number
  }) => (
    <DataTable.Row size="big">
      <DataTable.Cell bordered center>
        <DateTimeField dateTime={item.created_date} />
      </DataTable.Cell>
      <DataTable.Cell bordered textStyle={{ px: 12 }}>
        {item.transaction_type}
      </DataTable.Cell>
      <DataTable.Cell
        center
        textStyle={{
          color: item.actual_amount.startsWith('-') ? '$errorAgent' : 'black',
        }}
      >
        {toThousandSeparator(item.actual_amount)}
      </DataTable.Cell>
    </DataTable.Row>
  )

  const handleNavigate = () => {
    openModal('FilterTransactionReportModal', {
      filterOptions: filter,
      onConfirm: (value: TransactionFilterOptions) => {
        setFilter({
          initial: value.initial,
          date: value.date,
          endDate: value.endDate,
          startDate: value.startDate,
          type: value.type,
        })
        setOffset(0)
      },
    })
  }

  return (
    <View sx={{ flex: 1 }}>
      <TableListing
        title={t('report.transactionReport')}
        // refreshProps={{ isHyperlink: true }}
        data={reportData}
        renderHeader={onRenderHeader}
        renderItem={onRenderItem}
        keyExtractor={(item, index) => `${index} Table ${item.created_date}`}
        onLoadMore={onLoadMore}
        onRefresh={onRefresh}
        isFetching={isFetching}
        containerStyle={{ flex: 1 }}
      />

      <AgentFloatingContent onPress={handleNavigate} />
    </View>
  )
}

export default TransactionScreen
