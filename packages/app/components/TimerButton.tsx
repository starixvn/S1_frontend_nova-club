import useCountDownTimer from 'app/hooks/useCountDownTimer'
import dayjs from 'dayjs'
import {
  ActivityIndicator,
  Pressable,
  styled,
  Text,
  useDripsyTheme,
} from 'dripsy'
import React, {
  ComponentProps,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'

interface ITimerButtonProps extends ComponentProps<typeof Pressable> {
  title: string
  onPress: () => void
  loading?: boolean
  _text?: ComponentProps<typeof Text>
}

export interface ITimerButtonForwardRef {
  startOtpTimer: () => void
  stopLoading: () => void
}

const TimerButton = forwardRef<ITimerButtonForwardRef, ITimerButtonProps>(
  ({ title, onPress, _text, loading, ...props }: ITimerButtonProps, ref) => {
    const { theme } = useDripsyTheme()
    const [disabled, setDisabled] = useState(false)

    const { sx: textSx = {}, ...textProps } = _text || {}

    const {
      startTimer,
      clearTimer,
      countDownValue: secDiff,
      isCountDownRunning,
    } = useCountDownTimer({
      duration: 1,
      timeUnit: 'minutes',
      dateFormat: 'ss',
    })

    useEffect(() => {
      setDisabled(isCountDownRunning)
    }, [isCountDownRunning])

    const handleButtonClick = () => {
      if (!disabled && !loading) {
        onPress()
      }
    }

    useImperativeHandle(ref, () => ({
      startOtpTimer() {
        setDisabled(true)
        const unixTime = dayjs()
        !isCountDownRunning && startTimer(unixTime)
      },
      stopLoading() {
        setDisabled(false)
      },
    }))

    return (
      <StyledButton
        disabled={disabled}
        onPress={handleButtonClick}
        style={disabled ? { backgroundColor: theme.colors.$disabled } : {}}
        {...props}
      >
        {(disabled || loading) && (
          <ActivityIndicator
            size="small"
            color={theme.colors.$secondary}
            sx={{ mr: secDiff ? '$1' : '$0', fontSize: 12 }}
          />
        )}
        {!loading && (
          <Text
            sx={{
              fontSize: [12, 14, 16],
              ...textSx,
            }}
            {...textProps}
          >
            {disabled ? `${secDiff}` : title}
          </Text>
        )}
      </StyledButton>
    )
  }
)

TimerButton.displayName = 'TimerButton'

const StyledButton = styled(Pressable)({
  flexDirection: 'row',
  p: '$2',
  m: '$1',
  width: 100,
  borderRadius: 4,
  bg: '$primary',
  justifyContent: 'center',
  alignItems: 'center',
})

export default TimerButton
