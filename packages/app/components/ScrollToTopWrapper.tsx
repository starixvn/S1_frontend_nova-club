import useScrollToTop from 'app/hooks/useScrollToTop'
import { ScrollView } from 'dripsy'
import React, { ReactNode, forwardRef, useRef } from 'react'

type ScrollToTopWrapperProps = {
  children: ReactNode
}
const ScrollToTopWrapper = forwardRef<void, ScrollToTopWrapperProps>(
  ({ children }, ref) => {
    const scrollRef = useRef(null)

    const { ScrollToTopButton, setScrollY } = useScrollToTop({
      innerRef: ref ?? scrollRef,
      liftButton: true,
    })

    return (
      <>
        <ScrollView
          ref={ref ?? scrollRef}
          onScroll={(event) => setScrollY(event.nativeEvent.contentOffset.y)}
          scrollEventThrottle={16}
        >
          {children}
        </ScrollView>
        {ScrollToTopButton}
      </>
    )
  }
)

export default ScrollToTopWrapper
