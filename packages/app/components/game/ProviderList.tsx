import { ProviderColorImageMapping } from 'app/constants/gameAssets'
import { Pressable, Row, View } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'
import SectionLabel from '../SectionLabel'
import SectionHeader from '../SectionHeader'

// const cols = [3, 3, 4]
const width = ['24%', '19.5%', '19.5%', '16%']
const spaces = ['0.4%', '0.25%', '0.25%', '0.33%']

export default function ProviderList({ data }: { data: string[] }) {
  return (
    <View sx={{ mb: '$sectionBottomSpace' }}>
      <SectionHeader icon="all" title={'PROVIDERS'} />
      <View sx={{ px: ['$1', '$2'], pt: ['$2', '$3'] }}>
        <Row
          sx={{
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          {data.map((gpc, i) => {
            return (
              <Pressable
                key={i}
                onPress={() => {}}
                sx={{
                  width: width,
                  m: spaces,
                  // maxWidth: 240,
                  aspectRatio: 240 / 80,
                  // alignSelf: 'stretch',
                }}
              >
                <SolitoImage
                  fill
                  src={ProviderColorImageMapping[gpc]}
                  alt={gpc}
                />
              </Pressable>
            )
          })}
        </Row>
      </View>
    </View>
  )
}
