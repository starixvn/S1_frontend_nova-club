import { useEffect } from 'react'

export default function Branch() {
  useEffect(() => {
    async function initAndFetch() {
      const BranchSDK = (await import('branch-sdk')).default

      BranchSDK.init('key_live_kk9L5U2LVQ71RskUAJHvTeeeuwnaZymJ')

      BranchSDK.data(function (err, data) {
        if (err) {
          console.warn(`Branch failed to resolve link: ${err}`)
          return
        }

        console.log('Branch', data)
        // do something with `data`?
      })
    }

    initAndFetch()
  }, [])

  return null
}
