import { Dripsy } from './dripsy'
import { LocalizationProviderRedux } from './localization'
import ReduxProvider from './redux'
import ModalProvider from './modal'
import RootToast from 'app/components/RootToast'
import DrawerProvider from 'app/components/navigation/drawer/DrawerProvider'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <Dripsy>
      <ReduxProvider>
        <LocalizationProviderRedux>
          <DrawerProvider>
            <ModalProvider>{children}</ModalProvider>
          </DrawerProvider>
          <RootToast />
        </LocalizationProviderRedux>
      </ReduxProvider>
    </Dripsy>
  )
}
