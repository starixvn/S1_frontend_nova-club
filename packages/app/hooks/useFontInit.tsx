import { AvertaStdUseFont } from 'app/assets/fonts/Averta'
import { useFonts } from 'expo-font'

export default function useFontInit() {
  const status = useFonts({
    ...AvertaStdUseFont,
  })

  return status
}
