import { Image } from 'dripsy'
import React, { useCallback } from 'react'
import { Action, ActionType, getAction } from 'app/utils/actionGenerator'
import { LANGUAGE_CODE } from 'app/utils/constant'
import { useRouter } from 'next/router'
import TouchableOpacity from 'app/components/pressable/TouchableOpacity'

const PlinkoTncButton = ({
  locale,
  scale,
}: {
  locale: LANGUAGE_CODE
  scale: number
}) => {
  const { push } = useRouter()

  const tncData: Action = {
    type: ActionType.INTERNAL_REDIRECT,
    payload: {
      uri: '/event/mid-autumn-tnc',
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
        height: 40 * scale,
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
        source={require('../../../../packages/app/assets/images/plinko/btnTnC.png')}
        resizeMode="contain"
        style={{ width: '100%', height: '100%', zIndex: 1 }}
        alt="btnTnc"
      />
    </TouchableOpacity>
  )
}

export default PlinkoTncButton
