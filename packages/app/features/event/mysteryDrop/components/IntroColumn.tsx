import Icon from 'app/components/Icon'
import useLocalization from 'app/provider/localization'
import { Text, View, styled } from 'dripsy'
import React from 'react'
import { MSYTERY_INTRO } from 'utils/constant'

const IntroColumn = () => {
  const { t } = useLocalization()

  return (
    <View sx={{ alignItems: 'center', mb: '$4' }}>
      <Icon name="mystery-intro" size={60} sx={{ mb: '$2' }} />
      <Text sx={{ fontWeight: 'bold' }}>{t('event.mystery.intro.title')}</Text>

      <IntroColumnContent />
    </View>
  )
}

export const DekstopIntroColumn = () => {
  const { t } = useLocalization()

  return (
    <View
      sx={{
        bg: 'rgba(50, 50, 90, 0.5)',
        borderRadius: 16,
        p: '$3',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <View sx={{ alignItems: 'center' }}>
        <Icon name="mystery-intro" size={80} sx={{ mt: -50, mb: '$2' }} />
        <Text sx={{ fontWeight: 'bold' }}>
          {t('event.mystery.intro.title')}
        </Text>
      </View>
      <View>
        <IntroColumnContent />
      </View>
    </View>
  )
}

const IntroColumnContent = () => {
  const { t } = useLocalization()

  return (
    <>
      {MSYTERY_INTRO.map((item, index) => (
        <Text key={index} sx={{ textAlign: 'center', fontSize: 15 }}>
          {t(`event.mystery.intro.n${index + 1}`)}
        </Text>
      ))}
    </>
  )
}

export const TitleText = styled(Text)({
  fontWeight: 'bold',
  fontSize: 24,
  textAlign: 'center',
  lineHeight: 32,
})

export default IntroColumn
