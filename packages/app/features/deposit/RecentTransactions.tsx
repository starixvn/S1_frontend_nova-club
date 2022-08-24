import RefreshIconButton from 'app/components/form/IconButton/RefreshButton'
import GradientBox from 'app/components/GradientBox'
import HistoryEmpty from 'app/components/history/HistoryEmpty'
import Icon from 'app/components/Icon'
import PaymentMethod from 'app/config/deposit'
import { getStatusColor } from 'app/config/status'
import useLocalization from 'app/provider/localization'
import { toCurrency } from 'app/utils'
import {
  Currency,
  ReportDepositStatus,
  ReportDepositStatusOptions,
  ReportTransactionType,
} from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import { ActivityIndicator, styled, Text, useDripsyTheme, View } from 'dripsy'
import { usePlayerProfileQuery, usePlayerReportQuery } from 'services/playerApi'
import DateTimeCell from '../profile/history/DateTimeCell'

const RecentTransactions = () => {
  const { t } = useLocalization()
  const { data, isFetching, isLoading, refetch } = usePlayerReportQuery(
    {
      limit: 5,
      offset: 0,
      status: ReportDepositStatus.ALL,
      time_from: dayjsTz().subtract(2, 'month').startOf('date').toISOString(),
      time_to: dayjsTz().endOf('date').toISOString(),
      trans_type: ReportTransactionType.DEPOSIT,
    },
    { refetchOnMountOrArgChange: true }
  )

  return (
    <View>
      <View
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text>{t('transaction.recent')}</Text>
        <RefreshIconButton loading={isFetching} onPress={() => refetch()} />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : data?.data?.row_count_total ?? 0 > 0 ? (
        data?.data?.rows.map((item) => (
          <TableItem key={item.secure_id} item={item} />
        ))
      ) : (
        <HistoryEmpty />
      )}
    </View>
  )
}

const CELL_CATEGORY_WIDTH = 0.4
const CELL_DATE_WIDTH = 0.3
const CELL_STATUS_WIDTH = 0.3

const TableItem = ({ item }) => {
  const { t } = useLocalization()
  const { theme } = useDripsyTheme()
  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.data?.currency as Currency

  const category = PaymentMethod.find(
    (el) => el.categoryId === item.second_category_flag
  )
  const status = ReportDepositStatusOptions.find(
    (el) => t(el.label) === item.status
  )?.value

  return (
    <GradientBox>
      <View
        sx={{
          flex: 1,
          alignSelf: 'stretch',
          flexDirection: 'row',
          p: '$3',
          alignItems: 'center',
        }}
      >
        <View
          sx={{
            flex: CELL_CATEGORY_WIDTH,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <IconWrap sx={{ bg: category.color, mr: '$4' }}>
            <Icon name={category.icon} size={ICON_SIZE * 0.6} />
          </IconWrap>
          <Text sx={{ fontWeight: 'bold', flex: 1 }}>{t(category.name)}</Text>
        </View>

        <View
          sx={{
            flex: CELL_DATE_WIDTH,
            alignItems: 'center',
            px: '$1',
          }}
        >
          <DateTimeCell date={item.date} />
        </View>

        <View sx={{ flex: CELL_STATUS_WIDTH, alignItems: 'flex-end' }}>
          <Text>
            {toCurrency(item.amount, currency, {
              symbol: false,
              hideTruncatedThousand: false,
            })}
          </Text>
          <Text
            sx={{
              color: getStatusColor(status, theme),
              textAlign: 'right',
            }}
          >
            {item.status}
          </Text>
        </View>
      </View>
    </GradientBox>
  )
}

const ICON_SIZE = 48
const IconWrap = styled(View)({
  height: ICON_SIZE,
  width: ICON_SIZE,
  borderRadius: ICON_SIZE,
  borderWidth: 2,
  borderColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  m: '$1',
})

export default RecentTransactions
