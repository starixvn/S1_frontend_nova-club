import DataTable from 'agent/components/DataTable/DataTable'
import TableListing from 'agent/components/DataTable/TableListing'
import { DateFilter, DateFilterOptions } from 'agent/constant/select'
import useTableListing from 'agent/hooks/useTableListing'
import { useAgentCommissionListQuery } from 'agent/services/reportApi'
import { AgentCommissionListResult } from 'agent/services/reportApi.type'
import { useAgentLocalization } from 'app/provider/localization'
import { toThousandSeparator } from 'app/utils'
import dayjs from 'dayjs'
import { View } from 'dripsy'
import React, { useState } from 'react'
import { useModal } from 'react-native-modalfy'
import AgentFloatingContent from '../floatingContent'

export type CommissionFilterOptions = {
  date: DateFilter | string | undefined
  startDate: Date
  endDate: Date
}

const LIMIT = 10
const AgentCommissionScreen = () => {
  const { t } = useAgentLocalization()
  const { openModal } = useModal()
  const [filter, setFilter] = useState<CommissionFilterOptions>({
    date: DateFilterOptions[0]?.value,
    startDate: dayjs().startOf('date').toDate(),
    endDate: dayjs().endOf('date').toDate(),
  })

  const [offset, setOffset] = useState(0)

  const { reportData, totalData, isFetching, refetch } =
    useAgentCommissionListQuery(
      {
        start: offset * LIMIT,
        length: LIMIT,
        rpt_date: `${dayjs(filter.startDate).format(
          'YYYY-MM-DD HH:mm:ss Z'
        )} to ${dayjs(filter.endDate).format('YYYY-MM-DD HH:mm:ss Z')}`,
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

  const { onLoadMore, onRefresh } = useTableListing({
    offset,
    setOffset,
    LIMIT,
    totalData,
    isFetching,
    refetch,
  })

  const secondCellStyle = { flex: 1 / 2 }

  const onRenderHeader = () => (
    <DataTable.Header>
      <DataTable.Title bordered>{t('common.username')}</DataTable.Title>
      <DataTable.Title bordered center containerStyle={secondCellStyle}>
        {t('report.type')}
      </DataTable.Title>
      <DataTable.Title bordered center>
        {t('report.bet')}
      </DataTable.Title>
      <DataTable.Title center>{t('report.pt')}</DataTable.Title>
    </DataTable.Header>
  )

  const onRenderItem = ({ item }: { item: AgentCommissionListResult }) => (
    <DataTable.Row size="big">
      <DataTable.Cell bordered textStyle={{ fontSize: 13 }}>
        {item.player_username}
      </DataTable.Cell>
      <DataTable.Cell bordered center containerStyle={secondCellStyle}>
        {item.player_type}
      </DataTable.Cell>
      <DataTable.Cell bordered center textStyle={{ fontSize: 13 }}>
        {toThousandSeparator(item.inhouse_bet_total_amt)}
      </DataTable.Cell>
      <DataTable.Cell center textStyle={{ fontSize: 13 }}>
        {toThousandSeparator(item.earning_amt)}
      </DataTable.Cell>
    </DataTable.Row>
  )

  const onFilter = () => {
    openModal('FilterCommissionReportModal', {
      filterOptions: filter,
      onConfirm: (value: CommissionFilterOptions) => {
        setFilter({
          date: value.date,
          endDate: value.endDate,
          startDate: value.startDate,
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
        keyExtractor={(item, index) => `${index} Table ${item.username}`}
        onLoadMore={onLoadMore}
        onRefresh={onRefresh}
        isFetching={isFetching}
        containerStyle={{ flex: 1 }}
      />

      <AgentFloatingContent onPress={onFilter} />
    </View>
  )
}

export default AgentCommissionScreen
