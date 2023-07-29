import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useAppDispatch } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { memo, useEffect } from 'react'
import branch from 'react-native-branch'

function Branch() {
  const dispatch = useAppDispatch()
  const { getItem } = useAsyncStorage('@ref')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    async function getRefFromKeepFit() {
      try {
        const ref = await getItem()
        if (ref)
          dispatch(
            SettingActions.setReferral({
              trackingCode: ref.replace(/[^0-9a-zA-Z]/g, ''),
            })
          )
      } catch (e) {
        console.log('getRefFromKeepFit error', e)
      }
    }

    branch.subscribe({
      onOpenStart: ({ uri, cachedInitialEvent }) => {
        console.log(
          'subscribe onOpenStart, will open ' +
            uri +
            ' cachedInitialEvent is ' +
            cachedInitialEvent
        )
      },
      onOpenComplete: ({ error, params, uri }) => {
        if (error) {
          dispatch(SettingActions.setLog(JSON.stringify(error)))
          console.error('Error from Branch: ' + error)
          return
        }

        console.log('params', params)
        const trackingCode = params ? params['ref'] : undefined
        if (typeof trackingCode === 'string') {
          dispatch(SettingActions.setLog(JSON.stringify(params)))
          dispatch(
            SettingActions.setReferral({
              trackingCode: trackingCode.replace(/[^0-9a-zA-Z]/g, ''),
            })
          )
        } else getRefFromKeepFit()
      },
    })
  }, [])

  return null
}

export default memo(Branch)
