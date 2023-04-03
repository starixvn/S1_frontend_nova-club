import Card from 'agent/components/Card'
import DataTable from 'agent/components/DataTable/DataTable'
import DataTableRefresh from 'agent/components/DataTable/DataTableRefresh'
import { useShareholderDetailsQuery } from 'agent/services/shareholderApi'
import { useAgentLocalization } from 'app/provider/localization'
import dayjs from 'dayjs'
import { View } from 'dripsy'
import React from 'react'
import { createParam } from 'solito'
import { ParseDownlineTable } from '../profile/ParseDownlineChart'
import DetailsField from './components/DetailsField'

const { useParam } = createParam<{ detailId: string }>()
const ShareholderDetailsScreen = () => {
  const { t } = useAgentLocalization()
  const [detailId] = useParam('detailId', { initial: '' })

  const { shareholderData, downlineTable, success } =
    useShareholderDetailsQuery(
      { id: detailId },
      {
        selectFromResult: ({ data }) => ({
          shareholderData: data?.result?.data,
          downlineTable: ParseDownlineTable(data?.result?.data.total_downline),
          success: data?.success,
        }),
      }
    )

  const firstCellStyle = { flex: 0.4 }
  const secondCellStyle = { flex: 0.3 }
  const thirdCellStyle = { flex: 0.3 }
  return (
    <View sx={{ p: 12 }}>
      <Card>
        <DetailsField
          label={t('profile.currency')}
          value={shareholderData?.currency}
        />
        <DetailsField
          label={t('profile.createdDate')}
          value={dayjs(shareholderData?.created_at).format(
            'YYYY-MM-DD HH:mm:ss'
          )}
        />
        <DetailsField label={t('profile.name')} value={shareholderData?.name} />
        <DetailsField
          label={t('profile.mobile')}
          value={shareholderData?.mobile_no}
        />
        <DetailsField
          label={t('profile.email')}
          value={shareholderData?.email}
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
          {downlineTable.map((item) => (
            <DataTable.Row key={item.label}>
              <DataTable.Cell center bordered containerStyle={firstCellStyle}>
                {item.label}
              </DataTable.Cell>
              <DataTable.Cell center bordered containerStyle={secondCellStyle}>
                {item.direct}
              </DataTable.Cell>
              <DataTable.Cell center containerStyle={thirdCellStyle}>
                {item.indirect}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>

        <DetailsField
          label={t('report.lastLogin')}
          value={`${dayjs(shareholderData?.lastlogin_at).format(
            'YYYY-MM-DD HH:mm:ss'
          )} \n(IP: ${shareholderData?.lastlogin_ip})`}
        />
      </Card>
    </View>
  )
}

export default ShareholderDetailsScreen
