import { Container, Pressable, Row, Text, View } from 'dripsy'
import uniqueId from 'lodash/uniqueId'
import React from 'react'
import { DripsyGradient } from '../Gradient'
import ShadowButton from '../ShadowButton'
import { FONT_TOP_OFFSET } from 'app/constants/font'

export type CustomRoutesProps = {
  key: string
  title: string
  index: number
}

export type CustomTabBarProps = {
  routes: CustomRoutesProps[]
  currentIndex: number
  onPress: (arg0) => void
}

const CustomTabBar = ({ routes, currentIndex, onPress }: CustomTabBarProps) => {
  const handlePress = (value) => {
    onPress(value)
  }
  return (
    <DripsyGradient gradient="surface" sx={{}}>
      <Container
        sx={{
          px: 24,
        }}
      >
        {/* <View sx={{ height: 1, bg: '$primary.100' }} /> */}
        <TabBarSelection
          currentIndex={currentIndex}
          routes={routes}
          onPress={onPress}
        />
      </Container>
    </DripsyGradient>
  )
}

export const TabBarSelection = ({
  routes,
  currentIndex,
  onPress,
}: CustomTabBarProps) => {
  const handlePress = (value) => {
    onPress(value)
  }
  return (
    <Row sx={{ gap: '$3', justifyContent: 'center' }}>
      {routes.length > 0 &&
        routes.map((route, index) => {
          const isActive = currentIndex === index
          return (
            <Pressable
              sx={{ maxWidth: 200, flex: 1, py: '$3' }}
              key={route.title}
              onPress={() => handlePress(route.index)}
            >
              <ShadowButton isActive={isActive} safeRender stretch>
                <Text
                  numberOfLines={2}
                  sx={{
                    mt: FONT_TOP_OFFSET,
                    fontSize: 12,
                    fontWeight: '900',
                    color: 'white',
                    opacity: isActive ? 1 : 0.5,
                    textAlign: 'center',
                  }}
                >
                  {route?.title?.toUpperCase() ?? ''}
                </Text>
              </ShadowButton>
            </Pressable>
          )
        })}
    </Row>
  )
}

export default CustomTabBar
