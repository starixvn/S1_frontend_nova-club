import { toCleanAmount } from 'app/utils'
import { Text, View } from 'dripsy'
import React from 'react'
import { Animated, Platform, StyleSheet } from 'react-native'
import {
  CodeField,
  Cursor,
  isLastFilledCell,
  MaskSymbol,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'

const { Value, Text: AnimatedText } = Animated

export const CELL_COUNT = 6
export const CELL_SIZE = 50
export const CELL_BORDER_RADIUS = 8
export const DEFAULT_CELL_BG_COLOR = '#fff'
export const NOT_EMPTY_CELL_BG_COLOR = '#FFF'
export const ACTIVE_CELL_BG_COLOR = '#c7d0e9'
export const DEFAULT_CELL_TEXT_COLOR = '#3557b7'
export const NOT_EMPTY_CELL_TEXT_COLOR = '#FFF'
export const ACTIVE_CELL_TEXT_COLOR = '#3557b7'

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0))
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1))
const animateCell = ({ hasValue, index, isFocused }) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start()
}

const AnimatedPinField = ({ value, setValue, errorMsg }) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })

  const renderCell = ({ index, symbol, isFocused }) => {
    let textChild: React.ReactNode = null
    const hasValue = Boolean(symbol)
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      color: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_TEXT_COLOR, ACTIVE_CELL_TEXT_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_TEXT_COLOR, ACTIVE_CELL_TEXT_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    }

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused })
    }, 0)

    if (symbol) {
      textChild = (
        <MaskSymbol
          maskSymbol="•"
          isLastFilledCell={isLastFilledCell({ index, value })}
        >
          {symbol}
        </MaskSymbol>
      )
    } else if (isFocused) {
      textChild = <Cursor />
    }

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {textChild}
      </AnimatedText>
    )
  }

  function onPinChanged(text: string) {
    let cleanText = text.replace(/[^0-9]/g, '')
    setValue(cleanText)
  }

  return (
    <View>
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={onPinChanged}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
      />
      {errorMsg && (
        <Text sx={{ my: '$2', mx: '$6', color: '$error' }}>{errorMsg}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: {
    height: CELL_SIZE,
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  cell: {
    marginHorizontal: 4,
    height: CELL_SIZE,
    width: CELL_SIZE,
    aspectRatio: 1,
    lineHeight: CELL_SIZE - 5,
    ...Platform.select({ web: { lineHeight: 50 } }),
    fontSize: 30,
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: '#3557b7',
    backgroundColor: '#fff',

    // IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },
  focusCell: {
    borderColor: '#000',
  },
  error: {
    color: 'red',
  },
})
export default AnimatedPinField
