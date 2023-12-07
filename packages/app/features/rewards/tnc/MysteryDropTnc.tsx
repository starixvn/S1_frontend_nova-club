import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useLocalization from 'app/provider/localization'
import { Row, ScrollView, Text, View } from 'dripsy'
import React from 'react'
import BonusRow from './component/BonusRow'
import GenericContainer from './component/GenericContainer'
import { AssetBasePath } from '@games/config'
import { GamePackageName } from '@games/mystery-drop/config'

const howList = [
  'rewards.tnc.mysteryDrop.how1',
  'rewards.tnc.mysteryDrop.how2',
  'rewards.tnc.mysteryDrop.how3',
  'rewards.tnc.mysteryDrop.how4',
]

const tncList = [
  'rewards.tnc.mysteryDrop.tnc1',
  'rewards.tnc.mysteryDrop.tnc2',
  'rewards.tnc.mysteryDrop.tnc3',
  'rewards.tnc.mysteryDrop.tnc4',
  'rewards.tnc.mysteryDrop.tnc5',
  'rewards.tnc.mysteryDrop.tnc6',
  'rewards.tnc.mysteryDrop.tnc7',
  'rewards.tnc.mysteryDrop.tnc8',
]

const IMAGE_DOMAIN = `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop`

const MysteryDropTnc = () => {
  const { t } = useLocalization()

  return (
    <ScrollView sx={{ maxHeight: 500 }}>
      <Text sx={{ fontWeight: 'bold', fontSize: '$2' }}>
        {t('event.mystery.title')}
      </Text>

      <Text sx={{ mb: '$2' }}>{t('rewards.tnc.mysteryDrop.date')}</Text>

      <Text sx={{ fontWeight: 'bold', fontSize: '$2' }}>
        {t('rewards.howToPlay')}
      </Text>
      <GenericContainer list={howList}>
        <View sx={{ pt: '$3' }}>
          <Text sx={{ fontWeight: 'bold', fontSize: '$2' }}>
            {t('rewards.bonusTable')}
          </Text>

          <BonusRow
            imageSrc={`${IMAGE_DOMAIN}/pot-red.png`}
            desc={`= ${t('rewards.tnc.mysteryDrop.grand')}`}
            size={90}
          />

          <BonusRow
            imageSrc={`${IMAGE_DOMAIN}/pot-blue.png`}
            desc={`= ${t('rewards.tnc.mysteryDrop.major')}`}
            size={90}
          />

          <BonusRow
            imageSrc={`${IMAGE_DOMAIN}/pot-green.png`}
            desc={`= ${t('rewards.tnc.mysteryDrop.mini')}`}
            size={90}
          />
        </View>
      </GenericContainer>

      <Text sx={{ fontWeight: 'bold', fontSize: '$2', pt: '$3' }}>
        {t('common.tnc')}
      </Text>
      <GenericContainer list={tncList} />
    </ScrollView>
  )
}

export default MysteryDropTnc
