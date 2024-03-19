import useAlert from 'app/hooks/useAlert'
import { useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import dynamic from 'next/dynamic'
import { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Shield_Action } from 'services/authApi.type'
import { IResponse } from 'services/common/types'
import { useLazyEligibleSpinQuery } from 'services/playerApi'
import { EligibleSpinResult } from 'services/playerApi.type'
import { useHomeEvent } from '../../HomeEventProvider'
import { useRouter } from 'solito/router'

const LuckyDrawPriority = 30
const LuckyDrawSource = 'LuckyDraw|Retention'
const LuckyDrawTrigger = () => {
  const dispatch = useDispatch()
  const { showAlert } = useAlert()
  const { push } = useRouter()

  const [getEligileSpin] = useLazyEligibleSpinQuery()
  const { addResult, flagCompletedChecking } = useHomeEvent()

  const shieldStatus = useAppSelector((s) => s.tempSetting.syncShieldStatus)
  const syncShieldActionType = useAppSelector(
    (s) => s.tempSetting.syncShieldActionType
  )

  const isHomeEventModalTriggered = useAppSelector(
    (state) => state.tempSetting.isHomeEventModalTriggered
  )

  const CheckEligibleSpin = async () => {
    try {
      const { success, data } = await getEligileSpin({})
        .unwrap()
        .catch((e: IResponse<EligibleSpinResult>) => {
          // only show the finish claim error on register success
          if (
            syncShieldActionType === Shield_Action.REGISTER && // Dont show freespin error message if player is not from register flow
            e.code !== 28004 // 28004 code = no event is active, ignore the message
          ) {
            showAlert(e.message)
          }
          return e
        })

      if (success && data) {
        const event = data?.details?.find(
          (el) =>
            el.event_type === 'registration' || el.event_type === 'retention'
        )

        if (event) {
          const spinBalance = event?.wheel_info.totalBalance ?? 0
          if (spinBalance > 0) {
            if (event.event_type === 'registration') {
              if ('note' in data) {
                if (syncShieldActionType === Shield_Action.REGISTER) {
                  showAlert(data.note)
                }
              }

              handleRegistrationEvent(spinBalance)
            } else if (event.event_type === 'retention') {
              handleRetentionEvent(spinBalance, event.secret_key)
            }
          }
        }
      }
    } catch (e) {
      console.log('e', e)
    } finally {
      flagCompletedChecking(LuckyDrawSource)
    }
  }

  function handleRegistrationEvent(balance: number = 0) {
    addResult([
      {
        tnc: () => {
          push('/event/register/tnc')
        },
        content: () => <LazyRegistrationContent />,
        priority: LuckyDrawPriority,
      },
    ])
  }

  function handleRetentionEvent(balance: number = 0, code) {
    dispatch(SettingActions.setRetentionDrawBalance(balance))

    addResult([
      {
        tnc: () => {
          push('/event/retargeting/tnc')
        },
        content: () => <LazyRetentionContent code={code} />,
        priority: LuckyDrawPriority,
      },
    ])
  }

  useEffect(() => {
    // Do not trigger before shield is synced
    // luckyDrawTriggered help prevent on web navigation reenter on home page causing lucky spin to appear again.
    if (!shieldStatus || isHomeEventModalTriggered) {
      return
    }

    CheckEligibleSpin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shieldStatus])

  return null
}

export default memo(LuckyDrawTrigger)

const LazyRegistrationContent = dynamic(() => import('./RegistrationContent'))
const LazyRetentionContent = dynamic(() => import('../retargeting/Content'))
