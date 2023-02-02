import Text from 'agent/components/Text'
import { SxProp, View } from 'dripsy'
import React, { useEffect } from 'react'
import { Platform, StyleSheet } from 'react-native'
import {
  CodeField,
  Cursor,
  isLastFilledCell,
  MaskSymbol,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'

export const CELL_COUNT = 6
export const CELL_SIZE = 50
export const CELL_BORDER_RADIUS = 8

type AgentUnderlinePinFieldProps = {
  title: string
  value: string
  setValue: (value: string) => void
  errorMsg?: string
  autoFocus?: boolean
  cellContainerSx?: SxProp
}
const AgentUnderlinePinField = ({
  title,
  value,
  setValue,
  errorMsg,
  autoFocus,
  cellContainerSx,
}: AgentUnderlinePinFieldProps) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })

  useEffect(() => {
    if (autoFocus) ref.current?.focus()
  }, [])

  const renderCell = ({ index, symbol, isFocused }) => {
    let textChild: React.ReactNode = null

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
      <View
        key={index}
        style={[
          styles.cell,
          isFocused && styles.focusCell,
          errorMsg && styles.error,
        ]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        <Text style={[styles.text, errorMsg ? styles.error : {}]}>
          {textChild}
        </Text>
      </View>
    )
  }

  function onPinChanged(text: string) {
    let cleanText = text.replace(/[^0-9]/g, '')
    setValue(cleanText)
  }

  return (
    <View>
      <Text>{title}</Text>
      <View sx={cellContainerSx}>
        <CodeField
          key={title}
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
          <Text sx={{ my: '$2', mx: '$6', color: '$errorAgent' }}>
            {errorMsg}
          </Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: {
    height: CELL_SIZE,
    // marginTop: 12,
    justifyContent: 'space-between',
  },
  cell: {
    marginHorizontal: 4,
    height: CELL_SIZE,
    width: CELL_SIZE,
    aspectRatio: 1,
    // borderTopLeftRadius: CELL_BORDER_RADIUS,
    // borderTopRightRadius: CELL_BORDER_RADIUS,
    borderRadius: CELL_BORDER_RADIUS,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderColor: '#8E9A9E',
    borderWidth: 1,
  },
  text: {
    lineHeight: CELL_SIZE - 5,
    ...Platform.select({ web: { lineHeight: 50 } }),
    fontSize: 30,
    textAlign: 'center',
    color: '#3557b7',
  },
  focusCell: {
    borderBottomColor: '#0c7dff',
    borderBottomWidth: 2,
  },
  error: {
    borderBottomColor: 'red',
    color: 'red',
  },
})
export default AgentUnderlinePinField
