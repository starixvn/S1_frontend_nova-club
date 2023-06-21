import Divider from 'app/components/Divider'
import { DripsyGradient } from 'app/components/Gradient'
import MatchLeagueSelector from 'app/features/sportsbook/MatchLeagueSelector'
import { Pressable, Text, View } from 'dripsy'
import { useState } from 'react'
import { matchGroupByLeague, useGetRecoMatchQuery } from 'services/matchApi'

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

  const { leagues } = useGetRecoMatchQuery(undefined, {
    selectFromResult: (resp) => ({
      ...resp,
      leagues: matchGroupByLeague(resp),
    }),
  })

  const leagueId = selectedLeague ?? leagues.ids[0] ?? ''
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
      <View
        sx={{ height: BAR_HEIGHT, width: '100%', bg: '$primary.300' }}
      ></View>
      <View
        sx={{
          height: 400,
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor: '$primary.100',
          alignItems: 'center',
          justifyContent: 'center',
          mb: '$sectionBottomSpace',
        }}
      >
        <Text sx={{ fontSize: 30, fontWeight: 'bold' }}>Table</Text>
      </View>
    </View>
  )
}
