import React, { useEffect, useState } from 'react'
import * as Updates from 'expo-updates'

function useOTA() {
  const [isReady, setReady] = useState(__DEV__)
  async function checkOTA() {
    try {
      const update = await Updates.checkForUpdateAsync()
      console.log('OTA STATUS : ', update.manifest?.id)
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync()
        // ... notify user of update ...
        await Updates.reloadAsync()
      } else setReady(true)
    } catch (e) {
      console.log('OTA ERROR : ', e)
      setReady(true)
      // handle or log error
    }
  }

  useEffect(() => {
    if (!isReady) checkOTA()
  }, [])

  return {
    isReady,
  }
}

export default useOTA
