import { useResponsiveValue } from 'dripsy'

const useIsDesktop = () => {
  const isDesktop = useResponsiveValue([false, false, false, true])

  return isDesktop
}

export default useIsDesktop
