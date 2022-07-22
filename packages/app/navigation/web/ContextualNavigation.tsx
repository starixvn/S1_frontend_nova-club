import { ActivityIndicator, View } from 'dripsy'
import dynamic from 'next/dynamic'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { AnimatePresence, MotiView } from 'moti'
import {
  createContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import { Platform } from 'react-native'

const _contextualComponents = {
  deposit: () => import('../../features/deposit'),
  'deposit-loader': () => import('../../features/deposit/deposit-loader'),
  'local-bank': () => import('../../features/deposit/local-bank'),
  'online-bank': () => import('../../features/deposit/online-bank'),
  momo: () => import('../../features/deposit/momo'),
  'qr-transfer': () => import('../../features/deposit/qr-transfer'),
  'topup-card': () => import('../../features/deposit/topup-card'),
  crypto: () => import('app/features/deposit/crypto'),
  withdrawal: () => import('app/features/withdrawal'),
  'bank-account': () => import('app/features/profile/bank-account'),
  'add-bank-account': () =>
    import('app/features/profile/bank-account/add-bank-account'),
  history: () => import('app/features/profile/history'),
  'profile-details': () => import('app/features/profile/profile-details'),
  profile: () => import('app/features/profile'),
  'change-password': () => import('app/features/profile/change-password'),
  'forget-password': () => import('../../features/auth/forgotPassword'),
  '/games/prelaunch': () => import('../../features/games/PreLaunchGame'),
  'game-url': () => import('../../features/games/GameLoaderPage'),
  'commission-table': () => import('../../features/profile/commission-table'),
  messages: () => import('../../features/messages'),
  'customer-support': () => import('../../features/customerSupport'),
  'qrcode-scanner': () => import('../../features/qrcodeScanner'),
  transfer: () => import('../../features/transfer'),
  '/profile/overview': () => import('../../features/profile/overview'),
}

function getContextualComponent(key: string) {
  const LazyComponent = dynamic(_contextualComponents[key], {
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
      style={{ minHeight: '100vh' }}
    >
      <LazyComponent />
    </MotiView>
  )
}

export type ContextualComponentType = keyof typeof _contextualComponents

interface ContextualStackItem {
  Component: React.FunctionComponent
  id: string
}
export const ContextualNavigationContext = createContext({
  stacks: [] as ContextualStackItem[],
  add: (moduleKey: string, componentKey: string) => {},
  remove: (index: number) => {},
  clear: () => {},
})
const ContextualNavigationProvider = ({ children }) => {
  const [stacks, setStacks] = useState([] as ContextualStackItem[])

  const state = useMemo(() => {
    return {
      stacks,
      add: (moduleKey: string, componentKey: string) => {
        setStacks(
          stacks.concat([
            {
              id: moduleKey,
              Component: getContextualComponent(componentKey),
            },
          ])
        )
      },
      clear: () => {
        setStacks([])
      },
      remove: (index: number) => {
        if (index > -1) {
          const tmp = [...stacks]
          tmp.splice(index, 1)
          setStacks(tmp)
        }
      },
    }
  }, [stacks])

  useEffect(() => {
    if (Platform.OS === 'web') {
      if (stacks.length > 0)
        document.documentElement.classList.add('overflow-y-hidden')
      else {
        document.documentElement.classList.remove('overflow-y-hidden')
      }
    }
  }, [stacks])

  return (
    <ContextualNavigationContext.Provider value={state}>
      {children}
      <View
        sx={{
          position: 'absolute',
          maxWidth: 'container',
          width: '100%',
          alignSelf: 'center',
          overflow: 'hidden',
        }}
      >
        <AnimatePresence>
          {stacks.map((s) => {
            const Component = s.Component
            return <Component key={s.id} />
          })}
        </AnimatePresence>
      </View>
    </ContextualNavigationContext.Provider>
  )
}

export default ContextualNavigationProvider
