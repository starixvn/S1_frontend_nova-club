import { ListRenderItemInfo } from '@shopify/flash-list'
import AgentDataTableCell from 'agent/components/DataTable/AgentDataTableCell'
import AgentDataTableHeader from 'agent/components/DataTable/AgentDataTableHeader'
import AgentDataTableRow from 'agent/components/DataTable/AgentDataTableRow'
import AgentDataTableTitle from 'agent/components/DataTable/AgentDataTableTitle'
import TableListing, { LIMIT } from 'agent/components/DataTable/TableListing'
import IconButton from 'agent/components/Icon/IconButton'
import Switch from 'agent/components/Switch'
import { ShareholderStatusFilter } from 'agent/constant/select'
import AgentFloatingContent from 'agent/features/floatingContent'
import useTableListing from 'agent/hooks/useTableListing'
import { PartnerListResult } from 'agent/services/partnerApi.type'
import { ShareholderListResult } from 'agent/services/shareholderApi.type'
import { DateTimeField } from 'app/components/dataTable/DataTableCell'
import { useAgentLocalization } from 'app/provider/localization'
import { Pressable, Text, View } from 'dripsy'
import React, { useState } from 'react'
import { useModal } from 'react-native-modalfy'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

type ListingContentProps = {
  title: string
  data: PartnerListResult[] | ShareholderListResult[]
  totalData: number
  isFetching: boolean
  isLoading: boolean
  refetch: any
  updateStatus: any
  onNavigate: (string) => void
  onFilter: () => void
}

const ListingContent = ({
  title,
  data,
  totalData,
  isFetching,
  isLoading,
  refetch,
  updateStatus,
  onNavigate,
  onFilter,
}: ListingContentProps) => {
  const { t } = useAgentLocalization()
  const { openModal } = useModal()

  const firstCellStyle = { flexGrow: 0, flexBasis: 40, px: '$1' }
  const thirdCellStyle = { flexGrow: 0, flexBasis: 60 }

  const [offset, setOffset] = useState(0)
  const [isLoadingIndex, setIsLoadingIndex] = useState(0)

  const { onLoadMore, onRefresh } = useTableListing({
    offset,
    setOffset,
    LIMIT,
    totalData,
    isFetching,
    refetch,
  })

  const handleEdit = (id, pt, currency) => {
    openModal('EditPTModal', { id, pt, currency })
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
  }: ListRenderItemInfo<ShareholderListResult | PartnerListResult>) => {
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
            onPress={() =>
              handleEdit(item.id, item.earning_perc, item.currency)
            }
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

  return (
    <View sx={{ flex: 1 }}>
      <TableListing
        title={`${t(title)} : ${totalData}`}
        data={data}
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

export default ListingContent
