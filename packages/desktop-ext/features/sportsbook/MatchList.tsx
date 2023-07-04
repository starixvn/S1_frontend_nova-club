import Divider from 'app/components/Divider'
import { DripsyGradient } from 'app/components/Gradient'
import MatchLeagueSelector from 'app/features/sportsbook/MatchLeagueSelector'
import isDesktop from 'app/utils/isDesktop'
import { Pressable, Text, View } from 'dripsy'
import { useState } from 'react'
import { matchGroupByLeague, useGetRecoMatchQuery } from 'services/matchApi'
import MatchListHeader from './MatchListHeader'
import MatchListTable from './MatchListTable'
import dayjsTz from 'app/utils/dayjs'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { EntityId } from '@reduxjs/toolkit'
dayjs.extend(customParseFormat)

type Props = {}

const BAR_HEIGHT = 50

export default function MatchList({}: Props) {
  const [selectedLeague, setSelectedLeague] = useState<EntityId>()
  const [selectedTime, setSelectedTime] = useState<string>('All')
  const desktop = isDesktop()
  const { leagues } = useGetRecoMatchQuery(
    { isApp: !desktop },
    {
      selectFromResult: (resp) => ({
        ...resp,
        leagues: matchGroupByLeague(resp),
      }),
    }
  )
  const timeFilter = getMatchTimeFilterLabel()

  const leagueId = selectedLeague ?? ''

  return (
    <View sx={{ mt: '$3', minHeight: 500 }}>
      {/* <Divider /> */}
      <DripsyGradient
        gradient={'surface'}
        sx={{
          flexDirection: 'row',
          height: BAR_HEIGHT,
          alignItems: 'center',
          gap: '$4',
          px: '$4',
        }}
      >
        {timeFilter.map((f) => {
          return (
            <Pressable key={f.label} onPress={() => setSelectedTime(f.date)}>
              <Text
                selectable={false}
                sx={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: f.date === selectedTime ? 'white' : '#80ceff',
                }}
              >
                {f.label}
              </Text>
            </Pressable>
          )
        })}
      </DripsyGradient>
      <MatchLeagueSelector
        ids={leagues.ids}
        onChange={setSelectedLeague}
        value={leagueId}
      />

      <MatchListHeader
        data={leagues.entities[leagueId]?.[0]}
        height={BAR_HEIGHT}
      />

      <MatchListTable
        data={leagues.entities[leagueId]}
        leagueId={leagueId}
        fullData={leagues.entities}
        allLeagueId={leagues.ids}
        selectedTime={selectedTime ? selectedTime : ''}
      />
    </View>
  )
}
interface DateArrayType {
  label?: string
  date?: string
  day?: string
}
const getMatchTimeFilterLabel = () => {
  const today = dayjs()
  const gmt8 = dayjsTz(today)
  const gmt7 = dayjsTz(gmt8)

  const dateArray: DateArrayType[] = []
  dateArray.push({
    date: 'All',
    label: 'All',
  })
  for (let i = 0; i < 7; i++) {
    const date = gmt7.add(i, 'day')
    const dateObject: DateArrayType = {}

    if (i === 0) {
      dateObject['label'] = 'Today'
    } else if (i === 1) {
      dateObject['label'] = 'Tomorrow'
    } else {
      dateObject['label'] = `${date.format('D-MMM')} (${date.format('ddd')})`
    }

    dateObject['date'] = date.format('YYYY-MM-DD')
    dateObject['day'] = date.format('dddd')

    dateArray.push(dateObject) // Push the dateObject into the dateArray
  }
  return dateArray
}
