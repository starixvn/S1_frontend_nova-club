import { Sprite, useTick } from '@pixi/react'
import * as PIXI from 'pixi.js'
import { useState } from 'react'
import { useWindowSize } from 'utils-pixi/resize/ResizeProvider'
import { CENTER_ANCHOR } from './SpinWinUtil'
import { discoFloor } from './shader/disco-floor'

type Props = {}
export default function Background({}: Props) {
  // const app = useApp();
  const { width, height } = useWindowSize()
  // const [time, setTime] = useState(0)
  // let customShaderFilter = new PIXI.Filter('', discoFloor, {
  //   time: 0.1,
  //   u_resolution: [width, height],
  // })
  // useTick((delta) => {
  //   setTime((prevTime) => prevTime + 0.5 * delta * 0.01)
  //   // console.log(customShaderFilter);
  //   // if (customShaderFilter.uniforms.time) {
  //   //   customShaderFilter.uniforms.time.value = time * 0.001;
  //   //   console.log(customShaderFilter.uniforms.time.value);
  //   // }
  //   // console.log(customShaderFilter.uniforms.time);
  //   if (customShaderFilter.uniforms) {
  //     customShaderFilter.uniforms.time = time
  //     // console.log(customShaderFilter);
  //     // console.log(customShaderFilter.uniforms.u_resolution);
  //   }
  // })

  return (
    <Sprite
      image="./assets/spin-and-win/images/game-bg.jpg"
      width={width}
      height={height}
      // filters={[customShaderFilter]}
      anchor={CENTER_ANCHOR}
      position={{ x: width / 2, y: height / 2 }}
    />
  )
}
