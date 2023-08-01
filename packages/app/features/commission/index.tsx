import DataTable from 'app/components/dataTable/DataTable'
import DataTableTitle from 'app/components/dataTable/DataTableTitle'
import FormContainer from 'app/components/form/FormContainer'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import { ScrollFlashList } from 'app/hoc/withCustomScroll'
import useLocalization from 'app/provider/localization'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Currency } from 'app/utils/constant'
import isDesktop from 'app/utils/isDesktop'
import { SxProp, Text, View } from 'dripsy'
import React, { ComponentProps, ReactNode } from 'react'
import { Platform } from 'react-native'
import { useCommissionTableQuery } from 'services/contentApi'
import { CommissionTableResult } from 'services/contentApi.type'

type TitleCellProps = {
  border?: boolean
  textStyle?: SxProp
  children: ReactNode
} & Partial<ComponentProps<typeof DataTableTitle>>

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
  const desktop = isDesktop()
  const { bottom } = useSafeArea()
  const { commissionList } = useCommissionTableQuery(
    { currency: Currency.VND },
    {
      selectFromResult: ({ data }) => ({ commissionList: data?.data }),
    }
  )

  const parseCommissionList = commissionList?.slice(1).filter((item) => {
    return item.system_code === '' ||
      (item.cash_player > 0 &&
        item.cash_player_referrer > 0 &&
        item.cash_agent > 0)
      ? item
      : null
  })

  const fillColumn = (value) => {
    if ((value && value < 0) || typeof value === 'undefined') return '⎯'

    return `${value}%`
  }

  const TableHeader = () => (
    <DataTable>
      <DataTable.Header
        size="big"
        sx={{
          color: 'white',
          zIndex: 2,
          // mt: Platform.OS === 'web' ? (desktop ? 0 : 15) : 0,
          // position:
          //   Platform.OS === 'web'
          //     ? desktop
          //       ? 'relative'
          //       : 'absolute'
          //     : 'relative',
          bg: '$background',
        }}
      >
        <TitleCell
          center={false}
          sx={{ flex: 0.4 }}
          textStyle={{
            pl: 12,
          }}
        >
          {t('commision.productLists').toUpperCase()}
        </TitleCell>
        <TitleCell center>{t('commision.cashPlayer').toUpperCase()}</TitleCell>
        <TitleCell center>
          {t('commision.cashPlayerReferral').toUpperCase()}
        </TitleCell>
        <TitleCell center>{t('commision.cashAgent').toUpperCase()}</TitleCell>
      </DataTable.Header>
    </DataTable>
  )

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
        sx={{
          bg: isTitle ? '$primary.300' : 'none',
        }}
      >
        <DataTable.Cell
          bordered={isTitle ? false : true}
          center={false}
          sx={{
            flex: isTitle ? 1 : 0.4,
          }}
          textStyle={{
            fontWeight: isTitle ? 'bold' : 'normal',
            paddingLeft,
            px: 12,
          }}
        >
          {isTitle ? item.game_type : item.system_name}
        </DataTable.Cell>
        <DataTable.Cell
          bordered={isTitle ? false : true}
          center
          sx={{ flex: 0.2 }}
        >
          {isTitle ? '' : fillColumn(item.cash_player)}
        </DataTable.Cell>
        <DataTable.Cell
          bordered={isTitle ? false : true}
          center
          sx={{ flex: 0.2 }}
        >
          {isTitle ? '' : fillColumn(item.cash_player_referrer)}
        </DataTable.Cell>
        <DataTable.Cell
          bordered={isTitle ? false : true}
          center
          sx={{ flex: 0.2 }}
        >
          {isTitle ? '' : fillColumn(item.cash_agent)}
        </DataTable.Cell>
      </DataTable.Row>
    )
  }

  return (
    <PageWithBackHeader
      header={{ title: t('commision.title') }}
      disableScrollView
      hideHeader={desktop}
    >
      <FormContainer sx={{ flex: 1 }} hidePadding>
        <TableHeader />
        <View
          sx={{
            flex: 1,
            maxHeight: desktop ? '50vh' : '100%',
          }}
        >
          <ScrollFlashList
            overrideProps={{
              style: {
                /**
                 * !!!
                 * DO NOT REMOVE `minHeight` and `minWidth`
                 * !!!
                 *
                 * It is used inside `@shopify/FlashList` component internally. The reason
                 * to use this `overrideProps` is to add `overscroll-behaviour` for web to
                 * improve UX. However, to add this css property, the only way is to add
                 * via `overrideProps`. To prevent override the style used inside `@shopify/FlashList`
                 * component, the style used internally has to copy paste to below.
                 *
                 * See more:
                 * https://shopify.github.io/flash-list/docs/usage/#overrideprops
                 */
                minHeight: 1,
                minWidth: 1,
                /** */

                ...Platform.select({
                  web: {
                    overscrollBehavior: 'contain',
                  },
                }),
              },
            }}
            data={parseCommissionList}
            renderItem={onRender}
            estimatedItemSize={20}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: bottom,
            }}
          />
        </View>
      </FormContainer>
    </PageWithBackHeader>
  )
}

export const TitleCell = ({
  border = true,
  textStyle,
  children,
  ...rest
}: TitleCellProps) => (
  <DataTable.Title
    numberOfLines={4}
    textStyle={{
      color: 'white',
      textAlign: 'center',
      lineHeight: 15,
      fontSize: 12,
      ...textStyle,
    }}
    sx={{ flex: 0.2 }}
    {...rest}
  >
    {children}
  </DataTable.Title>
)
export default CommissionTableScreen
