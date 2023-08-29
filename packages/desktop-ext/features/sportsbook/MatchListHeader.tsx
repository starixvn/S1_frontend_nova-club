import Icon from 'app/components/Icon'
import DataTable from 'app/components/dataTable/DataTable'
import DataTableHeader from 'app/components/dataTable/DataTableHeader'
import DataTableTitle from 'app/components/dataTable/DataTableTitle'
import { MatchLeagueTabIconMapping } from 'app/constants/recMatchMapping'
import { Row, View } from 'dripsy'
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
      <DataTable>
        <DataTableHeader sx={{ justifyContent: 'space-between', px: 0 }}>
          <DataTableTitle sx={{ flex: 0.1 }}>
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
          </DataTableTitle>

          <DataTableTitle sx={{ flex: 0.18, justifyContent: 'flex-start' }}>
            <MotiText
              from={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              key={data?.LeagueName}
              style={{
                fontSize: 12,
                textAlign: 'left',
                color: 'white',
              }}
            >
              {data?.LeagueName}

              {/* <Text sx={{ fontSize: 12, textAlign: 'left' }}>
              </Text> */}
            </MotiText>
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
