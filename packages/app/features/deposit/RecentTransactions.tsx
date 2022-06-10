import IconButton from 'app/components/form/IconButton'
import RefreshIconButton from 'app/components/form/IconButton/RefreshButton'
import GradientBox from 'app/components/GradientBox'
import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import { useDummyRtk } from 'utils/rtk'
const dummyData = [
  {
    type: 1,
  },
]
const RecentTransactions = () => {
  const { data, isLoading, isFetching, refetch } = useDummyRtk(dummyData)
  const { t } = useLocalization()

  return (
    <View>
      <View
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          m: '$4',
          bg: 'red',
        }}
      >
        <Text sx={{}}>{t('transaction.transactions')}</Text>
        <RefreshIconButton loading={isFetching} onPress={refetch} />
      </View>
      <GradientBox>
        <Text>a</Text>
      </GradientBox>
      <GradientBox>
        <Text>a</Text>
      </GradientBox>
      <GradientBox>
        <Text>a</Text>
      </GradientBox>
    </View>
  )
}

export default RecentTransactions
