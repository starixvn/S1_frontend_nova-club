import useIsDesktop from 'app/hooks/useIsDesktop'
import { AdaptiveLayoutPage } from '../../../apps/next/components/layouts/AdaptiveLayout'

export default function withAdaptiveScreen(
  Mobile,
  Desktop
): AdaptiveLayoutPage {
  const Screen = (props) => {
    const desktop = useIsDesktop()
    return desktop ? <Desktop {...props} /> : <Mobile {...props} />
  }

  return Screen
}
