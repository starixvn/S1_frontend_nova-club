import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useLocalization from 'app/provider/localization'
import { Row, Text, View } from 'dripsy'
import React from 'react'
import BonusRow from './component/BonusRow'
import GenericContainer from './component/GenericContainer'

const list = [
  'rewards.tnc.fortuneCat.tnc1',
  'rewards.tnc.fortuneCat.tnc2',
  'rewards.tnc.fortuneCat.tnc3',
]

const IMAGE_DOMAIN = `${MEDIA_DOMAIN}${CONTENT_URI}/event/summer-cat`
const FortuneCatTnc = () => {
  const { t } = useLocalization()

  return (
    <GenericContainer list={list}>
      <View sx={{ pt: '$3' }}>
        <Text sx={{ fontWeight: 'bold', fontSize: '$2' }}>
          {t('rewards.bonusTable')}
        </Text>

        <Row>
          <BonusRow
            title={t('rewards.tnc.fortuneCat.grand')}
            imageSrc={`${IMAGE_DOMAIN}/cat-orange.png`}
            desc="= 88TR VND"
          />

          <BonusRow
            title={t('rewards.tnc.fortuneCat.major')}
            imageSrc={`${IMAGE_DOMAIN}/cat-white.png`}
            desc="= 8,800K VND"
          />
        </Row>

        <Row>
          <BonusRow
            title={t('rewards.tnc.fortuneCat.minor')}
            imageSrc={`${IMAGE_DOMAIN}/cat-brown.png`}
            desc={'= 888K VND'}
          />

          <BonusRow
            title={t('rewards.tnc.fortuneCat.mini')}
            imageSrc={`${IMAGE_DOMAIN}/cat-grey.png`}
            desc={'= 388K VND'}
          />
        </Row>
      </View>
    </GenericContainer>
  )
}

export default FortuneCatTnc
