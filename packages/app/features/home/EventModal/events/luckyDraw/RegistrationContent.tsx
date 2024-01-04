import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import { useAppDispatch } from 'app/provider/redux/store'
import { ActivityIndicator, Pressable, Text, View } from 'dripsy'
import React, { ComponentProps, memo, useEffect, useState } from 'react'
import { IResponse } from 'services/common/types'
import { playerApi } from 'services/playerApi'
import { LuckySpinArgs } from 'services/playerApi.type'
import { SolitoImage } from 'solito/image'
import { useRouter } from 'solito/router'
import Board from './Board'
import { REGISTRATION_TILES, mapRollCodeToBoardIndex } from './boardUtility'
import { sleep } from 'utils/common'
import { toCurrency } from 'app/utils'
import { Currency } from 'utils/constant'
import { ActionsProps } from 'app/components/modal/ModalContent'
import { useModal } from 'react-native-modalfy'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'

type Props = {}

/* zIndex 
  Board: 1
  Tiles 1-7 : 10, 9, 8, 7, 6, 5, 4
  Dice Set : 7 + 2
  Tiles 8-11: 5, 6, 7, 8, 9
  Char: +2 on top of tile as he moves
*/

const RegistrationContent = memo(({}: Props) => {
  const dispatch = useAppDispatch()
  const { push } = useRouter()
  const { showAlert } = useAlert()
  const [isRequesting, setRequesting] = useState(false)
  const [result, setResult] = useState<LuckySpinArgs>()
  const { t } = useLocalization()
  const { closeModal } = useModal()

  function onAnimated() {
    if (result) {
      const isWin = result?.code > 0

      showAlert({
        message: isWin ? result.note : t('event.lose2'),
        title: t(isWin ? 'event.won' : 'event.lose'),
        actions: [
          {
            label: t('common.playNow'),
            onPress: () => closeModal(undefined, () => push('/slots')),
          },
          {
            label: t('common.close'),
            bg: '$disabled',
          },
        ],
      })
    }
  }

  async function onRoll() {
    try {
      setRequesting(true)

      // await sleep(500)
      // setResult({
      //   code: 2,
      //   note: '',
      // })

      // return

      const { data, success, message } = await dispatch(
        playerApi.endpoints.luckySpin.initiate()
      )
        .unwrap()
        .catch((e: IResponse<LuckySpinArgs>) => {
          setRequesting(false)
          showAlert(e)
          return e
        })

      if (success && data) {
        setResult(data)
      }
    } catch (e) {
      console.log('Registration Content Roll error ', e)
    } finally {
      setRequesting(false)
    }
  }

  return (
    <View
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        sx={{
          mb: '8%',
          fontSize: [25, 30, 35, 40],
          lineHeight: [28, 34, 39, 44],
          color: '$secondary.100',
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        {t('event.register.rollNWin')}
      </Text>
      <Board
        tiles={REGISTRATION_TILES}
        resultIndex={result && mapRollCodeToBoardIndex(result?.code)}
        onAnimated={onAnimated}
      />
      <RollButton
        sx={{
          opacity: result ? 0 : 1,
        }}
        onPress={onRoll}
        isLoading={isRequesting}
        disabled={!!result || isRequesting}
      />
    </View>
  )
})

export default RegistrationContent

function RollButton({
  sx,
  isLoading,
  children,
  ...rest
}: ComponentProps<typeof Pressable> & {
  isLoading?: boolean
}) {
  const { t } = useLocalization()
  return (
    <Pressable
      sx={{
        mt: '2%',
        px: '$2',
        alignItems: 'center',
        justifyContent: 'center',
        width: '60%',
        aspectRatio: 550 / 112,
        pb: '1%',
        ...sx,
      }}
      {...rest}
    >
      <SolitoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/register/roll-btn.png`}
        alt="roll button"
        fill
      />
      {isLoading ? (
        <ActivityIndicator color="$secondary.100" size={'small'} />
      ) : (
        <Text
          numberOfLines={1}
          sx={{
            textAlign: 'center',
            fontSize: [14, 16, 24],
            lineHeight: [18, 20, 28],
            zIndex: 1,
            fontWeight: 'bold',
          }}
        >
          {t('event.start')}
        </Text>
      )}
    </Pressable>
  )
}
