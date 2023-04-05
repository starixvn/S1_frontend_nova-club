import DataTable from 'agent/components/DataTable/DataTable'
import Text from 'agent/components/Text'
import { useAgentRecentTransactionListQuery } from 'agent/services/agentApi'
import { AgentRecentTransactionListResult } from 'agent/services/agentApi.type'
import { useShareholderRecentTransactionListQuery } from 'agent/services/shareholderApi'
import { ShareholderRecentTransactionListResult } from 'agent/services/shareholderApi.type'
import { TransferListItemResult } from 'agent/services/transferApi.type'
import { useAgentLocalization } from 'app/provider/localization'
import { toThousandSeparator } from 'app/utils'
import { Currency } from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import dayjs from 'dayjs'
import { useDripsyTheme, View } from 'dripsy'
import { useRef, useState } from 'react'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import TableListing from 'agent/components/DataTable/TableListing'
import DataTableRefresh from 'agent/components/DataTable/DataTableRefresh'

interface AgentTransferHistoryProps {
  currency: Currency
  isAgent: boolean
}
const date =
  dayjsTz().subtract(2, 'month').startOf('date').format('YYYY-MM-DD HH:mm:ss') +
  ' to ' +
  dayjsTz().endOf('date').format('YYYY-MM-DD HH:mm:ss')

const LIMIT = 10
const AgentTransferHistory = ({
  currency,
  isAgent,
}: AgentTransferHistoryProps) => {
  const { theme } = useDripsyTheme()
  const { t } = useAgentLocalization()
  const [offset, setOffset] = useState(0)

  // const { data: agentHistoryData } = useAgentRecentTransactionListQuery(
  //   {
  //     currency,
  //     length: 25,
  //     start: 0,
  //     date_from: date,
  //   },
  //   { skip: isAgent ? false : true }
  // )
  const {
    reportData: agentHistoryData,
    totalData: agentTotalData,
    hasMorePage: agentHasMorePage,
    isFetching: agentIsFetching,
    refetch: agentRefetch,
  } = useAgentRecentTransactionListQuery(
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
        hasMorePage: data?.result?.recordsTotal ?? 0 >= offset * LIMIT,
      }),
    }
  )

  const {
    reportData: shareholderHistoryData,
    totalData: shareholderTotalData,
    hasMorePage: shareholderHasMorePage,
    isFetching: shareholderIsFetching,
    refetch: shareholderRefetch,
  } = useShareholderRecentTransactionListQuery(
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
        hasMorePage: data?.result?.recordsTotal ?? 0 >= offset * LIMIT,
      }),
    }
  )
  const data:
    | ShareholderRecentTransactionListResult[]
    | AgentRecentTransactionListResult[] = isAgent
    ? agentHistoryData
    : shareholderHistoryData

  const isFetching = isAgent ? agentIsFetching : shareholderIsFetching

  const onLoadMore = () => {
    if (isAgent)
      agentHasMorePage && !agentIsFetching && setOffset((prev) => prev + 1)
    else
      shareholderHasMorePage &&
        !shareholderIsFetching &&
        setOffset((prev) => prev + 1)
  }

  const onRenderHeader = () => (
    <DataTable.Header
      size="small"
      sx={{ bg: theme.colors.$primaryAgent, color: 'white' }}
    >
      <TitleCell style={{ flex: 1, borderColor: '#8EC0FF', paddingLeft: 20 }}>
        {t('wallet.recentTransaction')}
      </TitleCell>
    </DataTable.Header>
  )

  const onRenderItem = ({
    item,
  }: {
    item:
      | AgentRecentTransactionListResult
      | ShareholderRecentTransactionListResult
  }) => (
    <DataTable.Row>
      <DataTable.Cell
        center
        style={{
          flex: 0.35,
        }}
        textStyle={{}}
      >
        <View
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text sx={{ color: 'black', textAlign: 'center' }}>
            {dayjs(item.created_date).format('DD-MM-YYYY')}
          </Text>
          <Text sx={{ color: '$taupeGray', textAlign: 'center' }}>
            {dayjs(item.created_date).format('HH:mm a')}
          </Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell
        style={{
          flex: 0.4,
        }}
        center
      >
        {item.referrer_code}
      </DataTable.Cell>
      <DataTable.Cell
        style={{
          flex: 0.4,
        }}
        center
      >
        {toThousandSeparator(item.amount)}
      </DataTable.Cell>
    </DataTable.Row>
  )

  return (
    <>
      <View sx={{ py: '$5' }}>
        <TableListing
          title={t('wallet.recentTransaction')}
          data={data}
          renderItem={onRenderItem}
          keyExtractor={(item, index) => `${index} Table ${item.create_date}`}
          onLoadMore={onLoadMore}
          // onRefresh={onRefresh}
          isFetching={isFetching}
          containerStyle={{ flex: 1 }}
          refreshProps={{
            titleProps: {
              sx: { fontWeight: 'bold', fontSize: 14 },
            },
          }}
        />
      </View>
    </>
  )
}
const TitleCell = ({ children, ...rest }) => (
  <DataTable.Title
    numberOfLines={2}
    textStyle={{ color: 'white', textAlign: 'center', fontSize: 14 }}
    style={{}}
    {...rest}
  >
    {children}
  </DataTable.Title>
)

export default AgentTransferHistory
