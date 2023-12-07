import { styled } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import React, { useEffect, useMemo, useState } from 'react'
import IconButton from '../components/IconButton'

const useScrollToTop = () => {
  const [showButton, setShowButton] = useState<boolean>(false)

  const handleScrollTop = () => {
    window?.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleShowButton = () => {
    if (window.scrollY > 300) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleShowButton)
    return () => {
      window.removeEventListener('scroll', handleShowButton)
    }
  }, [])

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
  }
}

const AnimatedView = styled(MotiView)({
  position: 'fixed',
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
