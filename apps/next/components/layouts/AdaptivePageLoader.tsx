import { ActivityIndicator } from 'dripsy'

type Props = {}

export default function AdaptivePageLoader({}: Props) {
  return <ActivityIndicator color={'$primary.300'} sx={{ my: '$3' }} />
}
