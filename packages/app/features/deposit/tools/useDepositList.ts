import PaymentMethod from 'app/config/deposit'
import useCheckMobile from 'app/hooks/useCheckMobile'
import { useMemo } from 'react'
import { useDepositPaymentListQuery } from 'services/deposit'

const useDepositList = (skip = false) => {
  const { isMobile } = useCheckMobile()

  const { data, isLoading, isUninitialized } = useDepositPaymentListQuery(
    {
      is_mobile: isMobile ? 1 : 0,
    },
    {
      skip,
    }
  )

  const paymentMethodList = useMemo(() => {
    if (data) {
      return PaymentMethod.filter((item) => {
        const methodType = data.result[item.type]
        if (methodType) {
          return (
            item.active &&
            methodType.some((c) =>
              typeof item.categoryId === 'number'
                ? item.categoryId === c.category_id
                : item.categoryId.includes(c.category_id)
            )
          )
        } else return false
      })
    }
  }, [data])

  return {
    paymentMethodList,
    isLoading,
    isUninitialized,
  }
}

export default useDepositList
