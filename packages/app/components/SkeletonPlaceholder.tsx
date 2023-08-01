import { useDripsyTheme } from 'dripsy'
import { Skeleton } from 'moti/skeleton'
import React, { ComponentProps } from 'react'

type SkeletonPlaceholderProps = ComponentProps<typeof Skeleton>

const SkeletonPlaceholder = ({
  children,
  ...restProps
}: SkeletonPlaceholderProps) => {
  return (
    <Skeleton
      radius={10}
      colors={[
        'rgba(150,150,255,0.3)',
        'rgba(0,0,0,0.2)',
        'rgba(150,150,255,0.5)',
      ]}
      width="100%"
      {...restProps}
    >
      {children}
    </Skeleton>
  )
}

export default SkeletonPlaceholder
