import useContainerDimension from 'app/hooks/useContainerDimension'
import BouncePressable from 'app/pressable/BouncePressable'
import { Text } from 'dripsy'
import { Animated } from 'react-native'
import { TabBar } from 'react-native-tab-view'
import { DripsyGradient } from './Gradient'

const CustomTabBar = (props) => {
  console.log(
    '🚀 ~ file: CustomTabBar.tsx ~ line 9 ~ CustomTabBar ~ props',
    props
  )
  const { width } = useContainerDimension()

  return (
    <TabBar
      {...props}
      style={{ backgroundColor: '#014F71' }}
      indicatorContainerStyle={{
        zIndex: 5,
        alignItems: 'center',
      }}
      indicatorStyle={{
        backgroundColor: 'white',
        top: 60,
        width: width / 8,
        left: (width / props.navigationState.routes.length - width / 8) / 2,
        height: 3,
      }}
      renderTabBarItem={({ route, navigationState, onPress, position }) => {
        const tabIndex = navigationState.routes.indexOf(route)
        const active = navigationState.index === tabIndex
        const inputRange = navigationState.routes.map((_, i) => i)
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === tabIndex ? 1 : 0.3)),
        })
        const colorGradient = ['#066D9A', '#014F71']
        return (
          <Animated.View
            style={{
              opacity,
              flex: 1,
            }}
            key={route.title}
          >
            <BouncePressable style={{}} onPress={onPress}>
              <DripsyGradient
                colors={colorGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                sx={{
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  borderWidth: active ? 0 : 0.5,
                  borderColor: '#262957',
                  flex: 1,
                }}
              >
                <Text
                  sx={{
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                    py: '$7',
                  }}
                >
                  {route.title}
                </Text>
              </DripsyGradient>
            </BouncePressable>
          </Animated.View>
        )
      }}
    />
  )
}

export default CustomTabBar
