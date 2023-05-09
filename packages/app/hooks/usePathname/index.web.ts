import { useRouter } from 'next/router'

const usePathname = () => {
  const router = useRouter()

  return router.pathname
}

export default usePathname
