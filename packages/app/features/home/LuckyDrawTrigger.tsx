import useAlert from 'app/hooks/useAlert'
import { useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { memo, useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'
import { Shield_Action } from 'services/authApi.type'
import { IResponse } from 'services/common/types'
import { useLazyEligibleSpinQuery } from 'services/playerApi'
import { EligibleSpinResult } from 'services/playerApi.type'

const LuckyDrawTrigger = () => {
  const username = useAppSelector((s) => s.auth.info?.playerName) ?? ''
  const shieldStatus =
    useAppSelector((s) => s.tempSetting.syncShieldStatus) ?? ''
  const syncShieldActionType =
    useAppSelector((s) => s.tempSetting.syncShieldActionType) ?? ''
  const luckyDrawTriggered = useAppSelector(
    (state) => state.tempSetting.luckyDrawTriggered
  )
  const [getEligileSpin] = useLazyEligibleSpinQuery()
  const dispatch = useDispatch()
  const { openModal } = useModal()
  const { showAlert } = useAlert()

  const CheckLuckyDrawBalance = async () => {
    try {
      const { success, data } = await getEligileSpin()
        .unwrap()
        .catch((e: IResponse<EligibleSpinResult>) => {
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
        const item = data?.details?.find(
          (el) => el.event_type === 'registration'
        )
        const spinBalance = item?.wheel_info.totalBalance ?? 0

        // if (freeSpinBalance > 0) {
        //   setTimeout(() => {
        //     openModal('LuckyDrawModal')
        //   }, 1000)
        // }

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

        dispatch(SettingActions.setLuckyDrawBalance(spinBalance))
      }
    } catch (e) {
      console.log('e', e)
    } finally {
      dispatch(TempSettingActions.setLuckyDrawTriggered(true))
    }
  }
  const CheckRetentionBalance = async () => {
    try {
      const { success, data } = await getEligileSpin()
        .unwrap()
        .catch((e: IResponse<EligibleSpinResult>) => {
          return e
        })

      if (success && data) {
        const item = data?.details?.find((el) => el.event_type === 'retention')
        const spinBalance = item?.wheel_info.totalBalance ?? 0

        dispatch(SettingActions.setRetentionDrawBalance(spinBalance))
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
    if (!shieldStatus || luckyDrawTriggered) {
      return
    }

    CheckLuckyDrawBalance()
    CheckRetentionBalance()
  }, [shieldStatus])

  return null
}

export default memo(LuckyDrawTrigger)
