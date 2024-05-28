import AvertaStd from 'app/assets/fonts/Averta'
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
          fontFamily: AvertaStd.Regular.name,
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
