import { CMS_CONTENT_URI, CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { Dictionary } from 'lodash'
import { useMemo } from 'react'
import { SelectOptions } from 'services/common/types'
import { AutoBankItem } from 'services/deposit.type'

export default function useEWalletSelections(
  eWalletMethods: Dictionary<AutoBankItem[]>,
  paymentMethodKey?: string
) {
  const paymentMethodsSelections: SelectOptions[] = useMemo(() => {
    const keys = Object.keys(eWalletMethods)

    return keys.map((key) => {
      return {
        label: `deposit.${key}`,
        value: key,
        icon: `${MEDIA_DOMAIN}${CONTENT_URI}/v2/payment-provider/${key.toLowerCase()}.jpg`,
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eWalletMethods])

  const paymentGatewaySelections: SelectOptions[] = useMemo(() => {
    if (paymentMethodKey && eWalletMethods[paymentMethodKey]) {
      const method = eWalletMethods[paymentMethodKey]
      if (method)
        return method.map((pg: AutoBankItem, index) => {
          return {
            label: pg.payment_account_name,
            value: index.toString(),
            icon: `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${pg.account_icon}`,
          }
        })
    }

    return [] as SelectOptions[]
  }, [eWalletMethods, paymentMethodKey])

  return {
    paymentMethodsSelections,
    paymentGatewaySelections,
  }
}
