import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import DisabledOverlay from 'app/components/DisabledOverlay'
import { ButtonProps } from 'app/components/common/Button'
import { Pressable, Row, Text, View, styled } from 'dripsy'
import React, { ComponentProps } from 'react'
import { SolitoImage } from 'solito/image'

const StyledContainer = styled(View)({
  width: '100%',
  aspectRatio: 1.88, // 660 /350
  overflow: 'hidden',
  borderRadius: 20,
})

interface RewardCardFullProps extends ComponentProps<typeof Pressable> {
  src: string
  cost: number
  gameName: string
  buttonProps?: ButtonProps
  disabled?: boolean
}

const RewardCardFull = (props: RewardCardFullProps) => {
  const { src, cost, gameName, buttonProps, disabled = false, ...rest } = props

  return (
    <Pressable disabled={disabled} {...rest}>
      <StyledContainer>
        <SolitoImage
          src={src}
          fill
          contentFit="cover"
          alt=""
          style={{
            backgroundColor: 'coral',
          }}
        />
        <View
          sx={{
            position: 'absolute',
            bottom: '20%',
            left: 0,
            right: 0,
            alignItems: 'center',
          }}
        >
          <Row
            sx={{
              alignItems: 'center',
              bg: '$error',
              py: ['$0', '$1'],
              px: 24,
              borderRadius: 50,
              height: 40,
            }}
          >
            <SolitoImage
              src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/coin.png`}
              width={26}
              height={26}
              contentFit="contain"
              alt=""
            />

            <Text
              sx={{
                fontSize: 20,
                lineHeight: 28,
                fontWeight: 'bold',
                pl: '$2',
              }}
            >
              {cost}
            </Text>
          </Row>
        </View>

        {disabled && <DisabledOverlay />}
      </StyledContainer>

      <Text
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          textTransform: 'uppercase',
          pt: '$2',
        }}
      >
        {gameName}
      </Text>
    </Pressable>
  )
}

export default RewardCardFull
