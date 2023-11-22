import Icon from 'app/components/Icon'
import useLocalization from 'app/provider/localization'
import { Text, View, styled } from 'dripsy'
import React from 'react'
import { MSYTERY_INTRO } from 'utils/constant'

const IntroColumn = () => {
  const { t } = useLocalization()

  return (
    <View sx={{ alignItems: 'center' }}>
      <Icon name="mystery-intro" size={60} />
      <TitleText sx={{ my: '$3' }}>{t('event.mystery.intro.title')}</TitleText>

      {MSYTERY_INTRO.map((item, index) => (
        <Text key={index} sx={{ textAlign: 'center', fontSize: 15 }}>
          {t(`event.mystery.intro.n${index + 1}`)}
        </Text>
      ))}
    </View>
  )
}

export const TitleText = styled(Text)({
  fontWeight: 'bold',
  fontSize: 24,
  textAlign: 'center',
})

export default IntroColumn
