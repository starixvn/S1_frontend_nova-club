import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { Text } from 'dripsy'
import { View } from 'dripsy'
import React from 'react'
import { MatchResult } from 'services/matchApi.type'
import { SolitoImage } from 'solito/image'

const Knockout = ({ data }: { data: MatchResult[] }) => {
  return (
    <View sx={{ alignItems: 'center', justifyContent: 'center' }}>
      <SolitoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/final-trophy.png`}
        width={144}
        height={350}
        alt=""
      />
    </View>
  )
}

export default Knockout
