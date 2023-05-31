import React, { ComponentProps } from 'react'
import Image from 'app/components/common/Image'
import { Pressable, View, styled, useSx } from 'dripsy'
import useLocalization from 'app/provider/localization'
import useContainerDimension from 'app/hooks/useContainerDimension'
import Icon from 'app/components/Icon'
import useOrientation from 'app/hooks/useOrientation'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import { getAction } from 'app/utils/actionGenerator'
import { ActionType } from 'app/utils/actionGenerator'
import { useAppSelector } from 'app/provider/redux/store'
import { Platform } from 'react-native'
import CustomText from './CustomText'

const StyledContainer = styled(View)({
  alignItems: 'center',
  mt: '$5',
})

type LogoHeaderProps = {} & ComponentProps<typeof StyledContainer>

const LogoHeader = (props: LogoHeaderProps) => {
  const { ...viewProps } = props
  const { push } = useContextualRouter()

  const { t } = useLocalization()
  const { width } = useContainerDimension()
  const { isLandscape } = useOrientation()
  const locale = useAppSelector((s) => s.setting.locale)

  const onGoBack = () => {
    push('/')
  }

  const handleTncButton = () => {
    const action = getAction({
      type: ActionType.INTERNAL_REDIRECT,
      payload: {
        uri: '/event/prediction-tnc',
        params: {
          locale: 'vn',
        },
      },
    })

    action({ push, locale })
  }

  return (
    <StyledContainer {...viewProps}>
      <Image
        sx={{
          width: Math.min(150, width * 0.3),
          aspectRatio: 67 / 24,
        }}
        source={require('app/assets/images/logo.png')}
        resizeMode="contain"
      />

      <CustomText
        sx={{
          color: '$white',
          fontWeight: 'bold',
          fontSize: '$5',
        }}
      >
        {t('event.prediction.event')}
      </CustomText>

      <Pressable
        onPress={onGoBack}
        sx={{
          padding: ['$2', '$3'],
          position: 'absolute',
          left: '5%',
          top: 25,
          backgroundColor: '#DD0776',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 100,
          ...Platform.select({
            web: {
              userSelect: 'none',
            },
          }),
        }}
      >
        <Icon name="chevleft" size={isLandscape ? 14 : 20} color="white" />
      </Pressable>

      <Pressable
        onPress={handleTncButton}
        sx={{
          top: '10%',
          right: 20,
          zIndex: 3,
          width: 30,
          height: 30,
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
          source={require('app/assets/images/events/prediction/btnTnC.png')}
          resizeMode="contain"
          style={{ width: '100%', height: '100%', zIndex: 1 }}
        />
      </Pressable>
    </StyledContainer>
  )
}

export default LogoHeader
