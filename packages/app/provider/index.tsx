import { Dripsy } from './dripsy'
import { LocalizationProviderRedux } from './localization'
import ReduxProvider from './redux'
import ModalProvider from './modal'
import RootToast from 'app/components/RootToast'
import DrawerProvider from 'app/components/navigation/drawer/DrawerProvider'
import GameLauncher from 'app/features/game/GameLauncher'
import Branch from 'app/integrations/branch/Branch'
import ReferralTrigger from 'app/components/ReferralTrigger'
import Shield from 'app/integrations/shield/Shield'
import SakuraFall from 'app/components/sakura/SakuraFall'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <Dripsy>
      <ReduxProvider>
        <LocalizationProviderRedux>
          <DrawerProvider>
            <ModalProvider>
              {children}
              <GameLauncher />
              <Branch />
              <Shield />
              <ReferralTrigger />
              <SakuraFall />
            </ModalProvider>
          </DrawerProvider>
          <RootToast />
        </LocalizationProviderRedux>
      </ReduxProvider>
    </Dripsy>
  )
}
