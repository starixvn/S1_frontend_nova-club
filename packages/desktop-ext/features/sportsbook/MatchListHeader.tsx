import Icon from 'app/components/Icon'
import DataTable from 'app/components/dataTable/DataTable'
import DataTableHeader from 'app/components/dataTable/DataTableHeader'
import DataTableTitle from 'app/components/dataTable/DataTableTitle'
import { MatchLeagueTabIconMapping } from 'app/constants/recMatchMapping'
import { Row, Text, View } from 'dripsy'
import React from 'react'
import { MatchResult } from 'services/matchApi.type'

interface MatchListHeaderProps {
  data?: MatchResult
  height: number
}

const MatchListHeader = ({ data, height }: MatchListHeaderProps) => {
  return (
    <View
      sx={{
        height,
        width: '100%',
        bg: '$primary.300',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <DataTable>
        <DataTableHeader sx={{ justifyContent: 'space-between' }}>
          <DataTableTitle
            sx={{ flex: 0.05 }}
            textStyle={{
              lineHeight: height,
            }}
          >
            <Icon
              name={MatchLeagueTabIconMapping[data?.LeagueId ?? 0]}
              sx={{ fontSize: [24, 30, 36], m: '$2' }}
            />
          </DataTableTitle>

          <DataTableTitle sx={{ flex: 0.25 }}>
            <Text>{data?.LeagueName}</Text>
          </DataTableTitle>
          <Row sx={{ flex: 1 }}>
            <DataTableTitle sx={{ flex: 2 }}>
              <Text>TT Handicap</Text>
            </DataTableTitle>
            <DataTableTitle sx={{ flex: 2 }}>
              <Text>TT</Text>
            </DataTableTitle>
            <DataTableTitle sx={{ width: 40 }}>
              <Text>1x2 TT</Text>
            </DataTableTitle>
            <DataTableTitle sx={{ flex: 2 }}>
              <Text>Handicap H1</Text>
            </DataTableTitle>
            <DataTableTitle sx={{ flex: 2 }}>
              <Text>H1</Text>
            </DataTableTitle>
            <DataTableTitle sx={{ width: 40 }}>
              <Text>1X2 H1</Text>
            </DataTableTitle>
          </Row>
        </DataTableHeader>
        {/* {dummyData.map((item) => (
          <DataTableRow key={item.rank}>
            <DataTableCell>{item.rank}</DataTableCell>
            <DataTableCell>{item.playerId}</DataTableCell>
            <DataTableCell textStyle={{ fontSize: 14 }}>
              {toThousandSeparator(item.points.toString())}
            </DataTableCell>
            <DataTableCell>-</DataTableCell>
          </DataTableRow>
        ))} */}
      </DataTable>
    </View>
  )
}

export default MatchListHeader
