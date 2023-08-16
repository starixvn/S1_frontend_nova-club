import withLazyLoad from 'app/hoc/withLazyLoad'
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('./DrawerContent'), {
  ssr: false,
})
const LazyDrawerContent = withLazyLoad(DynamicComponent)

export default LazyDrawerContent
