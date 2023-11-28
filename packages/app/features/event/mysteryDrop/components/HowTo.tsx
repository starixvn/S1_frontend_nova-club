import { Row, Text, View, styled } from 'dripsy'
import React from 'react'
import { TitleText } from './IntroColumn'
import { SolitoImage } from 'solito/image'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useLocalization from 'app/provider/localization'

const HOW_LIST = [
  {
    title: 'event.mystery.how.t1',
    notes: 'event.mystery.how.n1',
  },
  {
    title: 'event.mystery.how.t2',
    notes: 'event.mystery.how.n2',
  },
]

const HowTo = () => {
  const { t } = useLocalization()
  return (
    <View>
      <TitleText>{t('event.mystery.how.title')}</TitleText>
      <ListContainer>
        {HOW_LIST.map((item, index) => (
          <Row key={index} sx={{ alignItems: 'center' }}>
            <SolitoImage
              src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/how${
                index + 1
              }.png`}
              width={50}
              height={40}
              alt=""
              style={{ flexBasis: 80 }}
            />
            <View sx={{ flex: 1 }}>
              <TextSubtitle>{t(item.title)}</TextSubtitle>
              <TextNotes>{t(item.notes)}</TextNotes>
            </View>
          </Row>
        ))}
      </ListContainer>
    </View>
  )
}

export const DesktopHowTo = () => {
  const { t } = useLocalization()

  return (
    <View>
      <TitleText>{t('event.mystery.how.title')}</TitleText>

      <Row sx={{ justifyContent: 'space-evenly' }}>
        {HOW_LIST.map((item, index) => (
          <ListContainer key={index} sx={{ flex: 0.45, alignItems: 'center' }}>
            <SolitoImage
              src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/how${
                index + 1
              }.png`}
              width={50}
              height={40}
              alt=""
            />

            <View sx={{ alignItems: 'center' }}>
              <TextSubtitle>{t(item.title)}</TextSubtitle>
              <TextNotes sx={{ textAlign: 'center', fontSize: 12 }}>
                {t(item.notes)}
              </TextNotes>
            </View>
          </ListContainer>
        ))}
      </Row>
    </View>
  )
}

const ListContainer = styled(View)({
  bg: '$primary.500',
  borderRadius: 16,
  pr: '$2',
  py: '$3',
  gap: 12,
})
const TextSubtitle = styled(Text)({
  fontSize: 20,
  fontWeight: 'bold',
})
const TextNotes = styled(Text)({
  fontSize: 14,
  opacity: 0.5,
})
export default HowTo
