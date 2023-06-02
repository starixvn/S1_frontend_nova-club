import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { useCallback, useEffect } from 'react'
import { Platform } from 'react-native'
import { useUpdateShieldMutation } from 'services/authApi'
import { Shield_Action, Shield_Platform } from 'services/authApi.type'

export default function useShield() {
  const dispatch = useAppDispatch()
  const sessionID = useAppSelector((state) => state.setting.shieldSessionID)
  const { playerName, token } = useAppSelector((state) => state.auth.info) || {}
  const { token: lastSyncToken, username: lastSyncUsername } =
    useAppSelector((state) => state.setting.lastSyncShield) || {}

  const [updateShield] = useUpdateShieldMutation()

  /**
   * @param {string} username - username from the login user
   */
  const syncShield = useCallback(
    async (action_type: Shield_Action) => {
      try {
        if (!sessionID) {
          return
        }

        const response = await updateShield({
          action_type,
          platform:
            Platform.OS === 'web' ? Shield_Platform.WEB : Shield_Platform.APP,
          session_id: sessionID,
        })

        return response
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    [sessionID, updateShield]
  )

  // const autoSyncShield = useCallback(() => {
  //   const isAuthInfoExist = playerName && token
  //   const isLastSyncInfoEqualCurrent =
  //     playerName === lastSyncUsername && token === lastSyncToken

  //   if (isAuthInfoExist && !isLastSyncInfoEqualCurrent) {
  //     syncShield()
  //     dispatch(
  //       SettingActions.setLastSyncShieldInfo({
  //         token,
  //         username: playerName,
  //       })
  //     )
  //   }
  // }, [dispatch, lastSyncToken, lastSyncUsername, playerName, syncShield, token])

  return {
    syncShield,
    // autoSyncShield,
  }
}
