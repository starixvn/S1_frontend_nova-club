import { ActivityIndicator, View } from 'dripsy'
import React, { useReducer } from 'react'
import EmbeddedContent from './EmbeddedContent'
import { Platform } from 'react-native'

interface RewardLauncherContentProps {
  isShowEmbeddedContent: boolean
  domainUrl: string
  gameKey: string
  onTokenExpired?: () => void
}

const RewardContent = (props: RewardLauncherContentProps) => {
  const { isShowEmbeddedContent, domainUrl, gameKey, onTokenExpired } = props

  const [isLoadCompleted, toggleIsLoadCompleted] = useReducer(
    (state) => !state,
    false
  )

  const isShowLoading = () => {
    const isIframeEmbededContent = Platform.select({
      web: true,
    })

    if (isIframeEmbededContent && !isLoadCompleted) {
      return true
    }

    return false
  }

  return (
    <View sx={{ flex: 1, backgroundColor: '$background' }}>
      {isShowEmbeddedContent && (
        <EmbeddedContent
          domainUrl={domainUrl}
          gameKey={gameKey}
          onTokenExpired={onTokenExpired}
          onLoadCompleted={() => {
            if (!isLoadCompleted) {
              toggleIsLoadCompleted()
            }
          }}
        />
      )}

      {isShowLoading() && (
        <View
          sx={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size={28} color="$secondary.100" />
        </View>
      )}
    </View>
  )
}

export default RewardContent
