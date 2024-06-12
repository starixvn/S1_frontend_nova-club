import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { Pressable, Row } from 'dripsy'
import { MotiView, useAnimationState } from 'moti'
import React, { useEffect } from 'react'
import { SolitoImage } from 'solito/image'

const VIP_LEVEL = [
  { value: 1, image: `${MEDIA_DOMAIN}${CONTENT_URI}/vip/avatar-vip1.png` },
  { value: 2, image: `${MEDIA_DOMAIN}${CONTENT_URI}/vip/avatar-vip2.png` },
  { value: 3, image: `${MEDIA_DOMAIN}${CONTENT_URI}/vip/avatar-vip3.png` },
  { value: 4, image: `${MEDIA_DOMAIN}${CONTENT_URI}/vip/avatar-vip4.png` },
  { value: 5, image: `${MEDIA_DOMAIN}${CONTENT_URI}/vip/avatar-vip5.png` },
  { value: 6, image: `${MEDIA_DOMAIN}${CONTENT_URI}/vip/avatar-vvip.png` },
]

const VipLevel = ({ page, setPage }) => {
  return (
    <Row
      sx={{
        px: '$4',
        py: '$3',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {VIP_LEVEL.map((item) => {
        const active = page === item.value

        return (
          <VipIcon
            key={item.value}
            active={active}
            image={item.image}
            onPress={() => setPage(item.value)}
          />
        )
      })}
    </Row>
  )
}

const VipIcon = ({ active, image, onPress }) => {
  const animState = useAnimationState({
    inactive: {
      scale: 1,
    },
    active: {
      scale: 1.2,
    },
  })

  useEffect(() => {
    animState.transitionTo(active ? 'active' : 'inactive')
  }, [active, animState])

  return (
    <MotiView state={animState} transition={{ type: 'timing' }}>
      <Pressable
        onPress={onPress}
        sx={{
          borderWidth: 6,
          borderRadius: 50,
          borderColor: active ? '$primary.50' : 'transparent',
        }}
      >
        <SolitoImage src={image} width={36} height={36} alt="" />
      </Pressable>
    </MotiView>
  )
}

export default VipLevel
