import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import isDesktop from 'app/utils/isDesktop'
import { Row, Text } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'

const Powered = () => {
  const desktop = isDesktop()
  return (
    <Row
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        bg: desktop ? '$primary.500' : 'transparent',
      }}
    >
      <Text sx={{ mr: '$3' }}>Powered by</Text>
      <SolitoImage
        width={100}
        height={60}
        resizeMode="contain"
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/footer/bong88.png`}
        alt="PoweredBy"
      />
    </Row>
  )
}

export default Powered
