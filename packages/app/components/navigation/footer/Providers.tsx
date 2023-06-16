import { Row, View } from 'dripsy'
import React from 'react'
import { LogoImage } from './Channel'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { MENU_HEIGHT } from 'desktop-ext/components/tab/DesktopTabBar'

const Providers = () => {
  return (
    <Row
      sx={{
        flexWrap: 'wrap',
        height: [150, , , 200],
        mx: ['8%', , , , '10%'],
      }}
    >
      <LogoImage src={`${MEDIA_DOMAIN}${CONTENT_URI}/footer/providers.png`} />
    </Row>
  )
}

export default Providers
