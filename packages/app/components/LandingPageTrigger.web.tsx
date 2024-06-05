import useIsDesktop from 'app/hooks/useIsDesktop'
import usePathname from 'app/hooks/usePathname'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'

const { useParam } = createParam<{ c: string }>()

export default function LandingPageTrigger({}) {
  const isDesktop = useIsDesktop()

  const [code] = useParam('c')
  const pathname = usePathname()

  const { openModal } = useModal()
  const { push } = useRouter()
  const token = useAppSelector((s) => s.auth.info?.token)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (token) {
      return
    }

    if (code) {
      const filteredCode = code.replace(/[^0-9a-zA-Z]/g, '')
      dispatch(SettingActions.setLandingPagePromoCode(filteredCode))

      if (isDesktop)
        setTimeout(() => {
          !pathname.includes('/auth/login') && openModal('RegisterModal')
        }, 2000)
      else push('/auth/register')
      // }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, token])

  return null
}
