import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { Row, Text, View, styled } from 'dripsy'
import React, { ReactNode } from 'react'
import { SolitoImage } from 'solito/image'

const HOW_TO_JOIN = [
  'event.euro.join.n1',
  'event.euro.join.n2',
  'event.euro.join.n3',
  'event.euro.join.n4',
  'event.euro.join.n5',
  'event.euro.join.n6',
  'event.euro.join.n7',
  'event.euro.join.n8',
  'event.euro.join.n9',
]

const PRIZE = [
  {
    image: `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/car.png`,
    label: '1 x VinFast VF 6',
  },
  {
    image: `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/yamaha.png`,
    label: '2 x Yamaha Grande 125 Hybrid Scooter',
  },
  {
    image: `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/iphone.png`,
    label: '5 x iPhone 15 Pro Max (256GB)',
  },
  { label: '• 10 x 100 VUI COIN' },
  { label: '• 10 x 2 million VND' },
  { label: '• 10 x Nintendo Switch OLED Model' },
  { label: '• 10 x Got It Credit 500k VND' },
]

const Prizes = () => {
  const { t } = useLocalization()
  const isDesktop = useIsDesktop()

  return (
    <View
      sx={{
        borderRadius: 12,
        overflow: 'hidden',
        my: '$3',
      }}
    >
      <CardTitleText sx={{ bg: '#D90000' }}>
        {t('event.euro.tnc.prizes')}
      </CardTitleText>
      <View sx={{ bg: '#00215F80', p: '$2', alignItems: 'center' }}>
        <PredictPrizeCard
          title={t('event.euro.tnc.predict1')}
          subtitle={t('event.euro.tnc.luckyDraw')}
        >
          {isDesktop ? <DesktopPrize /> : <MobilePrize />}
        </PredictPrizeCard>

        <PredictPrizeCard
          title={t('event.euro.tnc.predict2')}
          subtitle={t('event.euro.jackpot')}
        >
          <NoteText>{t('event.euro.tnc.jackpot')}</NoteText>
        </PredictPrizeCard>
      </View>
    </View>
  )
}

const DesktopPrize = () => (
  <View>
    <Row sx={{ mb: '$3' }}>
      {PRIZE.slice(0, 3).map((item, index) => (
        <>
          {index !== 0 && <View sx={{ width: 1, bg: 'white' }} />}
          <View
            key={index}
            sx={{ width: '33%', alignItems: 'center', px: '$3' }}
          >
            <SolitoImage src={item.image} width={100} height={100} alt="" />
            <NoteText>{item.label}</NoteText>
          </View>
        </>
      ))}
    </Row>

    <Row
      sx={{
        borderRadius: 12,
        bg: '#CCF5C4',
        p: '$2',
      }}
    >
      {PRIZE.slice(3).map((item, index) => (
        <NoteText key={index} sx={{ width: '25%', color: '#103B00' }}>
          {item.label}
        </NoteText>
      ))}
    </Row>
  </View>
)

const MobilePrize = () => (
  <View>
    <View sx={{ mb: '$3' }}>
      {PRIZE.slice(0, 3).map((item, index) => (
        <>
          <Row
            key={index}
            sx={{ width: '100%', alignItems: 'center', py: '$3' }}
          >
            <SolitoImage
              src={item.image}
              width={100}
              height={100}
              alt=""
              contentPosition="center"
              style={{ flexBasis: 100, marginRight: 12 }}
            />
            <NoteText sx={{ flex: 1, textAlign: 'left', fontSize: 18 }}>
              {item.label}
            </NoteText>
          </Row>
          <View sx={{ height: 1, bg: 'white' }} />
        </>
      ))}
    </View>

    <View
      sx={{
        borderRadius: 12,
        bg: '#CCF5C4',
        p: '$2',
      }}
    >
      {PRIZE.slice(3).map((item, index) => (
        <NoteText key={index} sx={{ color: '#103B00' }}>
          {item.label}
        </NoteText>
      ))}
    </View>
  </View>
)

const PredictPrizeCard = ({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: ReactNode
}) => {
  const { t } = useLocalization()
  return (
    <View
      sx={{
        width: '90%',
        borderRadius: 12,
        overflow: 'hidden',
        my: '$3',
      }}
    >
      <CardTitleText sx={{ bg: '#00E600', color: 'black' }}>
        {title}
      </CardTitleText>
      <CardTitleText sx={{ bg: '#CCF5C4', color: 'black' }}>
        {subtitle}
      </CardTitleText>
      <View sx={{ bg: '#0A41FF', p: '$3' }}>{children}</View>
    </View>
  )
}

const CardTitleText = styled(Text)({
  textAlign: 'center',
  fontWeight: 'bold',
  py: '$1',
})

const NoteText = styled(Text)({
  fontSize: 14,
  textAlign: 'center',
  fontWeight: 'bold',
})

export default Prizes
