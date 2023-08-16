import HistoryListing from 'app/components/history/HistoryListing'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { ReportTransactionType } from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import { Text, View, useResponsiveValue } from 'dripsy'
import React, { useState } from 'react'
import { useLazyPlayerReportQuery } from 'services/playerApi'
import { ReportGameItem, ReportResult } from 'services/playerApi.type'
import DesktopRedeemHistoryItem, {
  RedeemTableHeader,
} from '../dekstop/DesktopRedeemHistoryItem'

type HistoryListingDataType = Extract<
  ReportResult['rows'],
  ReportGameItem[]
>[number]

const RedeemHistory = () => {
  const { t } = useLocalization()
  const desktop = useIsDesktop()
  const responsiveWidth = useResponsiveValue(['100%', '100%', '100%', '90%'])

  const [fetchData, result] = useLazyPlayerReportQuery()

  const [fetchParams, setFetchParams] = useState({
    time_from: dayjsTz().subtract(2, 'month').startOf('date').toDate(),
    time_to: dayjsTz().endOf('date').toDate(),
    trans_type: ReportTransactionType.COIN,
  })

  const tableHeader = desktop ? RedeemTableHeader : RedeemTableHeader.slice(1)
  const renderItem = ({ item, index }) => (
    <DesktopRedeemHistoryItem item={item} index={index} />
  )

  return (
    <View
      sx={{
        flex: 300,
        bg: '$secondary',
        width: responsiveWidth,
        mx: 'auto',
        py: '$pagePadding',
      }}
    >
      <Text sx={{ pb: '$pagePadding', fontWeight: 'bold' }}>
        {t('menu.tab.coinHistory')}
      </Text>
      <HistoryListing<HistoryListingDataType, typeof fetchParams>
        fetchParams={fetchParams}
        trigger={fetchData}
        result={result}
        header={tableHeader}
        keyExtractor={(item, index) =>
          `${index} History ${item.game_provider_code}`
        }
        renderItem={renderItem}
      />
    </View>
  )
}

export default RedeemHistory
