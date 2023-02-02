import { PageWithBackHeader } from 'app/components/layout/Page'
import { ActivityIndicator, View } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import dynamic from 'next/dynamic'
import { createContext, useEffect, useState } from 'react'
import ContextualComponents from './ContextualComponents'

interface ContextualStackItem {
  Component: React.FunctionComponent
  id: string
}

export const ContextualNavigationContext = createContext(
  [] as ContextualStackItem[]
)

interface ContextualNavigationProviderProps {
  children: React.ReactNode
}

function getContextualComponent(key: string) {
  const LazyComponent = dynamic(ContextualComponents[key], {
    loading: (props) => {
      return (
        <PageWithBackHeader header={{ title: ' ' }}>
          <ActivityIndicator sx={{ mt: '$10' }} color={'$lightCyan'} />
        </PageWithBackHeader>
      )
    },
  })

  // eslint-disable-next-line react/display-name
  return () => (
    <MotiView
      from={{
        transform: [{ translateX: '100%' }],
      }}
      animate={{
        transform: [{ translateX: 0 }],
      }}
      exit={{
        transform: [{ translateX: '100%' }],
      }}
      transition={{ type: 'timing', duration: 350 }}
      style={{
        minHeight: '100vh',
        position: 'absolute',
        width: '100%',
        top: 0,
      }}
    >
      <LazyComponent />
    </MotiView>
  )
}

const ContextualNavigationProvider = ({
  children,
}: ContextualNavigationProviderProps) => {
  const [stacks, setStacks] = useState([] as ContextualStackItem[])

  useEffect(() => {
    let validNavs: ContextualStackItem[] = []
    let searchParams = new URL(
      decodeURIComponent(window.history.state.url),
      window.location.origin
    ).searchParams

    searchParams.forEach((v, key) => {
      const dynamicComponent = ContextualComponents[v]
      if (
        key.includes('/') &&
        dynamicComponent &&
        !stacks.find((s) => s.id === key)
      ) {
        validNavs.push({
          id: key,
          Component: getContextualComponent(v),
        })
      }
    })

    let remainingStacks = stacks
    if (stacks.length > 0) {
      remainingStacks = remainingStacks.filter((s) => searchParams.get(s.id))
    }

    let newStack: ContextualStackItem[] = []
    if (validNavs.length > 0) {
      const item = validNavs.pop()
      if (item) {
        newStack.push(item)
      }
    }

    if (remainingStacks.length !== stacks.length || newStack.length > 0) {
      setStacks(remainingStacks.concat(newStack))
    }
  }, [window.history.state.url])

  useEffect(() => {
    if (stacks.length > 0) {
      /**
       * Changed overflow-y-hidden to overflow hidden entirely
       */
      document.documentElement.classList.add('overflow-hidden')
    } else {
      document.documentElement.classList.remove('overflow-hidden')
    }
  }, [stacks])

  return (
    <ContextualNavigationContext.Provider value={stacks}>
      {children}
      <View sx={{ position: 'initial', width: '100%' }}>
        <AnimatePresence>
          {stacks.map((s, i) => {
            const Component = s.Component
            return <Component key={s.id} />
          })}
        </AnimatePresence>
      </View>
    </ContextualNavigationContext.Provider>
  )
}

export default ContextualNavigationProvider
