import GiftImage from 'app/assets/images/referral/gift.png'
import SpeakerImage from 'app/assets/images/referral/speaker.png'
import { View, styled } from 'dripsy'
import React from 'react'
import { ImageBackground } from 'react-native'
import { SolitoImage } from 'solito/image'
import ShareCode from './ShareCode'

const IMAGE_SIZE = 150
const ReferralSection = () => {
  return (
    <View sx={{ width: '100%' }}>
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
            width: '100%',
            height: '100%',
            px: '5%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            sx={{
              position: 'relative',
              borderWidth: 2,
              borderRadius: 15,
              bg: 'rgb(0,0,0,0.6)',
              borderColor: 'yellow',
              minHeight: '30%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              px: 5,
              py: 10,
            }}
          >
            <SolitoImage
              src={GiftImage}
              width={IMAGE_SIZE}
              height={IMAGE_SIZE}
              resizeMode="contain"
              alt="referralImage1"
              style={{ position: 'absolute', left: '-10%' }}
            />
            <StyledImage
              src={SpeakerImage}
              width={IMAGE_SIZE}
              height={IMAGE_SIZE}
              resizeMode="contain"
              alt="referralImage2"
              sx={{ position: 'absolute', right: '-5%' }}
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
