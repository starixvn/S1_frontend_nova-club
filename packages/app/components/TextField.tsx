import { Gradient } from '@dripsy/gradient'
import useLocalization from 'app/provider/localization'
import { copyToClipboard } from 'app/utils'
import { MaxLength } from 'app/utils/constant'
import {
  styled,
  SxProp,
  Text,
  TextInput as DripsyTextInput,
  useDripsyTheme,
  View,
} from 'dripsy'
import { AnimatePresence, MotiText } from 'moti'
import React, {
  ComponentProps,
  createContext,
  memo,
  useContext,
  useRef,
} from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import IconButton from './form/IconButton'
import GradientBox from './GradientBox'

const GradientTextBoxContext = createContext<{ labelWidth: number }>({
  labelWidth: 0.8,
})

type TextFieldProps = {
  labelWidth?: number
  children: React.ReactNode
}

type TextFieldLabelProps = ComponentProps<typeof Gradient> & {
  label: string
  value: string
  textSx?: SxProp
  copy?: boolean
}

type DripsyTextInputProps = ComponentProps<typeof DripsyTextInput>

type TextFieldInputProps = {
  label: string
  _input: DripsyTextInputProps
  error?: string
  isAmount: boolean
  containerStyle?: SxProp
  sx?: SxProp
  right: React.ReactNode
}

const TextField = ({ labelWidth = 0.8, children }: TextFieldProps) => {
  return (
    <GradientTextBoxContext.Provider value={{ labelWidth }}>
      {children}
    </GradientTextBoxContext.Provider>
  )
}

const TextFieldLabel = ({
  label,
  value,
  copy = false,
  textSx,
  ...rest
}: TextFieldLabelProps) => {
  const { t } = useLocalization()
  const { labelWidth } = useContext(GradientTextBoxContext)

  return (
    <GradientBox sx={{ my: '$1' }} {...rest}>
      <StyledViewRow sx={{ color: '$PaleBlue' }}>
        <StyledTextLabel sx={{ flex: labelWidth }}>
          {t(label)} :
        </StyledTextLabel>
        <View
          sx={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <StyledTextValue
            selectable
            numberOfLines={1}
            sx={{ flex: 1, ...textSx }}
          >
            {value}
          </StyledTextValue>

          {copy && (
            <IconButton
              name="copy"
              color={'$lightCyan'}
              size={18}
              onPress={() => copyToClipboard(value)}
              sx={{ ml: '$2' }}
            />
          )}
        </View>
      </StyledViewRow>
    </GradientBox>
  )
}

const TextFieldInput = ({
  label,
  error,
  containerStyle,
  isAmount = false,
  _input,
  right,
  ...rest
}: TextFieldInputProps) => {
  const { t } = useLocalization()
  const { labelWidth } = useContext(GradientTextBoxContext)
  const textInputRef = useRef(null)
  const { value } = _input

  return (
    <View {...rest}>
      <GradientBox sx={{ my: '$1', ...containerStyle }}>
        <TouchableWithoutFeedback
          onPress={() => textInputRef?.current?.focus()}
        >
          <StyledViewRow sx={{ color: 'white' }}>
            {isAmount ? (
              <>
                <StyledTextInput
                  ref={textInputRef}
                  placeholderTextColor={'$border'}
                  maxLength={MaxLength.AMOUNT}
                  {..._input}
                />
                <StyledTextLabel
                  sx={{
                    color: '#FFFBAE',
                    position: 'absolute',
                    right: '$4',
                  }}
                >
                  {`= ${_input.value ? _input.value : 0} K`}
                </StyledTextLabel>
              </>
            ) : (
              <>
                <StyledTextLabel sx={{ flex: labelWidth }}>
                  {t(label)}
                </StyledTextLabel>
                <StyledTextInput
                  ref={textInputRef}
                  placeholderTextColor={'$border'}
                  sx={{ flex: 1 }}
                  {..._input}
                />
              </>
            )}
            {right}
          </StyledViewRow>
        </TouchableWithoutFeedback>
      </GradientBox>

      {error && (
        <TextInputHints>
          <MemoErrorText error={error} />
        </TextInputHints>
      )}
    </View>
  )
}

const ErrorText = ({ error }: { error?: string }) => {
  const { t } = useLocalization()
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
          <Text variants={['error', 'sm']} sx={{ ml: '$2' }}>
            {t(error)}
          </Text>
        </MotiText>
      )}
    </AnimatePresence>
  )
}

const MemoErrorText = memo(ErrorText)

const StyledViewRow = styled(View)(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  minHeight: 60,
  px: '$4',
  position: 'relative',
}))

const StyledTextLabel = styled(Text)(() => ({
  fontWeight: 'bold',
}))

const StyledTextValue = styled(Text)(() => ({
  // flex: 1,
  fontWeight: 'bold',
}))

const StyledTextInput = styled(DripsyTextInput)(() => ({
  flex: 1,
}))

const TextInputHints = styled(View)(() => ({
  justifyContent: 'center',
  pt: '$0a',
  px: '$4',
}))

TextField.Label = TextFieldLabel
TextField.TextInput = TextFieldInput
TextField.Error = ErrorText

export { TextField }
