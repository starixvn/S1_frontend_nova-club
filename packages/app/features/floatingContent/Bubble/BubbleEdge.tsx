import { useDripsyTheme } from 'dripsy'
import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg'

const BubbleEdge = ({ size = 30, fill = '#603', edge = '#FFF' }) => {
  const width = size
  const height = size / (81 / 117)

  const {
    theme: { colors },
  } = useDripsyTheme()
  return (
    <Svg width={width} height={height} viewBox="0 0 28.17 20.006" fill="none">
      <G id="dialog" transform="translate(-642.573 -979.993)">
        <Path
          id="Subtraction_2"
          data-name="Subtraction 2"
          d="M-911.705-1680a24.627,24.627,0,0,1-3.721-.285,25.366,25.366,0,0,0,8.1-11.713,25.482,25.482,0,0,0,1.317-8H-888c.244,0,.494,0,.743-.007a25.53,25.53,0,0,1-2.793,7.324,25.175,25.175,0,0,1-6.289,7.333,24.713,24.713,0,0,1-8.891,4.478A24.7,24.7,0,0,1-911.705-1680Z"
          transform="translate(1558 2680)"
          fill={fill}
        />
        <Path
          id="Subtraction_3"
          data-name="Subtraction 3"
          d="M-911.707-1680a24.606,24.606,0,0,1-3.72-.285,25.366,25.366,0,0,0,8.1-11.713,25.482,25.482,0,0,0,1.317-8h3a28.479,28.479,0,0,1-1.472,8.952,28.522,28.522,0,0,1-4.024,7.806,21.884,21.884,0,0,0,2.417-.5l.076-.021a21.729,21.729,0,0,0,7.818-3.937,22.176,22.176,0,0,0,5.542-6.463,22.592,22.592,0,0,0,2.32-5.833H-888c.244,0,.494,0,.743-.007a25.529,25.529,0,0,1-2.793,7.324,25.175,25.175,0,0,1-6.289,7.333,24.715,24.715,0,0,1-8.891,4.478l-.036.01-.05.014A24.729,24.729,0,0,1-911.707-1680Z"
          transform="translate(1558 2680)"
          fill={edge}
        />
      </G>
    </Svg>
  )
}

export default BubbleEdge
