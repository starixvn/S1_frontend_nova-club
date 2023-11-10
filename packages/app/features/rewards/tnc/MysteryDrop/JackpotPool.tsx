import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useWindowResize from 'app/hooks/useWindowResize'
import { toThousandSeparator } from 'app/utils'
import { Text, View } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'

const JackpotPool = () => {
  const { width } = useWindowResize()

  return (
    <View>
      <SolitoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/bg-jackpot.png`}
        alt=""
        width={width}
        height={width * 0.802}
      />
      <View
        sx={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SolitoImage
          src={require('app/assets/images/events/mystery/board-jackpot.png')}
          alt=""
          width={width}
          height={width * 0.443}
        />
        <View
          sx={{
            position: 'absolute',
          }}
        >
          <Text sx={{ textAlign: 'center' }}>
            {`Total Jackpot Pool`.toUpperCase()}
          </Text>
          <Text
            sx={{
              textAlign: 'center',
              fontSize: 36,
              color: 'yellow',
              fontWeight: 'bold',
            }}
          >
            {`VND ${toThousandSeparator('123456789')}`.toUpperCase()}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default JackpotPool
