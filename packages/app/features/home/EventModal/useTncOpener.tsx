import { useAppDispatch } from 'app/provider/redux/store'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { useModal } from 'react-native-modalfy'

/* Flow for APP Event Tnc navigation : 
    0.. on click on TNC
    1. trigger tnc fn and close modal at the same time.
    2. after modal closed, setIsHomeEventModalTriggered to false
*/

export default function useTncOpener(): {
  openTncHandler: (tncCallback: () => void) => void
} {
  const dispatch = useAppDispatch()
  const { closeModal } = useModal()

  return {
    openTncHandler: (tncCallback: () => void) => {
      tncCallback?.()
      closeModal('HomeEventModal', () => {
        dispatch(TempSettingActions.setIsHomeEventModalTriggered(false))
      })
    },
  }
}
