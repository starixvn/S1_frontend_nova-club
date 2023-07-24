import { Text, View } from 'dripsy'
import React from 'react'

type Props = {
  content: string
}

export default function HTMLLoader({ content }: Props) {
  return (
    <Text sx={{ fontSize: 16 }}>
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </Text>
  )
}
