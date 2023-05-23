import { Dripsy } from './dripsy'
import { LocalizationProviderRedux } from './localization'
import ReduxProvider from './redux'
import ModalProvider from './modal'
import RootToast from 'app/components/RootToast'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <Dripsy>
      <ReduxProvider>
        <LocalizationProviderRedux>
          <ModalProvider>{children}</ModalProvider>
          <RootToast />
        </LocalizationProviderRedux>
      </ReduxProvider>
    </Dripsy>
  )
}
