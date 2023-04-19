import { FlashList } from '@shopify/flash-list'
import DataTable from 'agent/components/DataTable/DataTable'
import CommonBackHeader from 'agent/navigation/components/CommonBackHeader'
import { useUserCommissionListQuery } from 'agent/services/userApi'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { useAgentLocalization } from 'app/provider/localization'
import { Currency } from 'app/utils/constant'
import { View, useDripsyTheme } from 'dripsy'
import React from 'react'
import { Platform, StyleSheet } from 'react-native'

const TitleContentAlignmentMap = {
  LOTTERY: 'flex-start',
  SPORTSBOOK: 'flex-start',
  ESPORTS: 'flex-start',
  'VIRTUAL SPORTS': 'flex-start',
  CASINO: 'flex-start',
  'LIVE CASINO': 'flex-start',
  GAMES: 'flex-start',
  FISHING: 'flex-start',
  COCKFIGHTING: 'flex-start',
}

const CommissionTable = () => {
  const { commissionList } = useUserCommissionListQuery(
    { currency: Currency.VND },
    {
      selectFromResult: ({ data }) => ({ commissionList: data?.result?.data }),
    }
  )
  const { t } = useAgentLocalization()
  const { width } = useContainerDimension()
  const { theme } = useDripsyTheme()

  const onRender = ({ item, index }) => {
    const justifyContent = TitleContentAlignmentMap[item.gametype] ?? 'flex-end'

    return (
      <DataTable.Row
        key={`${index} ${item.gametype}`}
        size={item.cashagent ? 'small' : 'big'}
      >
        <DataTable.Cell
          bordered
          containerStyle={{
            flex: 0.4,
            justifyContent,
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
  }
  return (
    <>
      <CommonBackHeader title="commission.title" />
      <DataTable>
        <DataTable.Header
          size="big"
          containerStyle={{
            bg: theme.colors.$primaryAgent,
            color: 'white',
            borderTopWidth: StyleSheet.hairlineWidth,
            borderColor: '#8EC0FF',
            zIndex: 2,
            width,
            mt: Platform.OS === 'web' ? -1 : 0,
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
      </DataTable>

      <View
        sx={{ flex: 1, zIndex: -1, marginTop: Platform.OS === 'web' ? 48 : 0 }}
      >
        <FlashList
          data={commissionList}
          renderItem={onRender}
          estimatedItemSize={20}
        />
      </View>
    </>
  )
}

const TitleCell = ({ border = true, children, ...rest }) => (
  <DataTable.Title
    bordered={border}
    numberOfLines={3}
    textStyle={{ color: 'white', textAlign: 'center', lineHeight: 15 }}
    style={{ flex: 0.2, borderColor: '#8EC0FF' }}
    {...rest}
  >
    {children}
  </DataTable.Title>
)

export default CommissionTable
