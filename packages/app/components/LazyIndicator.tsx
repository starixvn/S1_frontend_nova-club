import { ActivityIndicator } from 'dripsy'
import React from 'react'

type Props = {}

export default function LazyIndicator({}: Props) {
  return <ActivityIndicator color={'$primary.300'} sx={{ my: '$2' }} />
}
