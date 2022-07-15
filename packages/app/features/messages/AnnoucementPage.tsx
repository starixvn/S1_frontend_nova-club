import { useAnnouncementQuery } from 'services/contentApi'
import { AnnouncementListItems } from 'services/contentApi.type'
import { FlatList, Text, View } from 'dripsy'
import { ListRenderItem } from 'react-native'
import MessageCard from './MessageCard'

const AnnouncementPage = () => {
  const { data, refetch, isLoading } = useAnnouncementQuery()

  return (
    <View sx={{ backgroundColor: '$secondary', flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        onRefresh={() => refetch()}
        keyExtractor={(item) => item.newsId.toString()}
        refreshing={isLoading}
        style={{ backgroundColor: '#0D2035' }}
        data={data?.data?.list}
        renderItem={renderItem}
        ListEmptyComponent={
          //havent finalize no data design
          <Text sx={{ textAlign: 'center', pt: '$2' }}>
            Does not have any annoucement yet!
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
      content={item.content}
      time={item.date}
    />
  )
}

export default AnnouncementPage
