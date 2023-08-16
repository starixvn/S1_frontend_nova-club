import { CONTENT_URI, MEDIA_DOMAIN } from '@env'

export const getBankLogo = (bankCode: string) => {
  const bankUrl = `${MEDIA_DOMAIN}${CONTENT_URI}/banks/${bankCode
    .trim()
    .replace(/\s+/g, '-')}.jpg`

  return bankUrl
}
