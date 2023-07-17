import { useAnnouncementQuery } from 'agent/services/contentApi'
import { useAgentLocalization } from 'app/provider/localization'
import { FlatList, Text, View } from 'dripsy'
import { ListRenderItem } from 'react-native'
import { AnnouncementListItems } from 'services/contentApi.type'
import MessageCard from './MessageCard'

const AnnouncementPage = () => {
  const { t } = useAgentLocalization()
  const { data, refetch, isLoading } = useAnnouncementQuery()

  return (
    <View sx={{ bg: 'white', flex: 1, flexBasis: 0 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        onRefresh={() => refetch()}
        keyExtractor={(item) => item.newsId.toString()}
        refreshing={isLoading}
        data={data}
        renderItem={renderItem}
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
