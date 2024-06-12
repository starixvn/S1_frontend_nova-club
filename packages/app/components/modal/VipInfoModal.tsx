import useLocalization from 'app/provider/localization'
import { Pressable, Text } from 'dripsy'
import { useEffect, useRef, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { ModalComponentProp, useModal } from 'react-native-modalfy'
import CheckBox from '../common/CheckBox'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { ModalStackParams } from 'app/provider/modal'
import dayjs from 'dayjs'

type VipInfoModalProps = ModalComponentProp<
  ModalStackParams,
  void,
  'VipInfoModal'
>

export function generateStopShowingCacheKey(username: string) {
  return `${username}|${dayjs().startOf('date').toISOString()}`
}

export default function VipInfoModal({}: VipInfoModalProps) {
  const { closeModal } = useModal()
  const { t } = useLocalization()
  const width = useWindowDimensions().width
  const dispatch = useAppDispatch()
  const username = useAppSelector((s) => s.auth.info?.playerName)
  const [isDontShow, setDontShow] = useState(false)
  const isDontShowRef = useRef(false)

  useEffect(() => {
    return () => {
      // do not use state
      dispatch(
        SettingActions.setStopShowingVip(
          generateStopShowingCacheKey(username ?? '')
        )
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ModalWrapper sx={{ width: Math.min(500, width * 0.9) }}>
      <ModalContent title={t('vip.title')} close={closeModal}>
        <Text sx={{ textAlign: 'center' }}>{t(`vip.note`)}</Text>
      </ModalContent>
    </ModalWrapper>
  )
}
