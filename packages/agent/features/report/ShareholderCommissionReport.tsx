import DataTable from 'agent/components/DataTable/DataTable'
import { DateTimeField } from 'agent/components/DataTable/DataTableCell'
import TableListing, { LIMIT } from 'agent/components/DataTable/TableListing'
import Icon from 'agent/components/Icon'
import Text from 'agent/components/Text'
import { DateFilter, DateFilterOptions } from 'agent/constant/select'
import useTableListing from 'agent/hooks/useTableListing'
import { useShareholderCommissionListQuery } from 'agent/services/reportApi'
import { ShareholderCommissionListResult } from 'agent/services/reportApi.type'
import { useUserInfoQuery } from 'agent/services/userApi'
import { useAgentLocalization } from 'app/provider/localization'
import { toThousandSeparator } from 'app/utils'
import { Currency } from 'app/utils/constant'
import dayjs from 'dayjs'
import { Pressable, View } from 'dripsy'
import React, { useState } from 'react'
import { useModal } from 'react-native-modalfy'
import AgentFloatingContent from '../floatingContent'

export type CommissionFilterOptions = {
  date: DateFilter | string | undefined
  startDate: Date
  endDate: Date
}

const ShareholderCommissionScreen = () => {
  const { openModal } = useModal()
  const { t } = useAgentLocalization()
  const [filter, setFilter] = useState<CommissionFilterOptions>({
    date: DateFilterOptions[0]?.value,
    startDate: dayjs().startOf('date').toDate(),
    endDate: dayjs().endOf('date').toDate(),
  })

  const [offset, setOffset] = useState(0)

  const { currency } = useUserInfoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      currency: (data?.wallet.currency ?? Currency.VND) as Currency,
    }),
  })
  const { reportData, totalData, hasMorePage, isFetching, refetch } =
    useShareholderCommissionListQuery(
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

  const fourthCellStyle = { flex: 1 / 2 }

  const onRenderHeader = () => (
    <DataTable.Header>
      <DataTable.Title bordered center>
        {t('common.date')}
      </DataTable.Title>
      <DataTable.Title bordered center>
        {t('common.username')}
      </DataTable.Title>
      <DataTable.Cell bordered center>
        <View
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text sx={{ fontWeight: 'bold', mr: 2 }}>{t('common.turnover')}</Text>
          <Pressable onPress={() => openModal('TurnoverModal')}>
            <Icon name="info" color="red" size={16} />
          </Pressable>
        </View>
      </DataTable.Cell>
      <DataTable.Title bordered center containerStyle={fourthCellStyle}>
        PT %
      </DataTable.Title>
      <DataTable.Title center>{t('report.commission')}</DataTable.Title>
    </DataTable.Header>
  )

  const onRenderItem = ({
    item,
  }: {
    item: ShareholderCommissionListResult
  }) => (
    <DataTable.Row size="big">
      <DataTable.Cell bordered center>
        <DateTimeField date={dayjs(item.rpt_date).format('YYYY-MM-DD')} />
      </DataTable.Cell>
      <DataTable.Cell bordered>{item.username}</DataTable.Cell>
      <DataTable.Cell bordered center textStyle={{ fontSize: 12 }}>
        {toThousandSeparator(item.turnover_amt)}
      </DataTable.Cell>
      <DataTable.Cell bordered center style={fourthCellStyle}>
        {item.shareholding_perc}
      </DataTable.Cell>
      <DataTable.Cell center textStyle={{ fontSize: 12 }}>
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

export default ShareholderCommissionScreen
