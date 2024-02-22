export function getOs() {
  if (navigator.userAgent.match(/Android/i)) return 'android'
  else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) return 'ios'
  else return 'any'
}

export async function getUserAgent(): Promise<string | undefined> {
  return Promise.resolve(undefined)
}
