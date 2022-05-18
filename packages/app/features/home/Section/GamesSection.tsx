import casino from 'app/config/games/casino'
import fishing from 'app/config/games/fishing'
import hotgame from 'app/config/games/hotgame'
import lottery from 'app/config/games/lottery'
import { FlatList, Image, Pressable, ScrollView, Text, View } from 'dripsy'
import React from 'react'
import SectionHeader from './SectionHeader'

const GamesSection = () => {
  const data = [fishing, lottery, hotgame]
  return (
    <View>
      <SectionHeader title={'GAMES'} bgColor="green" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        sx={{ mr: '$7' }}
      >
        {data.map((i) => {
          const img = i.gameList.slice(0, 6)
          return (
            <View
              sx={{ bg: '$primary', marginLeft: '$7', borderRadius: 5 }}
              key={i.label}
            >
              <View
                sx={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 2,
                }}
              >
                <Text
                  sx={{
                    color: 'white',
                    textTransform: 'capitalize',
                    paddingLeft: '$5',
                    padding: '$3',
                  }}
                >
                  {i.label}
                </Text>
                <Pressable>
                  <Text
                    sx={{ color: 'white', padding: '$3', paddingRight: '$5' }}
                  >{`>`}</Text>
                </Pressable>
              </View>
              <FlatList
                keyExtractor={(i) => i.image}
                scrollEnabled={false}
                initialNumToRender={5}
                maxToRenderPerBatch={1}
                numColumns={2}
                data={img}
                renderItem={({ item }) => {
                  return (
                    <Image
                      source={item.image}
                      sx={{
                        m: '$2',
                        borderRadius: 5,
                        height: [110, 130, 150],
                        width: [110, 130, 150],
                      }}
                    />
                  )
                }}
              />
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default GamesSection
