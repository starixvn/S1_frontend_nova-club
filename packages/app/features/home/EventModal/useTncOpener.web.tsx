import { useEffect, useMemo, useState } from 'react'
import { useModal } from 'react-native-modalfy'

import { useAppDispatch } from 'app/provider/redux/store'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { useRouter } from 'next/router'

/* Flow for Web Event Tnc navigation : 
    0. on click on TNC
    1. trigger tnc fn 
    2. set callback to close modal after navigation to tnc page is done
    3. wait till fully navigated to tnc page, then trigger the close modal callback
    4. when 'close modal callback' is executed, and after modal is closed, set setIsHomeEventModalTriggered to false
*/

export default function useTncOpener(): {
  openTncHandler: (tncCallback: () => void) => void
} {
  const { events } = useRouter()
  const { closeModal } = useModal()
  const [onNavigatedCallback, setOnNavigationCallback] = useState<() => void>()

  const dispatch = useAppDispatch()

  const handleRouteChange = useMemo(() => {
    if (onNavigatedCallback)
      /* 2.1 */
      return () => {
        onNavigatedCallback()
      }
    else null
  }, [onNavigatedCallback])

  useEffect(() => {
    if (handleRouteChange) {
      /* 3 */
      events.on('routeChangeComplete', handleRouteChange)

      return () => {
        events.off('routeChangeComplete', handleRouteChange)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleRouteChange])

  return {
    openTncHandler: (tncCallback: () => void) => {
      /* 1 */
      tncCallback?.()
      /* 2 */
      setOnNavigationCallback(() => () => {
        /* 4 */
        closeModal('HomeEventModal', () => {
          dispatch(TempSettingActions.setIsHomeEventModalTriggered(false))
        })
      })
    },
  }
}
