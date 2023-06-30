import { Image } from 'dripsy'
import React, { useCallback } from 'react'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import { LANGUAGE_CODE } from 'app/constant/language'
import { Action, ActionType, getAction } from 'app/utils/actionGenerator'

const PlinkoTncButton = ({
  locale,
  scale,
}: {
  locale: LANGUAGE_CODE
  scale: number
}) => {
  const { push } = useContextualRouter()

  const tncData: Action = {
    type: ActionType.INTERNAL_REDIRECT,
    payload: {
      uri: '/event/plinko-tnc',
      params: {
        locale: 'vn',
      },
    },
  }
  const handleTncButton = useCallback(() => {
    const action = getAction(tncData)
    action({ push, locale })
  }, [locale])

  return (
    <TouchableOpacity
      onPress={() => handleTncButton()}
      sx={{
        top: 40,
        right: 20,
        zIndex: 3,
        width: 40 * scale,
        aspectRatio: 1,
        position: 'absolute',
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
    >
      <Image
        source={require('app/assets/images/events/plinko/btnTnC.png')}
        resizeMode="contain"
        style={{ width: '100%', height: '100%', zIndex: 1 }}
      />
    </TouchableOpacity>
  )
}

export default PlinkoTncButton
