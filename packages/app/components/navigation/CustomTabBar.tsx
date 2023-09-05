import { FONT_TOP_OFFSET } from 'app/constants/font'
import useLocalization from 'app/provider/localization'
import { Container, Pressable, Row, Text, styled } from 'dripsy'
import React, { ComponentProps } from 'react'
import { MessageBadge } from '../Badge'
import { DripsyGradient } from '../Gradient'
import ShadowButton from '../ShadowButton'

const StyledPressable = styled(Pressable)({
  maxWidth: 200,
  flex: 1,
  py: '$3',
})

type StyledButtonTextProps = {
  isActive: boolean
}
const StyledButtonText = styled(Text)(
  ({ isActive }: StyledButtonTextProps) => ({
    py: '$1',
    mt: FONT_TOP_OFFSET,
    fontSize: 14,
    fontWeight: '900',
    color: 'white',
    opacity: isActive ? 1 : 0.5,
    textAlign: 'center',
  })
)

type CustomStyledComponent = {
  buttonProps?: ComponentProps<typeof StyledPressable>
  buttonTextProps?: Omit<
    ComponentProps<typeof StyledButtonText>,
    keyof StyledButtonTextProps
  >
}

export type CustomTabBarProps = {
  routes: CustomRoutesProps[]
  currentIndex: number
  onPress: (arg0: number) => void
} & CustomStyledComponent

export type CustomRoutesProps = {
  key: string
  title: string
  index: number
} & CustomStyledComponent

const CustomTabBar = ({
  routes,
  currentIndex,
  onPress,
  buttonProps,
  buttonTextProps,
}: CustomTabBarProps) => {
  return (
    <DripsyGradient gradient="surface">
      <Container
        sx={{
          px: [8, 16, 24],
        }}
      >
        <TabBarSelection
          currentIndex={currentIndex}
          routes={routes}
          onPress={onPress}
          buttonProps={buttonProps}
          buttonTextProps={buttonTextProps}
        />
      </Container>
    </DripsyGradient>
  )
}

const StyledRow = styled(Row)({
  gap: ['$2', '$3'],
  justifyContent: 'center',
})

interface TabBarSelectionProps extends CustomTabBarProps {
  wrapperProps?: ComponentProps<typeof StyledRow>
}

export const TabBarSelection = ({
  routes,
  currentIndex,
  onPress,
  buttonProps,
  buttonTextProps,
  wrapperProps,
}: TabBarSelectionProps) => {
  const { t } = useLocalization()
  const handlePress = (value) => {
    onPress(value)
  }

  return (
    <StyledRow {...wrapperProps}>
      {routes.length > 0 &&
        routes.map((route, index) => {
          const isActive = currentIndex === route.index
          return (
            <StyledPressable
              key={route.title}
              disabled={route.index === currentIndex ? true : false}
              onPress={() => handlePress(route.index)}
              {...buttonProps}
            >
              <ShadowButton isActive={isActive} safeRender stretch>
                {route.title === 'message.personalMessage' && <MessageBadge />}
                <StyledButtonText
                  numberOfLines={2}
                  isActive={isActive}
                  {...buttonTextProps}
                >
                  {t(route?.title) ?? ''}
                </StyledButtonText>
              </ShadowButton>
            </StyledPressable>
          )
        })}
    </StyledRow>
  )
}

export default CustomTabBar
