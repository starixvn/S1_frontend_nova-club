import { LANGUAGE_CODE } from 'utils/constant'
import { CURRENCY_SEPARATOR } from 'utils/constant/currency'

export function agentToThousandSeparator(
  text: string,
  language: LANGUAGE_CODE = LANGUAGE_CODE.VIETNAM
) {
  if (!text || text === '0') return ''
  const separatorSymbol = CURRENCY_SEPARATOR[language].thousands
  let index = text.search(/[1-9]/)
  index = index === -1 ? text.length : index
  return (
    text.substring(0, index) +
    text
      .substring(index, text.length)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + separatorSymbol)
  )
}
