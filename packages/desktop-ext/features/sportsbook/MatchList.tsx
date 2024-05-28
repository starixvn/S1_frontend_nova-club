import { EntityId } from '@reduxjs/toolkit'
import { DripsyGradient } from 'app/components/Gradient'
import { LEAGUE_SECTION, MatchLeagueId } from 'app/constants/recMatchMapping'
import MatchLeagueSelector from 'app/features/sportsbook/MatchLeagueSelector'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import dayjsTz from 'app/utils/dayjs'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { ActivityIndicator, Pressable, Text, View } from 'dripsy'
import { useMemo, useRef, useState } from 'react'
import { matchGroupByLeague, useGetRecoMatchQuery } from 'services/matchApi'
import { MatchResult } from 'services/matchApi.type'
import { createParam } from 'solito'
import MatchListTable, { MatchListMethod } from './MatchListTable'
import EuroMatches from './euro/EuroMatches'
import EuroStandings from './euro/EuroStandings'
dayjs.extend(customParseFormat)

type Props = {}

type Params = {
  section?: string
}

const { useParam } = createParam<Params>()

export default function MatchList({}: Props) {
  const [selectedTime, setSelectedTime] = useState<string>('All')
  const [selectedLeague, setSelectedLeague] = useState<EntityId | null>()
  const [leagueSection, setleagueSection] = useParam('section', {
    initial: LEAGUE_SECTION.LEAGUE_ODDS,
  })

  const tableRef = useRef<MatchListMethod>()
  const matchRef = useRef<View>()
  const currency = useAppSelector((s) => s.setting.currency)
  const desktop = useIsDesktop()
  const { t } = useLocalization()
  const { leagues, isFetching } = useGetRecoMatchQuery(
    { isApp: !desktop, currency },
    {
      selectFromResult: (resp) => ({
        ...resp,
        leagues: matchGroupByLeague(resp),
      }),
    }
  )

  const timeFilter = getMatchTimeFilterLabel()
  const leagueId = selectedLeague ?? leagues.ids[0] ?? ''

  const fullData: Record<string, (EntityId | MatchResult)[]> = useMemo(() => {
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
    }

    return final
  }, [leagues])
  const visibleTimeFilter = timeFilter.filter(
    (el) => fullData[el.date]?.length > 0
  )

  const filteredData = useMemo(() => {
    const filterTime = fullData[selectedTime]

    const euroLeagueIndex = filterTime?.findIndex(
      (el) => el.toString() === MatchLeagueId.EURO_CUP.toString()
    )

    const finalData = filterTime?.slice(0, euroLeagueIndex)

    return finalData ?? []
  }, [selectedTime, fullData])

  const filteredEuroData = useMemo(() => {
    const filterTime = fullData[selectedTime]

    const euroLeagueIndex =
      filterTime?.findIndex(
        (el) => el.toString() === MatchLeagueId.EURO_CUP.toString()
      ) ?? 0

    const finalData =
      euroLeagueIndex > 0 ? filterTime?.slice(euroLeagueIndex) : []

    return finalData ?? []
  }, [selectedTime, fullData]) as MatchResult[]

  const leagueTab = useMemo(() => {
    return filteredData.filter((d) => typeof d === 'string')
  }, [filteredData]) as EntityId[]

  const MatchList = useMemo(() => {
    switch (leagueSection) {
      case LEAGUE_SECTION.EURO_MATCH:
        setSelectedLeague(MatchLeagueId.EURO_CUP.toString())
        return <EuroMatches data={filteredEuroData.slice(1)} />
      case LEAGUE_SECTION.EURO_STANDINGS:
        setSelectedLeague(MatchLeagueId.EURO_CUP.toString())
        return <EuroStandings data={filteredEuroData.slice(1)} />
      case LEAGUE_SECTION.EURO_ODDS:
        return (
          <MatchListTable
            filterKey={selectedTime}
            ref={tableRef}
            data={filteredEuroData}
          />
        )
      case LEAGUE_SECTION.LEAGUE_ODDS:
        setSelectedLeague(undefined)
        return (
          <MatchListTable
            filterKey={selectedTime}
            ref={tableRef}
            data={filteredData}
          />
        )

      default:
        setSelectedLeague(undefined)
        return (
          <MatchListTable
            filterKey={selectedTime}
            ref={tableRef}
            data={filteredData}
          />
        )
    }
  }, [filteredData, leagueSection, selectedTime])

  return isFetching ? (
    <ActivityIndicator size={'large'} />
  ) : (
    <View ref={matchRef} sx={{ mt: '$3', minHeight: 500 }}>
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
        {visibleTimeFilter.map((f) => {
          return (
            <Pressable
              key={f.label}
              onPress={() => {
                setSelectedTime(f.date ?? 'all')
                setTimeout(() => {
                  tableRef?.current?.jumpTo(0)
                }, 300)
              }}
            >
              <Text
                selectable={false}
                sx={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: f.date === selectedTime ? '$selectionColor' : 'white',
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
        ids={leagueTab}
        onChange={(v, leagueSection) => {
          setleagueSection(leagueSection)
          setSelectedLeague(v.toString())
          matchRef?.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          })

          const goTo = filteredData?.findIndex((el) => el === v)
          setTimeout(() => {
            tableRef?.current?.jumpTo(
              leagueSection === LEAGUE_SECTION.EURO_ODDS ? 0 : goTo
            )
          }, 300)
        }}
        value={leagueId}
      />
      {MatchList}
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
