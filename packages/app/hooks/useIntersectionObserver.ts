import { useEffect, useState, useRef } from 'react'

const useIntersectionObserver = (
  threshold = 0
): [boolean, React.RefObject<HTMLDivElement>] => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasRendered, setHasRendered] = useState(false)
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bodyElement = document.body
    bodyElement.style.minHeight = '118vh'
    return () => {
      bodyElement.style.minHeight = 'auto'
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry?.isIntersecting ?? false)
        if (entry?.isIntersecting && !hasRendered) {
          if (count > 1) setHasRendered(true)
          else setCount((prevCount) => ++prevCount)
        }
      },
      { threshold }
    )

    const element = ref.current
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, hasRendered, count])

  return [isIntersecting || hasRendered, ref]
}

export default useIntersectionObserver
