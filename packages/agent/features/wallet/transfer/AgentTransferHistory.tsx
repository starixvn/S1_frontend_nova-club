import DataTable from 'agent/components/DataTable/DataTable'
import Text from 'agent/components/Text'
import { useAgentRecentTransactionListQuery } from 'agent/services/agentApi'
import { useShareholderRecentTransactionListQuery } from 'agent/services/shareholderApi'
import { TransferListItemResult } from 'agent/services/transferApi.type'
import { useAgentLocalization } from 'app/provider/localization'
import { toThousandSeparator } from 'app/utils'
import { Currency } from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import dayjs from 'dayjs'
import { useDripsyTheme, View } from 'dripsy'

interface AgentTransferHistoryProps {
  currency: Currency
  isAgent: boolean
}
const date =
  dayjsTz().subtract(2, 'month').startOf('date').format('YYYY-MM-DD HH:mm:ss') +
  ' to ' +
  dayjsTz().endOf('date').format('YYYY-MM-DD HH:mm:ss')
const AgentTransferHistory = ({
  currency,
  isAgent,
}: AgentTransferHistoryProps) => {
  const { theme } = useDripsyTheme()
  const { t } = useAgentLocalization()
  const { data: agentHistoryData } = useAgentRecentTransactionListQuery(
    {
      currency,
      length: 25,
      start: 0,
      date_from: date,
    },
    { skip: isAgent ? false : true }
  )
  const { data: shareholderHistoryData } =
    useShareholderRecentTransactionListQuery(
      {
        currency,
        length: 25,
        start: 0,
        date_from: date,
      },
      { skip: isAgent ? true : false }
    )
  const data = isAgent ? agentHistoryData : shareholderHistoryData

  return (
    <>
      <View sx={{ py: '$5' }}>
        <DataTable>
          <DataTable.Header
            size="small"
            sx={{ bg: theme.colors.$primaryAgent, color: 'white' }}
          >
            <TitleCell
              style={{ flex: 1, borderColor: '#8EC0FF', paddingLeft: 20 }}
            >
              {t('wallet.recentTransaction')}
            </TitleCell>
          </DataTable.Header>
          {data?.result?.data.map(
            (item: TransferListItemResult, index: number) => (
              <DataTable.Row key={`${index} ${item.created_date}`}>
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
                  {item.reference_id}
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
          )}
        </DataTable>
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
