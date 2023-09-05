import { Container, Sprite } from '@pixi/react'
import { ComponentProps } from 'react'
import { IContainer } from 'utils-pixi/type'
import { CENTER_ANCHOR, Coordinate } from './SpinWinUtil'

//https://stackoverflow.com/questions/57320248/how-do-you-update-a-time-uniform-inside-a-filter-or-fragment-shader-in-pixi-js
type MovingFrameProps = {
  position: Coordinate
  size: number
} & ComponentProps<IContainer>

const MovingFrame = ({ position, size, ...rest }: MovingFrameProps) => {
  // const { width, height } = useWindowSize()

  // const [time, setTime] = useState(0)
  // let customShaderFilter = new PIXI.Filter('', movingFrameV2, {
  //   u_time: 0.1,
  //   u_resolution: [width, height],
  // })
  // const contentPosition = GetLayoutItemPosition();

  // useTick((delta) => {
  //   setTime((prevTime) => prevTime + 0.5 * delta * 0.025)
  //   if (customShaderFilter.uniforms) {
  //     customShaderFilter.uniforms.u_time = time
  //   }
  // })

  return (
    <Container position={position} {...rest}>
      <Sprite
        width={size}
        height={size}
        image={`./assets/spin-and-win/images/win-frame.png`}
        // filters={[customShaderFilter]}
        anchor={CENTER_ANCHOR}
      />
    </Container>
  )
}

export default MovingFrame
