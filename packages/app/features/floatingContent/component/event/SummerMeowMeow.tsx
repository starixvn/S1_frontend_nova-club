import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Image from 'app/components/common/Image'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import { Text } from 'dripsy'
import React from 'react'
import { useCheckTicketSpinQuery } from 'services/eventApi'

const FLOATING_GIF = require('../../../../assets/images/events/summerCat/seagame_floating.gif')

const SummerMeowMeow = ({ size }: { size: number }) => {
  const { push } = useContextualRouter()
  const { balance } = useCheckTicketSpinQuery(undefined, {
    selectFromResult: (s) => ({ ...s, balance: s.data?.data }),
  })

  const handlePress = () => {
    push('/event/summer-cat')
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      sx={{ justifyContent: 'center', mb: 10 }}
    >
      <Image
        source={FLOATING_GIF}
        style={{
          width: size,
          height: size,
        }}
        resizeMode="contain"
      />
      {
        <Text
          sx={{
            fontSize: 14,
            lineHeight: 16,
            position: 'absolute',
            top: '78%',
            left: 13,
            right: 0,
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'black',
            zIndex: 99,
          }}
        >
          {balance ? balance.totalBalance : ''}
        </Text>
      }
    </TouchableOpacity>
  )
}
export default SummerMeowMeow
