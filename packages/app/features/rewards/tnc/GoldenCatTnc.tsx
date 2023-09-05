import { Row, Text, View } from 'dripsy'
import React from 'react'
import GenericContainer from './component/GenericContainer'
import useLocalization from 'app/provider/localization'
import BonusRow from './component/BonusRow'

const list = [
  'rewards.tnc.goldenCat.tnc1',
  'rewards.tnc.goldenCat.tnc2',
  'rewards.tnc.goldenCat.tnc3',
]

const GoldenCatTnc = () => {
  const { t } = useLocalization()

  return (
    <GenericContainer list={list}>
      <View sx={{ pt: '$3' }}>
        <Text sx={{ fontWeight: 'bold', fontSize: '$2' }}>
          {t('rewards.bonusTable')}
        </Text>

        <Row>
          <BonusRow title={t('rewards.tnc.goldenCat.bonus4')} />
          <BonusRow title={t('rewards.tnc.goldenCat.bonus3')} />
        </Row>
        <Row>
          <BonusRow title={t('rewards.tnc.goldenCat.bonus2')} />
          <BonusRow title={t('rewards.tnc.goldenCat.bonus1')} />
        </Row>
      </View>
    </GenericContainer>
  )
}

export default GoldenCatTnc
