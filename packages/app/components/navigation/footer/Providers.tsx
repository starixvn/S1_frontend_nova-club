import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { Row } from 'dripsy'
import React from 'react'
import { LogoImage } from './Channel'

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
