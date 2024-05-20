import useLocalization from 'app/provider/localization'
import { Pressable, Text } from 'dripsy'
import { useEffect, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { ModalComponentProp, useModal } from 'react-native-modalfy'
import CheckBox from '../common/CheckBox'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { ModalStackParams } from 'app/provider/modal'
import dayjs from 'dayjs'

type InformDailyCheckinModalProps = ModalComponentProp<
  ModalStackParams,
  void,
  'InformDailyCheckinModal'
>

export function generateStopShowingCacheKey(username: string) {
  return `${username}|${dayjs().startOf('date').toISOString()}`
}

export default function InformDailyCheckinModal({
  modal: { getParam },
}: InformDailyCheckinModalProps) {
  const { closeModal } = useModal()
  const amountDisplay = getParam('amountDisplay')
  const { t } = useLocalization()
  const width = useWindowDimensions().width
  const dispatch = useAppDispatch()
  const username = useAppSelector((s) => s.auth.info?.playerName)

  const [isDontShow, setDontShow] = useState(false)

  useEffect(() => {
    if (isDontShow) {
      return () => {
        dispatch(
          SettingActions.setStopShowingDailyCheckin(
            generateStopShowingCacheKey(username ?? '')
          )
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDontShow])

  return (
    <ModalWrapper sx={{ width: Math.min(500, width * 0.9) }}>
      <ModalContent title={t('rewards.checkInAutomated')} close={closeModal}>
        <Text sx={{ textAlign: 'center' }}>
          {t(`rewards.checkInPromptDeposit`, {
            amount: amountDisplay,
          })}
        </Text>

        <Pressable
          onPress={() => setDontShow(!isDontShow)}
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: '$2',
            alignSelf: 'center',
            mt: '$3',
          }}
        >
          <CheckBox
            disabled
            isCheck={isDontShow}
            tickColor={'$secondary.300'}
            sx={{ bg: '$primary.700' }}
          />
          <Text>{t(`common.dontShowAgain`)}</Text>
        </Pressable>
      </ModalContent>
    </ModalWrapper>
  )
}
