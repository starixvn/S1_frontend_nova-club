import Card from 'agent/components/Card'
import AgentDataTableCell from 'agent/components/DataTable/AgentDataTableCell'
import AgentDataTableHeader from 'agent/components/DataTable/AgentDataTableHeader'
import AgentDataTableTitle from 'agent/components/DataTable/AgentDataTableTitle'
import DataTableRefresh from 'agent/components/DataTable/DataTableRefresh'
import CommonBackHeader from 'agent/navigation/components/CommonBackHeader'
import {
  useShareholderBalanceQuery,
  useShareholderDetailsQuery,
} from 'agent/services/shareholderApi'
import DataTable from 'app/components/dataTable/DataTable'
import { useAgentLocalization } from 'app/provider/localization'
import dayjs from 'dayjs'
import { View } from 'dripsy'
import React from 'react'
import { createParam } from 'solito'
import { ParseDownlineTable } from '../profile/ParseDownlineChart'
import DetailsField from './components/DetailsField'

const { useParam } = createParam<{ id: string }>()
const ShareholderDetailsScreen = () => {
  const { t } = useAgentLocalization()
  const [id] = useParam('id', { initial: '' })

  const { shareholderData, downlineTable, success } =
    useShareholderDetailsQuery(
      { id: id },
      {
        selectFromResult: ({ data }) => ({
          shareholderData: data?.result?.data,
          downlineTable: ParseDownlineTable(data?.result?.data.total_downline),
          success: data?.success,
        }),
      }
    )

  const { shareholderBalance } = useShareholderBalanceQuery(
    { id },
    {
      selectFromResult: ({ data }) => ({
        shareholderBalance: data?.result?.data.wallet_bal_amt?.VND,
      }),
    }
  )

  const firstCellStyle = { flex: 0.4 }
  const secondCellStyle = { flex: 0.3 }
  const thirdCellStyle = { flex: 0.3 }

  const mobileNumber = shareholderData?.mobile_no?.startsWith('+')
    ? shareholderData?.mobile_no
    : '+' + shareholderData?.mobile_no

  return (
    <>
      <CommonBackHeader title="shAgent.shareholderDetails" />
      <View sx={{ p: 12 }}>
        <Card>
          <DetailsField
            label={t('profile.currency')}
            value={shareholderData?.currency}
          />
          <DetailsField
            label={t('profile.createdDate')}
            value={dayjs(shareholderData?.created_at).format(
              'YYYY-MM-DD hh:mm:ss A'
            )}
          />
          <DetailsField
            label={t('profile.name')}
            value={shareholderData?.name}
          />
          <DetailsField label={t('profile.mobile')} value={mobileNumber} />
          <DetailsField
            label={t('profile.email')}
            value={shareholderData?.email}
          />
          <DetailsField
            label={t('profile.walletBalance')}
            value={shareholderBalance}
          />
          <DetailsField
            label={t('report.pt')}
            value={
              shareholderData ? `${shareholderData?.earning_perc?.VND}%` : ' '
            }
          />

          <DataTable
            sx={{
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '$border',
              my: 12,
            }}
          >
            <DataTableRefresh title={t('profile.totalDownline')} center />
            <AgentDataTableHeader>
              <AgentDataTableTitle bordered sx={firstCellStyle}>
                {' '}
              </AgentDataTableTitle>
              <AgentDataTableTitle bordered center sx={secondCellStyle}>
                {t('profile.direct')}
              </AgentDataTableTitle>
              <AgentDataTableTitle center sx={thirdCellStyle}>
                {t('profile.indirect')}
              </AgentDataTableTitle>
            </AgentDataTableHeader>
            {downlineTable.map((item) => (
              <DataTable.Row key={item.label}>
                <AgentDataTableCell center bordered sx={firstCellStyle}>
                  {item.label}
                </AgentDataTableCell>
                <AgentDataTableCell center bordered sx={secondCellStyle}>
                  {item.direct}
                </AgentDataTableCell>
                <AgentDataTableCell center sx={thirdCellStyle}>
                  {item.indirect}
                </AgentDataTableCell>
              </DataTable.Row>
            ))}
          </DataTable>

          <DetailsField
            label={t('profile.lastLogin')}
            value={`${dayjs(shareholderData?.lastlogin_at).format(
              'YYYY-MM-DD hh:mm:ss A'
            )} \n(IP: ${shareholderData?.lastlogin_ip})`}
          />
        </Card>
      </View>
    </>
  )
}

export default ShareholderDetailsScreen
