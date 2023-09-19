import { FontFamilySet } from '../type'
import { toUseFont } from '../utils'

const BeVietnamPro: FontFamilySet = {
  Black: {
    name: 'BeVietnamePro-Black',
    file: require('app/assets/fonts/BeVietnamePro/BeVietnamPro-Black.ttf'),
  },
  Regular: {
    name: 'BeVietnamePro',
    file: require('app/assets/fonts/BeVietnamePro/BeVietnamPro-Black.ttf'),
  },
  Semibold: {
    name: 'BeVietnamePro-SemiBold',
    file: require('app/assets/fonts/BeVietnamePro/BeVietnamPro-Black.ttf'),
  },
  Bold: {
    name: 'BeVietnamePro-Bold',
    file: require('app/assets/fonts/BeVietnamePro/BeVietnamPro-Black.ttf'),
  },
}

export const BeVietnamProUseFont = toUseFont(BeVietnamPro)

export default BeVietnamPro
