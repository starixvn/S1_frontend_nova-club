import RefreshIconButton from 'app/components/form/IconButton/RefreshButton'
import GradientBox from 'app/components/GradientBox'
import HistoryEmpty from 'app/components/history/HistoryEmpty'
import useLocalization from 'app/provider/localization'
import { toCurrency } from 'app/utils'
import {
  Currency,
  ReportDepositStatus,
  ReportTransactionType,
} from 'app/utils/constant'
import dayjs from 'dayjs'
import { Text, View } from 'dripsy'
import { usePlayerProfileQuery, usePlayerReportQuery } from 'services/playerApi'
import DateTimeCell from '../profile/history/DateTimeCell'
const dummyData = [
  {
    type: 1,
  },
]

const RecentTransactions = () => {
  const { t } = useLocalization()
  const { data, isFetching, refetch } = usePlayerReportQuery({
    limit: 5,
    offset: 0,
    status: ReportDepositStatus.ALL,
    time_from: dayjs()
      .subtract(2, 'month')
      .startOf('date')
      .format('YYYY-MM-DD HH:mm:ss'),
    time_to: dayjs().endOf('date').format('YYYY-MM-DD HH:mm:ss'),
    trans_type: ReportTransactionType.DEPOSIT,
  })

  return (
    <View>
      <View
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          m: '$4',
        }}
      >
        <Text sx={{}}>{t('transaction.transactions')}</Text>
        <RefreshIconButton loading={isFetching} onPress={() => refetch()} />
      </View>

      {data?.row_count_total ?? 0 > 0 ? (
        data?.rows.map((item) => <TableItem key={item.secure_id} item={item} />)
      ) : (
        <HistoryEmpty />
      )}
    </View>
  )
}

const CELL_DATE_WIDTH = 1
const CELL_AMOUNT_WIDTH = 1
const CELL_STATUS_WIDTH = 1

const TableItem = ({ item }) => {
  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.data?.currency as Currency

  const getStatusColor = (value: string) => {
    switch (value.toLowerCase()) {
      case ReportDepositStatus.PENDING.toLowerCase():
        return '#13A9C8'
      default:
        return '#FFF'
    }
  }

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
        <View style={{ flex: CELL_DATE_WIDTH }}>
          <DateTimeCell date={item.date} />
        </View>
        <View style={{ flex: CELL_AMOUNT_WIDTH }}>
          <Text sx={{ textAlign: 'center' }}>
            {toCurrency(item.amount, currency, {
              symbol: false,
              hideTruncatedThousand: false,
            })}
          </Text>
        </View>
        <View style={{ flex: CELL_STATUS_WIDTH }}>
          <Text
            sx={{ textAlign: 'center', color: getStatusColor(item.status) }}
          >
            {item.status}
          </Text>
        </View>
      </View>
    </GradientBox>
  )
}

export default RecentTransactions
