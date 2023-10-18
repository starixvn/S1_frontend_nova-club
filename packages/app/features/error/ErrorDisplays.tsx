import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { Row, ScrollView, Text } from 'dripsy'
import React, { ComponentProps } from 'react'
import { SolitoImage } from 'solito/image'
import LiveChatButton from '../floatingContent/component/LiveChatButton'

type Props = {
  iconProps: ComponentProps<typeof SolitoImage>
  title: string
  description: string
}

export default function ErrorDisplays({
  title,
  description,
  iconProps,
}: Props) {
  return (
    <ScrollView
      sx={{ flex: 1, bg: '$primary.700' }}
      contentContainerSx={{
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%',
        paddingBottom: '30%',
        paddingHorizontal: '$4',
      }}
      bounces={false}
    >
      <SolitoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/logo-powered-vn.png`}
        alt="Vui123"
        width={292}
        height={88}
        style={{ marginBottom: 40 }}
      />
      <Row sx={{ alignItems: 'center', gap: '$3', mb: '$3' }}>
        <SolitoImage width={40} height={40} {...iconProps} />
        <Text sx={{ fontSize: 22, lineHeight: 30 }}>{title}</Text>
      </Row>
      <Text sx={{ textAlign: 'center', lineHeight: 24, mb: '$3' }}>
        {description}
      </Text>
      <LiveChatButton />
    </ScrollView>
  )
}
