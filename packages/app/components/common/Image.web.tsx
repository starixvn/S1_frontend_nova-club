import { Image as DripsyImage } from 'dripsy'
import { motify } from 'moti'

const Image = DripsyImage
export default Image

export const MotifiedImage = motify(Image)()
