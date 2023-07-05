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
  children: ReactNode
  onPress?: () => void
  parentStyle?: SxProp
  childStyle?: SxProp
}

const Accordian = ({
  isExpandable = false,
  extended = true,
  label,
  header,
  children,
  onPress,
  parentStyle,
  childStyle,
}: AccordianProps) => {
  const { theme } = useDripsyTheme()
  const [expandHeight, setExpandHeight] = useState(0)
  const [isExtend, toggleIsExtend] = useReducer((state) => {
    return !state
  }, extended)
  const desktop = isDesktop()

  const handlePress = () => {
    onPress && !isExtend && onPress()
    toggleIsExtend()
  }
  return (
    <MotiPressable onPress={isExpandable ? handlePress : undefined}>
      <View
        sx={{
          borderBottomWidth: desktop ? 0 : isExtend ? 0 : 2,
          borderColor: '$primary.100',
        }}
      >
        <ViewMessageHeader sx={parentStyle}>
          {header ?? <View>{label}</View>}
          {isExpandable && (
            <MotiView
              animate={{ rotate: isExtend ? '-180deg' : '0deg' }}
              transition={{
                type: 'timing',
                duration: 350,
              }}
            >
              <Icon name="down" size={20} />
            </MotiView>
          )}
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
      <View sx={{ bg: '$primary.500' }}>{isExtend && <Divider />}</View>
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
                  backgroundColor: theme.colors.$primary[500],
                  borderBottomWidth: 2,
                  borderColor: theme.colors.$primary[100],
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
    </MotiPressable>
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
})

const Divider = styled(View)({
  mx: '$pagePadding',
  borderBottomWidth: 1,
  borderColor: '$primary.100',
})

const StyledMotiView = styled(MotiView)({})
export default Accordian
