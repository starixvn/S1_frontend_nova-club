import { MotiText } from 'moti'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { TabBarProps } from 'react-native-tab-view'
import { DripsyGradient } from '../Gradient'
import { Pressable, ScrollView, Text, View } from 'dripsy'

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
        {routes.map((route, index) => {
          const isActive = currentIndex === index

          return (
            <View key={route.title} sx={{ flex: 1, py: 12 }}>
              <Pressable onPress={() => handlePress(route.index)}>
                <View
                  sx={{
                    py: 12,
                    px: 8,
                    borderRadius: 50,
                    backgroundColor: isActive ? '#32325A' : '#1E2238',
                    borderWidth: 1,
                    borderColor: '#9696E6',
                    alignItems: 'center',
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
                    {route.title.toUpperCase()}
                  </Text>
                </View>
              </Pressable>
            </View>
          )
        })}
      </PageComponent>
    </DripsyGradient>
  )
}

export default CustomTabBar
