import withLazyLoad from 'app/hoc/withLazyLoad'
import { View } from 'dripsy'
import dynamic from 'next/dynamic'
import React from 'react'

type Props = {}

const DynamicDeferredSection = dynamic(() => import('./DeferredSection'), {
  ssr: false,
})
const LazyDeferredSection = withLazyLoad(DynamicDeferredSection)

const DynamicFooter = dynamic(
  () => import('app/components/navigation/footer'),
  {
    ssr: false,
  }
)
const LazyFooter = withLazyLoad(DynamicFooter)

const DynamicTopGameSection = dynamic(() => import('./TopGameSection'), {
  ssr: false,
})
const LazyTopGameSection = withLazyLoad(DynamicTopGameSection)

export default function Deferrable({}: Props) {
  return (
    <>
      <View
        sx={{
          mb: ['$3', '$4'],
        }}
      >
        <LazyTopGameSection />
      </View>
      <LazyDeferredSection />
      <LazyFooter />
    </>
  )
}
