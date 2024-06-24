import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { Text, View } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'
import { WinnerText } from '../Winner'

const WINNER_LIST = ['Name1', 'Name2', 'Name3', 'Name4', 'Name5', 'Name6']

const JackpotCard = ({ contentWidth, haveWinner }) => {
  return (
    <View sx={{ alignItems: 'center' }}>
      <SolitoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/winning/text-jackpot.png`}
        width={contentWidth * 0.7}
        height={contentWidth * 0.7 * (69 / 315)}
        alt=""
      />

      <View sx={{ width: contentWidth }}>
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/winning/winner-jackpot.png`}
          width={contentWidth}
          height={contentWidth * (430 / 600)}
          alt=""
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            marginHorizontal: 'auto',
          }}
        />
        <View sx={{ height: 300, alignItems: 'center', py: '$3' }}>
          <SolitoImage
            src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/winning/prize-jackpot.png`}
            width={120}
            height={120}
            alt=""
          />
          <View sx={{ height: 105, mt: 18, width: ['70%', '70%'] }}>
            {haveWinner ? (
              WINNER_LIST.map((item, index) => (
                <WinnerText key={index}>{item}</WinnerText>
              ))
            ) : (
              <View sx={{ alignItems: 'center' }}>
                <SolitoImage
                  src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/winning/winner-unknown.png`}
                  width={100}
                  height={100}
                  alt=""
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  )
}

export default JackpotCard
