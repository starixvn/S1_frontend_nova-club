import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { Row, View, useResponsiveValue } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'
import EuroBackground from './components/EuroBackground'
import { TitleText } from './components/EuroText'
import HowToJoin from './components/HowToJoin'
import RulesCard from './components/RulesCard'

const TICKET_RULES = [
  {
    label: 'event.euro.round.title1',
    period: '01/06 (12am) - 19/06 (7pm)',
    note: 'event.euro.round.n1',
    bgColor: '#AD1A2B',
  },
  {
    label: 'event.euro.round.title2',
    period: '27/06 (5am) - 29/06 (10pm)',
    note: 'event.euro.round.n2',
    bgColor: '#84004D',
  },
  {
    label: 'event.euro.round.title3',
    period: '03/07 (5am) - 05/07 (10pm)',
    note: 'event.euro.round.n3',
    bgColor: '#0F5317',
  },
  {
    label: 'event.euro.round.title4',
    period: '07/07 (5am) - 10/07 (1am)',
    note: 'event.euro.round.n4',
    bgColor: '#0B0E5C',
  },
  {
    label: 'event.euro.round.title5',
    period: '11/07 (5am) - 15/07 (1am)',
    note: 'event.euro.round.n5',
    note2: 'event.euro.round.n5a',
    bgColor: '#000000',
  },
]
const Rules = () => {
  const { t } = useLocalization()
  const imageWidth = useResponsiveValue([150, 150, 200])
  const contentWidth = useResponsiveValue(['90%', 550, 700, 700, 800])
  const isDesktop = useIsDesktop()

  return (
    <EuroBackground>
      <View sx={{ alignItems: 'center', mt: '3%' }}>
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/mascot-rules.png`}
          width={imageWidth}
          height={imageWidth * (302 / 242)}
          contentPosition="top center"
          alt=""
        />

        <HowToJoin contentWidth={contentWidth} />

        <View
          sx={{
            bg: '#00215F80',
            width: contentWidth,
            py: '$4',
            borderRadius: 24,
            alignItems: 'center',
          }}
        >
          <TitleText sx={{ mb: '$3' }}>{t('event.euro.rulesTitle')}</TitleText>

          <Row
            sx={{
              flexWrap: 'wrap',
              gap: '$3',
              justifyContent: 'center',
            }}
          >
            {TICKET_RULES.map((item, index) => (
              <View
                key={index}
                sx={{
                  width:
                    index !== TICKET_RULES.length - 1 && isDesktop
                      ? '44%'
                      : '90%',
                }}
              >
                <RulesCard
                  background={item.bgColor}
                  title={t(item.label)}
                  period={item.period}
                  note={t(item.note, { linebreak: '\n' })}
                  note2={item.note2 && t(item.note2, { linebreak: '\n' })}
                />
              </View>
            ))}
          </Row>
        </View>
      </View>
    </EuroBackground>
  )
}

export default Rules
