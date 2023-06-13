import { FontFamilySet } from '../type'
import { toUseFont } from '../utils'

const AvertaStd: FontFamilySet = {
  Regular: {
    name: 'AvertaStd',
    file: require('./AvertaStd-Regular.ttf'),
  },
  Semibold: {
    name: 'AvertaStd-Semibold',
    file: require('./AvertaStd-Semibold.ttf'),
  },
  Bold: {
    name: 'AvertaStd-Bold',
    file: require('./AvertaStd-Bold.ttf'),
  },
  Black: {
    name: 'AvertaStd-Black',
    file: require('./AvertaStd-Black.ttf'),
  },
}

export const AvertaStdUseFont = {
  [AvertaStd.Regular.name]: {
    uri: AvertaStd.Regular.file,
    display: 'swap',
  },
}

export default AvertaStd
