import { useAnnouncementQuery } from 'agent/services/contentApi'
import { useAgentLocalization } from 'app/provider/localization'
import { FlatList, Text, View } from 'dripsy'
import { ListRenderItem } from 'react-native'
import { AnnouncementListItems } from 'services/contentApi.type'
import MessageCard from './MessageCard'
import DataTableRefresh from 'agent/components/DataTable/DataTableRefresh'
import { FlashList } from '@shopify/flash-list'

const AnnouncementPage = () => {
  const { t } = useAgentLocalization()
  const { data, refetch, isFetching } = useAnnouncementQuery()
  const totalData = data?.total ?? 0

  return (
    <View sx={{ bg: 'white', flex: 1, flexBasis: 0, pb: '$5' }}>
      <DataTableRefresh
        title={`${t('common.total')} : ${totalData}`}
        isLoading={isFetching}
        onRefresh={() => refetch()}
      />

      <FlashList
        showsVerticalScrollIndicator={false}
        onRefresh={() => refetch()}
        keyExtractor={(item) => item.newsId.toString()}
        refreshing={isFetching}
        data={data?.list}
        renderItem={renderItem}
        estimatedItemSize={10}
        ItemSeparatorComponent={() => <View sx={{ height: 10 }} />}
        ListEmptyComponent={
          //havent finalize no data design
          <Text sx={{ textAlign: 'center', pt: '$2', color: 'black' }}>
            {t('message.empty')}
          </Text>
        }
      />
    </View>
  )
}

const renderItem: ListRenderItem<AnnouncementListItems> = ({ item, index }) => {
  return (
    <MessageCard
      isHtml={false}
      key={item.newsId.toString()}
      id={item.newsId}
      index={index}
      title={item.title}
    />
  )
}

export default AnnouncementPage
