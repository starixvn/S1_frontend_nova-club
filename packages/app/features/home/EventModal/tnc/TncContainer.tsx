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
        <style jsx>{`
          ol {
            list-style-type: none;
            counter-reset: item;
            margin: 0;
            padding: 0;
          }

          li {
            display: table;
            counter-increment: item;
            margin-bottom: 0.6em;
          }

          li:before {
            content: counters(item, '.') '. ';
            display: table-cell;
            padding-right: 0.6em;
          }

          li li {
            margin: 0;
            margin-bottom: 0.4em;
          }

          li li:before {
            content: counters(item, '.') ' ';
          }

          li div {
            margin-bottom: 0.6em;
          }
        `}</style>

        {children}
      </main>
    </FormContainer>
  )
}

export default TncContainer
