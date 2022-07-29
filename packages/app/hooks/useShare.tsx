import useLocalization from 'app/provider/localization'
import React from 'react'
import { Platform } from 'react-native'
import Share from 'react-native-share'

const useShare = (shareOptions) => {
  const { t } = useLocalization()

  const onShare = async () => {
    if (Platform.OS !== 'web') {
      try {
        const result = await Share.open(shareOptions).catch(
          (err) => err && console.log('err', err)
        )
        const res = await result
        console.log('🚀 ~ file: useShare.tsx ~ line 15 ~ onShare ~ res', res)
      } catch (error) {
        alert(error.message)
      }
    }
  }

  const webShare = async () => {
    const sharing = await navigator.share(shareOptions)
    console.log(
      '🚀 ~ file: useShare.tsx ~ line 27 ~ webShare ~ sharing',
      sharing
    )
  }

  return {
    onShare,
    webShare,
  }
}

export default useShare
