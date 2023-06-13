import isDesktop from 'app/utils/isDesktop'

export default function withAdaptiveScreen(Mobile, Desktop) {
  const Screen = (props) => {
    const desktop = isDesktop()
    console.log('desktop', desktop)
    return desktop ? <Desktop {...props} /> : <Mobile {...props} />
  }

  return Screen
}
