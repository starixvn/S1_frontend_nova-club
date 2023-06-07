import useLocalization from 'app/provider/localization'
import { ModalStackParams } from 'app/provider/modal'
import { Text, View } from 'dripsy'
import React, { useEffect } from 'react'
import { ModalComponentProp } from 'react-native-modalfy'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'
import { styled } from 'dripsy'
import Image from '../common/Image'
import useContainerDimension from 'app/hooks/useContainerDimension'

type PredictionWhiteBgModal = ModalComponentProp<
  ModalStackParams,
  void,
  'PredictionWhiteBgModal'
>

const StyledText = styled(Text)({
  color: '#DD0776',
  fontFamily: 'BeVietnamProBold',
})

const StyledScoreText = styled(StyledText)({
  fontSize: '$1',
  textAlign: 'center',
  fontFamily: 'BeVietnamProBold',
})

const PredictionWhiteBgModal = ({
  modal: { closeModal, getParam },
}: PredictionWhiteBgModal) => {
  const { t } = useLocalization()

  const imageSource = getParam('imageSource')
  const scoringArrangement = getParam('scoringArrangement')

  const { width } = useContainerDimension()
  const TEAM_IAMGE_SCALING = 0.2

  return (
    <ModalWrapper>
      <ModalContent
        sx={{
          backgroundColor: 'rgba(255,255,255,0.9)',
        }}
        closeIconProps={{
          color: '#000000',
        }}
        renderFooter={() => {
          return null
        }}
        closeModal={closeModal}
      >
        <View
          sx={{
            alignItems: 'center',
          }}
        >
          <StyledText
            sx={{
              fontSize: ['$5', '$6'],
            }}
          >
            {t('event.prediction.haveSelected')}
          </StyledText>

          <Image
            source={imageSource}
            style={{
              aspectRatio: 1,
              width: Math.min(120, width * TEAM_IAMGE_SCALING),
              height: Math.min(120, width * TEAM_IAMGE_SCALING),
              marginTop: '3%',
              marginBottom: '8%',
            }}
          />

          <StyledText
            sx={{
              fontSize: ['$5', '$6'],
            }}
          >
            {t('event.prediction.score')}
          </StyledText>

          <View sx={{ flexDirection: 'row', alignItems: 'center' }}>
            <View sx={{ alignItems: 'center' }}>
              <StyledScoreText
                sx={{
                  fontSize: '$9',
                }}
              >
                {scoringArrangement[0].score}
              </StyledScoreText>

              <StyledScoreText
                sx={{
                  position: 'absolute',
                  top: '$10',
                  minWidth: 100,
                }}
              >
                {scoringArrangement[0].teamName}
              </StyledScoreText>
            </View>

            <View
              sx={{
                backgroundColor: '#DD0776',
                height: 3,
                width: 10,
                mx: '$7',
              }}
            />

            <View sx={{ alignItems: 'center' }}>
              <StyledScoreText
                sx={{
                  fontSize: '$9',
                }}
              >
                {scoringArrangement[1].score}
              </StyledScoreText>

              <StyledScoreText
                sx={{
                  position: 'absolute',
                  top: '$10',
                  minWidth: 100,
                }}
              >
                {scoringArrangement[1].teamName}
              </StyledScoreText>
            </View>
          </View>
        </View>
      </ModalContent>
    </ModalWrapper>
  )
}

export default PredictionWhiteBgModal
