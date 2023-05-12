import { Dripsy } from './dripsy'
import { LocalizationProviderRedux } from './localization'
import ReduxProvider from './redux'
import ModalProvider from './modal'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <Dripsy>
      <ReduxProvider>
        <LocalizationProviderRedux>
          <ModalProvider>{children}</ModalProvider>
        </LocalizationProviderRedux>
      </ReduxProvider>
    </Dripsy>
  )
}
