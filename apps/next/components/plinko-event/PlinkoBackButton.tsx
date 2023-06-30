import React from 'react'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import IconButton from 'app/components/form/IconButton'

const PlinkoBackButton = ({ scale }: { scale: number }) => {
  const { back } = useContextualRouter()

  return (
    <div id="back_button">
      <IconButton
        onPress={() => {
          back()
          if (window.ReactNativeWebView)
            window.ReactNativeWebView.postMessage('back')
        }}
        name="chevleft"
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
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4,
        }}
      />
    </div>
  )
}

export default PlinkoBackButton
