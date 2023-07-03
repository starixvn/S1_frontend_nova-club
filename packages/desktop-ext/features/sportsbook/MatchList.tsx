import Divider from 'app/components/Divider'
import { DripsyGradient } from 'app/components/Gradient'
import MatchLeagueSelector from 'app/features/sportsbook/MatchLeagueSelector'
import isDesktop from 'app/utils/isDesktop'
import { Pressable, ScrollView, Text, View } from 'dripsy'
import { useState } from 'react'
import { matchGroupByLeague, useGetRecoMatchQuery } from 'services/matchApi'
import MatchListHeader from './MatchListHeader'
import MatchListTable from './MatchListTable'

type Props = {}

const FIRST_FILTER = [
  {
    label: 'ALL MATCH',
  },
  {
    label: 'HOT MATCH',
  },
  {
    label: 'UPCOMING MATCH',
  },
]

const BAR_HEIGHT = 50
export default function MatchList({}: Props) {
  const [selectedLeague, setSelectedLeague] = useState<string>()
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

  // console.log(leagues.ids)

  const leagueId = selectedLeague ?? leagues.ids[0] ?? ''

  // console.log('leagues', leagues.entities[leagueId])
  // const test = leagues.entities[leagueId]?.[0]

  return (
    <View>
      <Divider />
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
        {FIRST_FILTER.map((f) => {
          return (
            <Pressable key={f.label}>
              <Text
                selectable={false}
                sx={{ fontSize: 12, fontWeight: 'bold' }}
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

      <MatchListTable data={leagues.entities[leagueId]} />
    </View>
  )
}
