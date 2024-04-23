import Montserrat from 'app/assets/fonts/Montserrat'
import React, { useMemo } from 'react'
import { useWindowDimensions } from 'react-native'
import RenderHtml from 'react-native-render-html'
type Props = {
  content: string
}

export default function HTMLLoader({ content }: Props) {
  const systemFonts = useMemo(
    () => Object.keys(Montserrat).map((d) => Montserrat[d].name),
    []
  )

  const width = useWindowDimensions().width
  return (
    <RenderHtml
      source={{
        html: content,
      }}
      contentWidth={width}
      systemFonts={systemFonts}
      enableExperimentalBRCollapsing
      baseStyle={{
        color: 'white',
        fontSize: 16,
        fontFamily: Montserrat.Regular.name,
      }}
    />
  )
}
