import { Pressable, ScrollView, Text, View } from 'dripsy'
import React from 'react'
import { DripsyGradient } from '../Gradient'
import ShadowButton from '../ShadowButton'

export type CustomRoutesProps = {
  key: string
  title: string
  index: number
}

type CustomTabBarProps = {
  routes: CustomRoutesProps[]
  currentIndex: number
  onPress: (arg0) => void
}

const CustomTabBar = ({ routes, currentIndex, onPress }: CustomTabBarProps) => {
  const PageComponent = routes && routes.length > 3 ? ScrollView : View
  const handlePress = (value) => {
    onPress(value)
  }

  return (
    <DripsyGradient gradient="surface">
      <PageComponent
        horizontal
        contentContainerSx={{ px: 24, gap: 12 }}
        sx={
          PageComponent === View ? { flexDirection: 'row', px: 24, gap: 4 } : {}
        }
      >
        {routes.length > 0 &&
          routes.map((route, index) => {
            const isActive = currentIndex === index
            return (
              <View key={route.title} sx={{ flex: 1, py: 12 }}>
                <Pressable onPress={() => handlePress(route.index)}>
                  <ShadowButton
                    isActive={isActive}
                    containerStyle={{
                      minWidth: '100%',
                      height: 40, //Set Fixed Height to solve blinking Shadow Issue
                    }}
                  >
                    <Text
                      numberOfLines={2}
                      sx={{
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: 'white',
                        opacity: isActive ? 1 : 0.5,
                        textAlign: 'center',
                      }}
                    >
                      {route?.title?.toUpperCase() ?? ''}
                    </Text>
                  </ShadowButton>
                </Pressable>
              </View>
            )
          })}
      </PageComponent>
    </DripsyGradient>
  )
}

export default CustomTabBar
