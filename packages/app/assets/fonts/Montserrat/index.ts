import { FontFamilySet } from '../type'
import { toUseFont } from '../utils'

const Montserrat: FontFamilySet = {
  Regular: {
    name: 'Montserrat',
    file: require('./Montserrat-Medium.ttf'),
  },
  Semibold: {
    name: 'Montserrat-SemiBold',
    file: require('./Montserrat-SemiBold.ttf'),
  },
  Bold: {
    name: 'Montserrat-Bold',
    file: require('./Montserrat-Bold.ttf'),
  },
  Black: {
    name: 'Montserrat-Black',
    file: require('./Montserrat-Black.ttf'),
  },
}

export const MontserratUseFont = toUseFont(Montserrat)

export default Montserrat
