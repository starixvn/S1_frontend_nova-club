import IconButton from 'app/components/IconButton'
import useSupportItemList from 'app/features/customerSupport/useSupportItemList'
import { View, Text, useDripsyTheme } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import React, { useState } from 'react'
import { Linking } from 'react-native'

const ToggleSupportDropDown = () => {
  const { theme } = useDripsyTheme()
  const mediaList = useSupportItemList()
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  return (
    <MotiView
      style={{
        position: 'absolute',
        backgroundColor: theme.colors?.$primary
          ? theme.colors?.$primary[50]
          : 'transparent',
        width: 50,
        minHeight: 50,
        left: 0,
        zIndex: 5,
        borderBottomEndRadius: 15,
        alignItems: 'center',
        paddingVertical: 15,
        justifyContent: 'space-around',
      }}
      from={{ height: isMenuOpen ? 200 : 25 }}
      animate={{ height: isMenuOpen ? 200 : 25 }}
      transition={{ type: 'timing', duration: 250 }}
    >
      <MotiView
        from={{ rotateZ: !isMenuOpen ? '0deg' : '180deg' }}
        animate={{ rotateZ: !isMenuOpen ? '0deg' : '180deg' }}
        transition={{ type: 'timing' }}
        style={{
          position: 'absolute',
          alignItems: 'center',
          width: '100%',
          left: 0,
          top: 15,
        }}
      >
        <IconButton
          sx={{}}
          name="down"
          onPress={() => setIsMenuOpen(!isMenuOpen)}
        />
      </MotiView>

      <View sx={{ height: 40 }} />

      <AnimatePresence>
        {isMenuOpen && (
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'timing', duration: 150 }}
          >
            {mediaList.map((item) => {
              return (
                <IconButton
                  key={item.label}
                  name={item.icon}
                  size={18}
                  sx={{ bg: '$primary.500', borderRadius: 50, my: '$2' }}
                  iconSx={{ p: '$1' }}
                  onPress={() => {
                    Linking.openURL(item.href)
                  }}
                />
              )
            })}
          </MotiView>
        )}
      </AnimatePresence>
    </MotiView>
  )
}

export default ToggleSupportDropDown
