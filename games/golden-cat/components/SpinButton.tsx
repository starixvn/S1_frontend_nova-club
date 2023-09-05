import { ComponentProps } from 'react'
import { IContainer } from 'utils-pixi/type'

import Loading from '@games/shared/components/Loading'
import { Container, Sprite, Text } from '@pixi/react'
import { TextStyle } from 'pixi.js'
import { AssetBasePath } from '@games/config'
import { GamePackageName } from '../config'

interface SpinButtonProps extends ComponentProps<IContainer> {
  loading?: boolean
  text: string
}

export default function SpinButton({
  loading,
  text,
  width,
  height,
  ...rest
}: SpinButtonProps) {
  return (
    <Container anchor={0.5} {...rest}>
      <Sprite
        zIndex={10}
        image={`${AssetBasePath}/assets/${GamePackageName}/images/btnSpin.png`}
        width={width}
        height={height}
        anchor={0.5}
      />
      {loading ? <Loading /> : <Text text={text} anchor={0.5} style={style} />}
    </Container>
  )
}

const style = new TextStyle({
  align: 'center',
  fontFamily: 'AvertaStd Black',
  fontSize: 26,
  fontWeight: '400',
  fill: ['#ffffff'], // gradient
})
