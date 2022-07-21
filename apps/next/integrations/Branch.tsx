import { useAppDispatch } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { useEffect } from 'react'

export default function Branch() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    async function initAndFetch() {
      const BranchSDK = (await import('branch-sdk')).default

      BranchSDK.init(process.env.NEXT_PUBLIC_BRANCH_KEY!)

      BranchSDK.data(function (err, params) {
        if (err) {
          console.warn(`Branch failed to resolve link: ${err}`)
          return
        }

        const trackingCode = params ? params.data_parsed['ref'] : undefined

        if (typeof trackingCode === 'string') {
          dispatch(SettingActions.setLog(JSON.stringify(params)))

          dispatch(
            SettingActions.setReferral({
              trackingCode: trackingCode.replace(/[^0-9a-zA-Z]/g, ''),
            })
          )
        }

        console.log('Branch', params)
      })
    }

    initAndFetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
