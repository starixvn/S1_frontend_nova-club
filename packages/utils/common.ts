export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function uuidv4() {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      // @ts-ignore
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  )
}

export type Elevation = 0 | 1 | 2 | 3 | 4 | 5

const SHADOW_COLOR = 'rgba(0, 0, 0, 0.16)'
const SHADOW_OPACITY = 0.7

export function shadowGenerator(elevation: Elevation) {
  const shadowHeight = [0, 0, 0, 1, 2, 4]
  const shadowRadius = [0, 3, 6, 8, 10, 12]

  return {
    shadowColor: SHADOW_COLOR,
    shadowOpacity: SHADOW_OPACITY,
    shadowOffset: {
      width: 0,
      height: shadowHeight[elevation] ?? 0,
    },
    shadowRadius: shadowRadius[elevation] ?? 0,
    elevation: Number(elevation),
  }
}

export function modalDelaySubmission(callback) {
  setTimeout(() => {
    callback()
  }, 250)
}

export function getSolitoImageSizes(sizes: number[]) {
  const breakpoints = [576, 768, 992, 1200]

  const requiredQueries = breakpoints.slice(0, sizes.length - 1)

  const sizesStr = requiredQueries.reduce((acc, cur, index) => {
    return `${acc} (max-width: ${cur - 1}px) ${sizes[index]}px, `
  }, ``)

  return `${sizesStr}${sizes[sizes.length - 1]}`
}
