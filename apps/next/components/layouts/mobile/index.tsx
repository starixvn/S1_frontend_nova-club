import dynamic from 'next/dynamic'
import { Layout } from '../AdaptiveLayout'
import AdaptiveLayoutLoader from '../AdaptiveLayoutLoader'

const DynamicTabLayout = dynamic(() => import('./TabLayout'), {
  loading: () => <AdaptiveLayoutLoader />,
  ssr: false,
})

const DynamicInfoLayout = dynamic(() => import('./InfoLayout'), {
  loading: () => <AdaptiveLayoutLoader />,
  ssr: false,
})

export const MobileTabLayout: Layout = (component) => (
  <DynamicTabLayout>{component}</DynamicTabLayout>
)

export const MobileInfoLayout: Layout = (component) => (
  <DynamicInfoLayout>{component}</DynamicInfoLayout>
)
