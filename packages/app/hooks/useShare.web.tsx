import useLocalization from 'app/provider/localization'
import React from 'react'
import { Platform } from 'react-native'

const useShare = (url: string) => {
  const { t } = useLocalization()

  const shareData = {
    message: 'Share this referral link to receive rewards',
    url: url,
    title: t('common.share'),
  }

  const webShare = async () => {
    console.log('webShare', url)
    const sharing = await navigator.share(shareData)
    console.log(
      '🚀 ~ file: useShare.tsx ~ line 27 ~ webShare ~ sharing',
      sharing
    )
  }

  return {
    webShare,
  }
}

export default useShare
