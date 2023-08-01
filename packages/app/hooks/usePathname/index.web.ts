import { useRouter } from 'next/router'

const usePathname = () => {
  const router = useRouter()

  return router.asPath
}

export default usePathname
