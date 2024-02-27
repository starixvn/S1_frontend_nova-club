// import dayjs from 'dayjs'
// import utc from 'dayjs/plugin/utc'
// dayjs.extend(utc)

// function getRandomValue(max) {
//   return Math.floor(Math.random() * Math.floor(max))
// }

// function generateFPSToken() {
//   const EncryptKey = '&f％p#s@m?b,c:*!~^._'
//   const id = `${dayjs().utc().format('YYYY/MM/dd HH:mm:ss')}@${getRandomValue(
//     256
//   ).toString()}`
//   let encryptedText
//   try {
//     const text = RC4(EncryptKey, id)
//     encryptedText = encodeToHex(text)
//   } catch (e) {
//     console.log('failed in encrypting ftk', e)
//   }
//   return encryptedText
// }

// export function randomString(len: number, charSet?: string) {
//   charSet =
//     charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//   let rs = ''
//   for (let i = 0; i < len; i++) {
//     const randomPoz = Math.floor(Math.random() * charSet.length)
//     rs += charSet.substring(randomPoz, randomPoz + 1)
//   }
//   return rs
// }

// export const generateFPSParams = () => {
//   let fdi = ''
//   try {
//     let ua = ''
//     try {
//       // ua = await getUserAgent()
//     } catch (e) {
//       console.log('failed to get useragent')
//     }
//     const { width, height } = Dimensions.get('window')
//     // const buildNumber = getBuildNumber()
//     const buildNumber = '123'
//     // let cleanedDeviceId = getUniqueId().replace(/-/g, '').substr(0, 5)
//     let cleanedDeviceId = '123-abc'.replace(/-/g, '').substr(0, 5)
//     let numOfTry = 5
//     while (cleanedDeviceId.length < 32 && numOfTry > 0) {
//       numOfTry -= 1
//       cleanedDeviceId += cleanedDeviceId
//       cleanedDeviceId = cleanedDeviceId.substr(0, 32)
//     }
//     const diParams = {
//       osVersion: Platform.Version,
//       userAgent: ua,
//       screen: { width, height, colorDepth: 32 },
//       deviceId: cleanedDeviceId,
//       capturedDate: new Date().getTime() * 10000 + 621355968000000000,
//       version: `native.${
//         // getVersion() + (Platform.OS === 'ios' ? `.${buildNumber}` : '')
//         osVersion + (Platform.OS === 'ios' ? `.${buildNumber}` : '')
//       }`,
//     }
//     fdi = base64.encode(JSON.stringify(diParams))
//   } catch (e) {
//     console.log('ee', e)
//     fdi = randomString(16)
//   }
//   return {
//     fts: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS'),
//     fdi,
//     // fud: getUniqueId(),
//     fud: '123',
//     ftk: generateFPSToken(),
//   }
// }

export function appendFpsParams(url, requestParams = {}) {
  // NOOP for App, please check on .web
}

export const getFpsParams = () => {
  return {
    bi: '',
    di: '',
    fdi: '',
    fda: '',
  }
}
