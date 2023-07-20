import { AnnouncementItem } from 'agent/services/contentApi.type'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import { ActivityIndicator, Pressable, SxProp, View, styled } from 'dripsy'
import { AnimatePresence, MotiText } from 'moti'
import React, { useEffect, useState } from 'react'
import Icon from '../Icon'
import { MarqueeItem } from './type'

export interface MarqueeFlipProp {
  announcementList?: MarqueeItem<AnnouncementItem>[]
  announcementHeight: number
  loading?: boolean
  sx?: SxProp
}

const ANNOUNCEMENT_COLOR_AGENT = '#0D7DFF'

const MarqueeFlip = ({
  announcementList = [],
  announcementHeight,
  loading,
  sx,
}: MarqueeFlipProp) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalIndex = announcementList.length - 1

  const { push } = useContextualRouter()

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex >= totalIndex) {
        setCurrentIndex(0)
      } else setCurrentIndex(currentIndex + 1)
    }, 5000)
    return () => clearInterval(intervalId)
  }, [currentIndex, totalIndex])

  return (
    <StyledContainer
      onPress={() => {
        // push('/agent/inbox/announcement')
      }}
      sx={sx}
    >
      {loading ? (
        <ActivityIndicator color={'$lightCyan'} size={14} />
      ) : (
        <Icon
          name="announcement"
          color={ANNOUNCEMENT_COLOR_AGENT}
          sx={{ mr: '$2' }}
          size={16}
        />
      )}

      <View
        sx={{
          flex: 1,
          px: '$2',
          height: announcementHeight,
          justifyContent: 'center',
        }}
      >
        <AnimatePresence>
          <DripsyMotiText
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
            sx={{
              fontSize: 12,
              lineHeight: 20,
              position: 'absolute',
              color: ANNOUNCEMENT_COLOR_AGENT,
            }}
          >
            {announcementList[currentIndex]?.item?.title}
          </DripsyMotiText>
        </AnimatePresence>
      </View>
    </StyledContainer>
  )
}

const DripsyMotiText = styled(MotiText)()

const StyledContainer = styled(Pressable)({
  flexDirection: 'row',
  borderTopWidth: 1,
  borderBottomWidth: 1,
  px: ['$2', '$2', '$2', '$3'],
  borderColor: '$lightNavyBlue',
  alignItems: 'center',
  bg: 'white',
})

export default MarqueeFlip
