import IconButton from 'app/components/IconButton'
import { useRouter } from 'next/router'
import React from 'react'

const PlinkoBackButton = ({ scale }: { scale: number }) => {
  const { back } = useRouter()

  return (
    <div id="back_button">
      <IconButton
        onPress={() => {
          back()
          if (window.ReactNativeWebView)
            window.ReactNativeWebView.postMessage('back')
        }}
        name="back"
        size={20 * scale}
        color={'$darkNavyBlue'}
        sx={{
          top: 40,
          left: 20,
          zIndex: 3,
          width: 40 * scale,
          aspectRatio: 1,
          position: 'absolute',
          bg: 'white',
          borderRadius: 100,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          p: 10,
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 4,
        }}
      />
    </div>
  )
}

export default PlinkoBackButton
