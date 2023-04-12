import DataTable from 'agent/components/DataTable/DataTable'
import TableListing from 'agent/components/DataTable/TableListing'
import Text from 'agent/components/Text'
import useTableListing from 'agent/hooks/useTableListing'
import { ShareholderRecentTransactionListResult } from 'agent/services/shareholderApi.type'
import {
  useAgentTransferListQuery,
  useShareholderTransferListQuery,
} from 'agent/services/transferApi'
import { AgentTransferListResult } from 'agent/services/transferApi.type'
import { useAgentLocalization } from 'app/provider/localization'
import { toThousandSeparator } from 'app/utils'
import { Currency } from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import dayjs from 'dayjs'
import { View } from 'dripsy'
import { useState } from 'react'
import { Platform } from 'react-native'

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

const LIMIT = 10
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

  // const onLoadMore = () => {
  //   if (isAgent)
  //     agentHasMorePage && !agentIsFetching && setOffset((prev) => prev + 1)
  //   else
  //     shareholderHasMorePage &&
  //       !shareholderIsFetching &&
  //       setOffset((prev) => prev + 1)
  // }

  const onRenderItem = ({
    item,
  }: {
    item: AgentTransferListResult | ShareholderRecentTransactionListResult
  }) => (
    <DataTable.Row>
      <DataTable.Cell center style={{ flex: 0.35 }}>
        <View sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text sx={{ color: 'black', textAlign: 'center' }}>
            {dayjs(item.created_date).format('DD-MM-YYYY')}
          </Text>
          <Text sx={{ color: '$taupeGray', textAlign: 'center' }}>
            {dayjs(item.created_date).format('HH:mm a')}
          </Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={{ flex: 0.4 }} center>
        {item.referrer_code}
      </DataTable.Cell>
      <DataTable.Cell style={{ flex: 0.4 }} center>
        {toThousandSeparator(item.amount)}
      </DataTable.Cell>
    </DataTable.Row>
  )

  return (
    <View sx={{ py: '$5', height: Platform.OS !== 'web' ? 500 : null }}>
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
