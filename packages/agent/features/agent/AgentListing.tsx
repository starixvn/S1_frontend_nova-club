import DataTable from 'agent/components/DataTable/DataTable'
import { DateTimeField } from 'agent/components/DataTable/DataTableCell'
import TableListing from 'agent/components/DataTable/TableListing'
import Switch from 'agent/components/Switch'
import Text from 'agent/components/Text'
import { DateFilter, ShareholderStatusFilter } from 'agent/constant/select'
import useTableListing from 'agent/hooks/useTableListing'
import {
  useAgentListQuery,
  useAgentSetStatusMutation,
} from 'agent/services/agentApi'
import { AgentListResult } from 'agent/services/agentApi.type'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import { useAgentLocalization } from 'app/provider/localization'
import dayjs from 'dayjs'
import { Pressable, View } from 'dripsy'
import { useState } from 'react'
import { ListRenderItemInfo } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import AgentFloatingContent from '../floatingContent'

export type AgentListingFilterOptions = {
  date: DateFilter | string | undefined
  startDate: Date | string
  endDate: Date | string
  username: string
  status: ShareholderStatusFilter | string | undefined
}

type AgentListProps = {
  item: AgentListResult
  index: number
}

const LIMIT = 10
const AgentListing = () => {
  const { t } = useAgentLocalization()
  const { push } = useContextualRouter()
  const { openModal } = useModal()

  const [offset, setOffset] = useState(0)
  const [isLoadingIndex, setIsLoadingIndex] = useState(0)
  const [filter, setFilter] = useState<AgentListingFilterOptions>({
    date: '',
    startDate: dayjs().startOf('date').toDate(),
    endDate: dayjs().endOf('date').toDate(),
    status: '',
    username: '',
  })

  const [updateStatus, { isLoading }] = useAgentSetStatusMutation()
  const { agentData, totalData, hasMorePage, isFetching, refetch } =
    useAgentListQuery(
      {
        start: offset * LIMIT,
        length: LIMIT,
        created_at: filter.date
          ? `${dayjs(filter.startDate).format(
              'YYYY-MM-DD HH:mm:ss Z'
            )} to ${dayjs(filter.endDate).format('YYYY-MM-DD HH:mm:ss Z')}`
          : '',
        username: filter.username,
        active: filter.status,
      },
      {
        selectFromResult: ({ data, isFetching, isSuccess }) => {
          return {
            isFetching,
            agentData: isSuccess ? data?.result?.data : [],
            totalData: data?.result?.recordsTotal ?? 0,
            hasMorePage: data?.result?.recordsTotal ?? 0 >= offset * LIMIT,
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

  const firstCellStyle = { flexGrow: 0, flexBasis: 40, px: '$1' }

  const onRenderHeader = () => (
    <DataTable.Header>
      <DataTable.Title bordered center containerStyle={firstCellStyle}>
        #
      </DataTable.Title>
      <DataTable.Title bordered center>
        {t('common.username')}
      </DataTable.Title>
      <DataTable.Title bordered center>
        {t('shAgent.regDate')}
      </DataTable.Title>
      <DataTable.Title center>{t('common.status')}</DataTable.Title>
    </DataTable.Header>
  )

  const onRenderItem = ({
    item,
    index,
  }: ListRenderItemInfo<AgentListResult>) => (
    <DataTable.Row size="big" sx={{ bg: 'transparent' }}>
      <DataTable.Cell bordered center containerStyle={firstCellStyle}>
        {index + 1}
      </DataTable.Cell>
      <DataTable.Cell bordered>
        <Pressable
          sx={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
          }}
          onPress={() => onNavigate(item.id)}
        >
          <Text sx={{ textDecorationLine: 'underline', color: 'blue' }}>
            {item.username}
          </Text>
        </Pressable>
      </DataTable.Cell>
      <DataTable.Cell bordered center>
        <DateTimeField
          date={dayjs(item.created_at).format('YYYY-MM-DD')}
          time={dayjs(item.created_at).format('HH:mm:ss')}
        />
      </DataTable.Cell>
      <DataTable.Cell center>
        <Switch
          isActive={!!Number(item.active)}
          isLoading={index === isLoadingIndex ? isLoading : false}
          onPress={() => handleToggle(item.id, item.active, index)}
        />
      </DataTable.Cell>
    </DataTable.Row>
  )

  const handleToggle = async (id, status, loadingIndex) => {
    let activeStatus =
      status === ShareholderStatusFilter.ACTIVE
        ? ShareholderStatusFilter.INACTIVE
        : ShareholderStatusFilter.ACTIVE
    setIsLoadingIndex(loadingIndex)

    const { success, message } = await updateStatus({
      agent_id: id,
      status: activeStatus,
    })
      .unwrap()
      .catch((error) => {
        Toast.show({ type: 'error', text1: error?.message })
        return error
      })

    if (success) Toast.show({ type: 'success', text1: message })
  }

  const onNavigate = (id) => {
    push(`/agent/list/agent/${id}`)
  }

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

export default AgentListing
