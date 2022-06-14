import {
  ContextualComponents,
  ContextualModuleKey,
} from 'app/navigation/web/withContextualNavConstant'

const useContextualRouting: (module: ContextualModuleKey) => {
  returnHref: string
  makeContextualHref: (to: ContextualComponents) => string
} = function () {
  return {
    makeContextualHref: (to) => '',
    returnHref: '',
  }
}

export default useContextualRouting
