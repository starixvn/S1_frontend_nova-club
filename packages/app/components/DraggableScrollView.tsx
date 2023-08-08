import { useDraggableScroll } from 'app/hooks/useDraggableScroll'
import { ScrollView } from 'dripsy'
import React, { ComponentProps } from 'react'

export const DraggableScrollView = React.forwardRef<
  typeof ScrollView,
  ComponentProps<typeof ScrollView>
>(function DraggableScrollView(props, ref) {
  const { refs } = useDraggableScroll<typeof ScrollView>({
    outerRef: ref,
    cursor: 'grab', // optional, default
  })

  return <ScrollView ref={refs} horizontal {...props} />
})
