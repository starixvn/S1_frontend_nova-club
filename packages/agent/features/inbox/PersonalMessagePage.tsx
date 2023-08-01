import { FlashList } from '@shopify/flash-list'
import DataTableRefresh from 'agent/components/DataTable/DataTableRefresh'
import { useMessageQuery } from 'agent/services/contentApi'
import { useAgentLocalization } from 'app/provider/localization'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { styled, Text, View } from 'dripsy'
import React from 'react'
import MessageCard from './MessageCard'

const PersonalMessagePage = () => {
  const { t } = useAgentLocalization()
  const { left } = useSafeArea()
  const { data, isSuccess, refetch, isFetching } = useMessageQuery()
  const totalData = data?.total ?? 0

  return (
    <View sx={{ backgroundColor: 'white', flex: 1, flexBasis: 0, pb: '$5' }}>
      <DataTableRefresh
        title={`${t('common.total')} : ${totalData}`}
        isLoading={isFetching}
        onRefresh={() => refetch()}
      />
      <FlashList
        onRefresh={() => refetch()}
        keyExtractor={(item) => item.messageId.toString()}
        refreshing={isFetching}
        data={data?.list}
        estimatedItemSize={10}
        ItemSeparatorComponent={() => <View sx={{ height: 10 }} />}
        renderItem={({ item, index }) => {
          return (
            <MessageCard
              isHtml
              isMessage
              key={item.messageId}
              id={item.messageId}
              index={index}
              title={item.subject}
              // content={item.message}
              // time={item.date}
              // selected={selectedIds.includes(item.messageId)}
              // onToggle={onToggle}
            />
          )
        }}
        // onEndReached={() => loadMore()}
        // onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <Text sx={{ textAlign: 'center', mt: '$3', color: 'black' }}>
            {t('message.empty')}
          </Text>
        }
      />
    </View>
  )
}

const StyledView = styled(View)({
  flexDirection: 'row',
  p: '$3',
  justifyContent: 'space-between',
  borderTopWidth: 0.5,
  borderColor: '$secondary',
  py: '$5',
})

export default PersonalMessagePage
