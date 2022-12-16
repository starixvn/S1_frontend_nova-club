import { useDripsyTheme } from 'dripsy'
import Svg, { G, Path } from 'react-native-svg'

const BubbleEdge = ({ size = 30 }) => {
  const width = size
  const height = size / (81 / 117)

  return (
    <Svg width={width} height={height} viewBox="0 0 28 20" fill="none">
      <Path
        fill="red"
        id="Subtraction_2"
        data-name="Subtraction 2"
        d="M3.7,20.007A24.313,24.313,0,0,1,0,19.722,25.375,25.375,0,0,0,8.049,8.009a25.643,25.643,0,0,0,1.309-8H28a25.629,25.629,0,0,1-2.774,7.317,25.127,25.127,0,0,1-6.251,7.332,24.5,24.5,0,0,1-8.839,4.478A24.444,24.444,0,0,1,3.7,20.007Z"
      />
    </Svg>
  )
}

export default BubbleEdge
