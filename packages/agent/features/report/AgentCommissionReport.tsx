import AgentDataTableCell from 'agent/components/DataTable/AgentDataTableCell'
import AgentDataTableHeader from 'agent/components/DataTable/AgentDataTableHeader'
import AgentDataTableRow from 'agent/components/DataTable/AgentDataTableRow'
import AgentDataTableTitle from 'agent/components/DataTable/AgentDataTableTitle'
import TableListing, { LIMIT } from 'agent/components/DataTable/TableListing'
import Icon from 'agent/components/Icon'
import Text from 'agent/components/Text'
import { DateFilterOptions } from 'agent/constant/select'
import useTableListing from 'agent/hooks/useTableListing'
import { useAgentCommissionListQuery } from 'agent/services/reportApi'
import { AgentCommissionListResult } from 'agent/services/reportApi.type'
import { DateTimeField } from 'app/components/dataTable/DataTableCell'
import { useAgentLocalization } from 'app/provider/localization'
import { toThousandSeparator } from 'app/utils'
import dayjs from 'dayjs'
import { Pressable, View } from 'dripsy'
import React, { useState } from 'react'
import { useModal } from 'react-native-modalfy'
import AgentFloatingContent from '../floatingContent'
import { CommissionFilterOptions } from './ShareholderCommissionReport'

const AgentCommissionScreen = () => {
  const { t } = useAgentLocalization()
  const { openModal } = useModal()
  const [filter, setFilter] = useState<CommissionFilterOptions>({
    initial: true,
    date: DateFilterOptions[4]?.value,
    startDate: dayjs().startOf('month').toDate(),
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
          reportData: data?.result?.data,
          totalData: data?.result?.recordsFiltered,
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
    <AgentDataTableHeader>
      <AgentDataTableTitle bordered center>
        {t('common.date')}
      </AgentDataTableTitle>
      <AgentDataTableTitle bordered center>
        <View
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            sx={{ fontSize: 12, fontWeight: 'bold', mr: 2, color: 'black' }}
          >
            {t('common.turnover')}
          </Text>
          <Pressable onPress={() => openModal('TurnoverModal')}>
            <Icon name="info" color="red" size={16} />
          </Pressable>
        </View>
      </AgentDataTableTitle>
      <AgentDataTableTitle center>{t('report.commission')}</AgentDataTableTitle>
    </AgentDataTableHeader>
  )

  const onRenderItem = ({ item }: { item: AgentCommissionListResult }) => (
    <AgentDataTableRow size="big">
      <AgentDataTableCell bordered center>
        <DateTimeField dateTime={item.rpt_date} isTime={false} />
      </AgentDataTableCell>
      <AgentDataTableCell bordered center textStyle={{ fontSize: 13 }}>
        {toThousandSeparator(item.inhouse_bet_total_amt)}
      </AgentDataTableCell>
      <AgentDataTableCell center textStyle={{ fontSize: 13 }}>
        {toThousandSeparator(item.earning_amt)}
      </AgentDataTableCell>
    </AgentDataTableRow>
  )

  const onFilter = () => {
    openModal('FilterCommissionReportModal', {
      filterOptions: filter,
      onConfirm: (value: CommissionFilterOptions) => {
        setFilter({
          initial: value.initial,
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
        title={t('report.commissionReport')}
        // refreshProps={{ isHyperlink: true }}
        data={reportData}
        renderHeader={onRenderHeader}
        renderItem={onRenderItem}
        keyExtractor={(item, index) => `${index} Table ${item.player_username}`}
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
