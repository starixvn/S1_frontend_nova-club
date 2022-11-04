import { styled } from 'dripsy'
import { motify } from 'moti'
import FastImage from 'react-native-fast-image'

const Image = styled(FastImage)()
export default Image

export const MotifiedImage = motify(Image)()
