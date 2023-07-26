import { styled, SxProp, useDripsyTheme, View } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import { MotiPressable } from 'moti/interactions'
import React, { ReactNode, useReducer, useState } from 'react'
import Icon from './Icon'
import isDesktop from 'app/utils/isDesktop'

type AccordianProps = {
  isExpandable?: boolean
  extended: boolean
  label?: string
  header?: ReactNode
  icon?: ReactNode
  children: ReactNode
  onPress?: () => void
  color?: any
  containerStyle?: SxProp
  parentStyle?: SxProp
  childStyle?: SxProp
}

const Accordian = ({
  isExpandable = false,
  extended = true,
  label,
  header,
  icon,
  children,
  onPress,
  color,
  containerStyle,
  parentStyle,
  childStyle,
}: AccordianProps) => {
  const { theme } = useDripsyTheme()
  const [expandHeight, setExpandHeight] = useState(0)
  const [isExtend, toggleIsExtend] = useReducer((state) => {
    return !state
  }, extended)
  const desktop = isDesktop()

  const borderColor = color ?? '$primary.100'

  const handlePress = () => {
    onPress && onPress()
    toggleIsExtend()
  }
  return (
    <>
      <MotiPressable onPress={isExpandable ? handlePress : undefined}>
        <View
          sx={{
            borderTopWidth: desktop ? 0 : 2,
            borderBottomWidth: desktop ? 0 : isExtend ? 0 : 2,
            borderColor: borderColor,
            ...containerStyle,
          }}
        >
          <ViewMessageHeader sx={parentStyle}>
            <View sx={{ flex: 1 }}>{header ?? <View>{label}</View>}</View>
            <View sx={{ flexBasis: 48, alignItems: 'center' }}>
              {isExpandable && (
                <MotiView
                  animate={{ rotate: isExtend ? '-180deg' : '0deg' }}
                  transition={{
                    type: 'timing',
                    duration: 350,
                  }}
                >
                  {icon ?? <Icon name="down" size={20} />}
                </MotiView>
              )}
            </View>
          </ViewMessageHeader>
        </View>
        {/* Dummy View to calculate the expandable Height */}
        <View
          pointerEvents="none"
          sx={{ opacity: 0, position: 'absolute' }}
          onLayout={(e) => {
            setExpandHeight(e.nativeEvent.layout.height)
          }}
        >
          {children}
        </View>
        <View sx={{ bg: color ? 'white' : '$primary.500' }}>
          {isExtend && <Divider color={color} />}
        </View>
      </MotiPressable>

      {isExpandable ? (
        <MotiView
          from={{ height: 0 }}
          animate={{ height: isExtend ? expandHeight : 0 }}
          transition={{ type: 'timing' }}
        >
          <AnimatePresence>
            {isExtend && (
              <StyledMotiView
                from={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                sx={{
                  backgroundColor: '$primary.500',
                  borderBottomWidth: 2,
                  borderColor: borderColor,
                  ...childStyle,
                }}
              >
                {children}
              </StyledMotiView>
            )}
          </AnimatePresence>
        </MotiView>
      ) : (
        children
      )}
    </>
  )
}

const ViewMessageHeader = styled(View)({
  flexDirection: 'row',
  bg: '$primary.500',
  justifyContent: 'space-between',
  alignItems: 'center',
  minHeight: 24,
  py: 16,
  px: '$pagePadding',
  gap: '$2',
})

const Divider = styled(View)(({ color }) => ({
  mx: '$pagePadding',
  borderBottomWidth: 1,
  borderColor: color ?? '$primary.100',
}))

const StyledMotiView = styled(MotiView)({})
export default Accordian
