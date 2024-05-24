import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React, { useMemo, useState } from 'react'
import { matchGroupByLeague, useGetRecoMatchQuery } from 'services/matchApi'
import PageSwitcher from './PageSwitcher'
import GroupStage from './GroupStage'
import { MatchLeagueId } from 'app/constants/recMatchMapping'
import KnockoutSection from './KnockoutSection'

const ITEM_PER_PAGE = 4

const EuroStandings = () => {
  const { t } = useLocalization()
  const desktop = useIsDesktop()
  const [page, setPage] = useState(1)

  const { leagues, isFetching } = useGetRecoMatchQuery(
    { isApp: !desktop },
    {
      selectFromResult: (resp) => ({
        ...resp,
        leagues: matchGroupByLeague(resp),
      }),
    }
  )

  const filteredData = useMemo(
    () =>
      leagues?.entities[MatchLeagueId.EURO_CUP]?.slice(
        ITEM_PER_PAGE * (page - 2),
        ITEM_PER_PAGE * (page - 1)
      ) ?? [],
    [leagues, page]
  )

  return (
    <View>
      <View sx={{ height: 50 }}>
        <PageSwitcher
          page={page}
          setPage={setPage}
          maxPage={7}
          label={`${t('event.euro.sportsbook.gameStage')} ${page} of 3`}
        />
      </View>
      {page === 1 ? <KnockoutSection /> : <GroupStage data={filteredData} />}
    </View>
  )
}

export default EuroStandings
