import Icon from 'app/components/Icon'
import Image from 'app/components/common/Image'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { ActivityIndicator, Pressable, View, styled } from 'dripsy'
import React, { ComponentProps } from 'react'
import { Platform, StyleSheet } from 'react-native'
import CustomText from './CustomText'

const StyledContainer = styled(View)({
  alignItems: 'center',
  py: '$2',
})

type BottomTicketCounterProps = {
  onSubmit: () => void
  disabled: boolean
  isLoading?: boolean
  ticketBalance?: number
} & ComponentProps<typeof StyledContainer>

const BottomTicketCounter = (props: BottomTicketCounterProps) => {
  const {
    onSubmit,
    disabled,
    isLoading = false,
    ticketBalance,
    ...containerProps
  } = props

  const { width } = useContainerDimension()
  const { t } = useLocalization()

  return (
    <StyledContainer {...containerProps}>
      <View
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Icon name={'ticket'} size={20} />

        <CustomText
          sx={{
            color: '$white',
            fontWeight: 'bold',
            fontSize: ['$5', '$6'],
            ml: '$4',
          }}
        >
          {`${ticketBalance ?? 0}`}
        </CustomText>
      </View>

      <Pressable
        sx={{
          width: Math.min(150, width * 0.4),
          aspectRatio: 375 / 110,
          borderRadius: 8,
          mt: '$3',
          alignContent: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.8 : 1,
          ...Platform.select({
            web: {
              userSelect: 'none',
            },
          }),
        }}
        onPress={onSubmit}
        disabled={disabled}
      >
        <Image
          source={require('app/assets/images/events/prediction/pink-gradient-button.png')}
          style={[
            StyleSheet.absoluteFill,
            {
              position: 'absolute',
              zIndex: -1,
            },
          ]}
        />

        {isLoading ? (
          <ActivityIndicator size={20} color="white" />
        ) : (
          <CustomText
            sx={{
              color: '$white',
              fontWeight: 'bold',
              fontSize: ['$2', '$3'],
              textAlign: 'center',
            }}
          >
            {t('common.submit')}
          </CustomText>
        )}
      </Pressable>
    </StyledContainer>
  )
}

export default BottomTicketCounter
