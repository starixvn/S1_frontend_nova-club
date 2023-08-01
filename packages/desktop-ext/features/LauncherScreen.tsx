import { CMS_CONTENT_URI, CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { Container, View } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'

type Props = {}

export default function LauncherScreen({}: Props) {
  return (
    <Container
      sx={{
        height: '100vh',
        minHeight: 400,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <SolitoImage
        width={201}
        height={72}
        alt="vui123"
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/logo.png`}
      />
    </Container>
  )
}
