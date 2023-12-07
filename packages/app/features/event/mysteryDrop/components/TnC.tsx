import Icon from 'app/components/Icon'
import useLocalization from 'app/provider/localization'
import { Pressable, Row, Text, View, styled } from 'dripsy'
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
      <TitleText
        sx={{
          fontWeight: 'bold',
          py: '$1',
          textAlign: 'left',
          fontSize: [15, 18],
        }}
      >
        {t('event.mystery.tnc')}
      </TitleText>

      {firstPart.map((item, index) => (
        <Row key={index} sx={{ mb: '$2' }}>
          <StyledText sx={{ flexBasis: 24, mr: '$2' }}>{index + 1}.</StyledText>
          <StyledText sx={{ flex: 1 }}>{t(item)}</StyledText>
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
              <StyledText sx={{ flexBasis: 24, mr: '$2' }}>
                {index + 6}.
              </StyledText>
              <StyledText sx={{ flex: 1 }}>{t(item)}</StyledText>
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

const StyledText = styled(Text)({
  fontSize: [14, 15],
})

export default TnC
