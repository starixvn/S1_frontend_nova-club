import home from 'app/config/home'
import { Image, styled, View } from 'dripsy'
import React from 'react'
import { useWindowDimensions } from 'react-native'
const dummyData = [
  {
    key: 'FirstRow',
    img: [
      {
        size: 2 / 3,
        src: home[0]?.image,
      },
      { size: 1 / 3, src: home[1]?.image },
    ],
  },
  {
    key: 'SecondRow',
    img: [
      {
        size: 1 / 2,
        src: home[2]?.image,
      },
      { size: 1 / 2, src: home[3]?.image },
    ],
  },
  {
    key: 'ThirdRow',
    img: [
      {
        size: 1 / 3,
        src: home[4]?.image,
      },
      { size: 1 / 3, src: home[5]?.image },
      { size: 1 / 3, src: home[6]?.image },
    ],
  },
]

const GridSection = () => {
  return (
    <View sx={{ mt: '$2a' }}>
      {dummyData.map((i) => {
        return <SimpleGrid data={i.img} key={i.key} />
      })}
    </View>
  )
}

const SimpleGrid = ({ data }: { data: any }) => {
  const { width, height } = useWindowDimensions()

  const StyledImage = styled(Image)({
    m: '$1',
    borderRadius: 10,
    height: [width / 3.5, width / 3.5, width / 3.4],
  })

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
  marginX: '$3a',
  justifyContent: 'center',
  borderRadius: 5,
})

const StyledRow = styled(View)({
  flexDirection: 'row',
  padding: 2,
  flex: 1,
})

export default GridSection
