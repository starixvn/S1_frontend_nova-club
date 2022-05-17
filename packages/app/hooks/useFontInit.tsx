import { FontSource, useFonts } from 'expo-font'

type FontFamilyMap = Exclude<Parameters<typeof useFonts>[0], string>
interface UseFontArgs {
  iconUrl?: string | FontSource
  fontFamily?: FontFamilyMap
}

export const DEFAULT_ICON = {
  FAMILY: 'Icomoon',
  FILENAME: 'icomoon.ttf',
}

/**
 * This hook is intended to load font file for icons. For text font (eg: Arial),
 * it is recommended to add it in `dripsy` theme configuration
 */
export default function useFontInit({ iconUrl, fontFamily }: UseFontArgs = {}) {
  const [loaded, error] = useFonts({
    [DEFAULT_ICON.FAMILY]: iconUrl ?? require('app/assets/fonts/icomoon.ttf'),
    ...fontFamily,
  })

  return [loaded, error]
}
