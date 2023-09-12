import { Text, View } from 'dripsy'
import React, { ReactNode, useEffect, useState } from 'react'
import { useMessageQuery } from 'services/messageApi'

type BadgeProps = {
  hideBadge?: boolean
  count: number
  size?: 'small' | 'medium' | 'large' | 'inline'
  children?: JSX.Element
}

const Badge = ({
  hideBadge = false,
  count = 0,
  size = 'large',
  children,
}: BadgeProps) => {
  const [badgeStyle, setBadgeStyle] = useState({})

  const [fontStyle, setFontStyle] = useState({
    fontSize: 9,
  })

  const BadgeVariant = () => {
    let variant
    let fontVariant
    switch (size) {
      case 'medium':
        variant = {
          p: 4,
          right: -6,
          top: -6,
        }

        fontVariant = {
          fontSize: 12,
        }

        break
      case 'large':
        variant = {
          p: 6,
          right: -6,
          top: -6,
        }

        fontVariant = {
          fontSize: 14,
        }

        break

      case 'inline':
        variant = {
          p: 6,
          right: 0,
          top: -2,
        }

        fontVariant = {
          fontSize: 14,
        }

        break

      case 'small':
      default:
        variant = {
          p: 2,
          right: -2,
          top: -2,
        }
        fontVariant = {
          fontSize: 9,
        }

        break
    }

    setBadgeStyle(variant)
    setFontStyle(fontVariant)
  }

  useEffect(() => {
    BadgeVariant()
  }, [])

  return hideBadge || count === 0 ? (
    children
  ) : (
    <View sx={{ position: 'relative' }}>
      {children}

      <View
        sx={{
          bg: '$error',
          alignItems: 'center',
          justifyContent: 'center',
          aspectRatio: 1,
          borderRadius: 50,
          position: 'absolute',
          ...badgeStyle,
        }}
      >
        <Text sx={{ ...fontStyle }}>{count}</Text>
      </View>
    </View>
  )
}

export const MessageBadge = ({
  children,
  hideBadge,
  ...rest
}: Omit<BadgeProps, 'count'>) => {
  const { data } = useMessageQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: hideBadge,
  })
  const unreadCount = data?.filter((el) => el.unreadCnt > 0).length ?? 0

  return (
    <Badge hideBadge={hideBadge} count={unreadCount} {...rest}>
      {children}
    </Badge>
  )
}

export default Badge
