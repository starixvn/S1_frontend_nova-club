import useAlert from 'app/hooks/useAlert'
import { useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { memo, useEffect } from 'react'
import { Platform } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'
import { Shield_Action } from 'services/authApi.type'
import { IResponse } from 'services/common/types'
import { useLazyFreeSpinQuery } from 'services/playerApi'
import { FreeSpinResult } from 'services/playerApi.type'

const LuckyDrawTrigger = () => {
  const username = useAppSelector((s) => s.auth.info?.playerName) ?? ''
  const shieldStatus =
    useAppSelector((s) => s.tempSetting.syncShieldStatus) ?? ''
  const syncShieldActionType =
    useAppSelector((s) => s.tempSetting.syncShieldActionType) ?? ''
  const luckyDrawTriggered = useAppSelector(
    (state) => state.tempSetting.luckyDrawTriggered
  )
  const [getFreeSpinInfo] = useLazyFreeSpinQuery()
  const dispatch = useDispatch()
  const { openModal } = useModal()
  const { showAlert } = useAlert()

  const CheckLuckyDrawBalance = async () => {
    try {
      const { success, data } = await getFreeSpinInfo()
        .unwrap()
        .catch((e: IResponse<FreeSpinResult>) => {
          // only show the finish claim error on register success
          if (
            syncShieldActionType === Shield_Action.REGISTER && // Dont show freespin error message if player is not from register flow
            e.code !== 28004 // 28004 code = no event is active, ignore the message
          ) {
            showAlert(e.message)
          }
          return e
        })

      if (success && data) {
        const freeSpinBalance = data.wheel_info.totalBalance ?? 0

        if (freeSpinBalance > 0) {
          setTimeout(() => {
            openModal('LuckyDrawModal')
          }, 1000)
        }

        if ('note' in data) {
          if (syncShieldActionType === Shield_Action.REGISTER) {
            const note = data.note
            openModal('AlertModal', {
              message: note,
              onClose: () => {
                return false
              },
            })
          }
        }

        dispatch(SettingActions.setLuckyDrawBalance(freeSpinBalance))
      }
    } catch (e) {
      console.log('e', e)
    } finally {
      dispatch(TempSettingActions.setLuckyDrawTriggered(true))
    }
  }

  useEffect(() => {
    // Do not trigger before shield is synced
    // luckyDrawTriggered help prevent on web navigation reenter on home page causing lucky spin to appear again.
    if (
      !shieldStatus ||
      luckyDrawTriggered ||
      Platform.OS === 'web' ||
      syncShieldActionType !== Shield_Action.REGISTER
    ) {
      return
    }

    CheckLuckyDrawBalance()
  }, [shieldStatus])

  return null
}

export default memo(LuckyDrawTrigger)
