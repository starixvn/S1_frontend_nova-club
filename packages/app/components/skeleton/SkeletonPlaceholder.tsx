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
        theme.colors.$transparent,
        theme.colors.$gray,
        theme.colors.$transparent,
      ]}
      transition={{
        translateX: {
          type: 'timing',
          duration: 1000,
        },
      }}
      width="100%"
      {...restProps}
    >
      {children}
    </Skeleton>
  )
}

export default SkeletonPlaceholder
