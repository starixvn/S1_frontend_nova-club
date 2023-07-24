import AgentDataTableCell from 'agent/components/DataTable/AgentDataTableCell'
import AgentDataTableHeader from 'agent/components/DataTable/AgentDataTableHeader'
import AgentDataTableTitle from 'agent/components/DataTable/AgentDataTableTitle'
import TableListing, { LIMIT } from 'agent/components/DataTable/TableListing'
import IconButton from 'agent/components/Icon/IconButton'
import Switch from 'agent/components/Switch'
import Text from 'agent/components/Text'
import { DateFilter, ShareholderStatusFilter } from 'agent/constant/select'
import useTableListing from 'agent/hooks/useTableListing'
import {
  useShareholderListQuery,
  useShareholderSetStatusMutation,
} from 'agent/services/shareholderApi'
import { ShareholderListResult } from 'agent/services/shareholderApi.type'
import DataTable from 'app/components/dataTable/DataTable'
import { DateTimeField } from 'app/components/dataTable/DataTableCell'
import { useAgentLocalization } from 'app/provider/localization'
import dayjs from 'dayjs'
import { Pressable, View } from 'dripsy'
import { useState } from 'react'
import { ListRenderItemInfo } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useRouter } from 'solito/router'
import AgentFloatingContent from '../floatingContent'
import AgentDataTableRow from 'agent/components/DataTable/AgentDataTableRow'

export type ShareholderListingFilterOptions = {
  date: DateFilter | string | undefined
  startDate: Date | string
  endDate: Date | string
  username: string
  status: ShareholderStatusFilter | string | undefined
}

type RenderItemProps = {
  item: ShareholderListResult
  index: number
}

const ShareholderListing = () => {
  const { t } = useAgentLocalization()
  const { push } = useRouter()
  const { openModal } = useModal()

  const [offset, setOffset] = useState(0)
  const [isLoadingIndex, setIsLoadingIndex] = useState(0)
  const [filter, setFilter] = useState<ShareholderListingFilterOptions>({
    date: '',
    startDate: dayjs().startOf('date').toDate(),
    endDate: dayjs().endOf('date').toDate(),
    status: '',
    username: '',
  })

  const [updateStatus, { isLoading }] = useShareholderSetStatusMutation()

  const { shareholderData, totalData, isFetching, refetch } =
    useShareholderListQuery(
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
        selectFromResult: ({ data, isFetching, isSuccess }) => ({
          isFetching,
          shareholderData: isSuccess ? data?.result?.data : [],
          totalData: data?.result?.recordsTotal ?? 0,
        }),
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
  const thirdCellStyle = { flexGrow: 0, flexBasis: 60 }

  const handleEdit = (id, pt) => {
    openModal('EditPTModal', { id, pt })
  }

  const onRenderHeader = () => (
    <AgentDataTableHeader>
      <AgentDataTableTitle bordered center sx={firstCellStyle}>
        #
      </AgentDataTableTitle>
      <AgentDataTableTitle bordered center>
        {t('common.username')}
      </AgentDataTableTitle>
      <AgentDataTableTitle bordered center sx={thirdCellStyle}>
        PT %
      </AgentDataTableTitle>
      <AgentDataTableTitle bordered center>
        {t('shAgent.regDate')}
      </AgentDataTableTitle>
      <AgentDataTableTitle center>{t('common.status')}</AgentDataTableTitle>
    </AgentDataTableHeader>
  )

  const onRenderItem = ({
    item,
    index,
  }: ListRenderItemInfo<ShareholderListResult>) => {
    return (
      <AgentDataTableRow size="big">
        <AgentDataTableCell bordered center sx={firstCellStyle}>
          {index + 1}
        </AgentDataTableCell>
        <AgentDataTableCell bordered>
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
        </AgentDataTableCell>
        <AgentDataTableCell bordered center sx={thirdCellStyle}>
          <Text sx={{ color: 'black' }}>{item.earning_perc}</Text>
          <IconButton
            name="edit"
            size={16}
            color="$primaryAgent"
            sx={{ ml: 8 }}
            onPress={() => handleEdit(item.id, item.earning_perc)}
          />
        </AgentDataTableCell>
        <AgentDataTableCell bordered center>
          <DateTimeField dateTime={item.created_at} />
        </AgentDataTableCell>
        <AgentDataTableCell center>
          <Switch
            isActive={!!Number(item.active)}
            isLoading={index === isLoadingIndex ? isLoading : false}
            onPress={() => handleToggle(item.id, item.active, index)}
          />
        </AgentDataTableCell>
      </AgentDataTableRow>
    )
  }

  const handleToggle = async (id, status, loadingIndex) => {
    let activeStatus =
      status === ShareholderStatusFilter.ACTIVE
        ? ShareholderStatusFilter.INACTIVE
        : ShareholderStatusFilter.ACTIVE

    setIsLoadingIndex(loadingIndex)

    const { success, message } = await updateStatus({
      shareholder_id: id,
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
    push(`/agent/list/shareholder/${id}`)
  }

  const onFilter = () => {
    openModal('FilterShareholderListingModal', {
      filterOptions: filter,
      onConfirm: (value: ShareholderListingFilterOptions) => {
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
        title={`${t('shAgent.totalShareholder')} : ${totalData}`}
        data={shareholderData}
        renderHeader={onRenderHeader}
        renderItem={onRenderItem}
        keyExtractor={(item, index) => `${index} Table ${item.username}`}
        onLoadMore={onLoadMore}
        onRefresh={onRefresh}
        isFetching={isFetching}
        extraData={isLoading}
      />

      <AgentFloatingContent onPress={onFilter} />
    </View>
  )
}

export default ShareholderListing
