import { EntityId } from '@reduxjs/toolkit'
import { DripsyGradient } from 'app/components/Gradient'
import MatchLeagueSelector from 'app/features/sportsbook/MatchLeagueSelector'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import dayjsTz from 'app/utils/dayjs'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Pressable, Text, View } from 'dripsy'
import { startTransition, useEffect, useMemo, useRef, useState } from 'react'
import { matchGroupByLeague, useGetRecoMatchQuery } from 'services/matchApi'
import MatchListHeader from './MatchListHeader'
import MatchListTable from './MatchListTable'
import { League, MatchResult } from 'services/matchApi.type'
import { Dictionary } from 'lodash'
dayjs.extend(customParseFormat)

type Props = {}

const BAR_HEIGHT = 50

export default function MatchList({}: Props) {
  const [selectedLeague, setSelectedLeague] = useState<EntityId>()
  const [selectedTime, setSelectedTime] = useState<string>('All')
  const [fullData, setFullData] = useState<
    Record<string, (EntityId | MatchResult)[]>
  >({})

  const tableRef = useRef()
  const [data, setData] = useState<(EntityId | MatchResult)[]>([])
  const desktop = useIsDesktop()
  const { t } = useLocalization()
  const leagues = useGetRecoMatchQuery(
    { isApp: !desktop },
    {
      selectFromResult: (resp) => matchGroupByLeague(resp),
    }
  )
  const timeFilter = getMatchTimeFilterLabel()

  const leagueId = selectedLeague ?? ''

  useEffect(() => {
    let final = {}
    if (leagues) {
      timeFilter.forEach((f) => {
        const time = f.date
        const filterStartDate = dayjs(time)
        const filterEndDate = filterStartDate.endOf('day')
        const endDate =
          time === 'All' ? dayjsTz(dayjs()).add(6, 'day') : filterEndDate
        const startDate = time === 'All' ? dayjsTz(dayjs()) : filterStartDate

        const filtered = leagues.ids.reduce((prev, cur) => {
          const matches = leagues.entities[cur] as MatchResult[]

          const filtered =
            time !== 'All'
              ? matches.filter((match) => {
                  const { matchDayjs } = getMatchTime(match.globalshowtime)
                  return (
                    startDate.format('D') === matchDayjs.format('D') &&
                    matchDayjs.isAfter(startDate) &&
                    matchDayjs.isBefore(endDate)
                  )
                })
              : matches

          if (filtered.length > 0) prev.push(cur)
          return prev.concat(filtered)
        }, [] as (EntityId | MatchResult)[])

        final[f.date] = filtered
      })
      console.log('final', final)

      setFullData(final)
    }
  }, [leagues])

  useEffect(() => {
    if (fullData[selectedTime])
      startTransition(() => setData(fullData[selectedTime]))
  }, [selectedTime, selectedLeague])

  console.log('data', data)

  return (
    <View sx={{ mt: '$3', minHeight: 500 }}>
      {/* <Divider /> */}
      <DripsyGradient
        gradient={'surface'}
        sx={{
          flexDirection: 'row',
          py: '$3',
          alignItems: 'center',
          gap: '$4',
          px: '$4',
          borderTopWidth: 1,
          borderTopColor: '$primary.50',
        }}
      >
        {timeFilter.map((f) => {
          return (
            <Pressable
              key={f.label}
              onPress={() => {
                setSelectedTime(f.date ?? 'all')
                f.date === 'all' && setSelectedLeague(undefined)
              }}
            >
              <Text
                selectable={false}
                sx={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: f.date === selectedTime ? 'white' : '#80ceff',
                  textTransform: 'capitalize',
                }}
              >
                {t(f.label ?? '')}
              </Text>
            </Pressable>
          )
        })}
      </DripsyGradient>
      <MatchLeagueSelector
        ids={leagues.ids}
        onChange={(v) => {
          console.log('tableRef.current', tableRef.current.scrollToIndex)
          tableRef.current.scrollToIndex({
            animated: true,
            index: 30,
            viewOffset: 50,
          })
          // setSelectedLeague(v)
        }}
        value={leagueId}
      />

      {leagues.entities[leagueId]?.[0] && (
        <MatchListHeader
          data={leagues.entities[leagueId]?.[0]}
          height={BAR_HEIGHT}
        />
      )}

      <MatchListTable
        ref={tableRef}
        data={data}
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
    label: 'common.all',
  })
  for (let i = 0; i < 10; i++) {
    const date = gmt7.add(i, 'day')
    const dateObject: DateArrayType = {}

    if (i === 0) {
      dateObject['label'] = 'filter.date.today'
    } else if (i === 1) {
      dateObject['label'] = 'filter.date.tomorrow'
    } else {
      dateObject['label'] = `${date.format('D-MMM')} (${date.format('ddd')})`
    }

    dateObject['date'] = date.format('YYYY-MM-DD')
    dateObject['day'] = date.format('dddd')

    dateArray.push(dateObject) // Push the dateObject into the dateArray
  }
  return dateArray
}

const getMatchTime = (globalshowtime: string) => {
  let time = '-'
  let date = '-'
  let matchUnixDate = 0
  let matchDayjs = {} as dayjs.Dayjs
  try {
    const gmt8 = dayjs(globalshowtime, 'MM/DD hh:mmA')
    const gmt7 = dayjsTz(gmt8)

    if (gmt7.isValid()) {
      time = gmt7.format('HH:mm')
      date = gmt7.format('DD/MM')
      matchUnixDate = gmt7.unix()
      matchDayjs = gmt7
    }
  } catch (e) {
    // Android Hermes will hit error if using dayjsTz
  }
  return { time, date, matchUnixDate, matchDayjs }
}
