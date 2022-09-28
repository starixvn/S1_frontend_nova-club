import { useDripsyTheme } from 'dripsy'
import { Skeleton } from 'moti/skeleton'
import React, { ComponentProps } from 'react'

type SkeletonPlaceholderProps = ComponentProps<typeof Skeleton>

const SkeletonPlaceholder = ({
  children,
  ...restProps
}: SkeletonPlaceholderProps) => {
  const { theme } = useDripsyTheme()

  return (
    <Skeleton
      radius="square"
      colors={[
        'rgba(216,216,216, 0.5)',
        'rgba(0,0,0,0)',
        'rgba(216,216,216, 0.5)',
      ]}
      width="100%"
      {...restProps}
    >
      {children}
    </Skeleton>
  )
}

export default SkeletonPlaceholder
