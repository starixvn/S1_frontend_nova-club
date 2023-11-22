import Icon from 'app/components/Icon'
import useLocalization from 'app/provider/localization'
import { Row, Text, View } from 'dripsy'
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
    <View sx={{ my: '$3' }}>
      <TitleText>{t('event.mystery.tnc')}</TitleText>

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
        <Row
          sx={{ alignItems: 'center', mt: '$3', cursor: 'pointer' }}
          onClick={() => setShowMore(true)}
        >
          <Text sx={{ ml: 24, mr: '$2' }}>{t('common.showMore')}</Text>
          <Icon name="down" />
        </Row>
      )}
    </View>
  )
}

export default TnC
