import useIsDesktop from 'app/hooks/useIsDesktop'
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

  const { openModal } = useModal()
  const { push } = useRouter()
  const referral = useAppSelector((s) => s.setting.referral)
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log('ref', ref)
    if (ref) {
      if (!referral || ref !== referral.trackingCode) {
        dispatch(
          SettingActions.setReferral({
            trackingCode: ref,
          })
        )

        if (isDesktop) openModal('RegisterModal')
        else push('/auth/register')
      }
    }
  }, [ref])

  return null
}
