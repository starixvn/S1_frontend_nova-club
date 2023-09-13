import useIsDesktop from 'app/hooks/useIsDesktop'
import usePathname from 'app/hooks/usePathname'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'

const { useParam } = createParam<{ ref: string }>()

export default function ReferralTrigger({}) {
  const isDesktop = useIsDesktop()

  const [ref] = useParam('ref')
  const pathname = usePathname()

  const { openModal } = useModal()
  const { push } = useRouter()
  const referral = useAppSelector((s) => s.setting.referral)
  const token = useAppSelector((s) => s.auth.info?.token)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (token) {
      return
    }

    if (ref) {
      const filterRef = ref.replace(/[^0-9a-zA-Z]/g, '')

      if (!referral || filterRef !== referral.trackingCode) {
        dispatch(
          SettingActions.setReferral({
            trackingCode: ref,
          })
        )

        if (isDesktop)
          setTimeout(() => {
            !pathname.includes('/auth/login') && openModal('RegisterModal')
          }, 2000)
        else push('/auth/register')
      }
    }
  }, [ref, token])

  return null
}
