import useContextualRouting from './useContextualRouting'

export default function useCurrentPath() {
  const { returnHref } = useContextualRouting()

  return {
    path: returnHref,
    name: returnHref,
  }
}
