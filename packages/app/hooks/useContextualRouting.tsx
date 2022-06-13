const useContextualRouting: () => {
  returnHref: string
  makeContextualHref: (extraQueryParams: { [key: string]: any }) => string
} = function () {
  return {
    makeContextualHref: () => '',
    returnHref: '',
  }
}

export default useContextualRouting
