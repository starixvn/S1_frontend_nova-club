import { styled, View } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import { memo } from 'react'
import HalloweenFloat from './event/HalloweenFloat'
import LiveChatButton from './LiveChatButton'

interface FloatingContentSwitchProps {
  visible: boolean
  size: number
  floatingDrawerOffset: number
  isDesktop: boolean
  floatingDrawerHeight: number
}
interface FloatingContentContainerProps {
  bottom: number
  height: number
  isDesktop: boolean
}

const FloatingDrawer = ({
  visible,
  size,
  floatingDrawerOffset,
  isDesktop,
  floatingDrawerHeight,
}: FloatingContentSwitchProps) => {
  return (
    <FloatingContentContainer
      pointerEvents={visible ? 'auto' : 'none'}
      bottom={floatingDrawerOffset}
      height={floatingDrawerHeight}
      isDesktop={isDesktop}
    >
      <AnimatePresence>
        {visible && (
          <ContentOverlay
            from={{ transform: [{ translateX: -100 }], opacity: 0 }}
            animate={{ transform: [{ translateX: 0 }], opacity: 1 }}
            exit={{ transform: [{ translateX: -100 }], opacity: 0 }}
            transition={{ type: 'timing', duration: 500 }}
          >
            <ContentOffset>{!isDesktop && <LiveChatButton />}</ContentOffset>
          </ContentOverlay>
        )}
      </AnimatePresence>
    </FloatingContentContainer>
  )
}
const FloatingContentContainer = styled(View)(
  ({ bottom, height, isDesktop }: FloatingContentContainerProps) => ({
    zIndex: 9,
    left: 0,
    bottom,
    position: isDesktop ? 'fixed' : 'absolute',
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
})
const ContentOffset = styled(View)({
  py: '$2',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
})
export default memo(FloatingDrawer)
