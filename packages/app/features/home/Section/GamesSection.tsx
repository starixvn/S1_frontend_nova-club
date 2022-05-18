import fishing from 'app/config/games/fishing'
import hotgame from 'app/config/games/hotgame'
import lottery from 'app/config/games/lottery'
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  styled,
  Text,
  View,
} from 'dripsy'
import React from 'react'
import SectionHeader from './SectionHeader'

const GamesSection = () => {
  const data = [fishing, lottery, hotgame]
  return (
    <View>
      <SectionHeader title={'GAMES'} bgColor="green" iconName="games" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        sx={{ mr: '$7' }}
      >
        {data.map((i) => {
          const img = i.gameList.slice(0, 6)
          return (
            <StyledContainer key={i.label}>
              <StyledLabel>
                <StyledTitle>{i.label}</StyledTitle>
                <Pressable>
                  <StyledMore>{`>`}</StyledMore>
                </Pressable>
              </StyledLabel>
              <FlatList
                keyExtractor={(i: any) => i.image}
                scrollEnabled={false}
                initialNumToRender={5}
                maxToRenderPerBatch={1}
                numColumns={2}
                data={img}
                renderItem={({ item }: { item: any }) => {
                  return <StyledImage source={item.image} />
                }}
              />
            </StyledContainer>
          )
        })}
      </ScrollView>
    </View>
  )
}

const StyledContainer = styled(View)({
  bg: '$primary',
  marginLeft: '$7',
  borderRadius: 5,
})

const StyledLabel = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 2,
})

const StyledTitle = styled(Text)({
  color: 'white',
  textTransform: 'capitalize',
  paddingLeft: '$5',
  padding: '$3',
})

const StyledMore = styled(Text)({
  color: 'white',
  padding: '$3',
  paddingRight: '$5',
})

const StyledImage = styled(Image)({
  m: '$2',
  borderRadius: 5,
  height: [110, 130, 150],
  width: [110, 130, 150],
})

export default GamesSection
