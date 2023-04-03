/** 1.)
 * `require` is not workable in web to load `.ttf` files.
 *  https://github.com/expo/expo/issues/9135
 *  Use `import` instead.
 *
 *  2.)
 *  Nextjs require `.ttf` file to put inside `public` folder.
 *  Hence, only mobile device is required to load `.ttf` file from here,
 *  else the browser will load same `.ttf` file twice (from `public` folder and here).
 */

import { FontSource, useFonts } from 'expo-font'
import { Platform } from 'react-native'
import { fontName, NotoSansBold, NotoSansBoldItalic } from 'app/provider/dripsy'
import ICON_FILE from 'app/assets/fonts/icomoon.ttf'
import AGENT_FILE from 'agent/assets/fonts/icomoon.ttf'
import NormalFont from 'app/assets/fonts/NotoSans.ttf'
import BoldFont from 'app/assets/fonts/NotoSansBold.ttf'
import BoldItalic from 'app/assets/fonts/NotoSansBoldItalic.ttf'

type FontFamilyMap = Exclude<Parameters<typeof useFonts>[0], string>
interface UseFontArgs {
  iconUrl?: string | FontSource
  fontFamily?: FontFamilyMap
}

export const DEFAULT_ICON = {
  FAMILY: 'Icomoon',
  FILENAME: Platform.OS === 'web' ? ICON_FILE : 'icomoon.ttf',
}
export const AGENT_ICON = {
  FAMILY: 'Agent Icomoon',
  FILENAME: Platform.OS === 'web' ? AGENT_FILE : 'icomoon.ttf',
}

/**
 * This hook is intended to load font file for icons. For text font (eg: Arial),
 * it is recommended to add it in `dripsy` theme configuration
 */
export default function useFontInit({ iconUrl, fontFamily }: UseFontArgs = {}) {
  const composedFontFamily = {
    [fontName]: NormalFont,
    [NotoSansBold]: BoldFont,
    [NotoSansBoldItalic]: BoldItalic,
    ...fontFamily,
  }

  const defaultFont = {
    ...(Platform.OS !== 'web' && {
      [DEFAULT_ICON.FAMILY]: ICON_FILE,
      [AGENT_ICON.FAMILY]: AGENT_FILE,
    }),
  }

  const [loaded, error] = useFonts({
    ...(iconUrl ? { [DEFAULT_ICON.FAMILY]: iconUrl } : defaultFont),
    ...composedFontFamily,
  })

  if (error) {
    console.error(error)
  }

  return [loaded, error]
}
