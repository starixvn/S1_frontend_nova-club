import { useAppSelector } from 'app/provider/redux/store'
import { useCallback } from 'react'
import { Platform } from 'react-native'
import { useUpdateShieldMutation } from 'services/authApi'
import { Shield_Platform } from 'services/authApi.type'

export default function useShield() {
  const shieldID = useAppSelector((state) => state.setting.shieldSessionID)

  const [updateShield] = useUpdateShieldMutation()

  /**
   * @param {string} username - username from the login user
   */
  const submitShield = useCallback(
    async (username: string) => {
      try {
        if (!shieldID) {
          return
        }

        const response = await updateShield({
          platform:
            Platform.OS === 'web' ? Shield_Platform.WEB : Shield_Platform.APP,
          session_id: shieldID,
          username,
        })

        return response
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    [shieldID, updateShield]
  )

  return {
    submitShield,
  }
}
