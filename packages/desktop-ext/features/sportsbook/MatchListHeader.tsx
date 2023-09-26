import Icon from 'app/components/Icon'
import DataTable from 'app/components/dataTable/DataTable'
import DataTableHeader from 'app/components/dataTable/DataTableHeader'
import DataTableTitle from 'app/components/dataTable/DataTableTitle'
import { MatchLeagueTabIconMapping } from 'app/constants/recMatchMapping'
import { Row, Text, View } from 'dripsy'
import { MotiText, MotiView } from 'moti'
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
        borderTopWidth: 1,
        borderTopColor: '$primary.50',
      }}
    >
      <DataTable sx={{ height: '100%' }}>
        <DataTableHeader
          sx={{
            justifyContent: 'center',
            px: '$3',
            py: 0,
            bg: '$primary.50',
            flex: 1,
          }}
        >
          <DataTableTitle
            sx={{
              flex: 0.29,
              px: 0,
              justifyContent: 'flex-start',
            }}
          >
            <MotiView
              from={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              key={MatchLeagueTabIconMapping[data?.LeagueId ?? 0]}
            >
              <Icon
                name={MatchLeagueTabIconMapping[data?.LeagueId ?? 0]}
                sx={{ fontSize: [24, 30] }}
              />
            </MotiView>
            <Text
              sx={{
                mx: '$2',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              {data?.LeagueName}
            </Text>
          </DataTableTitle>
          <Row sx={{ flex: 1 }}>
            <DataTableTitle sx={{ flex: 0.6, px: 0 }}>FT. HDP</DataTableTitle>
            <DataTableTitle sx={{ flex: 0.6, px: 0 }}>FT. O/U</DataTableTitle>
            <DataTableTitle sx={{ flex: 0.35, px: 0 }}>FT. 1X2</DataTableTitle>
            <DataTableTitle sx={{ flex: 0.3, px: 0 }}>FT. O/E</DataTableTitle>
            <DataTableTitle sx={{ flex: 0.6, px: 0 }}>1H. HDP</DataTableTitle>
            <DataTableTitle sx={{ flex: 0.65, px: 0 }}>1H. O/U</DataTableTitle>
            <DataTableTitle sx={{ flex: 0.3, px: 0 }}>1H. 1X2</DataTableTitle>
          </Row>
          <DataTableTitle sx={{ flex: 0.15 }}>{}</DataTableTitle>
        </DataTableHeader>
      </DataTable>
    </View>
  )
}

export default MatchListHeader
