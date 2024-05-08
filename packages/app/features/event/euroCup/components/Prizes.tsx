import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { Row, Text, View, styled } from 'dripsy'
import React, { ReactNode } from 'react'
import { SolitoImage } from 'solito/image'

const PRIZE = [
  `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/car.png`,
  `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/yamaha.png`,
  `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/iphone.png`,
]

type PrizeProps = {
  mainPrize: { image: string; label: string }[]
  subPrize: string[]
}

const Prizes = () => {
  const { t } = useLocalization()
  const isDesktop = useIsDesktop()

  const mainPrize = t('event.euro.tnc.lucky1')
    .split('| ')
    .map((el, index) => {
      return {
        image: PRIZE[index] as string,
        label: el,
      }
    })

  const subPrize = t('event.euro.tnc.lucky2')
    .split('| ')
    .map((el) => el)

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
          {isDesktop ? (
            <DesktopPrize mainPrize={mainPrize} subPrize={subPrize} />
          ) : (
            <MobilePrize mainPrize={mainPrize} subPrize={subPrize} />
          )}
        </PredictPrizeCard>

        <PredictPrizeCard
          title={t('event.euro.tnc.predict2')}
          subtitle={t('event.euro.prediction.jackpot')}
        >
          <NoteText>{t('event.euro.tnc.jackpot')}</NoteText>
        </PredictPrizeCard>
      </View>
    </View>
  )
}

const DesktopPrize = ({ mainPrize = [], subPrize = [] }: PrizeProps) => (
  <View>
    <Row sx={{ mb: '$3' }}>
      {mainPrize.map((item, index) => (
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
      {subPrize.map((item, index) => (
        <NoteText key={index} sx={{ width: '25%', color: '#103B00' }}>
          • {item}
        </NoteText>
      ))}
    </Row>
  </View>
)

const MobilePrize = ({ mainPrize = [], subPrize = [] }: PrizeProps) => (
  <View>
    <View sx={{ mb: '$3' }}>
      {mainPrize.map((item, index) => (
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
      {subPrize.map((item, index) => (
        <NoteText key={index} sx={{ color: '#103B00' }}>
          • {item}
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
