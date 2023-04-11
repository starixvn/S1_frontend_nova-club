import DataTable from 'agent/components/DataTable/DataTable'
import { DateTimeField } from 'agent/components/DataTable/DataTableCell'
import TableListing from 'agent/components/DataTable/TableListing'
import Text from 'agent/components/Text'
import { DateFilter, ShareholderStatusFilter } from 'agent/constant/select'
import { useMemberListQuery } from 'agent/services/agentApi'
import { MemberListResult } from 'agent/services/agentApi.type'
import { useAgentLocalization } from 'app/provider/localization'
import { Currency } from 'app/utils/constant'
import dayjs from 'dayjs'
import { styled, View } from 'dripsy'
import { useState } from 'react'
import { useModal } from 'react-native-modalfy'
import { AgentListingFilterOptions } from '../agent/AgentListing'
import AgentFloatingContent from '../floatingContent'
import useTableListing from 'agent/hooks/useTableListing'

export type MemberListFilterOptions = {
  date: DateFilter | string | undefined
  startDate: Date | string
  endDate: Date | string
  username: string
  status: ShareholderStatusFilter | string | undefined
}

type MemberListProps = {
  item: MemberListResult
  index: number
}

const LIMIT = 10
const MemberListScreen = () => {
  const { t } = useAgentLocalization()
  const { openModal } = useModal()
  const [offset, setOffset] = useState(0)
  const [filter, setFilter] = useState<MemberListFilterOptions>({
    date: '',
    startDate: dayjs().startOf('month').toDate(),
    endDate: dayjs().endOf('date').toDate(),
    status: '',
    username: '',
  })

  const { agentData, totalData, isFetching, refetch } = useMemberListQuery(
    {
      start: offset * LIMIT,
      length: LIMIT,
      currency: Currency.VND,
      registerdate_start: filter.date
        ? `${dayjs(filter.startDate)
            .utc()
            .startOf('date')
            .format('YYYY-MM-DD HH:mm:ss')} to ${dayjs(filter.endDate)
            .utc()
            .endOf('date')
            .format('YYYY-MM-DD HH:mm:ss')}`
        : '',
      username: filter.username,
      status: filter.status,
    },
    {
      selectFromResult: ({ data, isFetching, isSuccess }) => {
        return {
          isFetching,
          agentData: isSuccess ? data?.result?.data : [],
          totalData: data?.result?.recordsTotal ?? 0,
        }
      },
    }
  )

  const { onLoadMore, onRefresh } = useTableListing({
    offset,
    setOffset,
    LIMIT,
    totalData,
    isFetching,
    refetch,
  })

  const firstCellStyle = { flex: 1 / 2 }

  const onRenderHeader = () => (
    <DataTable.Header>
      <DataTable.Title bordered center style={firstCellStyle}>
        #
      </DataTable.Title>
      <DataTable.Title bordered>{t('common.username')}</DataTable.Title>
      <DataTable.Title bordered>{t('shAgent.regDate')}</DataTable.Title>
      <DataTable.Title center>{t('shAgent.filter')}</DataTable.Title>
    </DataTable.Header>
  )

  const onRenderItem = ({ item, index }: MemberListProps) => (
    <DataTable.Row size="big" sx={{ bg: 'transparent' }}>
      <DataTable.Cell bordered center style={firstCellStyle}>
        {index + 1}
      </DataTable.Cell>
      <DataTable.Cell bordered>{item.username}</DataTable.Cell>
      <DataTable.Cell bordered center>
        <DateTimeField
          from={dayjs(item.register_date).format('YYYY-MM-DD')}
          to={dayjs(item.register_date).format('HH:mm:ss')}
        />
      </DataTable.Cell>
      <DataTable.Cell center>
        <SwitchView active={!!Number(item.status)}>
          <Text
            sx={{
              textAlign: 'center',
              color: !!Number(item.status) ? '#043B02' : 'white',
            }}
          >
            {!!Number(item.status) ? t('common.active') : t('common.suspended')}
          </Text>
        </SwitchView>
      </DataTable.Cell>
    </DataTable.Row>
  )

  const onFilter = () => {
    openModal('FilterAgentListingModal', {
      filterOptions: filter,
      onConfirm: (value: AgentListingFilterOptions) => {
        setFilter({
          date: value.date,
          endDate: value.endDate,
          startDate: value.startDate,
          username: value.username,
          status: value.status,
        })
        setOffset(0)
      },
    })
  }

  return (
    <View sx={{ flex: 1 }}>
      <TableListing
        title={`${t('shAgent.totalMember')} : ${totalData}`}
        titleCenter
        data={agentData}
        renderHeader={onRenderHeader}
        renderItem={onRenderItem}
        keyExtractor={(item, index) => `${index} Table ${item.username}`}
        onLoadMore={onLoadMore}
        onRefresh={onRefresh}
        isFetching={isFetching}
        containerStyle={{ flex: 1 }}
      />

      <AgentFloatingContent onPress={onFilter} />
    </View>
  )
}

const SwitchView = styled(View)(({ active }: { active: boolean }) => ({
  width: 90,
  borderRadius: 100,
  p: 4,
  bg: active ? '#65FE00' : '#CC000F',
  borderColor: active ? '#047600' : '#FFCED2',
  borderWidth: 1,
}))

export default MemberListScreen
