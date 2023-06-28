import FormContainer from 'app/components/form/FormContainer'
import isDesktop from 'app/utils/isDesktop'
import { View } from 'dripsy'
import React, { useMemo } from 'react'

const DesktopPage = ({ center = true, children }) => {
  return (
    <View
      sx={{
        alignItems: center ? 'center' : 'stretch',
      }}
    >
      <View
        sx={{
          maxWidth: 768,
          width: '75%',
        }}
      >
        {children}
      </View>
    </View>
  )
}

const DesktopPageContainer = ({ children }) => {
  const desktop = isDesktop()

  const PageComponent = useMemo(
    () => (desktop ? FormContainer : View),
    [desktop]
  )
  return <PageComponent>{children}</PageComponent>
}

export default DesktopPageContainer
