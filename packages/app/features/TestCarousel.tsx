import { Text, View } from 'dripsy'
import React from 'react'
import Carousel from 'react-native-reanimated-carousel'

const TestCarousel = () => {
  return (
    <Carousel
      width={300}
      height={150}
      data={[1, 2, 3]}
      renderItem={({ item }) => {
        return (
          <View>
            <Text>{item}</Text>
          </View>
        )
      }}
    />
  )
}

export default TestCarousel
