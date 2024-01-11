import { AvertaStdUseFont } from 'app/assets/fonts/Averta'
import { useFonts } from 'expo-font'
import React, { ReactNode, createContext } from 'react'

const FontContext = createContext<boolean>(false)

type Props = {
  children: ReactNode
}
const FontProvider = ({ children }: Props) => {
  const [fontsLoaded] = useFonts({
    ...AvertaStdUseFont,
  })

  return (
    <FontContext.Provider value={fontsLoaded}>
      {fontsLoaded ? children : null}
    </FontContext.Provider>
  )
}

export default FontProvider
