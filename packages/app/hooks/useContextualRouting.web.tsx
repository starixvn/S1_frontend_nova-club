import {
  ContextualComponentType,
  ContextualNavigationContext,
} from 'app/navigation/web/ContextualNavigation'
import { useContextualRouting as ucr } from 'next-use-contextual-routing'
import { useContext, useEffect, useState } from 'react'
import { createParam } from 'solito'

/**
 * This hook utilizes web routing path to modify stacks in ContextualNavigationContext
 */

const { useParam } = createParam()

function useContextualRouting() {
  const [module] = useState((Math.random() * 999999).toString())
  const { makeContextualHref, ...rest } = ucr()

  function _makeContextualHref(to: ContextualComponentType, params?: any) {
    return makeContextualHref({
      [module]: to,
      ...(params ?? {}),
    })
  }

  const [moduleToOpen] = useParam(module)
  const { add, remove, stacks } = useContext(ContextualNavigationContext)

  useEffect(() => {
    if (moduleToOpen) {
      add(module, moduleToOpen)
    } else {
      const toRemoveIndex = stacks.findIndex((s) => s.id === module)
      if (toRemoveIndex > -1) {
        remove(toRemoveIndex)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleToOpen])

  return {
    makeContextualHref: _makeContextualHref,
    ...rest,
  }
}
export default useContextualRouting
