import { styled, View } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import { memo } from 'react'
import SummerMeowMeow from './event/SummerMeowMeow'
import LiveChatButton from './LiveChatButton'
import VGaming from './VGaming'

interface FloatingContentSwitchProps {
  visible: boolean
  size: number
  floatingDrawerOffset: number
}
interface FloatingContentContainerProps {
  bottom: number
  height: number
}

const FloatingDrawer = ({
  visible,
  size,
  floatingDrawerOffset,
}: FloatingContentSwitchProps) => {
  const floatingDrawerHeight = size * 3 + 20
  return (
    <FloatingContentContainer
      pointerEvents={visible ? 'auto' : 'none'}
      bottom={floatingDrawerOffset}
      height={floatingDrawerHeight}
    >
      <AnimatePresence>
        {visible && (
          <ContentOverlay
            from={{ transform: [{ translateX: 100 }], opacity: 0 }}
            animate={{ transform: [{ translateX: 0 }], opacity: 1 }}
            exit={{ transform: [{ translateX: 100 }], opacity: 0 }}
            transition={{ type: 'timing', duration: 500 }}
          >
            <ContentOffset>
              <SummerMeowMeow size={size} />
              {/* <FloatingSpinMania size={size} /> */}
              <VGaming size={size} />
              <LiveChatButton />
            </ContentOffset>
          </ContentOverlay>
        )}
      </AnimatePresence>
    </FloatingContentContainer>
  )
}
const FloatingContentContainer = styled(View)(
  ({ bottom, height }: FloatingContentContainerProps) => ({
    zIndex: 9,
    right: 0,
    bottom,
    position: 'absolute',
    height,
    width: 120,
    overflow: 'hidden',
  })
)
const ContentOverlay = styled(MotiView)({
  backgroundColor: 'rgba(30,30,30,0.4)',
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
  height: '100%',
  justifyContent: 'center',
})
const ContentOffset = styled(View)({
  py: '$2',
  pl: '$1',
  alignItems: 'center',
  paddingRight: '$6',
})
export default memo(FloatingDrawer)
