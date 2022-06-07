import {
  styled,
  Sx,
  Text,
  TextInput as DripsyTextInput,
  useDripsyTheme,
  View,
} from 'dripsy'
import { AnimatePresence, MotiText } from 'moti'
import React, { ComponentProps, createContext, memo, useContext } from 'react'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import GradientBox from './GradientBox'

const GradientTextBoxContext = createContext<{ labelWidth: number }>({
  labelWidth: 0.8,
})

type GradientBoxTextProps = {
  labelWidth?: number
  children: React.ReactNode
}

type GradientBoxTextLabelProps = {
  label: string
  value: string
}

type DripsyTextInputProps = React.ComponentProps<typeof DripsyTextInput>
type GradientBoxTextInputProps = {
  label: string
  _input: DripsyTextInputProps
  error?: string
}

const GradientBoxText = ({
  labelWidth = 0.8,
  children,
}: GradientBoxTextProps) => {
  return (
    <GradientTextBoxContext.Provider value={{ labelWidth }}>
      {children}
    </GradientTextBoxContext.Provider>
  )
}

const GradientBoxTextLabel = ({ label, value }: GradientBoxTextLabelProps) => {
  const { labelWidth } = useContext(GradientTextBoxContext)

  return (
    <GradientBox
      sx={{
        my: '$2',
      }}
    >
      <StyledView
        sx={{
          color: '$PaleBlue',
        }}
      >
        <StyledTextLabel
          sx={{
            flex: labelWidth,
          }}
        >
          {label} :
        </StyledTextLabel>
        <StyledTextValue>{value}</StyledTextValue>
      </StyledView>
    </GradientBox>
  )
}

const GradientBoxTextInput = ({
  label,
  error,
  _input,
}: GradientBoxTextInputProps) => {
  const { labelWidth } = useContext(GradientTextBoxContext)

  return (
    <View>
      <GradientBox
        sx={{
          my: '$2',
        }}
      >
        <TouchableWithoutFeedback>
          <StyledView
            sx={{
              color: 'white',
            }}
          >
            <StyledTextLabel
              sx={{
                flex: labelWidth,
              }}
            >
              {label}
            </StyledTextLabel>
            <StyledTextInput
              placeholderTextColor={'$border'}
              sx={{
                flex: 1,
              }}
              {..._input}
            />
          </StyledView>
        </TouchableWithoutFeedback>
      </GradientBox>

      <TextInputHints>
        <MemoErrorText error={error} />
      </TextInputHints>
    </View>
  )
}

const ErrorText = ({ error }: { error?: string }) => {
  const { theme } = useDripsyTheme()

  return (
    <AnimatePresence>
      {error && (
        <MotiText
          animate={{
            height: [0, theme.text.body.fontSize * 1.5],
            opacity: [0, 1],
          }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ type: 'timing', duration: 300 }}
        >
          <Text variants={['error', 'sm']} sx={{ ml: '$4' }}>
            {error}
          </Text>
        </MotiText>
      )}
    </AnimatePresence>
  )
}

const MemoErrorText = memo(ErrorText)

const StyledView = styled(View)(() => ({
  flexDirection: 'row',
  py: '$8',
  px: '$8',
  my: '$2',
}))

const StyledTextLabel = styled(Text)(() => ({
  fontWeight: 'bold',
}))

const StyledTextValue = styled(Text)(() => ({
  flex: 1,
  fontWeight: 'bold',
}))

const StyledTextInput = styled(DripsyTextInput)(() => ({}))

const TextInputHints = styled(View)(() => ({
  justifyContent: 'center',
  pt: '$1',
}))

GradientBoxText.Label = GradientBoxTextLabel
GradientBoxText.TextInput = GradientBoxTextInput

export { GradientBoxText }
