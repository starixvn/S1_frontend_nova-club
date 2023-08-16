import { ActivityIndicator, Pressable, SxProp, View, styled } from 'dripsy'
import { AnimatePresence, MotiText } from 'moti'
import React, { useEffect, useState } from 'react'
import { AnnouncementListItems } from 'services/contentApi.type'
import { MarqueeItem } from './type'
import Icon from 'app/components/Icon'
import useAlert from 'app/hooks/useAlert'

export interface MarqueeFlipProp {
  announcementList?: MarqueeItem<AnnouncementListItems>[]
  announcementHeight: number
  loading?: boolean
  sx?: SxProp
}

const MarqueeFlip = ({
  announcementList = [],
  announcementHeight,
  loading,
  sx,
}: MarqueeFlipProp) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalIndex = announcementList.length - 1

  const { showAlert, currentModal } = useAlert()

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex === totalIndex) {
        setCurrentIndex(0)
      } else setCurrentIndex(currentIndex + 1)
    }, 5000)
    return () => clearInterval(intervalId)
  }, [currentIndex, totalIndex])

  return (
    <StyledContainer
      onPress={() => {
        if (!currentModal) {
          showAlert({
            title: announcementList[currentIndex]?.value,
            message: announcementList[currentIndex]?.item.content,
          })
        }
      }}
      sx={sx}
    >
      {loading ? (
        <ActivityIndicator color={'$lightCyan'} size={14} />
      ) : (
        <Icon
          name="announcement"
          color={'$secondary.100'}
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
              color: '$secondary.100',
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
  borderWidth: 1,
  borderRadius: 20,
  px: ['$2', '$2', '$2', '$3'],
  borderColor: '$primary.100',
  alignItems: 'center',
})

export default MarqueeFlip
