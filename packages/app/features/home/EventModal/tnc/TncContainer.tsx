import Montserrat from 'app/assets/fonts/Montserrat'
import FormContainer from 'app/components/form/FormContainer'
import React from 'react'

const FONT_COLOR = '#FFF'
const FONT_SIZE = '0.85rem'

const TncContainer = ({ children }) => {
  return (
    <FormContainer>
      <main
        style={{
          padding: 12,
          fontFamily: Montserrat.Regular.name,
          fontSize: FONT_SIZE,
          color: FONT_COLOR,
        }}
      >
        {children}
      </main>
    </FormContainer>
  )
}

export default TncContainer
