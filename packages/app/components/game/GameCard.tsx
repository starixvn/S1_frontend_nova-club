import { Pressable, Text } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'

export default function GameCard({ name, image }) {
  return (
    <Pressable>
      <SolitoImage
        style={{ width: '100%', aspectRatio: 1 }}
        alt={name}
        src={image}
      />
      <Text>{name}</Text>
    </Pressable>
  )
}
