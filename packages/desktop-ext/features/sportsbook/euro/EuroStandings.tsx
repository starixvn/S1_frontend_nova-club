import { MatchLeagueId } from 'app/constants/recMatchMapping'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React, { useMemo, useState } from 'react'
import { MatchResult } from 'services/matchApi.type'
import { MatchHeader } from '../MatchListHeader'
import PageSwitcher from './PageSwitcher'
import Knockout from './Knockout'
import GroupStage from './GroupStage'

const EuroStandings = ({ data }: { data: MatchResult[] }) => {
  const { t } = useLocalization()
  const [page, setPage] = useState(1)

  const EuroStandingsMatch = useMemo(
    () => (page === 1 ? <Knockout data={data} /> : <GroupStage data={data} />),
    [data, page]
  )

  return (
    <View>
      <MatchHeader
        icon={MatchLeagueId.EURO_CUP}
        label={t('event.euro.sportsbook.eufa')}
        height={50}
      >
        <PageSwitcher
          page={page}
          setPage={setPage}
          maxPage={2}
          label={t(
            `event.euro.sportsbook.${page === 1 ? 'knockout' : 'group'}`
          )}
        />
      </MatchHeader>

      <View sx={{ height: 24 }} />
      {EuroStandingsMatch}
    </View>
  )
}
export default EuroStandings
