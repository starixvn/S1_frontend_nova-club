import RewardContent from 'app/features/rewards/Launcher/content/RewardContent'
import { getTncComponent } from 'app/features/rewards/tnc/utils/getTncComponent'
import { MODAL_ANIMATION_DELAY, ModalStackParams } from 'app/provider/modal'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { View } from 'dripsy'
import { useEffect, useReducer, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { ModalComponentProp, useModal } from 'react-native-modalfy'
import { rewardApi } from 'services/rewardApi'
import { walletApi } from 'services/walletApi'
import { LANGUAGE_CODE } from 'utils/constant'
import { getRewardLauncherURL, getRewardTitleImage } from 'utils/rewards'
import IconButton from '../IconButton'
import Image from '../common/Image'
import TransparentHeaderBackground from './components/TransparentHeaderBackground'
import { eventApi } from 'services/eventApi'

type RewardGameModalProps = ModalComponentProp<
  ModalStackParams,
  void,
  'RewardGameModal'
>

const RewardGameModal = ({
  modal: { closeAllModals, getParam },
}: RewardGameModalProps) => {
  const [isModalOpenFinish, toggleisModalOpenFinish] = useReducer(
    (state) => !state,
    false
  )
  const dispatch = useAppDispatch()
  const gameKey = getParam('key', '')

  const [domainUrl, setDomainUrl] = useState(getRewardLauncherURL())
  const { width, height } = useWindowDimensions()
  const { openModal } = useModal<ModalStackParams>()
  const lang = useAppSelector((s) => s.setting.locale) ?? LANGUAGE_CODE.VIETNAM

  const handleDismiss = async () => {
    /** `about:blank` is to stop iframe from loading the website.
     * Else, when closing the modal, performance will degraded causing
     * the modal closing animation to be janky.
     */
    setDomainUrl('about:blank')

    dispatch(
      walletApi.endpoints.playerBalance.initiate(undefined, {
        forceRefetch: true,
      })
    )

    dispatch(
      rewardApi.endpoints.getCoin.initiate(undefined, {
        forceRefetch: true,
      })
    )
    dispatch(
      eventApi.endpoints.getMysteryCheck.initiate(undefined, {
        forceRefetch: true,
      })
    )

    closeAllModals()
  }

  const handleTncComponent = () => {
    const tncComponent = getTncComponent(gameKey)

    openModal('RewardTncModal', {
      content: tncComponent,
    })
  }

  useEffect(() => {
    setTimeout(() => {
      toggleisModalOpenFinish()
    }, MODAL_ANIMATION_DELAY)
  }, [])

  return (
    <View
      sx={{
        width: Math.min(600, width * 0.9),
        height: Math.min(800, height * 0.9),
      }}
    >
      <TransparentHeaderBackground>
        <View
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <IconButton
            name="back"
            size={30}
            onPress={handleDismiss}
          ></IconButton>
          <Image
            source={{
              uri: getRewardTitleImage(gameKey, lang) || '',
            }}
            alt="daily_check_in_header"
            resizeMode="contain"
            sx={{ width: 300, height: 100, marginHorizontal: '$4' }}
          />
          <IconButton
            name="tnc"
            size={30}
            onPress={handleTncComponent}
          ></IconButton>
        </View>
      </TransparentHeaderBackground>

      <View sx={{ flex: 1, borderRadius: 10, overflow: 'hidden' }}>
        <RewardContent
          isShowEmbeddedContent={isModalOpenFinish}
          domainUrl={domainUrl}
          gameKey={gameKey}
          onTokenExpired={handleDismiss}
          onEndGame={handleDismiss}
        />
      </View>
    </View>
  )
}

export default RewardGameModal
