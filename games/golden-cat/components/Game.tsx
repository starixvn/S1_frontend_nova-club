import NiceModal from '@ebay/nice-modal-react'
import { AssetBasePath } from '@games/config'
import { AlertModal } from '@games/shared/components/AlertModal'
import CoinBalance from '@games/shared/components/CoinBalance'
import useGameConfig from '@games/shared/hooks/useGameConfig'
import { Container, Sprite } from '@pixi/react'
import { sound } from '@pixi/sound'
import shuffle from 'lodash/shuffle'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'rewards/provider/redux/store'
import { IResponse } from 'services/common/types'
import { rewardApi, useGetCoinQuery } from 'services/rewardApi'
import { RedemptionResult } from 'services/rewardApi.type'
import { checkRedeemSuccess } from 'utils-pixi/helper'
import { useWindowSize } from 'utils-pixi/resize/ResizeProvider'
import { RewardGameKeyMap } from 'utils/rewards'
import { GamePackageName } from '../config'
import SlotMachine, { SlotMachineMethods, columns } from './SlotMachine'
import SpinButton from './SpinButton'
import TotalWon from './TotalWon'
import { translate } from '@games/shared/translations/translationByCurrency'

type Props = {}

export default function Background({}: Props) {
  const currency = useAppSelector((state) => state.setting.currency)
  const { width, height } = useWindowSize()
  const [columnAnswers, setColumnAnswers] = useState<boolean[]>([])
  const [totalWon, setTotalWon] = useState<number>(0)
  const { data: balance } = useGetCoinQuery()
  const { isSpinEnabled } = useGameConfig(RewardGameKeyMap.GOLDEN_CAT, balance)

  const dispatch = useAppDispatch()
  const [isRequesting, setRequesting] = useState<boolean>(false)
  const [isAnimating, setAnimating] = useState<boolean>(false)
  const [isStopping, setStopping] = useState<boolean>(false)
  const [result, setResult] = useState<RedemptionResult>()
  const gameContainerWidth = Math.min(width * 0.95, 500)
  const slowMachineRef = useRef<SlotMachineMethods>(null)

  useEffect(() => {
    sound.play('audio/bgm.mp3', { loop: true, volume: 0.3 })

    return () => {
      sound.stopAll()
    }
  }, [])

  const frameDimension = useMemo(() => {
    const ratio = 1.85 // 705 / 381
    return {
      width: gameContainerWidth,
      height: gameContainerWidth / ratio,
    }
  }, [gameContainerWidth])

  const totalWonDimension = useMemo(() => {
    const ratio = 2.3238 // 976 / 420
    const width = frameDimension.width * 0.75
    return {
      y: -frameDimension.height * 0.55,
      width,
      height: width / ratio,
    }
  }, [frameDimension])

  const spinBtnDimension = useMemo(() => {
    const width = frameDimension.width * 0.25
    return {
      y: frameDimension.height * 0.9,
      width,
      height: width,
    }
  }, [frameDimension])

  async function onSpin() {
    if (isAnimating) return
    try {
      setRequesting(true)

      const { data } = await dispatch(
        rewardApi.endpoints.redeemCoin.initiate(RewardGameKeyMap.GOLDEN_CAT)
      )
        .unwrap()
        .catch((e: IResponse<RedemptionResult>) => {
          return e
        })

      if (data && checkRedeemSuccess(data)) {
        const code = Number(data.code)

        setAnimating(true)
        setResult(data)
        const numOfCats = code > 0 ? code - 1 : 0
        if (numOfCats === columns) {
          setColumnAnswers(Array(columns).fill(true))
        } else {
          const emptyColumnArray = Array(columns).fill(null)
          const indexesWithCat = shuffle(
            emptyColumnArray.map((u, i) => i)
          ).splice(0, numOfCats)

          const answers = emptyColumnArray.map((u, i) =>
            indexesWithCat.includes(i)
          )

          setColumnAnswers(answers)
        }
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

  const onCompleteSpin = useCallback(() => {
    setAnimating(false)
    if (result) {
      setTotalWon((p) => p + Number(result.amount) ?? 0)
      setResult(undefined)
      setStopping(false)
    }
  }, [result])

  function onStop() {
    setStopping(true)
    slowMachineRef.current?.stop()
  }

  return (
    <Container x={width * 0.5} y={height * 0.5}>
      <Sprite
        image={`${AssetBasePath}/assets/${GamePackageName}/images/game-bg.jpg`}
        width={width}
        height={height}
        // filters={[customShaderFilter]}
        anchor={0.5}
      />
      <SlotMachine
        ref={slowMachineRef}
        onCompleteAnimated={onCompleteSpin}
        anchor={0.5}
        results={columnAnswers}
        {...frameDimension}
      />
      <TotalWon balance={totalWon} anchor={0.5} {...totalWonDimension} />
      {(isSpinEnabled || isAnimating || isStopping) && (
        <SpinButton
          loading={isRequesting || isStopping}
          text={
            isAnimating
              ? translate(currency, 'spin')
              : translate(currency, 'stop')
          }
          anchor={0.5}
          eventMode={isRequesting || isStopping ? 'none' : 'static'}
          pointertap={() => {
            if (isAnimating) onStop()
            else onSpin()
          }}
          {...spinBtnDimension}
        />
      )}
      <CoinBalance
        balance={balance}
        x={gameContainerWidth * 0.5}
        y={totalWonDimension.y - totalWonDimension.height * 0.8}
      />
    </Container>
  )
}

// let customShaderFilter = new PIXI.Filter('', illumination, {
//   u_time: 0.1,
//   u_resolution: [width, height],
// })

// useTick((delta) => {
//   setTime((prevTime) => prevTime + 0.5 * delta * 0.05)
//   if (customShaderFilter.uniforms) {
//     customShaderFilter.uniforms.u_time = time
//   }
//   // if (lightSourceShaderFilter.uniforms) {
//   //   lightSourceShaderFilter.uniforms.u_time = time;
//   // }
//   // console.log(customShaderFilter.uniforms);
//   // if (!customShaderFilter.program.fragmentSrc.includes("#version 300 es")) {
//   //   customShaderFilter.program.vertexSrc =
//   //     "#version 300 es \n" + customShaderFilter.program.vertexSrc;
//   //   customShaderFilter.program.fragmentSrc =
//   //     "#version 300 es \n" + customShaderFilter.program.fragmentSrc;
//   // }
// })
