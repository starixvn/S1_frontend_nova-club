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
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'

interface ITimerButtonProps {
  title: string
  onPress: () => void
}

export interface ITimerButtonForwardRef {
  startOtpTimer: () => void
  stopLoading: () => void
}

const TimerButton = forwardRef<ITimerButtonForwardRef, ITimerButtonProps>(
  ({ title, onPress }: ITimerButtonProps, ref) => {
    const { theme } = useDripsyTheme()
    const [disabled, setDisabled] = useState(false)

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
      if (!disabled) {
        onPress()
        setDisabled(true)
      }
    }

    useImperativeHandle(ref, () => ({
      startOtpTimer() {
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
      >
        {disabled && (
          <ActivityIndicator
            size="small"
            color={theme.colors.$secondary}
            sx={{ mr: secDiff ? '$1' : '$0', fontSize: 12 }}
          />
        )}
        <Text
          sx={{
            fontSize: [12, 20, 25],
          }}
        >
          {disabled ? `${secDiff}` : title}
        </Text>
      </StyledButton>
    )
  }
)

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
