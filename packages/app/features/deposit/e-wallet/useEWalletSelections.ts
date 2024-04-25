import { CMS_CONTENT_URI, CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { useMemo } from 'react'
import { SelectOptions } from 'services/common/types'
import { CategoryItem } from 'services/deposit.type'

const EmptySelection = [] as SelectOptions[]

export default function useEWalletSelections(
  depositCategories?: CategoryItem[],
  categoryId?: string
) {
  const paymentMethodsSelections: SelectOptions[] = useMemo(() => {
    if (depositCategories) {
      return depositCategories
        .filter((c) => c.list.length > 0)
        .map((c) => {
          return {
            label: c.category_text,
            value: c.category_id.toString(),
            icon: `${MEDIA_DOMAIN}${CONTENT_URI}/v2/payment-provider/${c.category_text.toLowerCase()}.jpg`,
          }
        })
    }

    return EmptySelection

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depositCategories])

  const paymentGatewaySelections: SelectOptions[] = useMemo(() => {
    if (categoryId && depositCategories) {
      const selectedCategory = depositCategories.find(
        (c) => c.category_id.toString() === categoryId
      )

      if (selectedCategory) {
        return selectedCategory.list.map((pg, index) => {
          return {
            label: pg.payment_account_name,
            value: index.toString(),
            icon: `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${pg.account_icon}`,
          }
        })
      }
    }

    return [] as SelectOptions[]
  }, [categoryId, depositCategories])

  return {
    paymentMethodsSelections,
    paymentGatewaySelections,
  }
}
