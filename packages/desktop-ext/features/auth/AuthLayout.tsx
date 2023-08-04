import Divider from 'app/components/Divider'
import { DripsyGradient } from 'app/components/Gradient'
import IconButton from 'app/components/IconButton'
import LanguageSwitch from 'app/components/LanguageSwitch'
import AuthBanner from 'app/features/auth/components/AuthBanner'
import { Container, Text, View, styled } from 'dripsy'
import React, { ComponentProps, ReactNode, memo } from 'react'
import { useWindowDimensions } from 'react-native'
import { SolitoImage } from 'solito/image'
import { useModal } from 'react-native-modalfy'

type StyledContainerProps = {
  width: number
}

const StyledContainer = styled(Container)(
  ({ width }: StyledContainerProps) => ({
    width: Math.min(1260, width * 0.9),
    minHeight: 420,
  })
)

type Props = {
  children: ReactNode
  headerDesc: string
  isAbleToClose?: boolean
} & Omit<ComponentProps<typeof StyledContainer>, keyof StyledContainerProps>

export default function AuthLayout({
  children,
  headerDesc,
  isAbleToClose,
  ...rest
}: Props) {
  const { width } = useWindowDimensions()

  return (
    <StyledContainer width={width} {...rest}>
      <DripsyGradient gradient="surface" sx={{ flex: 1 }}>
        <View sx={{ flexDirection: 'row', flex: 1 }}>
          <LeftColumn title={headerDesc} />
          <View sx={{ width: '50%' }}>
            <Divider />
            {isAbleToClose && <CloseButton />}
            {children}
          </View>
        </View>
      </DripsyGradient>
    </StyledContainer>
  )
}

const LeftColumn = memo(({ title }: { title: string }) => {
  return (
    <View
      sx={{
        width: '50%',
        bg: '$primary.500',
        alignItems: 'center',
        py: 30,
      }}
    >
      <Text sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22 }}>
        {title}
      </Text>
      <SolitoImage
        src={require('app/assets/images/common/logo.png')}
        alt="logo"
        width={128}
        height={80}
        resizeMode="contain"
      />
      <AuthBanner />
      <View sx={{ alignItems: 'center', mt: 'auto' }}>
        <LanguageSwitch />
      </View>
    </View>
  )
})

const CloseButton = () => {
  const { closeModal } = useModal()

  return (
    <View
      sx={{
        position: 'absolute',
        right: '$2',
        top: '$2',
        zIndex: 1,
      }}
    >
      <IconButton
        name="cross"
        size={20}
        sx={{}}
        onPress={() => {
          closeModal()
        }}
      />
    </View>
  )
}

LeftColumn.displayName = 'RegisterLeftColumn'
