import PaymentMethod from 'app/config/deposit'
import useCheckMobile from 'app/hooks/useCheckMobile'
import React, { useEffect, useState } from 'react'
import { useDepositPaymentListQuery } from 'services/deposit'

const useDepositList = () => {
  const { isMobile } = useCheckMobile()
  const [paymentMethodList, setPaymentMethodList] = useState(PaymentMethod)

  const { data, isLoading } = useDepositPaymentListQuery({
    is_mobile: isMobile ? 0 : 1,
  })

  useEffect(() => {
    if (data?.success) {
      const activeMethod = PaymentMethod.filter((item) => item.active === true)

      const convertData = activeMethod
        .map((item) => {
          const method = data?.data?.result[item.type]
          if (method) {
            const res = method.find((el) => el.category_id === item.categoryId)

            if (res)
              return {
                ...item,
                categoryText: res.category_text,
                list: res.list,
              }
          }
        })
        .filter((x) => x != null)

      setPaymentMethodList(convertData)
    }
  }, [data])

  return {
    paymentMethodList,
    isLoading,
  }
}

export default useDepositList
