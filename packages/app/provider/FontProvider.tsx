import { MontserratUseFont } from 'app/assets/fonts/Montserrat'
import { useFonts } from 'expo-font'
import React, { ReactNode, createContext } from 'react'

const FontContext = createContext<boolean>(false)

type Props = {
  children: ReactNode
}
const FontProvider = ({ children }: Props) => {
  const [fontsLoaded] = useFonts({
    ...MontserratUseFont,
  })

  return (
    <FontContext.Provider value={fontsLoaded}>
      {fontsLoaded ? children : null}
    </FontContext.Provider>
  )
}

export default FontProvider
