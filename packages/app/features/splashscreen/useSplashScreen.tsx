import { Translate } from 'app/provider/localization'
import { useCallback, useEffect, useRef, useState } from 'react'
import { sleep } from 'utils/common'
// import { Translate } from './useLocalization'
export type SplashScreenTask = (
  context: SplashScreenContext
) => () => Promise<SplashScreenHandler>

export interface SplashScreenTasks {
  mandatoryAsync?: SplashScreenTask[]
  mandatorySync?: SplashScreenTask[]
  optionalAsync?: SplashScreenTask[]
}

export interface SplashScreenContext {
  dispatch: any
  t: Translate
  navigation: any
}

interface useSplashScreenConfig {
  minWaitTime?: number
  context: SplashScreenContext
}

export interface SplashScreenHandler {
  result: boolean
  handler?: () => void
}

export default function useSplashScreen(
  {
    mandatoryAsync = [],
    mandatorySync = [],
    optionalAsync = [],
  }: SplashScreenTasks,
  start = true,
  config: useSplashScreenConfig
): { status: boolean } {
  const { minWaitTime = 10 } = config || {}
  const [status, setStatus] = useState<boolean>(false)

  useEffect(() => {
    let retryTO: NodeJS.Timeout

    async function triggerMinWaitTime() {
      await sleep(minWaitTime)
      return true
    }

    async function startMandatoryTasks() {
      console.log('start mandartory')
      const mandatoryAsyncTasks = Promise.all([
        ...mandatoryAsync.map((t) => t(config.context)),
        triggerMinWaitTime(),
      ])
      const mandatoryTasks = mandatorySync.reduce(
        (p, fn) =>
          p.then(fn(config.context)).then((r) => {
            r.handler && r.handler()
            if (!r.result) return Promise.reject()
            return r.result
          }),
        Promise.resolve(true)
      )

      const allMandatory = await Promise.all([
        mandatoryAsyncTasks,
        mandatoryTasks,
      ]).catch((e) => console.log('retry', e))

      if (!allMandatory) {
        // retryTO = setTimeout(() => {
        //   startProgress();
        // }, 5000);
      } else setStatus(true)
    }

    async function startProgress() {
      // optional tasks are for preloading
      optionalAsync.map((t) => t(config.context))
      startMandatoryTasks()
    }

    if (start) startProgress()

    return () => {
      retryTO && clearTimeout(retryTO)
    }
  }, [start])

  return {
    status,
  }
}

export function useSplashScreenTaskResolver<T>(hook, hookParams?: T) {
  const hookValue = hook(hookParams)
  const [frameLapsed, setFrameLapsed] = useState(false)
  const [result, setResult] = useState<SplashScreenHandler>()

  const resolver =
    useRef<
      (value: SplashScreenHandler | PromiseLike<SplashScreenHandler>) => void
    >()

  const promise = useRef(
    new Promise<SplashScreenHandler>((r) =>
      sleep(100).then(() => {
        resolver.current = r
        setFrameLapsed(true)
      })
    )
  )

  useEffect(() => {
    if (frameLapsed && result && resolver.current) {
      resolver.current(result)
    }
  }, [frameLapsed, result])

  const promiseFactory = useCallback<SplashScreenTask>(
    () => async () => {
      return promise.current
    },
    []
  )

  return {
    hookValue,
    resolve: setResult,
    promise,
    promiseFactory,
    frameLapsed,
  }
}
