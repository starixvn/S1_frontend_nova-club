import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React from 'react'

const list = [
  'rewards.tnc.christmas.tnc.n1',
  'rewards.tnc.christmas.tnc.n2',
  'rewards.tnc.christmas.tnc.n3',
  'rewards.tnc.christmas.tnc.n4',
  'rewards.tnc.christmas.tnc.n5',
  'rewards.tnc.christmas.tnc.n6',
  'rewards.tnc.christmas.tnc.n7',
  'rewards.tnc.christmas.tnc.n8',
]

const Tnc = () => {
  const isDesktop = useIsDesktop()
  const { t } = useLocalization()

  return (
    <View>
      {isDesktop && <h2>{t('common.tnc').toUpperCase()}</h2>}

      <div>
        <strong>{t('rewards.tnc.christmas.eventTitle')}</strong>
        <br />
      </div>
      <p>{t('rewards.tnc.christmas.period')}</p>
      <br />

      <div>
        <strong>{t('rewards.tnc.christmas.how')}</strong>
        <br />
      </div>

      <ol>
        {list.map((item, index) => (
          <li key={index}>{t(item)}</li>
        ))}
      </ol>
    </View>
  )
}

export default Tnc
