import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import dayjs from 'dayjs'
import { Row, Text, View, styled, useResponsiveValue } from 'dripsy'
import React from 'react'
import { useGetEventEuroCupLogServiceQuery } from 'services/euroApi'
import {
  EventEuroCupLogServiceResult,
  LogPrediction,
  LogWinning,
} from 'services/euroApi.type'

type ItemRowProps = {
  index: number
  item: EventEuroCupLogServiceResult
}

const HistoryTable = () => {
  const contentWidth = useResponsiveValue(['100%', 550, 700, 700, 800])
  const isLoggedIn = useAppSelector((s) => !!s.auth.info)
  const { data } = useGetEventEuroCupLogServiceQuery(undefined, {
    skip: !isLoggedIn,
  })

  return (
    <View
      sx={{
        width: contentWidth,
        borderRadius: 12,
        overflow: 'hidden',
        my: '$3',
      }}
    >
      <HeaderRow />
      {data?.data?.map((item, index) => (
        <ItemRow key={index} index={index} item={item} />
      ))}
    </View>
  )
}

const HeaderRow = () => {
  const { t } = useLocalization()

  return (
    <View>
      <Row sx={{ bg: '#00E600' }}>
        <HeaderText sx={{ flexBasis: 48, textAlign: 'center' }}>
          {t('common.no')}
        </HeaderText>
        <View
          sx={{
            flex: [0.5, 0.4, 0.3],
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: 'white',
          }}
        >
          <HeaderText sx={{ textAlign: 'center' }}>
            {t('common.date')}
          </HeaderText>
        </View>
        <HeaderText sx={{ flex: 1, px: ['$3', '$4'] }}>
          {t('event.euro.status')}
        </HeaderText>
      </Row>
    </View>
  )
}

const ItemRow = ({ index, item }: ItemRowProps) => {
  const { t } = useLocalization()
  const j = JSON.parse(item.detail) as LogWinning & LogPrediction

  const getStage = (round) => {
    switch (round) {
      case 'Group Stage':
        return 'event.euro.rules.round1'
      case 'Round 16':
        return 'event.euro.rules.round2'
      case 'Quater Final':
        return 'event.euro.rules.round3'
      case 'Semi Final':
        return 'event.euro.rules.round4'
      case 'Final':
        return 'event.euro.rules.round5'

      default:
        return 'event.euro.rules.round1'
    }
  }

  const text =
    item.type === 'winning'
      ? t('event.euro.history.win', {
          ticket: j.ticket,
          stage: t(getStage(j.event_code)),
        })
      : j.teams.length === 1
      ? t('event.euro.history.selectChampion', { team: j.teams.join('') })
      : `${t('event.euro.history.selectTeam', {
          team: j.teams.join(', '),
          stage: t(getStage(j.event_code)),
        })}`

  return (
    <View>
      <View sx={{ width: '100%', height: 1, bg: 'white' }} />
      <Row sx={{ bg: '#00000080' }}>
        <TableText sx={{ flexBasis: 48, textAlign: 'center' }}>
          {index + 1}
        </TableText>
        <View
          sx={{
            flex: [0.5, 0.4, 0.3],
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: 'white',
          }}
        >
          <TableText sx={{ textAlign: 'center' }}>
            {dayjs(item.created_at).format('DD-MM-YYYY')}
          </TableText>
        </View>
        <TableText sx={{ flex: 1, px: ['$3', '$4'] }}>{text}</TableText>
      </Row>
    </View>
  )
}

const TableText = styled(Text)({ py: '$2', px: '$0', fontSize: 14 })
const HeaderText = styled(TableText)({ color: 'black', fontWeight: 'bold' })

export default HistoryTable
