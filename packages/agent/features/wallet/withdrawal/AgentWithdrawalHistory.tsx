import DataTable from 'agent/components/DataTable/DataTable'
import Text from 'agent/components/Text'
import { useWithdrawalListQuery } from 'agent/services/withdrawalApi'
import { WithdrawalItem } from 'agent/services/withdrawalApi.type'
import { useAgentLocalization } from 'app/provider/localization'
import { toThousandSeparator } from 'app/utils'
import { Currency } from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import dayjs from 'dayjs'
import { useDripsyTheme, View } from 'dripsy'
import React from 'react'

enum WithdrawalStatus {
  Pending = '0',
  Payment = '2',
  Declined = '4',
  Paid = '5',
}
const date =
  dayjsTz().subtract(2, 'month').startOf('date').format('YYYY-MM-DD HH:mm:ss') +
  ' to ' +
  dayjsTz().endOf('date').format('YYYY-MM-DD HH:mm:ss')

const AgentWithdrawalHistory = ({ currency }: { currency: Currency }) => {
  const { t } = useAgentLocalization()
  const { theme } = useDripsyTheme()
  const { data } = useWithdrawalListQuery({
    currency,
    length: 25,
    start: 0,
    date_from: date,
  })

  const getStatusString = (status: string) => {
    switch (status) {
      case WithdrawalStatus.Pending:
        return 'wallet.pending'
      case WithdrawalStatus.Payment:
        return 'wallet.payment'
      case WithdrawalStatus.Declined:
        return 'wallet.declined'
      case WithdrawalStatus.Paid:
        return 'wallet.paid'
      default:
        return ''
    }
  }
  // console.log(data)

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

          {data?.result?.data?.map((item: WithdrawalItem, index: number) => (
            <DataTable.Row key={`${index} ${item.created_at}`}>
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
                    {dayjs(item.created_at).format('DD-MM-YYYY')}
                  </Text>
                  <Text sx={{ color: '$taupeGray', textAlign: 'center' }}>
                    {dayjs(item.created_at).format('HH:mm a')}
                  </Text>
                </View>
              </DataTable.Cell>
              <DataTable.Cell
                style={{
                  flex: 0.4,
                }}
                center
              >
                {toThousandSeparator(item.amount.toString())}
              </DataTable.Cell>
              <DataTable.Cell center style={{ flex: 0.3 }}>
                {t(getStatusString(item.status))}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
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

export default AgentWithdrawalHistory
