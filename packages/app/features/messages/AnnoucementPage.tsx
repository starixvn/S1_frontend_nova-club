import { FlatList, Text, View } from 'dripsy'
import MessageCard from './MessageCard'

const dummyData = [
  {
    id: 1,
    subject: 'Intro Annoucement Page',
    message:
      "Hello let's test annoucement page. This is the place to let admin or organiser to annouce important news.",
    date: '2022-06-19 10:09:42',
  },
  {
    id: 2,
    subject: 'Test Annoucement List',
    message:
      "Hello let's test annoucement list. This is the page to show the news in list",
    date: '2022-06-19 10:09:42',
  },
]

const AnnouncementPage = () => {
  return (
    <View sx={{ backgroundColor: '$secondary', flex: 1 }}>
      <FlatList
        // onRefresh={() => refetch()}
        keyExtractor={(item) => item.id.toString()}
        // refreshing={isLoading}
        style={{ backgroundColor: '#0D2035' }}
        data={dummyData}
        renderItem={({ item, index }: { item: any; index: number }) => {
          return (
            <MessageCard
              isHtml={false}
              key={item.id.toString()}
              id={item.id}
              index={index}
              title={item.subject}
              content={item.message}
              time={item.date}
            />
          )
        }}
        ListEmptyComponent={
          //havent finalize no data design
          <Text sx={{ textAlign: 'center', pt: '$2' }}>
            Does not have any annoucement yet!
          </Text>
        }
        // onEndReached={() => loadMore()}
        // onEndReachedThreshold={0.5}
      />
    </View>
  )
}

export default AnnouncementPage
