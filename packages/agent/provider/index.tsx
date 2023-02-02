import { LocalizationProvider } from 'app/provider/localization'
import i18n from 'app/provider/localization/i18n'
import { useAppSelector } from 'app/provider/redux/store'
import React from 'react'

const AgentProvider = ({ children }) => {
  const locale = useAppSelector((s) => s.setting.locale)

  return (
    <LocalizationProvider locale={locale} i18n={i18n} module={'agent'}>
      {children}
    </LocalizationProvider>
  )
}

export default AgentProvider
