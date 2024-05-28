import { MatchLeagueId } from 'app/constants/recMatchMapping'
import GroupStage from 'app/features/sportsbook/euro/GroupStage'
import PageSwitcher from 'app/features/sportsbook/euro/PageSwitcher'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React, { useMemo, useState } from 'react'
import { MatchHeader } from '../MatchListHeader'
import Knockout from './Knockout'

const EuroStandings = () => {
  const { t } = useLocalization()
  const [page, setPage] = useState(0)

  const EuroStandingsMatch = useMemo(
    () => (page === 0 ? <Knockout /> : <GroupStage />),
    [page]
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
          maxPage={0}
          label={t(
            `event.euro.sportsbook.${page === 0 ? 'knockout' : 'group'}`
          )}
        />
      </MatchHeader>

      <View sx={{ height: 24 }} />
      <Knockout />
    </View>
  )
}
export default EuroStandings
