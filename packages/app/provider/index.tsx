import ReferralTrigger from 'app/components/ReferralTrigger'
import RootToast from 'app/components/RootToast'
import DrawerProvider from 'app/components/navigation/drawer/DrawerProvider'
import RegisterUniqueId from 'app/features/device/RegisterDeviceId'
import GameLauncher from 'app/features/game/GameLauncher'
import Branch from 'app/integrations/branch/Branch'
import Notification from 'app/integrations/notification/Notification'
import Shield from 'app/integrations/shield/Shield'
import { Dripsy } from './dripsy'
import { LocalizationProviderRedux } from './localization'
import ModalProvider from './modal'
import ReduxProvider from './redux'

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
              <Notification />
              <ReferralTrigger />
              <RegisterUniqueId />
            </ModalProvider>
          </DrawerProvider>
          <RootToast />
        </LocalizationProviderRedux>
      </ReduxProvider>
    </Dripsy>
  )
}
