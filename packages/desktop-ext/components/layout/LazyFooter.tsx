import { ActivityIndicator } from 'dripsy'
import dynamic from 'next/dynamic'

const Footer = dynamic(() => import('./Footer'), {
  loading: () => <ActivityIndicator />,
  ssr: true,
})

export default Footer
