import { FlashList } from '@shopify/flash-list'
import DataTable from 'app/components/dataTable/DataTable'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import { Currency } from 'app/utils/constant'
import { View } from 'dripsy'
import React from 'react'
import { Platform } from 'react-native'
import { useCommissionTableQuery } from 'services/contentApi'
import { CommissionTableResult } from 'services/contentApi.type'

const CommissionTitle = [
  'LOTTERY',
  'SPORTSBOOK',
  'ESPORTS',
  'VIRTUAL SPORTS',
  'CASINO',
  'LIVE CASINO',
  'GAMES',
  'FISHING',
  'COCKFIGHTING',
]

const CommissionTableScreen = () => {
  const { t } = useLocalization()
  const { commissionList } = useCommissionTableQuery(
    { currency: Currency.VND },
    {
      selectFromResult: ({ data }) => ({ commissionList: data?.data }),
    }
  )

  const parseCommissionList = commissionList?.slice(1)

  const fillColumn = (value) => {
    return value ? value + '%' : '⎯'
  }

  const onRender = ({
    item,
    index,
  }: {
    item: CommissionTableResult
    index: number
  }) => {
    const isTitle = item.is_game_type
    const paddingLeft = isTitle ? 12 : 24

    return (
      <DataTable.Row
        key={`${index} ${item.seq}`}
        size={isTitle ? 'big' : 'small'}
        containerStyle={{
          bg: isTitle ? '$primary.300' : 'none',
        }}
      >
        <DataTable.Cell
          bordered={isTitle ? false : true}
          center={false}
          containerStyle={{
            flex: isTitle ? 1 : 0.4,
          }}
          textStyle={{
            fontWeight: isTitle ? 'bold' : 'normal',
            paddingLeft,
            px: 12,
          }}
        >
          {isTitle ? item.game_type : item.system_code}
        </DataTable.Cell>
        <DataTable.Cell
          bordered={isTitle ? false : true}
          center
          containerStyle={{ flex: 0.2 }}
        >
          {isTitle ? '' : fillColumn(item.cash_player)}
        </DataTable.Cell>
        <DataTable.Cell
          bordered={isTitle ? false : true}
          center
          containerStyle={{ flex: 0.2 }}
        >
          {isTitle ? '' : fillColumn(item.cash_player_referrer)}
        </DataTable.Cell>
        <DataTable.Cell
          bordered={isTitle ? false : true}
          center
          containerStyle={{ flex: 0.2 }}
        >
          {isTitle ? '' : fillColumn(item.credit_player)}
        </DataTable.Cell>
      </DataTable.Row>
    )
  }

  return (
    <PageWithBackHeader
      header={{ title: t('menu.commisionTable') }}
      disableScrollView
    >
      <DataTable>
        <DataTable.Header
          size="big"
          containerStyle={{
            color: 'white',
            zIndex: 2,
            mt: Platform.OS === 'web' ? 15 : 0,
            position: Platform.OS === 'web' ? 'fixed' : 'relative',
            bg: '$background',
          }}
        >
          <TitleCell containerStyle={{ flex: 0.4 }}>
            {t('commission.productLists').toUpperCase()}
          </TitleCell>
          <TitleCell center>
            {t('commission.cashPlayer').toUpperCase()}
          </TitleCell>
          <TitleCell center>
            {t('commission.cashPlayerReferral').toUpperCase()}
          </TitleCell>
          <TitleCell center>
            {t('commission.creditPlayer').toUpperCase()}
          </TitleCell>
        </DataTable.Header>
      </DataTable>
      <View
        sx={{
          flex: 1,
          zIndex: -1,
          marginTop: Platform.OS === 'web' ? 60 : 0,
        }}
      >
        <FlashList
          data={parseCommissionList}
          renderItem={onRender}
          estimatedItemSize={40}
        />
      </View>
    </PageWithBackHeader>
  )
}

export const TitleCell = ({ border = true, children, ...rest }) => (
  <DataTable.Title
    numberOfLines={4}
    textStyle={{
      color: 'white',
      textAlign: 'center',
      lineHeight: 15,
      fontSize: 12,
    }}
    containerStyle={{ flex: 0.2 }}
    {...rest}
  >
    {children}
  </DataTable.Title>
)
export default CommissionTableScreen
