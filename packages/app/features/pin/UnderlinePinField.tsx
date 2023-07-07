import isDesktop from 'app/utils/isDesktop'
import { Text, View } from 'dripsy'
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
import { styled } from 'dripsy'

export const CELL_COUNT = 6
export const CELL_SIZE = 50
export const CELL_BORDER_RADIUS = 8

type UnderlinePinFieldProps = {
  label: string
  value: string
  setValue: (value: string) => void
  errorMsg?: string
  autoFocus?: boolean
  horizontalMode?: boolean
}
const UnderlinePinField = ({
  label,
  value,
  setValue,
  errorMsg,
  autoFocus,
}: UnderlinePinFieldProps) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })
  const desktop = isDesktop()

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
        sx={{
          ...(desktop
            ? {
                backgroundColor: 'transparent',
                borderColor: '#9696E6',
                borderWidth: 1,
              }
            : {
                backgroundColor: '#fff',
                borderBottomColor: '#000',
                borderBottomWidth: 1,
              }),
        }}
        onLayout={getCellOnLayoutHandler(index)}
      >
        <Text
          key={index}
          style={[
            styles.text,
            errorMsg ? styles.error : {},
            {
              ...(desktop
                ? {
                    color: 'white',
                  }
                : {
                    color: '#32325A',
                  }),
            },
          ]}
        >
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
    <View
      focusable={false}
      sx={{
        flexDirection: desktop ? 'row' : 'column',
        alignItems: desktop ? 'center' : 'stretch',
        mb: '$3',
        justifyContent: 'center',
      }}
    >
      {label && <Label sx={{ flexGrow: 1 }}>{label + ' : '}</Label>}
      <View>
        <CodeField
          key={label}
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
          <Text sx={{ my: '$2', mx: 45, color: '$error' }}>{errorMsg}</Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  label: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: {
    height: CELL_SIZE,
    marginTop: 12,
    // paddingHorizontal: 20,
    justifyContent: 'center',
  },
  cell: {
    marginHorizontal: 4,
    height: CELL_SIZE,
    width: CELL_SIZE,
    aspectRatio: 1,
    // borderTopLeftRadius: CELL_BORDER_RADIUS,
    // borderTopRightRadius: CELL_BORDER_RADIUS,
    borderRadius: CELL_BORDER_RADIUS,
  },
  text: {
    lineHeight: CELL_SIZE - 5,
    ...Platform.select({ web: { lineHeight: 50 } }),
    fontSize: 30,
    textAlign: 'center',
  },
  focusCell: {
    marginBottom: 8,
    borderBottomColor: '#9696E6',
    borderBottomWidth: 4,
  },
  error: {
    borderBottomColor: 'red',
    color: 'red',
  },
})

const Label = styled(Text)({
  fontWeight: 'bold',
})
export default UnderlinePinField
