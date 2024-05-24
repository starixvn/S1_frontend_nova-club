import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React from 'react'
import TncContainer from '../TncContainer'

const Tnc = () => {
  const isDesktop = useIsDesktop()
  const { t } = useLocalization()

  const howNote = t('tnc.register.howNote').split('\n')
  const tncNote = t('tnc.register.termsNote').split('\n')

  return (
    <TncContainer>
      <View>
        {isDesktop && <h2>{t('common.tnc').toUpperCase()}</h2>}
        <h3>
          <strong>{t('tnc.register.title').toUpperCase()}</strong>
          <br />
        </h3>

        <strong>{t('tnc.register.how')}</strong>
        <ol>
          {howNote.map((item, index) => (
            <li key={index}>{t(item)}</li>
          ))}
        </ol>

        <strong>{t('common.tnc')}</strong>
        <ol>
          {tncNote.map((item, index) => (
            <li key={index}>{t(item)}</li>
          ))}
        </ol>
      </View>
    </TncContainer>
  )
}

export default Tnc
