import { FONT_TOP_OFFSET } from 'app/constants/font'
import { Pressable, Row, Text, View, useDripsyTheme } from 'dripsy'
import React from 'react'
import { Shadow } from 'react-native-shadow-2'

const TabBarItem = ({ renderIcon, isActive, label, onPress }) => {
  const { theme } = useDripsyTheme()

  return (
    <Pressable
      onPress={() => {
        onPress()
        // This must be called before `LayoutAnimation.configureNext` in order for the animation to run properly.
        // list.current?.prepareForLayoutAnimationRender()
        // After removing the item, we can start the animation.
        // LayoutAnimation.configureNext(
        //   LayoutAnimation.Presets.easeInEaseOut
        // )
      }}
      key={label}
      sx={{
        flex: 1,
        width: '100%',
        maxWidth: 150,
        marginBottom: 2,
        mx: '$2',

        // borderWidth: isActive ? 2 : 0,
        // mt: isActive ? -1 : 0,
      }}
    >
      <Shadow
        style={{ flex: 1, borderRadius: 24, overflow: 'hidden' }}
        offset={[0, 1]}
        distance={1}
        startColor={theme.colors.$primary[100]}
        stretch
      >
        <Row
          sx={{
            borderColor: isActive ? '$primary.100' : 'transparent',
            borderWidth: 2,
            px: ['$2', '$3'],
            py: ['$1', '$2'],
            bg: '$primary.700',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 24,
            boxShadow: isActive ? 'inset 0px -3px 6px #9696E6' : 'none',
          }}
        >
          <View sx={{ mr: 12 }}>{renderIcon()}</View>
          <Text
            numberOfLines={1}
            sx={{
              mt: FONT_TOP_OFFSET + 2,
              fontSize: 13,
              textAlign: 'center',
            }}
          >
            {label}
          </Text>
        </Row>
      </Shadow>
    </Pressable>
  )
}

export default TabBarItem
