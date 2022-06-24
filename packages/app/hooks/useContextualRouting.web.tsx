import {
  ContextualComponents,
  ContextualModuleKey,
} from 'app/navigation/web/withContextualNavConstant'
import { useContextualRouting as ucr } from 'next-use-contextual-routing'

function useContextualRouting(module: ContextualModuleKey) {
  const { makeContextualHref, ...rest } = ucr()
  function _makeContextualHref(to: ContextualComponents, params?: any) {
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
