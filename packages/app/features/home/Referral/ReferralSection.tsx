import IconButton from 'app/components/IconButton'
import { copyToClipboard } from 'app/utils'
import { Text, View, styled } from 'dripsy'
import React from 'react'
import { ImageBackground } from 'react-native'
import { SolitoImage } from 'solito/image'
import GiftImage from 'app/assets/images/referral/gift.png'
import SpeakerImage from 'app/assets/images/referral/speaker.png'
import ShareCode from './ShareCode'

const IMAGE_SIZE = 180
const ReferralSection = () => {
  return (
    <View sx={{ width: '100%', bg: 'red' }}>
      <ImageBackground
        source={require('app/assets/images/referral/referral-bg.png')}
        style={{ width: '100%', height: 220 }}
        imageStyle={{
          resizeMode: 'cover',
          alignSelf: 'flex-end',
        }}
      >
        <View
          sx={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            sx={{
              borderWidth: 2,
              borderRadius: 15,
              bg: 'rgb(0,0,0,0.6)',
              borderColor: 'yellow',
              minHeight: '30%',
              width: '75%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingX: 5,
              paddingY: 10,
            }}
          >
            <SolitoImage
              src={GiftImage}
              width={IMAGE_SIZE}
              height={IMAGE_SIZE}
              resizeMode="contain"
              alt="referralImage1"
              style={{ position: 'absolute', left: '-15%' }}
            />
            <StyledImage
              src={SpeakerImage}
              width={IMAGE_SIZE}
              height={IMAGE_SIZE}
              resizeMode="contain"
              alt="referralImage2"
              sx={{ position: 'absolute', right: '-10%' }}
            />

            <ShareCode />
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const StyledImage = styled(SolitoImage)({})

export default ReferralSection
