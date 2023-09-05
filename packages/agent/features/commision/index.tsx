import { FlashList } from '@shopify/flash-list'
import AgentDataTableCell from 'agent/components/DataTable/AgentDataTableCell'
import AgentDataTableHeader from 'agent/components/DataTable/AgentDataTableHeader'
import AgentDataTableRow from 'agent/components/DataTable/AgentDataTableRow'
import CommonBackHeader from 'agent/navigation/components/CommonBackHeader'
import { useUserCommissionListQuery } from 'agent/services/userApi'
import DataTable from 'app/components/dataTable/DataTable'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { useAgentLocalization } from 'app/provider/localization'
import { Currency } from 'utils/constant'
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

  const fillString = (value) => {
    return value ? value : '⎯'
  }

  const onRender = ({ item, index }) => {
    const justifyContent = TitleContentAlignmentMap[item.gametype] ?? 'flex-end'
    const isTitle = item.gametype in TitleContentAlignmentMap
    const paddingLeft = isTitle ? 12 : 24

    return (
      <AgentDataTableRow
        key={`${index} ${item.gametype}`}
        size={isTitle ? 'big' : 'small'}
        sx={{
          bg: isTitle ? '#D1D1D1' : 'white',
        }}
      >
        <AgentDataTableCell
          bordered={isTitle ? false : true}
          center={isTitle ? false : true}
          sx={{ flex: isTitle ? 1 : 0.4 }}
          textStyle={{ fontWeight: 'bold', paddingLeft, px: 12 }}
        >
          {item.gametype}
        </AgentDataTableCell>
        <AgentDataTableCell
          bordered={isTitle ? false : true}
          center
          sx={{ flex: 0.2 }}
          textStyle={{ color: '#8D0016' }}
        >
          {isTitle ? '' : fillString(item.cashagent)}
        </AgentDataTableCell>
        <AgentDataTableCell
          bordered={isTitle ? false : true}
          center
          sx={{ flex: 0.2 }}
          textStyle={{ color: '#00058D' }}
        >
          {isTitle ? '' : fillString(item.cashplayer)}
        </AgentDataTableCell>
        <AgentDataTableCell
          bordered={isTitle ? false : true}
          center
          sx={{ flex: 0.2 }}
          textStyle={{ color: '#066506' }}
        >
          {isTitle ? '' : fillString(item.cashreferralplayer)}
        </AgentDataTableCell>
      </AgentDataTableRow>
    )
  }
  return (
    <>
      <CommonBackHeader title="commission.title" />
      <DataTable>
        <AgentDataTableHeader
          size="big"
          sx={{
            py: '$2',
            bg: theme.colors.$primaryAgent,
            color: 'white',
            borderTopWidth: StyleSheet.hairlineWidth,
            borderColor: '#8EC0FF',
            zIndex: 2,
            width,
            mt: Platform.OS === 'web' ? 15 : 0,
            position: Platform.OS === 'web' ? 'fixed' : 'relative',
          }}
        >
          <TitleCell
            sx={{ flex: 0.4, borderColor: '#8EC0FF' }}
            textStyle={{ px: 12, color: 'white' }}
          >
            {t('commission.type')}
          </TitleCell>
          <TitleCell center>{t('commission.cAgent')}</TitleCell>
          <TitleCell center>{t('commission.cPlayer')}</TitleCell>
          <TitleCell border={false} center>
            {t('commission.cPlayerReferrer')}
          </TitleCell>
        </AgentDataTableHeader>
      </DataTable>

      <View
        sx={{ flex: 1, zIndex: -1, marginTop: Platform.OS === 'web' ? 60 : 0 }}
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
