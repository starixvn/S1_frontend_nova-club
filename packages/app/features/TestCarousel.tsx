import { PageWithBackHeader } from 'app/components/layout/Page'
import { Text } from 'dripsy'
import React from 'react'

const TestCarousel = () => {
  const [items] = React.useState<ItemsState>([
    {
      key: 1,
      name: 'Cupcake',
      calories: 356,
      fat: 16,
    },
    {
      key: 2,
      name: 'Eclair',
      calories: 262,
      fat: 16,
    },
    {
      key: 3,
      name: 'Frozen yogurt',
      calories: 159,
      fat: 6,
    },
    {
      key: 4,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7,
    },
    {
      key: 5,
      name: 'Ice cream sandwich',
      calories: 237,
      fat: 9,
    },
    {
      key: 6,
      name: 'Jelly Bean',
      calories: 375,
      fat: 0,
    },
  ])

  return (
    <PageWithBackHeader header={{ title: 'demo' }}>
      <Text>Test</Text>
    </PageWithBackHeader>
  )
}

export default TestCarousel
