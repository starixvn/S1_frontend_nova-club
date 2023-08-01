import { FontFamilySet } from './type'

export function toUseFont(fontFamily: FontFamilySet) {
  return Object.values(fontFamily).reduce(
    (acc, f) => ({ ...acc, [f.name]: f.file }),
    {}
  )
}
