import DataTable from 'agent/components/DataTable/DataTable'
import { DateTimeField } from 'agent/components/DataTable/DataTableCell'
import TableListing from 'agent/components/DataTable/TableListing'
import IconButton from 'agent/components/Icon/IconButton'
import Switch from 'agent/components/Switch'
import Text from 'agent/components/Text'
import { DateFilter, ShareholderStatusFilter } from 'agent/constant/select'
import { useShareholderListQuery } from 'agent/services/shareholderApi'
import { ShareholderListResult } from 'agent/services/shareholderApi.type'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import { useAgentLocalization } from 'app/provider/localization'
import dayjs from 'dayjs'
import { Pressable, View } from 'dripsy'
import { useState } from 'react'
import { useModal } from 'react-native-modalfy'
import AgentFloatingContent from '../floatingContent'

export type ShareholderListingFilterOptions = {
  date: DateFilter | string | undefined
  startDate: Date | string
  endDate: Date | string
  username: string
  status: ShareholderStatusFilter | string | undefined
}

const LIMIT = 10
const ShareholderListing = () => {
  const { t } = useAgentLocalization()
  const [offset, setOffset] = useState(0)
  const [filter, setFilter] = useState<ShareholderListingFilterOptions>({
    date: '',
    startDate: dayjs().startOf('month').toDate(),
    endDate: dayjs().endOf('date').toDate(),
    status: '',
    username: '',
  })

  const { push } = useContextualRouter()
  const { openModal } = useModal()

  const { shareholderData, totalData, hasMorePage, isFetching, refetch } =
    useShareholderListQuery(
      {
        start: offset * LIMIT,
        length: LIMIT,
        created_at: filter.date
          ? `${dayjs(filter.startDate).format(
              'YYYY-MM-DD HH:mm:ss'
            )} to ${dayjs(filter.endDate).format('YYYY-MM-DD HH:mm:ss')}`
          : '',
        username: filter.username,
        active: filter.status,
      },
      {
        selectFromResult: ({ data, isFetching, isSuccess }) => ({
          isFetching,
          shareholderData: isSuccess ? data?.result?.data : [],
          totalData: data?.result?.recordsTotal ?? 0,
          hasMorePage: data?.result?.recordsTotal ?? 0 >= offset * LIMIT,
        }),
      }
    )

  const firstCellStyle = { flex: 1 / 3 }
  const thirdCellStyle = { flex: 1 / 2 }

  const onRenderHeader = () => (
    <DataTable.Header>
      <DataTable.Title bordered center style={firstCellStyle}>
        #
      </DataTable.Title>
      <DataTable.Title bordered>{t('common.username')}</DataTable.Title>
      <DataTable.Title bordered center style={thirdCellStyle}>
        PT %
      </DataTable.Title>
      <DataTable.Title bordered>{t('shAgent.regDate')}</DataTable.Title>
      <DataTable.Title center>{t('shAgent.filter')}</DataTable.Title>
    </DataTable.Header>
  )

  const onRenderItem = ({
    item,
    index,
  }: {
    item: ShareholderListResult
    index: number
  }) => (
    <DataTable.Row size="big" sx={{ bg: 'transparent' }}>
      <DataTable.Cell bordered center style={firstCellStyle}>
        {item.id}
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
      <DataTable.Cell bordered center style={thirdCellStyle}>
        <Text sx={{ color: 'black' }}>{item.earning_perc}</Text>
        <IconButton
          name="edit"
          size={16}
          color="$primaryAgent"
          sx={{ ml: 8 }}
        />
      </DataTable.Cell>
      <DataTable.Cell bordered center>
        <DateTimeField
          from={dayjs(item.created_at).format('YYYY-MM-DD')}
          to={dayjs(item.created_at).format('HH:mm:ss')}
        />
      </DataTable.Cell>
      <DataTable.Cell center>
        <Switch isActive={!!item.active} />
      </DataTable.Cell>
    </DataTable.Row>
  )

  const onLoadMore = () => {
    hasMorePage && !isFetching && setOffset((prev) => prev + 1)
  }

  const onRefresh = async () => {
    if (!offset) return refetch()
    setOffset(0)
  }

  const onNavigate = (id) => {
    push('/agent/list/shareholder/:id', { detailId: id })
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
        title={`${t('shAgent.totalMember')} : ${totalData}`}
        data={shareholderData}
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

export default ShareholderListing
