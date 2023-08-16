import AgentDataTableCell from 'agent/components/DataTable/AgentDataTableCell'
import AgentDataTableRow from 'agent/components/DataTable/AgentDataTableRow'
import TableListing, { LIMIT } from 'agent/components/DataTable/TableListing'
import useTableListing from 'agent/hooks/useTableListing'
import { ShareholderRecentTransactionListResult } from 'agent/services/shareholderApi.type'
import {
  useAgentTransferListQuery,
  useShareholderTransferListQuery,
} from 'agent/services/transferApi'
import { AgentTransferListResult } from 'agent/services/transferApi.type'
import { DateTimeField } from 'app/components/dataTable/DataTableCell'
import { useAgentLocalization } from 'app/provider/localization'
import { toThousandSeparator } from 'app/utils'
import { Currency } from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import { View } from 'dripsy'
import { useState } from 'react'

interface AgentTransferHistoryProps {
  currency: Currency
  isAgent: boolean
}
const date =
  dayjsTz()
    .subtract(3, 'month')
    .startOf('date')
    .format('YYYY-MM-DD HH:mm:ss Z') +
  ' to ' +
  dayjsTz().endOf('date').format('YYYY-MM-DD HH:mm:ss Z')

const AgentTransferHistory = ({
  currency,
  isAgent,
}: AgentTransferHistoryProps) => {
  const { t } = useAgentLocalization()
  const [offset, setOffset] = useState(0)

  const {
    reportData: agentHistoryData,
    totalData: agentTotalData,
    isFetching: agentIsFetching,
    refetch: agentRefetch,
  } = useAgentTransferListQuery(
    {
      currency,
      start: offset * LIMIT,
      length: LIMIT,
      date_from: date,
    },
    {
      selectFromResult: ({ data, isFetching }) => ({
        isFetching,
        reportData: data?.result?.data ?? [],
        totalData: data?.result?.recordsFiltered ?? 0,
      }),
      skip: isAgent ? false : true,
    }
  )

  const {
    reportData: shareholderHistoryData,
    totalData: shareholderTotalData,
    isFetching: shareholderIsFetching,
    refetch: shareholderRefetch,
  } = useShareholderTransferListQuery(
    {
      currency,
      start: offset * LIMIT,
      length: LIMIT,
      date_from: date,
    },
    {
      selectFromResult: ({ data, isFetching }) => ({
        isFetching,
        reportData: data?.result?.data ?? [],
        totalData: data?.result?.recordsFiltered ?? 0,
      }),
      skip: isAgent ? true : false,
    }
  )

  const data:
    | ShareholderRecentTransactionListResult[]
    | AgentTransferListResult[] = isAgent
    ? agentHistoryData
    : shareholderHistoryData

  const totalData = isAgent ? agentTotalData : shareholderTotalData
  const isFetching = isAgent ? agentIsFetching : shareholderIsFetching
  const refetch = isAgent ? agentRefetch : shareholderRefetch

  const { onLoadMore } = useTableListing({
    offset,
    setOffset,
    LIMIT,
    totalData,
    isFetching,
    refetch,
  })

  const onRenderItem = ({
    item,
  }: {
    item: AgentTransferListResult | ShareholderRecentTransactionListResult
  }) => (
    <AgentDataTableRow>
      <AgentDataTableCell center sx={{ flex: 0.35 }}>
        <DateTimeField dateTime={item.created_date} />
      </AgentDataTableCell>
      <AgentDataTableCell sx={{ flex: 0.4 }} center>
        {item.referrer_code}
      </AgentDataTableCell>
      <AgentDataTableCell sx={{ flex: 0.4 }} center>
        {toThousandSeparator(item.amount)}
      </AgentDataTableCell>
    </AgentDataTableRow>
  )

  return (
    <View sx={{ mt: '$5' }}>
      <TableListing
        title={t('wallet.recentTransaction')}
        data={data}
        renderItem={onRenderItem}
        keyExtractor={(item, index) => `${index} Table ${item.create_date}`}
        onLoadMore={onLoadMore}
        isFetching={isFetching}
        refreshProps={{
          titleProps: {
            sx: { fontWeight: 'bold', fontSize: 14 },
          },
        }}
      />
    </View>
  )
}
export default AgentTransferHistory
