import isDesktop from 'app/utils/isDesktop'

export default function withAdaptiveScreen(Mobile, Desktop) {
  const Screen = (props) => {
    const desktop = isDesktop()

    return desktop ? <Desktop {...props} /> : <Mobile {...props} />
  }

  return Screen
}
