import NiceModal from '@ebay/nice-modal-react'
import { AssetBasePath } from '@games/config'
import { AlertModal } from '@games/shared/components/AlertModal'
import CoinBalance from '@games/shared/components/CoinBalance'
import { Container, Sprite, Text } from '@pixi/react'
import { TextStyle } from 'pixi.js'
import { useState } from 'react'
import { useAppDispatch } from 'rewards/provider/redux/store'
import { IResponse } from 'services/common/types'
import { rewardApi, useGetCoinQuery } from 'services/rewardApi'
import { RedemptionResult } from 'services/rewardApi.type'
import { checkRedeemSuccess } from 'utils-pixi/helper'
import { useWindowSize } from 'utils-pixi/resize/ResizeProvider'
import { GamePackageName } from '../config'
import ActionBox from './ActionBox'
import PrizeBoxJs from './PrizeBoxJs'
import { Prize } from './Util'

export const prizeDict = {
  0: `${AssetBasePath}/assets/${GamePackageName}/images/red-egg.png`,
  30000: `${AssetBasePath}/assets/${GamePackageName}/images/red-egg.png`,
  60000: `${AssetBasePath}/assets/${GamePackageName}/images/red-egg.png`,
  90000: `${AssetBasePath}/assets/${GamePackageName}/images/red-egg.png`,
  150000: `${AssetBasePath}/assets/${GamePackageName}/images/red-egg.png`,
  200000: `${AssetBasePath}/assets/${GamePackageName}/images/red-egg.png`,
  500000: `${AssetBasePath}/assets/${GamePackageName}/images/golden-egg.png`,
}

export const possibleResult = Object.keys(prizeDict)

const GameBody = () => {
  const { width, height } = useWindowSize()
  const dispatch = useAppDispatch()
  const [startGame, setStartGame] = useState(false)
  const [autoScratch, setAutoScratch] = useState(false)
  const [totalBalance, setTotalBalance] = useState(0)
  const [result, setResult] = useState<RedemptionResult>()

  const boxWidth = Math.min(Math.min(width * 0.8, height * 0.8), 400)
  const outerBoxWidth = boxWidth * 1.2

  const { data: balance } = useGetCoinQuery()

  const getResult = async () => {
    try {
      setResult(undefined)
      setStartGame(true)
      const { data } = await dispatch(
        rewardApi.endpoints.redeemCoin.initiate('SCR2CH')
      )
        .unwrap()
        .catch((e: IResponse<RedemptionResult>) => {
          return e
        })

      if (data && checkRedeemSuccess(data)) {
        setResult(data)
      } else {
        throw data?.err
          ? data?.err
          : 'Rất tiếc! Đã xảy ra lỗi, vui lòng thử lại.'
      }
    } catch (e) {
      // failed
      NiceModal.show(AlertModal, {
        message: e as string,
        onClose: () => setStartGame(false),
      })
    }
  }

  // Show the modal and pass arguments as props
  const handleStart = () => {
    startGame ? setAutoScratch(true) : getResult()
  }

  const handleComplete = () => {
    setStartGame(false)
    setAutoScratch(false)
    result && setTotalBalance(totalBalance + Number(result?.amount))
  }

  return (
    <Container x={width * 0.5} y={height * 0.5}>
      <Container anchor={0.5} y={-boxWidth * 0.62}>
        <Text
          x={0}
          text={'TÌM       TRỨNG GIỐNG NHAU'}
          anchor={[0.5, 1]}
          style={whiteText}
        />
        <Text x={-100} text={'3'} anchor={[0.5, 0.9]} style={yellowText} />
      </Container>
      <Container anchor={0.5}>
        <Sprite
          image={`${AssetBasePath}/assets/${GamePackageName}/images/board.png`}
          anchor={{ x: 0.5, y: 0.5 }}
          width={boxWidth}
          height={boxWidth}
        />
        {result ? (
          <PrizeBoxJs
            boxWidth={boxWidth}
            result={Number(result.amount) as Prize}
            autoScratch={autoScratch}
            onComplete={handleComplete}
          />
        ) : (
          <Sprite
            image={`${AssetBasePath}/assets/${GamePackageName}/images/scratch.png`}
            anchor={{ x: 0.5, y: 0.5 }}
            scale={{ x: 0.5, y: 0.5 }}
            width={boxWidth}
            height={boxWidth}
          />
        )}
        <Sprite
          image={`${AssetBasePath}/assets/${GamePackageName}/images/frame.png`}
          anchor={{ x: 0.5, y: 0.5 }}
          y={-2}
          width={outerBoxWidth}
          height={outerBoxWidth}
        />
      </Container>

      <ActionBox
        y={outerBoxWidth * 0.62}
        boxWidth={outerBoxWidth}
        balance={balance}
        totalBalance={totalBalance}
        onPress={handleStart}
        startGame={startGame}
      />
      <CoinBalance
        balance={balance}
        x={outerBoxWidth * 0.5}
        anchor={0}
        y={-height * 0.44}
      />
    </Container>
  )
}

export const whiteText = new TextStyle({
  fontFamily: 'AvertaStd Bold',
  fontSize: 24,
  fontWeight: 'bold',
  fill: ['#ffffff'],
})

export const yellowText = new TextStyle({
  fontFamily: 'AvertaStd Bold',
  fontSize: 48,
  fontWeight: 'bold',
  fill: ['#FDFE00'],
})
export default GameBody
