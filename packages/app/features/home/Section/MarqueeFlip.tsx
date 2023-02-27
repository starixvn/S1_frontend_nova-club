import { View } from 'dripsy'
import { AnimatePresence, MotiText } from 'moti'
import React, { useEffect, useState } from 'react'
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
      <AnimatePresence>
        <MotiText
          key={announcementList[currentIndex]?.item?.title}
          numberOfLines={1}
          from={{
            transform: [{ translateY: 10 }, { rotateX: '90deg' }],
          }}
          animate={{
            transform: [{ translateY: 0 }, { rotateX: '0deg' }],
          }}
          exit={{
            transform: [{ translateY: -10 }, { rotateX: '90deg' }],
          }}
          transition={{
            duration: 250,
            type: 'timing',
            delay: 0,
          }}
          exitTransition={{
            duration: 250,
            type: 'timing',
            delay: 0,
          }}
          style={{
            color,
            fontSize: 12,
            lineHeight: 20,
            position: 'absolute',
          }}
        >
          {announcementList[currentIndex]?.item?.title}
        </MotiText>
      </AnimatePresence>
    </View>
  )
}

export default MarqueeFlip
