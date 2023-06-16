import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { MENU_HEIGHT } from 'desktop-ext/components/tab/DesktopTabBar'
import { Row } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'

const Channel = () => {
  return (
    <Row
      sx={{ flexWrap: 'wrap', height: MENU_HEIGHT, mx: ['10%', , , , '15%'] }}
    >
      <LogoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/footer/paymentmethods.png`}
      />
    </Row>
  )
}

export const LogoImage = ({ src }) => {
  return <SolitoImage fill resizeMode="contain" src={src} alt="" />
}

export default Channel
