import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React, { useState } from 'react'
import KnockoutSection from './KnockoutSection'
import PageSwitcher from './PageSwitcher'

const ITEM_PER_PAGE = 4

const EuroStandings = () => {
  const { t } = useLocalization()
  const [page, setPage] = useState(0)

  // const { leagues, isFetching } = useGetRecoMatchQuery(
  //   { isApp: !desktop },
  //   {
  //     selectFromResult: (resp) => ({
  //       ...resp,
  //       leagues: matchGroupByLeague(resp),
  //     }),
  //   }
  // )

  // const filteredData = useMemo(
  //   () =>
  //     leagues?.entities[MatchLeagueId.EURO_CUP]?.slice(
  //       ITEM_PER_PAGE * (page - 2),
  //       ITEM_PER_PAGE * (page - 1)
  //     ) ?? [],
  //   [leagues, page]
  // )

  return (
    <View>
      <View sx={{ height: 50 }}>
        <PageSwitcher
          page={page}
          setPage={setPage}
          maxPage={0}
          label={t(`event.euro.sportsbook.knockout`)}
        />
      </View>
      <KnockoutSection />
    </View>
  )
}

export default EuroStandings
