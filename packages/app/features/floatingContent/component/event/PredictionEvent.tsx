import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Image from 'app/components/common/Image'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import { useAppSelector } from 'app/provider/redux/store'
import { Text, View } from 'dripsy'
import React from 'react'
import { useCLTicketCountQuery } from 'services/eventApi'

const PredictionEvent = ({ size }: { size: number }) => {
  const { push } = useContextualRouter()
  const { token } = useAppSelector((state) => state.auth.info) || {}

  const { data } = useCLTicketCountQuery(undefined, {
    skip: !token,
  })
  const balance = data?.data?.count ?? 0

  const handlePress = () => {
    push('/event/prediction')
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      sx={{ justifyContent: 'center', mb: 10, ml: -5 }}
    >
      <Image
        source={{
          uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/prediction/UEFA_floating_icon.gif`,
        }}
        style={{
          width: size,
          height: size,
        }}
        resizeMode="contain"
      />
      {token ? (
        <View
          sx={{
            position: 'absolute',
            top: -15,
            bottom: 0,
            left: -2,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            sx={{
              fontSize: 14,
              lineHeight: 16,
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'black',
              // zIndex: 99,
            }}
          >
            {balance}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  )
}
export default PredictionEvent
