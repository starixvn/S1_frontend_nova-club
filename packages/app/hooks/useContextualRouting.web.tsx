import { ContextualComponentType } from 'app/navigation/contextual/ContextualComponents'
import { useContextualRouting as ucr } from 'next-use-contextual-routing'
import { useState } from 'react'
import { createParam } from 'solito'

/**
 * This hook utilizes web routing path to modify stacks in ContextualNavigationContext
 */
function useContextualRouting() {
  const [module] = useState((Math.random() * 999999).toString())
  const { makeContextualHref, ...rest } = ucr()

  function _makeContextualHref(to: ContextualComponentType, params?: any) {
    return makeContextualHref({
      [module]: to,
      ...(params ?? {}),
    })
  }

  return {
    makeContextualHref: _makeContextualHref,
    ...rest,
  }
}
export default useContextualRouting
