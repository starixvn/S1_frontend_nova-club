import Card from 'agent/components/Card'
import { ParseDownlineTable } from 'agent/features/profile/ParseDownlineChart'
import DetailsField from 'agent/features/shareholder/components/DetailsField'
import CommonBackHeader from 'agent/navigation/components/CommonBackHeader'
import {
  useAgentBalanceQuery,
  useAgentDetailsQuery,
} from 'agent/services/agentApi'
import DataTable from 'app/components/dataTable/DataTable'
import { useAgentLocalization } from 'app/provider/localization'
import dayjs from 'dayjs'
import { View } from 'dripsy'
import React from 'react'
import { createParam } from 'solito'

import AgentDataTableCell from 'agent/components/DataTable/AgentDataTableCell'
import AgentDataTableHeader from 'agent/components/DataTable/AgentDataTableHeader'
import AgentDataTableTitle from 'agent/components/DataTable/AgentDataTableTitle'
import DataTableRefresh from 'agent/components/DataTable/DataTableRefresh'
import AgentDataTableRow from 'agent/components/DataTable/AgentDataTableRow'

const { useParam } = createParam<{ id: string }>()
const AgentDetailsScreen = () => {
  const { t } = useAgentLocalization()
  const [id] = useParam('id', { initial: '' })

  const { agentData, downlineTable, success } = useAgentDetailsQuery(
    { id: id },
    {
      selectFromResult: ({ data }) => ({
        agentData: data?.result?.data,
        downlineTable: ParseDownlineTable(
          data?.result?.data.total_downline
        )?.[2],
        success: data?.success,
      }),
    }
  )

  const { agentBalance } = useAgentBalanceQuery(
    { id },
    {
      selectFromResult: ({ data }) => ({
        agentBalance: data?.result?.data.wallet_bal_amt?.VND,
      }),
    }
  )

  const firstCellStyle = { flex: 0.4 }
  const secondCellStyle = { flex: 0.3 }
  const thirdCellStyle = { flex: 0.3 }

  const mobileNumber = agentData?.mobile_no?.startsWith('+')
    ? agentData?.mobile_no
    : '+' + agentData?.mobile_no

  return (
    <>
      <CommonBackHeader title="shAgent.agentDetails" />
      <View sx={{ p: 12 }}>
        <Card>
          <DetailsField
            label={t('profile.currency')}
            value={agentData?.currency}
          />
          <DetailsField
            label={t('profile.createdDate')}
            value={dayjs(agentData?.created_at).format('YYYY-MM-DD hh:mm:ss A')}
          />
          <DetailsField label={t('profile.name')} value={agentData?.name} />
          <DetailsField label={t('profile.mobile')} value={mobileNumber} />
          <DetailsField
            label={t('profile.walletBalance')}
            value={agentBalance}
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

            {downlineTable ? (
              <AgentDataTableRow>
                <AgentDataTableCell center bordered sx={firstCellStyle}>
                  {downlineTable?.label}
                </AgentDataTableCell>
                <AgentDataTableCell center bordered sx={secondCellStyle}>
                  {downlineTable?.direct}
                </AgentDataTableCell>
                <AgentDataTableCell center sx={thirdCellStyle}>
                  {downlineTable?.indirect}
                </AgentDataTableCell>
              </AgentDataTableRow>
            ) : null}
          </DataTable>

          <DetailsField
            label={t('profile.lastLogin')}
            value={`${dayjs(agentData?.lastlogin_at).format(
              'YYYY-MM-DD hh:mm:ss A'
            )} \n(IP: ${agentData?.lastlogin_ip})`}
          />
        </Card>
      </View>
    </>
  )
}

export default AgentDetailsScreen
