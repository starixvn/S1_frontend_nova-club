import Text from 'agent/components/Text'
import { UserTotalDownline } from 'agent/services/userApi.type'
import { useAgentLocalization } from 'app/provider/localization'
import { styled, View } from 'dripsy'
import { useEffect, useState } from 'react'
import { PieChart } from 'react-native-chart-kit'
import { ParseDownlineChart } from './ParseDownlineChart'
import EmptyResult from 'app/components/dataTable/EmptyResult'

interface ProfileChartProps {
  downline: UserTotalDownline
}

const ProfileChart = ({ downline }: ProfileChartProps) => {
  const [hasChart, setHasChart] = useState(true)
  const data = ParseDownlineChart({
    downline,
  })

  const checkHasChart = () => {
    const allFalse = data.every((d) => !d.showChart)
    setHasChart(!allFalse)
  }

  useEffect(() => {
    checkHasChart()
  }, [data])

  return (
    <View sx={{ pt: '$5', pb: '$5' }}>
      <>
        {data.map((d, index) => {
          return d.showChart ? (
            <ChartRow key={d.chartName}>
              <Chart data={d.chart} type={d.chartName} />
            </ChartRow>
          ) : null
        })}
        {!hasChart && <EmptyResult />}
      </>
    </View>
  )
}

const Chart = ({ data, type }) => {
  const { t } = useAgentLocalization()
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
