import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useLocalization from 'app/provider/localization'
import { Row, Text, View } from 'dripsy'
import React, { useMemo } from 'react'
import BonusRow from './component/BonusRow'
import GenericContainer from './component/GenericContainer'
import { Currency } from 'utils/constant'
import { useAppSelector } from 'app/provider/redux/store'

const list = [
  'rewards.tnc.fortuneCat.tnc1',
  'rewards.tnc.fortuneCat.tnc2',
  'rewards.tnc.fortuneCat.tnc3',
]

const IMAGE_DOMAIN = `${MEDIA_DOMAIN}${CONTENT_URI}/event/summer-cat`
const FortuneCatTnc = () => {
  const { t } = useLocalization()
  const currency = useAppSelector((s) => s.setting.currency)

  const prizeByCurrency = useMemo(
    () => ({
      [Currency.VND]: {
        grand: `= 88${t('common.million')} VND`,
        major: `= 8,800K VND`,
        minor: `= 888K VND`,
        mini: `= 388K VND`,
      },
      [Currency.THB]: {
        grand: `= 120,000 บาท`,
        major: `= 12,000 บาท`,
        minor: `= 1,200 บาท`,
        mini: `= 550 บาท`,
      },
    }),
    [t]
  )

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
            desc={prizeByCurrency[currency]?.grand}
          />

          <BonusRow
            title={t('rewards.tnc.fortuneCat.major')}
            imageSrc={`${IMAGE_DOMAIN}/cat-white.png`}
            desc={prizeByCurrency[currency]?.major}
          />
        </Row>

        <Row>
          <BonusRow
            title={t('rewards.tnc.fortuneCat.minor')}
            imageSrc={`${IMAGE_DOMAIN}/cat-brown.png`}
            desc={prizeByCurrency[currency]?.minor}
          />

          <BonusRow
            title={t('rewards.tnc.fortuneCat.mini')}
            imageSrc={`${IMAGE_DOMAIN}/cat-grey.png`}
            desc={prizeByCurrency[currency]?.mini}
          />
        </Row>
      </View>
    </GenericContainer>
  )
}

export default FortuneCatTnc
