import { styled, View } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import { memo } from 'react'
import PlinkoEvent from './event/PlinkoEvent'
import LiveChatButton from './LiveChatButton'
import isDesktop from 'app/utils/isDesktop'
import MidAutumnFloat from './event/MidAutumnFloat'

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
            from={{ transform: [{ translateX: 100 }], opacity: 0 }}
            animate={{ transform: [{ translateX: 0 }], opacity: 1 }}
            exit={{ transform: [{ translateX: 100 }], opacity: 0 }}
            transition={{ type: 'timing', duration: 500 }}
          >
            <ContentOffset>
              <MidAutumnFloat size={size} />
              {!isDesktop && <LiveChatButton />}
            </ContentOffset>
          </ContentOverlay>
        )}
      </AnimatePresence>
    </FloatingContentContainer>
  )
}
const FloatingContentContainer = styled(View)(
  ({ bottom, height, isDesktop }: FloatingContentContainerProps) => ({
    zIndex: 9,
    right: 0,
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
  justifyContent: 'center',
})
const ContentOffset = styled(View)({
  py: '$2',
  pl: '$1',
  alignItems: 'center',
  paddingRight: '$1',
})
export default memo(FloatingDrawer)
