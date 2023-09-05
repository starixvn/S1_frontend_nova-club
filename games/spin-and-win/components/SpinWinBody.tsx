import '@pixi/events'
import { Container, Graphics, useTick } from '@pixi/react'
import { useRef, useState } from 'react'

import NiceModal from '@ebay/nice-modal-react'
import { AlertModal } from '@games/shared/components/AlertModal'
import CoinBalance from '@games/shared/components/CoinBalance'
import useGameConfig from '@games/shared/hooks/useGameConfig'
import { IMediaInstance, sound } from '@pixi/sound'
import { useAppDispatch } from 'rewards/provider/redux/store'
import { IResponse } from 'services/common/types'
import { rewardApi, useGetCoinQuery } from 'services/rewardApi'
import { RedemptionResult } from 'services/rewardApi.type'
import { checkRedeemSuccess } from 'utils-pixi/helper'
import { useWindowSize } from 'utils-pixi/resize/ResizeProvider'
import { RewardGameKeyMap } from 'utils/rewards'
import MovingFrame from './MovingFrame'
import { PrizeSprite } from './PrizeSprite'
import SpinButton from './SpinButton'
import SpinGameFrame from './SpinGameFrame'
import { Coordinate, getRewardsIndex, useItemsLayout } from './SpinWinUtil'
import WinPrizeText from './WinPrizeText'

type Props = {}

function easeOutExpo(x) {
  return Math.sin((x * Math.PI) / 2)
}

type TweenProperty = {
  duration: number
  distance: number
}

const MIN_DURATION = 4000
const MIN_ROUNDS = 8
const ITEMS_LENGTH = 8

export default function SpinWinBody({}: Props) {
  const [isRequesting, setRequesting] = useState<boolean>(false)
  const [totalWon, setTotalWon] = useState<number>(0)
  const { data: balance } = useGetCoinQuery()
  const { isSpinEnabled } = useGameConfig(RewardGameKeyMap.SPIN_N_WIN, balance)

  const dispatch = useAppDispatch()

  const elapsedMs = useRef<number>(0)
  const prevWinIndex = useRef<number>(0)
  const currentWinIndex = useRef<number>(-1)

  const spinSoundRef = useRef<IMediaInstance>()

  const [isStopping, setStopping] = useState<boolean>(false)
  const [currentSpinTween, setCurrentSpinTween] = useState<TweenProperty>()

  const [animatedWinFramePosition, setAnimatedWinFramePosition] = useState(0)
  const [result, setResult] = useState<RedemptionResult>()

  const { width, height } = useWindowSize()
  const bodyFrameWidth = Math.min(500, width * 0.9)
  const bodyFrameHeight = Math.min(500, width * 0.9)

  const contentPosition = useItemsLayout({
    width: bodyFrameWidth,
    height: bodyFrameHeight,
  })

  const itemSize = bodyFrameWidth * 0.27

  useTick((_, ticker) => {
    if (currentSpinTween) {
      elapsedMs.current += ticker.elapsedMS

      const progress = Math.min(
        elapsedMs.current / currentSpinTween?.duration,
        1
      )

      const tweenProgress = easeOutExpo(progress)

      if (progress > 0 && spinSoundRef.current) {
        spinSoundRef.current.speed = Math.min(
          isStopping ? 0.5 : 1,
          1 - tweenProgress + 0.5
        )
        spinSoundRef.current.volume = Math.min(0.5, 1 - tweenProgress + 0.5)
      }

      const currentPosition =
        (Math.floor(tweenProgress * currentSpinTween.distance) +
          prevWinIndex.current) %
        ITEMS_LENGTH

      setAnimatedWinFramePosition(currentPosition)

      if (progress >= 1) {
        elapsedMs.current = 0
        setCurrentSpinTween(undefined)
        prevWinIndex.current = currentPosition

        onCompleteSpin()

        return
      }
    }
  }, !!currentSpinTween)

  async function onSpin() {
    if (!!currentSpinTween) return
    try {
      setRequesting(true)

      const { data } = await dispatch(
        rewardApi.endpoints.redeemCoin.initiate('ISKC8G')
      )
        .unwrap()
        .catch((e: IResponse<RedemptionResult>) => {
          return e
        })

      if (data && checkRedeemSuccess(data)) {
        spinSoundRef.current = await sound.play('audio/spin.mp3', {
          loop: true,
          volume: 1,
          speed: 1,
        })

        setResult(data)
        currentWinIndex.current = getRewardsIndex(data)
        if (currentWinIndex.current < 0) {
          // implement alert modal
          return
        }

        setCurrentSpinTween({
          duration: Math.random() * 6000 + MIN_DURATION,
          distance:
            (Math.floor(Math.random() * 12) + MIN_ROUNDS) * ITEMS_LENGTH +
            currentWinIndex.current -
            prevWinIndex.current, // Number of rounds * (rewards pool count + 1) + rewards index - previous round offset
        })
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

  function onStop() {
    if (currentSpinTween) {
      prevWinIndex.current = animatedWinFramePosition

      const concludingDuration = Math.min(
        currentSpinTween.duration - elapsedMs.current,
        3000
      )

      elapsedMs.current = 0

      setStopping(true)
      setCurrentSpinTween({
        duration: concludingDuration,
        distance: ITEMS_LENGTH - prevWinIndex.current + currentWinIndex.current,
      })
    }
  }

  function onCompleteSpin() {
    if (result) {
      setTotalWon((p) => p + Number(result.amount) ?? 0)
      setResult(undefined)
      setStopping(false)
      sound.stop('audio/spin.mp3')
    }
  }

  return (
    <Container x={width * 0.5} y={height * 0.48} anchor={0.5}>
      <Graphics
        draw={(g) => {
          g.clear()
          g.beginFill('rgba(80,80,158,0.6)')
          g.drawRoundedRect(
            -bodyFrameWidth * 0.45,
            -bodyFrameHeight * 0.45,
            bodyFrameWidth * 0.9,
            bodyFrameHeight * 0.9,
            10
          )
        }}
      />
      <SpinGameFrame
        size={{ width: bodyFrameWidth, height: bodyFrameHeight }}
      />

      {(isSpinEnabled || !!currentSpinTween || isStopping) && (
        <SpinButton
          size={bodyFrameWidth * 0.22}
          loading={isRequesting || isStopping}
          eventMode={isRequesting || isStopping ? 'none' : 'static'}
          text={!!currentSpinTween ? 'DỪNG' : 'QUAY'}
          pointertap={() => {
            if (!!currentSpinTween) {
              onStop()
            } else {
              onSpin()
            }
          }}
        />
      )}
      {contentPosition.map((position, index) => {
        return (
          <PrizeSprite
            key={index}
            position={position}
            prizeIndex={index}
            size={bodyFrameWidth * 0.27}
          />
        )
      })}
      <MovingFrame
        size={itemSize * 1.1}
        position={contentPosition[animatedWinFramePosition] as Coordinate}
      />
      <WinPrizeText
        y={bodyFrameHeight * 0.61}
        balance={totalWon}
        width={bodyFrameWidth}
      />
      <CoinBalance
        balance={balance}
        x={bodyFrameWidth * 0.5}
        y={-height * 0.42}
      />
    </Container>
  )
}
