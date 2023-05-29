import type { ManipulateType } from 'dayjs';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useEffect, useRef, useState } from 'react';

dayjs.extend(duration)

export interface IUseCountDownTimer {
    duration?: number;
    timeUnit?: ManipulateType;
    dateFormat?: string;
}

const useCountDownTimer = (props?: IUseCountDownTimer) => {
    const { duration = 1, timeUnit = 'minutes', dateFormat = 'mm:ss' } =
        props ?? {};

    const intervalIdRef = useRef<ReturnType<typeof setInterval> | undefined>();
    const [countDownValue, setCountDownValue] = useState('');
    const [isCountDownRunning, setIsCountDownRunning] = useState(false);


    const countDown = (dayjsTimeCurrent: dayjs.Dayjs, dayjsTimeAfter: dayjs.Dayjs) => {
        if (dayjsTimeAfter >= dayjsTimeCurrent) {
            const timeRemaining = dayjs
                .duration(dayjsTimeAfter.diff(dayjsTimeCurrent))
                .format(dateFormat);
            setCountDownValue(dateFormat === 'ss' ? `${timeRemaining}s` : timeRemaining);
        } else {
            clearTimer();
        }
    };

    const startTimer = (dayjsTime: dayjs.Dayjs, callBack?: () => void) => {
        setIsCountDownRunning(true)
        const dayjsTimeAfter = dayjsTime.add(dayjs.duration({ [timeUnit]: duration }));

        countDown(dayjs(), dayjsTimeAfter);
        intervalIdRef.current = setInterval(() => {
            countDown(dayjs(), dayjsTimeAfter);
            callBack && callBack();
        }, 1000);
    };

    const clearTimer = () => {
        if (intervalIdRef.current) {
            setCountDownValue('');
            setIsCountDownRunning(false)
            clearInterval(intervalIdRef.current);
        }
    };

    useEffect(() => {
        return () => {
            clearTimer();
        };
    }, []);

    const timerObj = {
        startTimer,
        clearTimer,
        countDownValue,
        isCountDownRunning
    };

    return timerObj;
};

export default useCountDownTimer;
