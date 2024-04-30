import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React from 'react'
import TncContainer from '../TncContainer'

const list = [
  'referral.tnc.n1',
  'referral.tnc.n2',
  'referral.tnc.n3',
  'referral.tnc.n4',
  'referral.tnc.n5',
  'referral.tnc.n6',
  'referral.tnc.n7',
  'referral.tnc.n8',
  'referral.tnc.n9',
  'referral.tnc.n10',
]

const Tnc = () => {
  const { t } = useLocalization()

  const period = t('referral.tnc.period').split(':')

  return (
    <TncContainer>
      <View>
        <div>
          <strong>{t('referral.tnc.title')}</strong>
          <br />
        </div>
        <div>
          <strong>{period[0]}:</strong>
          <span>{period[1]}</span>
        </div>
        <br />

        <div>
          <strong>{t('referral.tnc.overview1')} :</strong>
          <br />
        </div>
        <p>{t('referral.tnc.overview2')}</p>
        <br />

        <div>
          <strong>{t('common.tnc').toUpperCase()}</strong>
          <br />
        </div>

        <ol>
          {list.map((item, index) => (
            <li key={index}>{t(item)}</li>
          ))}
        </ol>
      </View>
    </TncContainer>
  )
}

export default Tnc
