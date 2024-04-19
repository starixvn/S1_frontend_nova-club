import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { Text, View, styled } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'
import { TitleText } from './EuroText'

const HOW_TO_JOIN = [
  { title: 'event.euro.join.title1', note: 'event.euro.join.n1' },
  { title: 'event.euro.join.title2', note: 'event.euro.join.n2' },
  { title: 'event.euro.join.title3', note: 'event.euro.join.n3' },
]

const HowToJoin = ({ contentWidth }) => {
  const { t } = useLocalization()
  const isDesktop = useIsDesktop()

  return (
    <View sx={{ alignItems: 'center' }}>
      <TitleText>{t('event.euro.tnc.howToJoin')}</TitleText>
      <View
        sx={{
          borderRadius: 12,
          width: contentWidth,
          overflow: 'hidden',
          my: '$3',
          flexDirection: isDesktop ? 'row' : 'column',
          gap: '$2',
          alignItems: 'center',
        }}
      >
        {HOW_TO_JOIN.map((item, index) => {
          return (
            <View
              key={index}
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 3 - index,
                flex: 1,
              }}
            >
              {index !== 2 &&
                (isDesktop ? (
                  <SolitoImage
                    src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/arrow-right.png`}
                    width={60}
                    height={40}
                    alt=""
                    style={{ position: 'absolute', right: -36 }}
                  />
                ) : (
                  <SolitoImage
                    src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/arrow-down.png`}
                    width={60}
                    height={40}
                    alt=""
                    style={{
                      position: 'absolute',
                      bottom: -24,
                    }}
                  />
                ))}
              <View
                sx={{
                  height: [120, 140, 140, 85, 100],
                  aspectRatio: 3 / 1,
                  py: 16,
                  px: [24, 24, 24, 16],
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SolitoImage
                  src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/frame-golden.png`}
                  fill
                  alt=""
                />
                <View sx={{ width: '80%' }}>
                  <SubtitleText>{t(item.title)}</SubtitleText>
                  <NoteText>{t(item.note)}</NoteText>
                </View>
              </View>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const SubtitleText = styled(Text)({
  color: '#F2AC02',
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: [16, 16, 16, 14, 16],
})
const NoteText = styled(Text)({
  fontSize: [12, 12, 12, 10, 12],
  textAlign: 'center',
})

export default HowToJoin
