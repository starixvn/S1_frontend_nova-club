import DataTable from 'app/components/dataTable/DataTable'
import DataTableCell from 'app/components/dataTable/DataTableCell'
import DataTableHeader from 'app/components/dataTable/DataTableHeader'
import DataTableRow from 'app/components/dataTable/DataTableRow'
import DataTableTitle from 'app/components/dataTable/DataTableTitle'
import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import React from 'react'

const dummyPoints = [
  {
    product: 'sports',
    turnover: 100,
    points: 1,
  },
  {
    product: 'live casino',
    turnover: 100,
    points: 1,
  },
  {
    product: 'slots',
    turnover: 100,
    points: 1,
  },
]

const PointsCalculation = () => {
  const { t } = useLocalization()

  return (
    <View>
      <Text sx={{ textAlign: 'center', p: 12 }}>
        {t('leaderboard.pointsCalculation').toUpperCase()}
      </Text>
      <DataTable>
        <DataTableHeader size="small" containerStyle={{}}>
          <DataTableTitle center={false} containerStyle={{ px: 12 }}>
            {t('leaderboard.product').toUpperCase()}
          </DataTableTitle>
          <DataTableTitle>{t('common.turnover').toUpperCase()}</DataTableTitle>
          <DataTableTitle>{t('common.points').toUpperCase()}</DataTableTitle>
        </DataTableHeader>
        {dummyPoints.map((item) => (
          <DataTableRow key={item.product}>
            <DataTableCell center={false} containerStyle={{ px: 12 }}>
              {item.product.toUpperCase()}
            </DataTableCell>
            <DataTableCell>{item.turnover}</DataTableCell>
            <DataTableCell>{item.points}</DataTableCell>
          </DataTableRow>
        ))}
      </DataTable>
    </View>
  )
}

export default PointsCalculation
