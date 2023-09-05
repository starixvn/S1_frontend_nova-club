import '@pixi/events'
import { Container, Sprite, Text } from '@pixi/react'

import { TextStyle } from 'pixi.js'
import { ComponentProps, useMemo } from 'react'
import { IContainer } from 'utils-pixi/type'
import { CENTER_ANCHOR } from './SpinWinUtil'
import Loading from '@games/shared/components/Loading'

interface SpinButtonProps extends ComponentProps<IContainer> {
  loading?: boolean
  text: string
  size: number
}

const SpinButton = ({ loading, text, size, ...rest }: SpinButtonProps) => {
  const textStyle = useMemo(() => {
    return new TextStyle({
      align: 'center',
      fontFamily: 'AvertaStd Regular',
      fontSize: size * 0.2,
      fontWeight: '400',
      fill: ['#ffffff'], // gradient
      dropShadow: true,
      dropShadowColor: '#ccced2',
      dropShadowBlur: 6,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 0.5,
    })
  }, [size])

  return (
    <Container anchor={0.5} {...rest}>
      <Sprite
        zIndex={10}
        image={'./assets/spin-and-win/images/spin-button.png'}
        width={size}
        height={size}
        anchor={CENTER_ANCHOR}
      />
      {loading ? (
        <Loading />
      ) : (
        <Text text={text} anchor={CENTER_ANCHOR} style={textStyle} />
      )}
    </Container>
  )
}

export default SpinButton
