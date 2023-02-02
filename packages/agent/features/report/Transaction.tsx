import DataTable from 'agent/components/DataTable/DataTable'
import { DateTimeField } from 'agent/components/DataTable/DataTableCell'
import TableListing from 'agent/components/DataTable/TableListing'
import { DateFilter, DateFilterOptions } from 'agent/constant/select'
import { useTransactionReportQuery } from 'agent/services/reportApi'
import { TransactionReportResult } from 'agent/services/reportApi.type'
import useLocalization from 'app/provider/localization'
import { toThousandSeparator } from 'app/utils'
import { Currency } from 'app/utils/constant'
import dayjs from 'dayjs'
import { View } from 'dripsy'
import React, { useState } from 'react'
import { useModal } from 'react-native-modalfy'
import AgentFloatingContent from '../floatingContent'

const LIMIT = 10
export type TransactionFilterOptions = {
  date: DateFilter | string | undefined
  startDate: Date | string
  endDate: Date | string
  type: string | string
}

const TransactionScreen = () => {
  const { t } = useLocalization()
  const [offset, setOffset] = useState(0)
  const [filter, setFilter] = useState<TransactionFilterOptions>({
    date: DateFilterOptions[0]?.value,
    startDate: dayjs().startOf('date').toDate(),
    endDate: dayjs().endOf('date').toDate(),
    type: '',
  })

  const { openModal } = useModal()

  const { reportData, totalData, hasMorePage, isFetching } =
    useTransactionReportQuery(
      {
        start: offset * LIMIT,
        length: LIMIT,
        date_from: `${dayjs(filter.startDate).format(
          'YYYY-MM-DD HH:mm:ss'
        )} to ${dayjs(filter.endDate).format('YYYY-MM-DD HH:mm:ss')}`,
        currency: Currency.VND,
        transaction_type: '',
      },
      {
        selectFromResult: ({ data, isFetching }) => ({
          isFetching,
          reportData: data?.result?.data ?? [],
          totalData: data?.result?.recordsFiltered ?? 0,
          hasMorePage: data?.result?.recordsTotal ?? 0 >= offset * LIMIT,
        }),
      }
    )

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
          from={dayjs(item.created_date).format('YYYY-MM-DD')}
          to={dayjs(item.created_date).format('HH:mm:ss')}
        />
      </DataTable.Cell>
      <DataTable.Cell bordered textStyle={{ px: 12 }}>
        {item.transaction_type}
      </DataTable.Cell>
      <DataTable.Cell center>{toThousandSeparator(item.amount)}</DataTable.Cell>
    </DataTable.Row>
  )

  const onLoadMore = () => {
    hasMorePage && !isFetching && setOffset((prev) => prev + 1)
  }

  const onRefresh = async () => {
    setOffset(0)
  }

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
