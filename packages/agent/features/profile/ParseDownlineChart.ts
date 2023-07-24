import { UserTotalDownline } from 'agent/services/userApi.type'
import { NumberProp } from 'react-native-svg'

interface ChartProps {
  name: string
  amount: number
  color: string
  legendFontColor: string
  legendFontSize: NumberProp
  legendFontFamily?: string
}

interface ChartDataProps {
  chartName: string
  showChart: boolean
  chart: ChartProps[]
}

export type DownlineTableProps = {
  label: string
  direct: number
  indirect: number
}

const DIRECT_COLOR = '#95C4FF'
const INDIRECT_COLOR = '#0C7DFF'
const LEGEND_FONT_COLOR = '#7F7F7F'

export const ParseDownline = (downline: UserTotalDownline) => {
  const directMember = parseInt(downline?.direct_member_cnt ?? '0')
  const indirectMember =
    parseInt(downline?.total_member_cnt ?? '0') - directMember
  const directAgent = parseInt(downline?.agent_cnt ?? '0')
  const indirectAgent = parseInt(downline?.agent_total_cnt ?? '0') - directAgent
  const directShareholder = parseInt(downline?.shareholder_cnt ?? '0')
  const indirectShareholder =
    parseInt(downline?.shareholder_total_cnt ?? '0') - directShareholder

  return {
    directMember,
    indirectMember,
    directAgent,
    indirectAgent,
    directShareholder,
    indirectShareholder,
  }
}

export const ParseDownlineTable = (downline: UserTotalDownline | undefined) => {
  if (!downline) return []
  const {
    directMember,
    indirectMember,
    directAgent,
    indirectAgent,
    directShareholder,
    indirectShareholder,
  } = ParseDownline(downline)

  const downlineTable = [
    {
      label: 'Shareholder',
      direct: directShareholder,
      indirect: indirectShareholder,
    },
    { label: 'Agent', direct: directAgent, indirect: indirectAgent },
    { label: 'Member', direct: directMember, indirect: indirectMember },
  ]

  return downlineTable
}

export const ParseDownlineChart = ({
  downline,
}: {
  downline: UserTotalDownline
}) => {
  const {
    directMember,
    indirectMember,
    directAgent,
    indirectAgent,
    directShareholder,
    indirectShareholder,
  } = ParseDownline(downline)

  const shareholderChart: ChartProps[] = [
    {
      name: '(' + directShareholder + ')',
      amount: directShareholder,
      color: DIRECT_COLOR,
      legendFontColor: LEGEND_FONT_COLOR,
      legendFontSize: 15,
    },
    {
      name: '(' + indirectShareholder + ')',
      amount: indirectShareholder,
      color: INDIRECT_COLOR,
      legendFontColor: LEGEND_FONT_COLOR,
      legendFontSize: 15,
    },
  ]
  const agentChart: ChartProps[] = [
    {
      name: '(' + directAgent + ')',
      amount: directAgent,
      color: DIRECT_COLOR,
      legendFontColor: LEGEND_FONT_COLOR,
      legendFontSize: 15,
    },
    {
      name: '(' + indirectAgent + ')',
      amount: indirectAgent,
      color: INDIRECT_COLOR,
      legendFontColor: LEGEND_FONT_COLOR,
      legendFontSize: 15,
    },
  ]
  const memberChart: ChartProps[] = [
    {
      name: '(' + directMember + ')',
      amount: directMember,
      color: DIRECT_COLOR,
      legendFontColor: LEGEND_FONT_COLOR,
      legendFontSize: 15,
    },
    {
      name: '(' + indirectMember + ')',
      amount: indirectMember,
      color: INDIRECT_COLOR,
      legendFontColor: LEGEND_FONT_COLOR,
      legendFontSize: 15,
    },
  ]
  const chartData: ChartDataProps[] = [
    {
      chartName: 'profile.subShareholder',
      showChart: directShareholder <= 0 ? false : true,
      chart: shareholderChart,
    },
    {
      chartName: 'common.agent',
      showChart: directAgent <= 0 ? false : true,
      chart: agentChart,
    },
    {
      chartName: 'common.member',
      showChart: directMember <= 0 ? false : true,
      chart: memberChart,
    },
  ]
  return chartData
}
