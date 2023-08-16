import useIsDesktop from 'app/hooks/useIsDesktop'

export default function withAdaptiveScreen(Mobile, Desktop) {
  const Screen = (props) => {
    const desktop = useIsDesktop()
    return desktop ? <Desktop {...props} /> : <Mobile {...props} />
  }

  return Screen
}
