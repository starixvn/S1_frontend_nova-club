import sport from 'app/config/games/sport'
import { Image, styled, View } from 'dripsy'
import React, { FC } from 'react'
const dummyData = [
  {
    key: 'FirstRow',
    img: [
      {
        size: 2 / 3,
        src: sport.gameList[0]?.image,
      },
      { size: 1 / 3, src: sport.gameList[1]?.image },
    ],
  },
  {
    key: 'SecondRow',
    img: [
      {
        size: 1 / 2,
        src: sport.gameList[2]?.image,
      },
      { size: 1 / 2, src: sport.gameList[3]?.image },
    ],
  },
  {
    key: 'ThirdRow',
    img: [
      {
        size: 1 / 3,
        src: sport.gameList[4]?.image,
      },
      { size: 1 / 3, src: sport.gameList[5]?.image },
      { size: 1 / 3, src: sport.gameList[6]?.image },
    ],
  },
]

const GridSection = () => {
  return (
    <View sx={{ mt: '$5' }}>
      {dummyData.map((i) => {
        return <SimpleGrid data={i.img} key={i.key} />
      })}
    </View>
  )
}

const SimpleGrid = ({ data }: { data: any }) => {
  return (
    <StyledContainer>
      <StyledRow>
        {data.map((j) => {
          return (
            <StyledImage
              source={j.src}
              key={j.src.toString()}
              sx={{ flex: j.size }}
              resizeMode="cover"
            />
          )
        })}
      </StyledRow>
    </StyledContainer>
  )
}

const StyledContainer = styled(View)({
  marginX: '$7',
  justifyContent: 'center',
  borderRadius: 5,
})

const StyledRow = styled(View)({
  flexDirection: 'row',
  padding: 2,
  flex: 1,
})

const StyledImage = styled(Image)({
  m: '$2',
  borderRadius: 10,
  height: [110, 150, 170],
})

export default GridSection
