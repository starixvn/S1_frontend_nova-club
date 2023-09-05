import { AssetBasePath } from '@games/config'
import React, { useEffect, useRef, useState } from 'react'
import { GamePackageName } from '../config'
import { Container, PixiRef, Sprite } from '@pixi/react'
import { ISprite } from 'utils-pixi/type'
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'
import * as PIXI from 'pixi.js'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

const FlipCard = ({ position, image, winImage, onComplete, win, disabled }) => {
  const [open, setOpen] = useState(false)
  const coinRef = useRef<PixiRef<ISprite>>(null)
  const prizeRef = useRef<PixiRef<ISprite>>(null)
  const winRef = useRef<PixiRef<ISprite>>(null)

  const animationTL = useRef<gsap.core.Timeline>(
    gsap.timeline({ paused: true })
  )

  const handleOpen = () => {
    setOpen(true)
    onComplete()
  }

  useEffect(() => {
    if (open) {
      animationTL.current.removePause(0)
      animationTL.current.play()
    }
  }, [open])

  /* Setup Timeline Animation */
  useEffect(() => {
    if (coinRef.current) {
      animationTL.current.to(
        coinRef.current,
        {
          alpha: 0,
        },
        0
      )
      animationTL.current.to(prizeRef.current, {
        pixi: { alpha: 1 },
        duration: 1,
      })
    }
  }, [])

  useEffect(() => {
    if (win) {
      gsap.to(winRef.current, {
        pixi: { alpha: 1, scale: 0.35 },
        delay: 1,
        duration: 0.3,
        repeat: -1,
        yoyo: true,
      })
      gsap.to(prizeRef.current, {
        pixi: { alpha: 1, scale: 0.35 },
        delay: 1,
        duration: 0.3,
        repeat: -1,
        yoyo: true,
      })
    }
  }, [win])

  return (
    <Container>
      <Container
        ref={coinRef}
        eventMode={!!open || disabled ? 'none' : 'static'}
        pointertap={handleOpen}
      >
        <Sprite
          anchor={0.5}
          scale={0.5}
          position={position}
          image={`${AssetBasePath}/assets/${GamePackageName}/images/coin.png`}
        />
      </Container>
      {winImage && (
        <Sprite
          ref={winRef}
          anchor={0.5}
          scale={0.3}
          position={position}
          image={winImage}
          alpha={0}
        />
      )}
      {image && (
        <Sprite
          ref={prizeRef}
          anchor={0.5}
          scale={0.3}
          position={position}
          image={image}
          alpha={0}
        />
      )}
    </Container>
  )
}

export default FlipCard
