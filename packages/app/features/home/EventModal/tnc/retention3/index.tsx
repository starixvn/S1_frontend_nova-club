import Montserrat from 'app/assets/fonts/Montserrat'
import FormContainer from 'app/components/form/FormContainer'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React from 'react'

const list = [
  'tnc.retention3.n1',
  'tnc.retention3.n2',
  'tnc.retention3.n3',
  'tnc.retention3.n4',
  'tnc.retention3.n5',
  'tnc.retention3.n6',
  'tnc.retention3.n7',
  'tnc.retention3.n8',
]

const FONT_COLOR = '#FFF'
const FONT_SIZE = '0.85rem'

const Tnc = () => {
  const isDesktop = useIsDesktop()
  const { t } = useLocalization()

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

        <View>
          {isDesktop && <h2>{t('common.tnc').toUpperCase()}</h2>}
          <h3>
            <strong>{t('rewards.tnc.christmas.how').toUpperCase()}</strong>
            <br />
          </h3>

          <ol>
            {list.map((item, index) => (
              <li key={index}>{t(item)}</li>
            ))}
          </ol>
        </View>
      </main>
    </FormContainer>
  )
}

export default Tnc
