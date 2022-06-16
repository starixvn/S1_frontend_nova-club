/* eslint-disable react-hooks/rules-of-hooks */
import { View } from 'dripsy'
import ModalNavigation from './ModalNavigation'
import { createParam } from 'solito'
import { getContextualComponent } from './withContextualNavConstant'
import { memo, useEffect, useMemo } from 'react'

const { useParam } = createParam()

/**
 * Using `Modal` component to stack on top of current screen. Detect the modal visibility by changing
 * the url parameters from the 2nd argument *moduleKey*.
 *
 * Basically recreate the 1st argument *Component* and add on another `Modal` component
 *
 * @param Component
 * Parent component that contains contextual component to stack on top.
 * @param moduleKey Use to alter the url parameter's key.
 * Eg: *moduleKey=profile* url will becume *?=profile*
 */
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
