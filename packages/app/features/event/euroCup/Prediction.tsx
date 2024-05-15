import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useLocalization from 'app/provider/localization'
import { Text, View, styled, useResponsiveValue } from 'dripsy'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import {
  useGetEligibleEuroCupTicketQuery,
  useGetEuroCupEventQuery,
} from 'services/euroApi'
import { SolitoImage } from 'solito/image'
import EuroBackground from './components/EuroBackground'
import JackpotPool from './components/JackpotPool'
import PredictionStage from './components/PredictionStage'
import { useAppSelector } from 'app/provider/redux/store'

const Prediction = () => {
  const { width } = useWindowDimensions()
  const isLoggedIn = useAppSelector((s) => !!s.auth.info)
  const contentWidth = useResponsiveValue([
    width < 400 ? 350 : 400,
    500,
    600,
    700,
    900,
  ])

  const { data } = useGetEuroCupEventQuery()
  const { data: ticketData } = useGetEligibleEuroCupTicketQuery(
    {
      event_code: data?.event_code ?? '',
    },
    { skip: !data?.event_code || !isLoggedIn, refetchOnMountOrArgChange: true }
  )

  return (
    <EuroBackground>
      <View sx={{ alignItems: 'center', mt: '3%' }}>
        <View
          sx={{
            alignItems: 'center',
            width: contentWidth,
          }}
        >
          <View sx={{ zIndex: 2, width: '100%', alignItems: 'center' }}>
            <JackpotPool />
            <Trophy amount={ticketData?.data?.winning_ticket} />
            <Ticket amount={ticketData?.data?.eligible_ticket} />
          </View>

          <PredictionStage
            contentWidth={contentWidth}
            eventCode={data?.event_code}
            eligibleTicket={ticketData?.data?.eligible_ticket}
            isEligibleScore={!!ticketData?.data?.eligible_for_score}
            teams={data?.event_team ?? []}
          />
        </View>
      </View>
    </EuroBackground>
  )
}

const Trophy = ({ amount = '-' }: { amount?: number | string }) => {
  const { t } = useLocalization()
  const imageWidth = useResponsiveValue([110, 120, 120, 140, 160])

  return (
    <View
      sx={{
        width: imageWidth,
        height: imageWidth,
        alignItems: 'center',
        position: 'absolute',
        bottom: [0, -12, -12, -30, -38],
        left: [0, 24, 36, 30, 20],
      }}
    >
      <SolitoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/trophy.png`}
        fill
        alt=""
      />
      <View
        sx={{
          alignItems: 'center',
          position: 'absolute',
          width: [50],
          right: [17, 20, 20, 30, 36],
          top: [40, 42, 42, 48, 56],
        }}
      >
        <SubText>{t('event.euro.prediction.winTicket')}</SubText>
        <CountText>{`${amount}`}</CountText>
      </View>
    </View>
  )
}

const Ticket = ({ amount = '-' }: { amount?: number | string }) => {
  const { t } = useLocalization()
  const imageWidth = useResponsiveValue([120, 130, 130, 160, 180])

  return (
    <View
      sx={{
        width: imageWidth,
        height: imageWidth,
        alignItems: 'center',
        position: 'absolute',
        bottom: [-28, -28, -28, -48, -56],
        right: [0, 12, 12, 12, -10],
      }}
    >
      <SolitoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/ticket.png`}
        fill
        alt=""
      />
      <View
        sx={{
          alignItems: 'center',
          position: 'absolute',
          width: [36, 50],
          top: [32, 36, '28%', '30%'],
          ml: 10,
        }}
      >
        <SubText>{t('event.euro.prediction.predictionTicket')}</SubText>
        <CountText sx={{ color: 'red', mr: [4, , 8] }}>{`${amount}`}</CountText>
      </View>
    </View>
  )
}

const SubText = styled(Text)({
  color: 'black',
  fontWeight: 'bold',
  textAlign: 'center',
  lineHeight: [8, 9, 9, 10, 12],
  fontSize: [8, 9, 9, 10, 12],
})

const CountText = styled(Text)({
  color: 'black',
  fontWeight: 'bold',
  fontSize: [16, 16, 16, 18, 20],
  mt: -2,
})

const JackpotText = styled(Text)({
  textAlign: 'right',
  fontSize: [28, 32, 36, 42],
  color: 'yellow',
  fontWeight: 'bold',
  lineHeight: 40,
  fontFamily: 'arial',
  fontVariant: 'tabular-nums',
})

export default Prediction
