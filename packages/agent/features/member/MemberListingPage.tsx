import AgentDataTableCell from 'agent/components/DataTable/AgentDataTableCell'
import AgentDataTableHeader from 'agent/components/DataTable/AgentDataTableHeader'
import AgentDataTableRow from 'agent/components/DataTable/AgentDataTableRow'
import AgentDataTableTitle from 'agent/components/DataTable/AgentDataTableTitle'
import TableListing, { LIMIT } from 'agent/components/DataTable/TableListing'
import Text from 'agent/components/Text'
import {
  DateFilter,
  MemberStatusFilter,
  getMemberStatus,
} from 'agent/constant/select'
import useTableListing from 'agent/hooks/useTableListing'
import { useMemberListQuery } from 'agent/services/agentApi'
import { MemberListResult } from 'agent/services/agentApi.type'
import { DateTimeField } from 'app/components/dataTable/DataTableCell'
import { useAgentLocalization } from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import dayjs from 'dayjs'
import { View, styled } from 'dripsy'
import { useState } from 'react'
import { useModal } from 'react-native-modalfy'
import AgentFloatingContent from '../floatingContent'

export type MemberListFilterOptions = {
  date: DateFilter | string | undefined
  startDate: Date | string
  endDate: Date | string
  username: string
  status: MemberStatusFilter | string | undefined
}

type MemberListProps = {
  item: MemberListResult
  index: number
}

const MemberListScreen = () => {
  const { t } = useAgentLocalization()
  const currency = useAppSelector((s) => s.agent.currency)
  const { openModal } = useModal()
  const [offset, setOffset] = useState(0)
  const [filter, setFilter] = useState<MemberListFilterOptions>({
    date: '',
    startDate: dayjs().startOf('date').toDate(),
    endDate: dayjs().endOf('date').toDate(),
    status: '',
    username: '',
  })

  const { data, totalData, isFetching, refetch } = useMemberListQuery(
    {
      start: offset * LIMIT,
      length: LIMIT,
      currency,
      registerdate_start: filter.date
        ? `${dayjs(filter.startDate).format(
            'YYYY-MM-DD HH:mm:ss Z'
          )} to ${dayjs(filter.endDate).format('YYYY-MM-DD HH:mm:ss Z')}`
        : '',
      username: filter.username,
      status: filter.status,
    },
    {
      selectFromResult: ({ data, isFetching, isSuccess }) => {
        return {
          isFetching: isFetching,
          data: data?.result?.data,
          totalData: data?.result?.recordsTotal,
        }
      },
      // skip: !isAgent,
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

  const firstCellStyle = { flexGrow: 0, flexBasis: 40, px: '$1' }

  const onRenderHeader = () => (
    <AgentDataTableHeader>
      <AgentDataTableTitle bordered center sx={firstCellStyle}>
        #
      </AgentDataTableTitle>
      <AgentDataTableTitle bordered center>
        {t('common.username')}
      </AgentDataTableTitle>
      <AgentDataTableTitle bordered center>
        {t('shAgent.regDate')}
      </AgentDataTableTitle>
      <AgentDataTableTitle center>{t('common.status')}</AgentDataTableTitle>
    </AgentDataTableHeader>
  )

  const onRenderItem = ({ item, index }: MemberListProps) => (
    <AgentDataTableRow size="big" sx={{ bg: 'transparent' }}>
      <AgentDataTableCell bordered center sx={firstCellStyle}>
        {index + 1}
      </AgentDataTableCell>
      <AgentDataTableCell bordered>{item.username}</AgentDataTableCell>
      <AgentDataTableCell bordered center>
        <DateTimeField dateTime={item.register_date} />
      </AgentDataTableCell>
      <AgentDataTableCell center>
        <SwitchView active={item.status === '0'}>
          <Text
            numberOfLines={1}
            sx={{
              textAlign: 'center',
              color: item.status === '0' ? '#043B02' : 'white',
            }}
          >
            {t(getMemberStatus(item.status))}
          </Text>
        </SwitchView>
      </AgentDataTableCell>
    </AgentDataTableRow>
  )

  const onFilter = () => {
    openModal('FilterMemberListingModal', {
      filterOptions: filter,
      onConfirm: (value: MemberListFilterOptions) => {
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
        data={data}
        renderHeader={onRenderHeader}
        renderItem={onRenderItem}
        keyExtractor={(item, index) => (item as MemberListResult).player_id}
        onLoadMore={onLoadMore}
        onRefresh={onRefresh}
        isFetching={isFetching}
        containerStyle={{ flex: 1 }}
        extraData={t}
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
