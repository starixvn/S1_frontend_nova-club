/* eslint-disable react-hooks/rules-of-hooks */
import { ActivityIndicator, View } from 'dripsy'
import { NextComponentType } from 'next'
import ModalNavigation from './ModalNavigation'
import dynamic from 'next/dynamic'
import { createParam } from 'solito'
import { ComponentType } from 'react'

// Ignore Dynamic import warning, as module: "esnext" is configured at app/next tsconfig.
const dynamicComponentMapping: {
  [index: string]: ComponentType<{}>
} = {
  deposit: dynamic(() => import('../../features/deposit'), {
    loading: () => <ActivityIndicator />,
  }),
  topup: dynamic(() => import('../../features/deposit/RecentTransactions'), {
    loading: () => <ActivityIndicator />,
  }),
  'forget-password': dynamic(
    () => import('../../features/auth/ForgotPassword'),
    {
      loading: () => <ActivityIndicator />,
    }
  ),
}

type ModalNavigationParam = {
  module: string
  sub: string
  content: string
}

const { useParam } = createParam<ModalNavigationParam>()

function withContextualNav<T>(Component: NextComponentType<T>) {
  const context = () => {
    const [module] = useParam('module')
    const [sub] = useParam('sub')
    const [content] = useParam('content')

    const Module = module ? dynamicComponentMapping[module] ?? View : View
    const Submodule = sub ? dynamicComponentMapping[sub] ?? View : View
    const Content = content ? dynamicComponentMapping[content] ?? View : View

    return (
      <View>
        <Component />
        <ModalNavigation isVisible={!!module} id="modalnav-module">
          <Module />
        </ModalNavigation>
        <ModalNavigation isVisible={!!sub} id="modalnav-sub">
          <Submodule />
        </ModalNavigation>
        <ModalNavigation isVisible={!!sub} id="modalnav-content">
          <Content />
        </ModalNavigation>
      </View>
    )
  }

  return context
}

export default withContextualNav
