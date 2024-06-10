import { translate } from '@games/shared/translations/translationByCurrency'
import { Container, Sprite, Text, useTick } from '@pixi/react'
import * as PIXI from 'pixi.js'
import { TextStyle } from 'pixi.js'
import { useMemo, useState } from 'react'
import { useAppSelector } from 'rewards/provider/redux/store'
import { Currency } from 'utils/constant'
import { CENTER_ANCHOR, Coordinate, PrizeInfo, PrizeList } from './SpinWinUtil'

export const PrizeSprite = ({
  position,
  prizeIndex,
  size,
}: {
  position: Coordinate
  prizeIndex: number
  size: number
}) => {
  const currency = useAppSelector((s) => s.setting.currency)
  const [prizeInfo] = useState<PrizeInfo>(PrizeList[prizeIndex] as PrizeInfo)

  const [time, setTime] = useState(0)
  let customShaderFilter = new PIXI.Filter(
    '',
    `
    precision mediump float;
    varying vec2 vTextureCoord;
    uniform sampler2D uSampler;
    uniform float time;
    uniform float u_random;
    
    void main() {
      // Get the color of the current pixel
      vec4 color = texture2D(uSampler, vTextureCoord);
    
      // Calculate the brightness of the color
      float brightness = (color.r + color.g + color.b) / 3.0;
    
      // Calculate the alternating lightness value
      float lightness = max(0.5 + 0.5 * sin(time * 0.05), 0.5);
    
      // Apply the alternating lightness to the color
      vec3 newColor = vec3(lightness * brightness);
    
      // Output the modified color
      gl_FragColor = vec4(newColor, 0.5);
    }
    `,

    {
      time: 0.1,
    }
  )

  useTick((delta) => {
    setTime((prevTime) => prevTime + 0.5 * delta)
    if (customShaderFilter.uniforms) {
      customShaderFilter.uniforms.time = time
    }
  })

  const hasPrize = prizeInfo?.img

  const textStyle = useMemo(() => {
    return new TextStyle({
      align: 'center',
      fontFamily: 'AvertaStd Regular',
      fontSize: size * (currency === Currency.THB ? 0.18 : 0.23),
      fontWeight: '400',
      fill: hasPrize ? ['#ffffff'] : '#FAFA7F',
      // dropShadow: true,
      // dropShadowColor: '#ccced2',
      // dropShadowBlur: 6,
      // dropShadowAngle: Math.PI / 6,
      // dropShadowDistance: 0.5,
    })
  }, [size, currency])

  return (
    <Container position={position} anchor={CENTER_ANCHOR}>
      <PrizeOverlay size={size} />
      {hasPrize && (
        <>
          <Sprite
            image={`./assets/spin-and-win/images/${prizeInfo?.img}.png`}
            width={size * 0.7}
            // filters={[customShaderFilter]}
            height={size * 0.7}
            anchor={{ x: 0.5, y: 0.4 }}
          />
          {/* <Sprite
            image={`./assets/spin-and-win/images/${prizeInfo?.img}.png`}
            width={75}
            height={75}
            anchor={{ x: 0.5, y: 0.25 }}
          /> */}
        </>
      )}

      <Text
        text={
          prizeInfo?.isEmpty
            ? translate(currency, 'tryAgainDoubleLine')
            : prizeInfo?.prize
        }
        anchor={{ x: 0.5, y: hasPrize ? 1.5 : 0.5 }}
        style={textStyle}
      />
    </Container>
  )
}

const PrizeOverlay = ({ size }: { size: number }) => {
  return (
    <Sprite
      image="./assets/spin-and-win/images/prize-overlay.png"
      width={size}
      height={size}
      //   position={position}
      anchor={CENTER_ANCHOR}
    />
  )
}
