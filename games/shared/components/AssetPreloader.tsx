'use client'

import gsap from 'gsap'
import Image, { ImageProps } from 'next/image'
import React, {
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useInitAssets } from 'utils-pixi/assets'
import { BackgroundColor } from '../config'
type ImagePropsOverlay = Omit<ImageProps, 'src' | 'alt'>

type Props = {
  name: string
  image: string
  children: ReactNode
  imageProps?: ImagePropsOverlay
}

export default function AssetPreloader({
  name,
  image,
  imageProps,
  children,
}: Props) {
  const isLoaded = useInitAssets(name)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [isReady, setReady] = useState(false)

  useEffect(() => {
    if (isLoaded) {
      gsap
        .to(overlayRef.current, {
          delay: 0.3,
          scale: 2,
          opacity: 0,
        })
        .then(() => setReady(true))
    }
  }, [isLoaded])

  return (
    <>
      {!isReady && <Overlay ref={overlayRef} image={image} {...imageProps} />}
      {isLoaded && children}
    </>
  )
}

const Overlay = forwardRef<
  HTMLDivElement,
  ImagePropsOverlay & { image: string }
>(({ image, ...rest }, ref) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const [isImageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    if (isImageLoaded)
      gsap.to(imgRef.current, {
        scale: 1.1,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'none',
      })
  }, [isImageLoaded])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BackgroundColor,
      }}
    >
      <div
        style={{
          boxShadow: isImageLoaded ? 'rgb(95 95 95) 0px 0px 15px 1px' : 'none',
          borderRadius: 20,
          overflow: 'hidden',
        }}
      >
        <Image
          ref={imgRef}
          width={150}
          height={150}
          src={image}
          alt="preloader"
          onLoad={() => {
            setImageLoaded(true)
          }}
          {...rest}
        />
      </div>
    </div>
  )
})
