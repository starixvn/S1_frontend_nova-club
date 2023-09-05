import { ActivityIndicator } from 'dripsy'

type Props = {}

export default function AdaptivePageLoader({}: Props) {
  // const { setLoaded } = useAdaptivePage()

  // useEffect(() => {
  //   setLoaded(false)
  //   return () => {
  //     setLoaded(true)
  //   }
  // }, [])

  return <ActivityIndicator color={'$primary.300'} sx={{ my: '$3' }} />
}
