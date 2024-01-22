// /**
//  * Generate FPS token for iovation to detect user's spam action
//  */
// function generateFPSToken() {
//   const id =
//     dayjs(new Date().toISOString()).format('YYYY/MM/DD HH:mm:ss') +
//     '@' +
//     rand(0, 255)

//   // ***********
//   // WIP: secretKey should not hardcoded here
//   // ***********
//   const ftk = encrypt('&f％p#s@m?b,c:*!~^._', id)
//   return ftk
// }

// /**
//  * @param min The minimum random number
//  * @param max The maximum random number
//  * @returns A random number between minimum and maximum number
//  */
// export function rand(min: number, max: number) {
//   return Math.floor(Math.random() * (max - min + 1) + min)
// }

// export function encrypt(key: string, value: string) {
//   return encodeToHex(RC4(key, value))
// }

// export function randomString(len: number, charSet?: string) {
//   charSet =
//     charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//   let randomString = ''
//   for (let i = 0; i < len; i++) {
//     const randomPoz = Math.floor(Math.random() * charSet.length)
//     randomString += charSet.substring(randomPoz, randomPoz + 1)
//   }
//   return randomString
// }

// /**
//  * Used for detecting whether if the user spamming the website
//  * @returns An object containing fdi, fts, fda, ftk and screen key value pairs
//  */
// export function generateFPSParams() {
//   const params: {
//     fdi: string
//     fts: string | number
//     fda?: string
//     ftk?: string
//     screen: string
//   } = {} as any

//   try {
//     // fdi
//     const el = document.getElementById('__di') as HTMLInputElement
//     if (el && el.value) {
//       params.fdi = el.value
//     } else params.fdi = randomString(16)

//     // fts
//     params.fts = dayjs().format('YYYY/MM/DD HH:mm:ss.SSS')

//     // fda
//     const daE = document.getElementById('detecas-analysis') as HTMLInputElement
//     if (daE) {
//       params.fda = daE.value
//     }

//     // ftk
//     params.ftk = generateFPSToken()

//     // screen
//     const { width, height, pixelDepth } = screen
//     params.screen = `${width}:${height}:${pixelDepth}`
//   } catch (e) {
//     console.warn(`fps`, e)
//     params.fdi = 'frh1F0F3uZnmpCj9'
//     params.fts = 5000
//   }
//   return params
// }

export const getFpsParams = () => {
  const __bi = document.getElementById('__bi')
  const __di = document.getElementById('__di')
  const __fdi = document.getElementById('__fdi')
  const detecasAnalysis = document.getElementById('detecas-analysis')

  return {
    bi: (__bi as HTMLInputElement)?.value,
    di: (__di as HTMLInputElement)?.value,
    fdi: (__fdi as HTMLInputElement)?.value,
    fda: (detecasAnalysis as HTMLInputElement)?.value,
  }
}
