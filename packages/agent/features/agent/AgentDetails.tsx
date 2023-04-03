import Card from 'agent/components/Card'
import DataTable from 'agent/components/DataTable/DataTable'
import DataTableRefresh from 'agent/components/DataTable/DataTableRefresh'
import { ParseDownlineTable } from 'agent/features/profile/ParseDownlineChart'
import DetailsField from 'agent/features/shareholder/components/DetailsField'
import CommonBackHeader from 'agent/navigation/components/CommonBackHeader'
import { useAgentDetailsQuery } from 'agent/services/agentApi'
import useLocalization from 'app/provider/localization'
import dayjs from 'dayjs'
import { View } from 'dripsy'
import React from 'react'
import { createParam } from 'solito'

const { useParam } = createParam<{ detailId: string }>()
const AgentDetailsScreen = () => {
  const { t } = useLocalization()
  const [detailId] = useParam('detailId', { initial: '' })

  const { agentData, downlineTable, success } = useAgentDetailsQuery(
    { id: detailId },
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
          <DetailsField
            label={t('profile.mobile')}
            value={agentData?.mobile_no}
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
            label={t('report.lastLogin')}
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
