import CoinBalance from '@games/shared/components/CoinBalance'
import useGameConfig from '@games/shared/hooks/useGameConfig'
import { Container, PixiRef, Sprite, TilingSprite } from '@pixi/react'
import { Sprite as AnimatedSprite, Graphics } from '@pixi/react-animated'
import { ISize, Rectangle } from 'pixi.js'
import { useEffect, useMemo, useRef } from 'react'
import { config, useSpring } from 'react-spring'
import { useGetCoinQuery } from 'services/rewardApi'
import { useWindowSize } from 'utils-pixi/resize/ResizeProvider'
import { RewardGameKeyMap } from 'utils/rewards'
import { AssetPath } from '../config'
import { useGameState } from '../context/GameContext'
import ScrollContent from './ScrollContent'
import TotalWon from './TotalWon'

type Props = {}

export default function Scroll({}: Props) {
  const { width, height } = useWindowSize()
  const { data: balance } = useGetCoinQuery()
  const { isSpinEnabled } = useGameConfig(RewardGameKeyMap.ANGPAO_HUNT, balance)

  const bgWidth = Math.min(500, width)

  const scrollWidth = bgWidth - 40
  const scrollHeight = bgWidth * 1.25

  const posY = scrollHeight > height ? 10 : height / 2
  const posX = bgWidth > width ? 10 : width / 2

  const scrollSectionHeight = scrollHeight * 0.7
  const lionHeadOffsetRate = 0.13

  const lionSize = useMemo(() => {
    const width = bgWidth * 0.45
    return {
      width,
      height: width / (381 / 316),
    }
  }, [bgWidth])

  return (
    <Container x={posX} y={0}>
      <BG
        y={posY + scrollSectionHeight * lionHeadOffsetRate}
        size={{ width: scrollWidth, height: scrollSectionHeight }}
      >
        <ScrollContent
          enabled={isSpinEnabled}
          size={{ width: scrollWidth - 40, height: scrollSectionHeight - 40 }}
        />
      </BG>
      <Sprite
        y={
          posY +
          scrollSectionHeight * (lionHeadOffsetRate - 0.5) +
          lionSize.height * 0.07
        }
        anchor={{ x: 0.5, y: 1 }}
        image={`${AssetPath}/lion.png`}
        {...lionSize}
      />
      <CoinBalance
        balance={balance}
        x={bgWidth * 0.5 - 5}
        y={scrollSectionHeight * lionHeadOffsetRate}
      />
    </Container>
  )
}

type IContainer = typeof Container
interface BGProps extends IContainer {
  size: ISize
}

const BG = ({ size, children, ...rest }: BGProps) => {
  const { isAssetLoaded, totalWon } = useGameState()
  const [spring, setSpring] = useSpring(() => ({
    height: 0,
    config: config.slow,
  }))

  useEffect(() => {
    setSpring({ height: size.height })
  }, [isAssetLoaded, setSpring, size.height])

  const mask = useRef<PixiRef<typeof Graphics>>(null)

  const contentPadding = 20
  const contentSize = new Rectangle(
    -size.width / 2 + contentPadding,
    -size.height / 2 + contentPadding,
    size.width - contentPadding * 2,
    size.height - contentPadding * 2
  )

  const handlerWidth = size.width * 1.1
  const handlerHeight = handlerWidth / (718 / 78)

  return (
    <Container {...rest}>
      {/* <DebugLine size={size} /> */}
      <Container mask={mask.current}>
        <Graphics
          x={-size.width / 2}
          y={-size.height / 2}
          draw={(g) => {
            g.clear()
            g.beginFill('#950101')
            g.drawRect(0, 0, size.width, size.height)
            g.endFill()
          }}
        />
        <TilingSprite
          tilePosition={0}
          image={`${AssetPath}/cut.jpg`}
          tileScale={0.5}
          {...contentSize}
        />
        {children}
      </Container>
      <Graphics
        x={-size.width / 2}
        y={-size.height / 2}
        draw={(g) => {
          g.clear()
          g.beginFill(0x000000)
          g.drawRect(0, 0, size.width, size.height)
          g.endFill()
        }}
        ref={mask}
        {...spring}
      />
      <Sprite
        anchor={0.5}
        y={-size.height / 2}
        image={`${AssetPath}/scroll_head.png`}
        width={handlerWidth}
        height={handlerHeight}
      />
      <AnimatedSprite
        anchor={0.5}
        y={spring.height.to(
          [0, size.height],
          [-size.height * 0.5, size.height * 0.5 + 10]
        )}
        image={`${AssetPath}/scroll_head.png`}
        width={handlerWidth}
        height={handlerHeight}
      />
      <TotalWon
        x={-size.width * 0.5}
        y={size.height * 0.5 + handlerHeight}
        size={size}
        balance={totalWon}
      />
    </Container>
  )
}
