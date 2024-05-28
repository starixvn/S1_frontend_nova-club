import { PROVIDER_LOGO } from 'app/config/games/provider'
import { Row, View } from 'dripsy'
import React from 'react'
import { useGameProviderListQuery } from 'services/gameApi'
import { SolitoImage } from 'solito/image'
import { CONTENT_URI, MEDIA_DOMAIN } from '../../../../../apps/next/config/env'
import { useAppSelector } from 'app/provider/redux/store'

const Providers = () => {
  const currency = useAppSelector((s) => s.setting.currency)
  const { data } = useGameProviderListQuery(currency)
  const systemCodes = Object.keys(data ?? {})
  // const mappedGPC = systemCodes.map((gpc) => {
  //   if (gpc === 'PTV2') {
  //     // PTV2 AND PTV same logo, so will ignore one of them
  //     return undefined
  //   }
  //   if (PROVIDER_LOGO[gpc]) {
  //     return PROVIDER_LOGO[gpc]
  //   }
  // })
  return (
    <Row
      sx={{
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        my: '$3',
        mx: ['8%', , , , '10%'],
      }}
    >
      {systemCodes.map((p, i) => {
        const image = `${MEDIA_DOMAIN}${CONTENT_URI}/v2/game/provider/all-provider-colored/${p}.png`
        return !p ? null : (
          <View key={i} sx={{ width: 95, height: 40, mx: 5, my: '$2' }}>
            <div
              className="footer-provider-img"
              style={{ width: '100%', height: '100%', position: 'relative' }}
            >
              <SolitoImage
                // fill
                width={95}
                height={40}
                alt={p}
                contentFit="contain"
                sizes=""
                src={image}
              />
            </div>
          </View>
        )
      })}
    </Row>
  )
}

export default Providers
