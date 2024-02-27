import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { isCNY } from 'app/components/navigation/header/MainHeader'
import { View } from 'dripsy'
import { MotiView } from 'moti'
import React, { useMemo } from 'react'
import { SolitoImage } from 'solito/image'

export const CnyFireCracker = () => {
  const AnimateFireCracker = useMemo(
    () => (
      <MotiView
        key={'fire-cracker'}
        from={{ rotate: '3deg' }}
        animate={{ rotate: '-3deg' }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 1000,
        }}
        style={{ position: 'absolute', top: 0, right: 12 }}
        pointerEvents="none"
      >
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/cny/firecracker.png`}
          width={50}
          height={74}
          alt=""
        />
      </MotiView>
    ),
    []
  )

  return isCNY && <>{AnimateFireCracker}</>
}

export const CnyFlower = () => {
  return (
    isCNY && (
      <>
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/cny/flower-01.png`}
          width={50}
          height={71}
          style={{ position: 'absolute', marginTop: '-5%', left: 0 }}
          alt=""
        />
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/cny/coin.png`}
          width={30}
          height={41}
          style={{ position: 'absolute', marginTop: '27%', left: 4 }}
          alt=""
        />
      </>
    )
  )
}

export const CnyRedPacket = () => {
  return (
    isCNY && (
      <SolitoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/cny/red-packet.png`}
        width={100}
        height={85}
        style={{ position: 'absolute', bottom: -20, right: -20 }}
        alt=""
      />
    )
  )
}

export const CnyLantern = () => {
  const AnimateLantern = useMemo(
    () => (
      <MotiView
        key={'lantern'}
        from={{ rotate: '3deg', translateX: -3 }}
        animate={{ rotate: '-3deg', translateX: 3 }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 1000,
        }}
        style={{ position: 'absolute', top: 30, left: 10 }}
      >
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/cny/lantern.png`}
          width={30}
          height={100}
          alt=""
        />
      </MotiView>
    ),
    []
  )
  return isCNY && <>{AnimateLantern}</>
}

export const CnyFlower2 = () => {
  return (
    isCNY && (
      <SolitoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/cny/flower-02.png`}
        width={50}
        height={50}
        style={{ position: 'absolute', top: -45, right: -5 }}
        alt=""
      />
    )
  )
}

export const CnyDragon = () => {
  const AnimateDragon = useMemo(
    () => (
      <MotiView
        key={'dragon'}
        from={{ rotate: '-1deg' }}
        animate={{ rotate: '1deg' }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 1000,
        }}
      >
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/cny/dragon.png`}
          width={155}
          height={250}
          alt=""
        />
      </MotiView>
    ),
    []
  )

  const AnimateDragonTail = useMemo(
    () => (
      <MotiView
        key={'dragon-tail'}
        from={{ rotate: '3deg' }}
        animate={{ rotate: '-3deg' }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 1000,
        }}
      >
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/cny/dragon-tail.png`}
          width={80}
          height={50}
          style={{ position: 'absolute', bottom: 0, left: 30 }}
          alt=""
        />
      </MotiView>
    ),
    []
  )

  const AnimateCloud = useMemo(
    () => (
      <MotiView
        key={'cloud'}
        from={{ translateX: 0 }}
        animate={{ translateX: 10 }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 3000,
        }}
        style={{ position: 'absolute', top: 50, left: 20 }}
      >
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/cny/cloud-02.png`}
          width={80}
          height={50}
          alt=""
        />
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/cny/cloud-01.png`}
          width={80}
          height={50}
          style={{ position: 'absolute', top: 10, left: -20 }}
          alt=""
        />
      </MotiView>
    ),
    []
  )
  return (
    isCNY && (
      <View
        style={{ position: 'absolute', marginTop: '20%', right: -70 }}
        pointerEvents="none"
      >
        {AnimateDragon}
        {AnimateCloud}
        {AnimateDragonTail}
      </View>
    )
  )
}
