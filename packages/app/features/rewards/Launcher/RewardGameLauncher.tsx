import IconButton from 'app/components/IconButton'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useAlert from 'app/hooks/useAlert'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import React, { useEffect } from 'react'
import { Platform } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { rewardApi } from 'services/rewardApi'
import { walletApi } from 'services/walletApi'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'
import { LANGUAGE_CODE } from 'utils/constant'
import {
  RewardGameKeyMap,
  getRewardLauncherURL,
  getRewardTitleImage,
} from 'utils/rewards'
import { getTncComponent } from '../tnc/utils/getTncComponent'
import RewardContent from './content/RewardContent'

const DOMAIN_URL = getRewardLauncherURL()

const { useParam } = createParam<{ key: string }>()
const RewardGameLauncher = () => {
  const isDesktop = useIsDesktop()
  const [gamekey] = useParam('key', { initial: '' })
  const { openModal } = useModal()
  const dispatch = useAppDispatch()
  const { replace, back } = useRouter()
  const { showAlert } = useAlert()
  const lang = useAppSelector((s) => s.setting.locale) ?? LANGUAGE_CODE.VIETNAM

  const handleTncComponent = () => {
    const component = getTncComponent(gamekey)

    openModal('RewardTncModal', {
      content: component,
    })

    return
  }

  const onTokenExpired = () => {
    const handlePlatformExpired = Platform.select({
      web: () => {
        replace('/')
      },
      default: () => {
        back()
      },
    })

    console.log(
      '🚀 ~ file: RewardGameLauncher.tsx:56 ~ onTokenExpired ~ gamekey:',
      gamekey
    )
    if (gamekey === RewardGameKeyMap.MYSTERY_DROP) {
      handlePlatformExpired()
    } else {
      showAlert({
        message: 'Session expired.',
        onClose: () => {
          handlePlatformExpired()
        },
      })
    }
  }

  useEffect(() => {
    return () => {
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
    }
  })

  return (
    <PageWithBackHeader
      header={{
        image: getRewardTitleImage(gamekey, lang) || '',
        actions: (
          <IconButton name="tnc" size={20} onPress={handleTncComponent} />
        ),
      }}
      disableScrollView
      hideHeader={isDesktop}
    >
      <RewardContent
        isShowEmbeddedContent={true}
        domainUrl={DOMAIN_URL}
        gameKey={gamekey}
        onTokenExpired={onTokenExpired}
      />
    </PageWithBackHeader>
  )
}

export default RewardGameLauncher
