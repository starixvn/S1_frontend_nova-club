import useInterval from 'app/hooks/useInterval'
import dayjs from 'dayjs'
import { Text } from 'dripsy'

import React, { useEffect, useState } from 'react'
const duration = require('dayjs/plugin/duration')
dayjs.extend(duration)

const Timer = ({
  seconds = 0,
  onEnded,
}: {
  seconds: number
  onEnded: () => void
}) => {
  const [timer, setTimer] = useState<number>(600)

  useEffect(() => {
    setTimer(seconds)
  }, [seconds])

  const minutes = dayjs
    .duration(timer * 1000)
    .minutes()
    .toString()
    .padStart(2, '0')

  const _seconds = dayjs
    .duration(timer * 1000)
    .seconds()
    .toString()
    .padStart(2, '0')

  useInterval(() => {
    if (timer > 0) setTimer(timer - 1)
    else onEnded && onEnded()
  }, 1000)

  return (
    <Text sx={{ color: '$error', fontWeight: 'bold' }}>
      ( {minutes}:{_seconds} )
    </Text>
  )
}

export default Timer
