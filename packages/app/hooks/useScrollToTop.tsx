import { styled } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import React, { useEffect, useMemo, useState } from 'react'
import { Platform } from 'react-native'
import IconButton from '../components/IconButton'

const useScrollToTop = ({ innerRef }) => {
  const [scrollY, setScrollY] = useState(0)
  const [showButton, setShowButton] = useState<boolean>(true)

  const handleScrollTop = () => {
    innerRef?.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    if (!showButton && scrollY > 300) {
      setShowButton(true)
    } else if (showButton && scrollY <= 300) {
      setShowButton(false)
    }
  }, [scrollY])

  const ScrollToTopButton = useMemo(
    () => (
      <AnimatePresence>
        {showButton && (
          <AnimatedView
            from={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            exitTransition={{
              type: 'timing',
              duration: 250,
            }}
          >
            <IconButton name="arrow-up" size={32} onPress={handleScrollTop} />
          </AnimatedView>
        )}
      </AnimatePresence>
    ),
    [showButton]
  )

  return {
    ScrollToTopButton,
    setScrollY,
  }
}

const AnimatedView = styled(MotiView)({
  position: Platform.OS === 'web' ? 'fixed' : 'absolute',
  bottom: 50,
  right: 30,
  p: '$2',
  borderRadius: 50,
  bg: '$primary.300',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
})

export default useScrollToTop
