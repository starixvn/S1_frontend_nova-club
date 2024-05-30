import NiceModal from '@ebay/nice-modal-react'
import { AssetBasePath } from '@games/config'
import { AlertModal } from '@games/shared/components/AlertModal'
import CoinBalance from '@games/shared/components/CoinBalance'
import useGameConfig from '@games/shared/hooks/useGameConfig'
import { Container, Graphics, Sprite } from '@pixi/react'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from 'rewards/provider/redux/store'
import { IResponse } from 'services/common/types'
import { rewardApi, useGetCoinQuery } from 'services/rewardApi'
import { RedemptionResult } from 'services/rewardApi.type'
import { checkRedeemSuccess } from 'utils-pixi/helper'
import { useWindowSize } from 'utils-pixi/resize/ResizeProvider'
import { GamePackageName } from '../config'
import MeowBox from './MeowBox'
import MessageBox from './MessageBox'
import WinMessageBox from './WinMessageBox'
import WinPrizeText from './WinPrizeText'
import { RewardGameKeyMap } from 'utils/rewards'

export const possibleResult = [388000, 888000, 8800000, 88000000]

export const catDict = {
  388000: `${AssetBasePath}/assets/${GamePackageName}/images/cat_88.png`,
  888000: `${AssetBasePath}/assets/${GamePackageName}/images/cat_888.png`,
  8800000: `${AssetBasePath}/assets/${GamePackageName}/images/cat_8800.png`,
  88000000: `${AssetBasePath}/assets/${GamePackageName}/images/cat_grand.png`,
}
export const prizeDict = {
  388000: `${AssetBasePath}/assets/${GamePackageName}/images/win_88.png`,
  888000: `${AssetBasePath}/assets/${GamePackageName}/images/win_888.png`,
  8800000: `${AssetBasePath}/assets/${GamePackageName}/images/win_8800.png`,
  88000000: `${AssetBasePath}/assets/${GamePackageName}/images/win_grand.png`,
}

const MeowBody = () => {
  const { width, height } = useWindowSize()
  const dispatch = useAppDispatch()
  const currency = useAppSelector((s) => s.setting.currency)
  const [startMessage, setStartMessage] = useState(true)
  const [winMessage, setWinMessage] = useState(false)
  const [isRequesting, setRequesting] = useState(false)
  const [totalBalance, setTotalBalance] = useState(0)
  const [result, setResult] = useState<RedemptionResult>()

  const bgWidth = Math.min(500, width)

  const boxWidth = bgWidth >= 500 ? bgWidth * 0.6 : bgWidth * 0.7
  const boxHeight = bgWidth * 1.25
  const graphicWidth = boxWidth + 20

  const textPosY = bgWidth >= 500 ? bgWidth * 1.3 : bgWidth * 1.6

  const posY = boxHeight > height ? 10 : height / 2
  const posX = bgWidth > width ? 10 : width / 2

  const { data: balance } = useGetCoinQuery()
  const { isSpinEnabled } = useGameConfig(RewardGameKeyMap.FORTUNE_CAT, balance)

  const getResult = async () => {
    try {
      setResult(undefined)
      setRequesting(true)
      const { data } = await dispatch(
        rewardApi.endpoints.redeemCoin.initiate('8ZWYC7')
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
        onClose: () => setStartMessage(true),
      })
    } finally {
      setRequesting(false)
    }
  }

  // Show the modal and pass arguments as props
  const handleStart = () => {
    setStartMessage(false)
    setWinMessage(false)
    getResult()
  }

  const handleComplete = () => {
    setWinMessage(true)
    result && setTotalBalance(totalBalance + Number(result?.amount))
  }

  return (
    <Container anchor={0.5} x={posX} y={0}>
      <Sprite
        image={`${AssetBasePath}/assets/${GamePackageName}/images/wood_${currency.toLowerCase()}.png`}
        anchor={{ x: 0.5, y: 0.5 }}
        scale={{ x: 0.5, y: 0.5 }}
        y={150}
      />

      <Container x={0} y={250}>
        <Graphics
          anchor={0.5}
          x={-graphicWidth * 0.5}
          y={-10}
          draw={(g) => {
            g.clear()
            g.beginFill('#FFFFFF', 0.25)
            g.drawRoundedRect(0, 0, graphicWidth, graphicWidth, 24)
            g.endFill()
          }}
        />
        {result && !result.err && !winMessage && (
          <MeowBox
            boxWidth={boxWidth}
            result={Number(result?.amount)}
            onComplete={handleComplete}
            disabled={startMessage}
          />
        )}
      </Container>
      {startMessage && (
        <MessageBox
          disabled={!isSpinEnabled}
          boxWidth={boxWidth}
          onClick={handleStart}
        />
      )}
      {winMessage && (
        <WinMessageBox
          disabled={!isSpinEnabled}
          balance={Number(result?.amount)}
          boxWidth={boxWidth}
          onClick={handleStart}
          note={result?.note}
        />
      )}

      <WinPrizeText y={textPosY} boxWidth={boxWidth} balance={totalBalance} />
      <CoinBalance balance={balance} x={boxWidth * 0.55} y={50} />
    </Container>
  )
}

export default MeowBody
