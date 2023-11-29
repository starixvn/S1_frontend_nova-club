import Icon from 'app/components/Icon'
import useLocalization from 'app/provider/localization'
import { Pressable, Row, Text, View } from 'dripsy'
import { MotiView } from 'moti'
import React, { useState } from 'react'
import { MYSTERY_DROPS_TNC } from 'utils/constant'
import { TitleText } from './IntroColumn'

const TnC = () => {
  const { t } = useLocalization()
  const [showMore, setShowMore] = useState(false)

  const firstPart = MYSTERY_DROPS_TNC.slice(0, 5)
  const morePart = MYSTERY_DROPS_TNC.slice(5)

  return (
    <View sx={{ my: '$4' }}>
      <Text sx={{ fontWeight: 'bold', py: '$1' }}>
        {t('event.mystery.tnc')}
      </Text>

      {firstPart.map((item, index) => (
        <Row key={index} sx={{ mb: '$2' }}>
          <Text sx={{ flexBasis: 24, mr: '$2' }}>{index + 1}.</Text>
          <Text sx={{ flex: 1 }}>{t(item)}</Text>
        </Row>
      ))}

      {showMore ? (
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {morePart.map((item, index) => (
            <Row key={index} sx={{ mb: '$2' }}>
              <Text sx={{ flexBasis: 24, mr: '$2' }}>{index + 6}.</Text>
              <Text sx={{ flex: 1 }}>{t(item)}</Text>
            </Row>
          ))}
        </MotiView>
      ) : (
        <Pressable onPress={() => setShowMore(true)}>
          <Row sx={{ alignItems: 'center', mt: '$3', cursor: 'pointer' }}>
            <Text sx={{ ml: 24, mr: '$2' }}>{t('common.showMore')}</Text>
            <Icon name="down" />
          </Row>
        </Pressable>
      )}
    </View>
  )
}

export default TnC
