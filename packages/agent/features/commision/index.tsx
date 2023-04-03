import DataTable from 'agent/components/DataTable/DataTable'
import CommonBackHeader from 'agent/navigation/components/CommonBackHeader'
import { useUserCommissionListQuery } from 'agent/services/userApi'
import { UserCommissionListResult } from 'agent/services/userApi.type'
import useLocalization from 'app/provider/localization'
import { Currency } from 'app/utils/constant'
import { ScrollView, useDripsyTheme } from 'dripsy'
import React from 'react'
import { Platform, StyleSheet } from 'react-native'

const CommissionTable = () => {
  const { commissionList } = useUserCommissionListQuery(Currency.VND, {
    selectFromResult: ({ data }) => ({ commissionList: data?.result?.data }),
  })
  const { t } = useLocalization()

  const { theme } = useDripsyTheme()
  return (
    <>
      <CommonBackHeader title="commission.title" />
      <DataTable
        sx={{
          pt: Platform.OS === 'web' ? 19 : 0,
        }}
      >
        <DataTable.Header
          size="small"
          sx={{
            bg: theme.colors.$primaryAgent,
            color: 'white',
            borderTopWidth: StyleSheet.hairlineWidth,
            borderColor: '#8EC0FF',
            zIndex: 2,
            width: '100%',
            position: Platform.OS === 'web' ? 'fixed' : 'relative',
          }}
        >
          <TitleCell
            containerStyle={{ flex: 0.4, borderColor: '#8EC0FF' }}
            textStyle={{ px: 12, color: 'white' }}
          >
            {t('commission.type')}
          </TitleCell>
          <TitleCell center>{t('commission.cAgent')}</TitleCell>
          <TitleCell center>{t('commission.cPlayer')}</TitleCell>
          <TitleCell border={false} center>
            {t('commission.cPlayerReferrer')}
          </TitleCell>
        </DataTable.Header>
        <ScrollView
          contentContainerStyle={{
            paddingTop: Platform.OS === 'web' ? 45 : 0,
          }}
        >
          {commissionList?.map(
            (item: UserCommissionListResult, index: number) => (
              <DataTable.Row
                key={`${index} ${item.gametype}`}
                size={item.cashagent ? 'small' : 'big'}
              >
                <DataTable.Cell
                  bordered
                  containerStyle={{
                    flex: 0.4,
                    justifyContent: item.cashagent ? 'flex-end' : 'flex-start',
                  }}
                  textStyle={{ fontWeight: 'bold', px: 12 }}
                >
                  {item.gametype}
                </DataTable.Cell>
                <DataTable.Cell
                  bordered
                  center
                  containerStyle={{ flex: 0.2 }}
                  textStyle={{ color: '#8D0016' }}
                >
                  {item.cashagent ? item.cashagent : '⎯'}
                </DataTable.Cell>
                <DataTable.Cell
                  bordered
                  center
                  containerStyle={{ flex: 0.2 }}
                  textStyle={{ color: '#00058D' }}
                >
                  {item.cashplayer ? item.cashplayer : '⎯'}
                </DataTable.Cell>
                <DataTable.Cell
                  bordered
                  center
                  containerStyle={{ flex: 0.2 }}
                  textStyle={{ color: '#066506' }}
                >
                  {item.cashreferralplayer ? item.cashreferralplayer : '⎯'}
                </DataTable.Cell>
              </DataTable.Row>
            )
          )}
        </ScrollView>
      </DataTable>
    </>
  )
}

const TitleCell = ({ border = true, children, ...rest }) => (
  <DataTable.Title
    bordered={border}
    numberOfLines={2}
    textStyle={{ color: 'white', textAlign: 'center' }}
    style={{ flex: 0.2, borderColor: '#8EC0FF' }}
    {...rest}
  >
    {children}
  </DataTable.Title>
)

export default CommissionTable
