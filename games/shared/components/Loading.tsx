import { Container, PixiRef, Sprite } from '@pixi/react'
import { Power1, gsap } from 'gsap'
import { ComponentProps, useEffect, useRef } from 'react'
import { IContainer, ISprite } from 'utils-pixi/type'
import { AssetPath } from '../config'

export default function Loading(props: ComponentProps<IContainer>) {
  const iconRef = useRef<PixiRef<ISprite>>(null)
  useEffect(() => {
    if (iconRef.current) {
      let tween = gsap.fromTo(
        iconRef.current,
        {
          rotation: 0,
        },
        {
          rotation: Math.PI * 2,
          duration: 0.6,
          repeat: -1,
          ease: Power1.easeOut,
        }
      )

      return () => {
        if (tween) tween.kill()
      }
    }
  }, [])

  return (
    <Container {...props}>
      <Sprite ref={iconRef} anchor={0.5} image={`${AssetPath}/loading.png`} />
    </Container>
  )
}
