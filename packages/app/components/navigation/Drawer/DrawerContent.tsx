import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { ScrollView, Text, View } from 'dripsy'
import React from 'react'

export default function DrawerContent() {
  const { top, bottom } = useSafeArea()
  return (
    <ScrollView
      sx={{
        bg: '$primary.500',
        flex: 1,
      }}
      contentContainerSx={{
        paddingTop: top,
        paddingBottom: bottom,
      }}
    >
      <Text>Content</Text>
    </ScrollView>
  )
}
