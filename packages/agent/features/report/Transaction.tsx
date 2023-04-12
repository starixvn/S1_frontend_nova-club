import DataTable from 'agent/components/DataTable/DataTable'
import { DateTimeField } from 'agent/components/DataTable/DataTableCell'
import TableListing from 'agent/components/DataTable/TableListing'
import {
  DateFilter,
  DateFilterOptions,
  TypeFilter,
} from 'agent/constant/select'
import { useTransactionReportQuery } from 'agent/services/reportApi'
import { TransactionReportResult } from 'agent/services/reportApi.type'
import { useAgentLocalization } from 'app/provider/localization'
import { toThousandSeparator } from 'app/utils'
import { Currency } from 'app/utils/constant'
import dayjs, { utc } from 'dayjs'
import { View } from 'dripsy'
import React, { useState } from 'react'
import { useModal } from 'react-native-modalfy'
import AgentFloatingContent from '../floatingContent'
import useTableListing from 'agent/hooks/useTableListing'

const LIMIT = 10
export type TransactionFilterOptions = {
  date: DateFilter | string | undefined
  startDate: Date | string
  endDate: Date | string
  type: TypeFilter[]
}

const TransactionScreen = () => {
  const { t } = useAgentLocalization()
  const [offset, setOffset] = useState(0)
  const [filter, setFilter] = useState<TransactionFilterOptions>({
    date: DateFilterOptions[0]?.value,
    startDate: dayjs().startOf('date').toDate(),
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
          reportData: data?.result?.data ?? [],
          totalData: data?.result?.recordsFiltered ?? 0,
        }),
      }
    )

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
        <DateTimeField
          date={dayjs(item.created_date).format('YYYY-MM-DD')}
          time={dayjs(item.created_date).format('HH:mm:ss')}
        />
      </DataTable.Cell>
      <DataTable.Cell bordered textStyle={{ px: 12 }}>
        {item.transaction_type}
      </DataTable.Cell>
      <DataTable.Cell center>{toThousandSeparator(item.amount)}</DataTable.Cell>
    </DataTable.Row>
  )

  const handleNavigate = () => {
    openModal('FilterTransactionReportModal', {
      filterOptions: filter,
      onConfirm: (value: TransactionFilterOptions) => {
        setFilter({
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
        title={t('report.reportNote')}
        refreshProps={{ isHyperlink: true }}
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
