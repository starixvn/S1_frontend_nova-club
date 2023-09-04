import { PROVIDER_LOGO } from 'app/config/games/provider'
import { Row, View } from 'dripsy'
import React from 'react'
import { useGameProviderListQuery } from 'services/gameApi'
import { SolitoImage } from 'solito/image'
import { CONTENT_URI, MEDIA_DOMAIN } from '../../../../../apps/next/config/env'

const Providers = () => {
  const { data } = useGameProviderListQuery()
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
        return (
          <>
            {p && (
              <View key={i} sx={{ width: 95, height: 40, mx: 5, my: '$2' }}>
                <div
                  className="footer-provider-img"
                  style={{ width: '100%', height: '100%' }}
                >
                  <SolitoImage fill alt={p} contentFit="contain" src={image} />
                </div>
              </View>
            )}
          </>
        )
      })}
      {/* <View sx={{ width: 100, height: 50, mx: '$3', my: '$2' }}>
        <div
          className="footer-provider-img"
          style={{ width: '100%', height: '100%' }}
        >
          <SolitoImage
            fill
            alt={'g'}
            contentFit="contain"
            src={require('../../../assets/images/NERT.png')}
          />
        </div>
      </View> */}
    </Row>
  )
}

export default Providers
