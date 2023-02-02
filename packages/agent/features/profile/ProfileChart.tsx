import { UserTotalDownline } from 'agent/services/userApi.type'
import useLocalization from 'app/provider/localization'
import { styled, View } from 'dripsy'
import { PieChart } from 'react-native-chart-kit'
import { ParseDownlineChart } from './ParseDownlineChart'
import Text from 'agent/components/Text'

interface ProfileChartProps {
  downline: UserTotalDownline
}

const ProfileChart = ({ downline }: ProfileChartProps) => {
  const data = ParseDownlineChart({
    downline,
  })
  return (
    <>
      {data.map((d, index) => {
        return d.showChart ? (
          <ChartRow key={d.chartName}>
            <Chart data={d.chart} type={d.chartName} />
          </ChartRow>
        ) : null
      })}
    </>
  )
}

const Chart = ({ data, type }) => {
  const { t } = useLocalization()
  return (
    <View sx={{ alignItems: 'center' }}>
      <PieChart
        data={data}
        width={300}
        height={125}
        chartConfig={{
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor={'amount'}
        backgroundColor={'transparent'}
        paddingLeft={'0'}
      />
      <Text>{t(type)}</Text>
    </View>
  )
}

const ChartRow = styled(View)({
  flexDirection: 'row',
  justifyContent: 'center',
  py: '$4',
})
export default ProfileChart
