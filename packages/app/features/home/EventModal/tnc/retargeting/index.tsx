import FormContainer from 'app/components/form/FormContainer'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React from 'react'
import TncContainer from '../TncContainer'

const list = [
  'tnc.retargeting.n1',
  'tnc.retargeting.n2',
  'tnc.retargeting.n3',
  'tnc.retargeting.n4',
  'tnc.retargeting.n5',
  'tnc.retargeting.n7',
  'tnc.retargeting.n8',
  'tnc.retargeting.n9',
]

const Tnc = () => {
  const isDesktop = useIsDesktop()
  const { t } = useLocalization()

  return (
    <TncContainer>
      <View>
        {isDesktop && <h2>{t('common.tnc').toUpperCase()}</h2>}

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
