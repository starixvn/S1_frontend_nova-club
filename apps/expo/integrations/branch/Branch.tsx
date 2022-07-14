import { useAppDispatch } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { memo, useEffect } from 'react'
import branch, { BranchError } from 'react-native-branch'

function Branch() {
  const dispatch = useAppDispatch()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    branch.subscribe(({ error, params, uri }) => {
      // params will never be null if error is null
      if (error) {
        dispatch(SettingActions.setLog(JSON.stringify(error)))
        console.error('Error from Branch: ' + error)
        return
      }
      const trackingCode = params ? params['ref'] : undefined
      if (typeof trackingCode === 'string') {
        dispatch(SettingActions.setLog(JSON.stringify(params)))
        dispatch(
          SettingActions.setReferral({
            trackingCode: trackingCode.replace(/[^0-9a-zA-Z]/g, ''),
          })
        )
      }
      // if (params && params['+non_branch_link']) {
      //   const nonBranchUrl = params['+non_branch_link']
      //   // Route non-Branch URL if appropriate.
      //   return
      // }

      // if (params && !params['+clicked_branch_link']) {
      //   // A Branch link opened.
      //   // Route link based on data in params
      //   this.navigator.push({ params: params, uri: uri })
      //   return
      // }
    })
  }, [])

  return null
}

export default memo(Branch)
