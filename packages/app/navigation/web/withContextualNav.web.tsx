/* eslint-disable react-hooks/rules-of-hooks */
import { View } from 'dripsy'
import ModalNavigation from './ModalNavigation'
import { createParam } from 'solito'
import { getContextualComponent } from './withContextualNavConstant'

const { useParam } = createParam()

function withContextualNav(Component, moduleKey) {
  const context = () => {
    const [module] = useParam(moduleKey)
    const Module = module ? getContextualComponent(module) ?? View : View
    return (
      <View style={{ flex: 1 }}>
        <Component />
        <ModalNavigation isVisible={!!module}>
          <Module />
        </ModalNavigation>
      </View>
    )
  }

  return context
}

export default withContextualNav
