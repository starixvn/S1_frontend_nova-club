import { composeEventHandlers, mergeRefs } from 'app/utils/mergeRefs'
import { ScrollView as DripsyScrollView } from 'dripsy'
import React, {
  ComponentType,
  forwardRef,
  MutableRefObject,
  useRef,
  useState,
} from 'react'
import {
  FlatList,
  FlatListProps,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native'
import ScrollToTop from '../common/ScrollToTop'

export const IOS_SCROLL_THROTTLE_TIMING = 100 // ms

interface IScrollToTopProps {
  _scrollToTop?: Partial<React.ComponentProps<typeof ScrollToTop>>
}

function withScrollToTop<T extends React.ComponentProps<typeof ScrollView>>(
  Component: ComponentType<T>
) {
  // eslint-disable-next-line react/display-name
  return forwardRef((hocProps: T & IScrollToTopProps, ref) => {
    const [showButton, setShowButton] = useState(false)
    const componentRef = useRef<any>()
    const mergedRef = mergeRefs([componentRef, ref])
    const scrollOffset = useRef(0)

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentOffset = event.nativeEvent.contentOffset.y
      const isActionButtonVisible = currentOffset > 20
      if (isActionButtonVisible !== showButton) {
        setShowButton(isActionButtonVisible)
      }
      scrollOffset.current = currentOffset
    }

    const { _scrollToTop, ...scrollViewProps } = hocProps

    return (
      <>
        <Component
          {...(scrollViewProps as T)}
          ref={mergedRef}
          onScroll={composeEventHandlers(scrollViewProps.onScroll, onScroll)}
          scrollEventThrottle={
            scrollViewProps.scrollEventThrottle ?? IOS_SCROLL_THROTTLE_TIMING
          }
        />
        <ScrollToTop
          {..._scrollToTop}
          showButton={showButton}
          triggerRef={componentRef}
        />
      </>
    )
  })
}

// Type assertion is needed here to pass generic type from HOC to FlatList component
const FlatListScrollTop = withScrollToTop(FlatList) as <T>(
  props: FlatListProps<T> & IScrollToTopProps & { ref?: MutableRefObject<any> }
) => React.ReactElement

const ScrollViewScrollTop = withScrollToTop(ScrollView)

const DripsyScrollViewScrollTop = withScrollToTop(DripsyScrollView)

ScrollViewScrollTop.displayName = 'ScrollViewScrollTop'
DripsyScrollViewScrollTop.displayName = 'DripsyScrollViewScrollTop'
export { FlatListScrollTop, ScrollViewScrollTop, DripsyScrollViewScrollTop }
