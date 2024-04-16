import ReferralTrigger from 'app/components/ReferralTrigger'
import RootToast from 'app/components/RootToast'
import DrawerProvider from 'app/components/navigation/drawer/DrawerProvider'
import SakuraFall from 'app/components/sakura/SakuraFall'
import RegisterUniqueId from 'app/features/device/RegisterDeviceId'
import GameLauncher from 'app/features/game/GameLauncher'
import Branch from 'app/integrations/branch/Branch'
import Notification from 'app/integrations/notification/Notification'
import Shield from 'app/integrations/shield/Shield'
import OnlineTracking from './OnlineTracker'
import { Dripsy } from './dripsy'
import { LocalizationProviderRedux } from './localization'
import ModalProvider from './modal'
import ReduxProvider from './redux'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import FocusedLocalizationProvider from './localization/FocusedLocalizationProvider'
import { LANGUAGE_NAMESPACE } from 'utils/constant'

dayjs.extend(isBetween)

export function Provider({ children }: { children: React.ReactNode }) {
  const isCNY = dayjs().isBetween(
    dayjs('2024-01-01T17:00:00.000Z'),
    dayjs('2024-02-29T17:00:00.000Z')
  )
  return (
    <Dripsy>
      <ReduxProvider>
        <LocalizationProviderRedux>
          <FocusedLocalizationProvider
            namespace={LANGUAGE_NAMESPACE.MEMBER}
            disabled
          >
            <DrawerProvider>
              <ModalProvider>
                {children}
                <GameLauncher />
                <Branch />
                <Shield />
                <Notification />
                <ReferralTrigger />
                {isCNY && <SakuraFall />}
                <RegisterUniqueId />
                <OnlineTracking />
              </ModalProvider>
            </DrawerProvider>
            <RootToast />
          </FocusedLocalizationProvider>
        </LocalizationProviderRedux>
      </ReduxProvider>
    </Dripsy>
  )
}
