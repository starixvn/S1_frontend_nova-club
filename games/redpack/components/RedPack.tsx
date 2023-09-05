import { Container, PixiRef, Sprite, Text } from '@pixi/react'
import { gsap } from 'gsap'
import { ISize, TextStyle } from 'pixi.js'
import { ComponentProps, useEffect, useMemo, useRef, useState } from 'react'

import { PixiPlugin } from 'gsap/PixiPlugin'
import * as PIXI from 'pixi.js'
import { useAppDispatch } from 'rewards/provider/redux/store'
import { IResponse } from 'services/common/types'
import { rewardApi } from 'services/rewardApi'
import { RedemptionResult } from 'services/rewardApi.type'
import { IContainer, ISprite } from 'utils-pixi/type'
import { AssetPath } from '../config'
import Loading from '@games/shared/components/Loading'
import NiceModal from '@ebay/nice-modal-react'
import { AlertModal } from '@games/shared/components/AlertModal'
import { checkRedeemSuccess } from 'utils-pixi/helper'
import { sound } from '@pixi/sound'
import { GrayscaleFilter } from '@pixi/filter-grayscale'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

type Props = {
  size: ISize
  seal: string
  onResult?: (value: number) => void
} & ComponentProps<IContainer>

export const REDPACK_RATIO = 180 / 230
export const COVER_RATIO = 180 / 130
export const SEAL_OFFSET = -3
const SEAL_RATIO = 0.5

export default function RedPack({
  size,
  seal,
  onResult,
  interactive,
  ...rest
}: Props) {
  const dispatch = useAppDispatch()
  const [isRespawning, setRespawning] = useState(false)
  const [isRequesting, setRequesting] = useState(false)
  const [result, setResult] = useState<string>()
  const lidHeight = size.width / COVER_RATIO
  const sealRef = useRef<PixiRef<ISprite>>(null)
  const lidRef = useRef<PixiRef<ISprite>>(null)
  const containerRef = useRef<PixiRef<IContainer>>(null)
  const lidOpenedShadowRef = useRef<PixiRef<ISprite>>(null)
  const resultRef = useRef<PixiRef<typeof Text>>(null)

  const animationTL = useRef<gsap.core.Timeline>(
    gsap.timeline({ paused: true })
  )

  async function openRedPack() {
    try {
      setRequesting(true)
      const { data } = await dispatch(
        rewardApi.endpoints.redeemCoin.initiate('G3BWFQ')
      )
        .unwrap()
        .catch((e: IResponse<RedemptionResult>) => {
          return e
        })

      if (data && checkRedeemSuccess(data)) {
        // success
        sound.play('audio/open.mp3', { volume: 0.5 })
        setResult(data.formatted_amount)
        onResult && onResult(Number.parseInt(data.amount))

        setTimeout(() => {
          setResult(undefined)
        }, 3000)
      } else {
        throw data?.err
          ? data?.err
          : 'Rất tiếc! Đã xảy ra lỗi, vui lòng thử lại.'
      }
    } catch (e) {
      // failed

      NiceModal.show(AlertModal, {
        message: e as string,
      })
    } finally {
      setRequesting(false)
    }
  }

  async function refresh() {
    setRespawning(true)
    await gsap.to(containerRef.current, {
      pixi: { scale: 0 },
    })

    await animationTL.current.reverse()

    await gsap.to(containerRef.current, {
      pixi: { scale: 1 },
    })

    setRespawning(false)
  }

  useEffect(() => {
    if (result) {
      animationTL.current.removePause(0)
      animationTL.current.play()
    } else if (sealRef.current?.alpha === 0) refresh()
  }, [result])

  /* Setup Timeline Animation */
  useEffect(() => {
    if (sealRef.current) {
      animationTL.current.to(
        sealRef.current,
        {
          alpha: 0,
          y: 100,
        },
        0
      )

      animationTL.current.to(
        lidRef.current,
        {
          pixi: { scaleY: -1 },
          duration: 1,
        },
        0
      )

      animationTL.current.to(
        lidOpenedShadowRef.current,
        {
          pixi: { alpha: 0.8 },
          duration: 1,
        },
        0
      )

      animationTL.current.to(resultRef.current, {
        pixi: { alpha: 1 },
        duration: 1,
      })
    }
  }, [])

  const filters = useMemo(() => {
    return interactive ? [] : [new GrayscaleFilter()]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interactive])

  return (
    <Container
      ref={containerRef}
      eventMode={isRespawning || isRequesting || !!result ? 'none' : 'static'}
      pointertap={openRedPack}
      interactive={interactive}
      {...rest}
    >
      <Sprite
        anchor={{ x: 0.5, y: 0.5 }}
        image={`${AssetPath}/front.png`}
        {...size}
      />
      <Container ref={lidRef} y={-size.height * 0.41}>
        <Sprite
          image={`${AssetPath}/cover.png`}
          width={size.width}
          height={lidHeight}
          x={-size.width / 2}
          y={-lidHeight * 0.1}
        />
      </Container>
      <Container ref={sealRef} filters={filters}>
        <Sprite
          anchor={0.5}
          width={size.width * SEAL_RATIO}
          height={size.width * SEAL_RATIO}
          image={`${AssetPath}/seal.png`}
        />
        {!isRequesting && !result && (
          <Text
            y={SEAL_OFFSET} // balance the shadow at the bottom of seal
            text={seal}
            anchor={0.5}
            style={
              new TextStyle({
                fill: '#e4901f',
                fontFamily: 'AvertaStd Regular',
                fontSize: 30,
              })
            }
          />
        )}
      </Container>
      <Sprite
        ref={lidOpenedShadowRef}
        anchor={{ x: 0.5, y: 1 }}
        y={-size.height * 0.44}
        width={size.width * -0.83}
        height={size.height * 0.05}
        image={`${AssetPath}/shadow.png`}
        alpha={0}
      />
      {isRequesting && <Loading y={SEAL_OFFSET} scale={0.5} />}
      <Text
        alpha={0}
        ref={resultRef}
        anchor={[0.5, 0]}
        text={result ?? ''}
        style={resultTextStyle}
        y={-size.height * 0.4}
      />
    </Container>
  )
}

const resultTextStyle = new TextStyle({
  fill: '#FFCC00',
  fontFamily: 'AvertaStd Black',
  fontSize: 24,
})
