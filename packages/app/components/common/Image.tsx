import { Image as DripsyImage, styled } from 'dripsy'
import { motify } from 'moti'

const Image = styled(DripsyImage)()
export default Image

export const MotifiedImage = motify(Image)()
