import { useAppDispatch } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { useEffect, useRef, useState } from 'react'
import { createParam } from 'solito'
import { Currency } from 'utils/constant'

const { useParam } = createParam<{ currency: string }>()

const DefaultCurrencyByDomain = [
  {
    domain: 'softvnd.beviking.net',
    currency: Currency.THB,
  },
  {
    domain: 'vui123thb.com',
    currency: Currency.THB,
  },
  {
    domain: 'vui123thai.com',
    currency: Currency.THB,
  },
  {
    domain: 'localhost',
    currency: Currency.THB,
  },
]

export default function CurrencyTrigger({}) {
  const [currency, setCurrency] = useParam('currency')
  const isChecked = useRef(false)
  const dispatch = useAppDispatch()

  function setDefaultCurrencyByDomain() {
    const defaultCurrencyDomain = DefaultCurrencyByDomain.find(
      (d) => d.domain === window.location.hostname
    )

    if (defaultCurrencyDomain) {
      dispatch(SettingActions.setCurrency(defaultCurrencyDomain.currency))
    }
  }

  useEffect(() => {
    if (!isChecked.current) {
      if (!currency || !(currency in Currency)) {
        setDefaultCurrencyByDomain()
      } else {
        dispatch(SettingActions.setCurrency(currency))
        setCurrency(undefined)
        isChecked.current = true
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency])

  return null
}
