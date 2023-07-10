// https://github.com/GeekyAnts/NativeBase/blob/049822b3878b2f829a397c446a405dabfd2fee69/src/utils/mergeRefs.ts#L1

// Read more: https://mayursinhsarvaiya.medium.com/how-to-merge-refs-in-react-component-d5e4623b6924
export function mergeRefs<T = any>(
  refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        ;(ref as React.MutableRefObject<T | null>).current = value
      }
    })
  }
}

// Combine event handlers
export function composeEventHandlers<E>(
  originalEventHandler?: null | ((event: E) => void),
  ourEventHandler?: (event: E) => void
) {
  return function handleEvent(event: E) {
    originalEventHandler?.(event)
    ourEventHandler?.(event)
  }
}
