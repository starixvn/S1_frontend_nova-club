import { CMS_CONTENT_URI, CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { Row } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'

const Channel = () => {
  console.log(`${MEDIA_DOMAIN}${CONTENT_URI}/sponsor/AB.png`)
  return <Row sx={{ flexWrap: 'wrap' }}></Row>
}

const LogoImage = ({ src }) => {
  return (
    <SolitoImage width={120} height={60} resizeMode="center" src={src} alt="" />
  )
}

export default Channel
