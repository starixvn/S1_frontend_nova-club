import { SxProp, Text, View } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { useMessageQuery } from 'services/messageApi'
import { useGetCoinQuery } from 'services/rewardApi'

type BadgeProps = {
  badgeColor?: string
  count: number
  size?: 'small' | 'medium' | 'large' | 'inline'
  textStyle?: SxProp
  children?: JSX.Element
}

const Badge = ({
  badgeColor = '$error',
  count = 0,
  size = 'large',
  textStyle,
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
          width: 20,
          right: -4,
          top: -4,
        }

        fontVariant = {
          fontSize: 12,
        }

        break
      case 'large':
        variant = {
          width: 24,
          right: -6,
          top: -6,
        }

        fontVariant = {
          fontSize: count > 99 ? 11 : 14,
        }

        break

      case 'inline':
        variant = {
          width: 24,
          right: 12,
          top: 0,
          bottom: 0,
          mt: 'auto',
          mb: 'auto',
        }

        fontVariant = {
          fontSize: 14,
        }

        break

      case 'small':
      default:
        variant = {
          width: 16,
          right: -4,
          top: -4,
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
  }, [count])

  return (
    <View
      sx={{
        bg: badgeColor,
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 1,
        borderRadius: 50,
        position: 'absolute',
        zIndex: 11,
        ...badgeStyle,
      }}
    >
      <Text sx={{ ...fontStyle, ...textStyle }}>
        {count > 99 ? '99+' : count}
      </Text>
    </View>
  )
}

export const MessageBadge = ({ ...rest }: Omit<BadgeProps, 'count'>) => {
  const { data } = useMessageQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const unreadCount = data?.filter((el) => el.unreadCnt > 0).length ?? 0

  return unreadCount ? <Badge count={unreadCount} {...rest} /> : null
}

export const CoinBadge = ({ ...rest }: Omit<BadgeProps, 'count'>) => {
  const { data: balance } = useGetCoinQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const count = (balance && Number(balance)) ?? 0

  return count ? (
    <Badge
      badgeColor="$secondary.100"
      count={count}
      textStyle={{ color: 'black' }}
      {...rest}
    />
  ) : null
}

export default Badge
