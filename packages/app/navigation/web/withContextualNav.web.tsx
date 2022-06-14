/* eslint-disable react-hooks/rules-of-hooks */
import { View } from 'dripsy'
import ModalNavigation from './ModalNavigation'
import { createParam } from 'solito'
import { getContextualComponent } from './withContextualNavConstant'
import { memo, useEffect, useMemo } from 'react'

const { useParam } = createParam()

function withContextualNav(Component, moduleKey) {
  const context = () => {
    const [module] = useParam(moduleKey)
    const Module = useMemo(() => {
      return module ? getContextualComponent(module) ?? View : View
    }, [module])
    return (
      <View style={{ flex: 1 }}>
        <Component />
        <ModalNavigation key={moduleKey} isVisible={!!module}>
          <Module />
        </ModalNavigation>
      </View>
    )
  }

  return context
}

export default withContextualNav
