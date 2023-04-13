import { useWindowDimensions } from 'react-native'

export default function useScaleToFitStyle(e) {
  useWindowDimensions()

  if (e) {
    return {
      height:
        /* this only calculate the top offset, currently meant to stretch to fill up bottom */
        window.innerHeight -
        (window.scrollY + e.getBoundingClientRect().top) +
        'px',
      minHeight: 500,
    }
  } else return {}
}
