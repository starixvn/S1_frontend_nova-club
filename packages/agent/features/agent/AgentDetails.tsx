import Card from 'agent/components/Card'
import DataTable from 'agent/components/DataTable/DataTable'
import DataTableRefresh from 'agent/components/DataTable/DataTableRefresh'
import { ParseDownlineTable } from 'agent/features/profile/ParseDownlineChart'
import DetailsField from 'agent/features/shareholder/components/DetailsField'
import CommonBackHeader from 'agent/navigation/components/CommonBackHeader'
import {
  useAgentBalanceQuery,
  useAgentDetailsQuery,
} from 'agent/services/agentApi'
import { useAgentLocalization } from 'app/provider/localization'
import dayjs from 'dayjs'
import { View } from 'dripsy'
import React from 'react'
import { createParam } from 'solito'

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

  console.log(
    '🚀 ~ file: AgentDetails.tsx:36 ~ AgentDetailsScreen ~ agentBalance:',
    agentBalance
  )
  const firstCellStyle = { flex: 0.4 }
  const secondCellStyle = { flex: 0.3 }
  const thirdCellStyle = { flex: 0.3 }
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
            value={dayjs(agentData?.created_at).format('YYYY-MM-DD HH:mm:ss')}
          />
          <DetailsField label={t('profile.name')} value={agentData?.name} />
          <DetailsField
            label={t('profile.mobile')}
            value={agentData?.mobile_no}
          />
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
            <DataTable.Header>
              <DataTable.Title bordered containerStyle={firstCellStyle}>
                {' '}
              </DataTable.Title>
              <DataTable.Title bordered center containerStyle={secondCellStyle}>
                {t('profile.direct')}
              </DataTable.Title>
              <DataTable.Title center containerStyle={thirdCellStyle}>
                {t('profile.indirect')}
              </DataTable.Title>
            </DataTable.Header>

            {downlineTable ? (
              <DataTable.Row>
                <DataTable.Cell center bordered containerStyle={firstCellStyle}>
                  {downlineTable?.label}
                </DataTable.Cell>
                <DataTable.Cell
                  center
                  bordered
                  containerStyle={secondCellStyle}
                >
                  {downlineTable?.direct}
                </DataTable.Cell>
                <DataTable.Cell center containerStyle={thirdCellStyle}>
                  {downlineTable?.indirect}
                </DataTable.Cell>
              </DataTable.Row>
            ) : null}
          </DataTable>

          <DetailsField
            label={t('profile.lastLogin')}
            value={`${dayjs(agentData?.lastlogin_at).format(
              'YYYY-MM-DD HH:mm:ss'
            )} \n(IP: ${agentData?.lastlogin_ip})`}
          />
        </Card>
      </View>
    </>
  )
}

export default AgentDetailsScreen
