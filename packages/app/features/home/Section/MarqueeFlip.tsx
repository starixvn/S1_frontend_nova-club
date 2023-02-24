import { Text, View } from 'dripsy'
import React, { useEffect, useState } from 'react'
import Animated, { FlipInXDown, FlipOutXUp } from 'react-native-reanimated'
import { AnnouncementListItems } from 'services/contentApi.type'
import { MarqueeItem } from './AnnouncementMarquee'

interface MarqueeFlipProp {
  announcementList: MarqueeItem<AnnouncementListItems>[]
  announcementHeight: number
  color: string
}

const MarqueeFlip = ({
  announcementList,
  announcementHeight,
  color,
}: MarqueeFlipProp) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalIndex = announcementList.length - 1
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex === totalIndex) {
        setCurrentIndex(0)
      } else setCurrentIndex(currentIndex + 1)
    }, 5000)
    return () => clearInterval(intervalId)
  }, [currentIndex, totalIndex])

  return (
    <View
      sx={{
        width: '95%',
        height: announcementHeight,
        justifyContent: 'center',
      }}
    >
      <Animated.View
        entering={FlipInXDown.duration(300).springify().damping(10)}
        exiting={FlipOutXUp.duration(250)}
        key={announcementList[currentIndex]?.item?.title}
      >
        <Text
          numberOfLines={1}
          style={{
            color,
            fontSize: 14,
            lineHeight: 20,
          }}
        >
          {announcementList[currentIndex]?.item?.title}
        </Text>
      </Animated.View>
    </View>
  )
}

export default MarqueeFlip
