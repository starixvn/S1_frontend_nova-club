import { CMS_CONTENT_URI, CONTENT_URI, MEDIA_DOMAIN } from '@env'
import BouncePressable from 'app/components/pressable/BouncePressable'
import SelectList from 'app/components/select/SelectList'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { Pressable, Row, Text, View } from 'dripsy'
import sortBy from 'lodash/sortBy'
import React, { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { useSubmitEuroCupTicketMutation } from 'services/euroApi'
import { EventTeam } from 'services/euroApi.type'
import { SolitoImage } from 'solito/image'
import { TitleText } from './EuroText'
import SelectWithDropdown from 'app/components/select/SelectWithDropdown'

type PredictionStageProps = {
  contentWidth: number
  eventCode?: string
  winningTicket?: number
  eligibleTicket?: number
  teams?: EventTeam[]
}

type TeamFlagProps = {
  active: boolean
  image: string
  label: string
  onPress: () => void
}

const PredictionStage = ({
  contentWidth,
  eventCode = '',
  winningTicket = 0,
  eligibleTicket = 0,
  teams = [],
}: PredictionStageProps) => {
  const { t } = useLocalization()
  const { openModal } = useModal()
  const isDesktop = useIsDesktop()
  const [selected, setSelected] = useState<number[]>([])
  const [imageUrl, setImageUrl] = useState('')
  const [roundTitle, setroundTitle] = useState('')
  const [score, setScore] = useState<string[]>(['0', '0'])

  const ScoreOptions = Array.from({ length: 10 }, (_, index) => {
    return { label: index.toString(), value: index.toString() }
  })

  const eligibleScore = winningTicket > 14
  const disabled = selected.length !== eligibleTicket || selected.length === 0

  const [submitTicket] = useSubmitEuroCupTicketMutation()

  const handleSelected = (index) => {
    if (selected.includes(index)) {
      setSelected(selected.filter((el) => el !== index))
    } else if (selected.length >= eligibleTicket) {
      return
    } else {
      setSelected([...selected, index])
    }
  }

  const handlePress = async () => {
    const selectedTeam = sortBy(
      selected.map((el) => teams[el]?.team_name ?? '')
    )

    const teamScore = {
      [teams[0].team_name]: Number(score[0]),
      [teams[1].team_name]: Number(score[1]),
    }

    const isSubmitted = await submitTicket({
      event_code: eventCode,
      teams: selectedTeam,
      scores: eligibleScore ? teamScore : undefined,
    })
      .unwrap()
      .catch((error) => {
        openModal('EuroModal', { message: error.message })
        return null
      })

    if (isSubmitted)
      openModal('EuroModal', { message: t('event.euro.submitted') })
  }

  const getFrameBackground = () => {
    const teamSize = teams.length
    const platform = isDesktop ? 'frame-desktop' : 'frame-mobile'
    let src
    let title

    switch (teamSize) {
      case 24:
        src = `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/${platform}-1.png`
        title = t('event.euro.prediction.selectTeam', {
          round: t('event.euro.rules.round2'),
        })
        break
      case 16:
        src = `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/${platform}-2.png`
        title = t('event.euro.prediction.selectTeam', {
          round: t('event.euro.rules.round3'),
        })
        break
      case 8:
        src = `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/${platform}-3.png`
        title = t('event.euro.prediction.selectTeam', {
          round: t('event.euro.rules.round4'),
        })
        break
      case 4:
        src = `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/${platform}-3.png`
        title = t('event.euro.prediction.selectTeam', {
          round: t('event.euro.rules.round5'),
        })
        break
      case 2:
        src = `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/${platform}-3.png`
        title = t('event.euro.prediction.champion')
        break

      default:
        src = `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/${platform}-1.png`
        title = t('event.euro.prediction.selectTeam', {
          round: t('event.euro.rules.round2'),
        })
        break
    }

    setImageUrl(src)
    setroundTitle(title)
  }

  useEffect(() => {
    getFrameBackground()
  }, [teams, t])

  return (
    <View sx={{ flex: 1, width: contentWidth, mt: -36 }}>
      <ImageBackground
        source={{
          uri: imageUrl,
        }}
        resizeMode="stretch"
        alt=""
      >
        <View sx={{ m: '$4', mt: 48, alignItems: 'center' }}>
          <TitleText>{roundTitle.toUpperCase()}</TitleText>
          <Row
            sx={{
              flexWrap: 'wrap',
              mt: '$3',
              rowGap: '$3',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: isDesktop && teams.length === 2 ? '75%' : '100%',
            }}
          >
            {teams.length === 2 && (
              <View
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  alignItems: 'center',
                }}
              >
                <SolitoImage
                  src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/vs.png`}
                  width={80}
                  height={80}
                  alt=""
                />
              </View>
            )}
            {teams?.map((item, index) => {
              const active = selected.includes(index)

              return (
                <View
                  key={index}
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: isDesktop
                      ? '12.5%'
                      : teams.length === 4
                      ? '50%'
                      : '25%',
                    flexDirection: isDesktop
                      ? teams.length === 2 && index === 0
                        ? 'row'
                        : 'row-reverse'
                      : 'column',
                  }}
                >
                  <TeamFlag
                    active={active}
                    image={`${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.team_image}`}
                    label={item.team_name}
                    onPress={() => handleSelected(index)}
                  />

                  {eligibleScore && (
                    <SelectWithDropdown
                      label={t('event.prediction.score')}
                      value={score[index]}
                      enabledLabel={false}
                      placeholder={t('event.prediction.score')}
                      sx={{ width: 100, mx: 12 }}
                      options={ScoreOptions}
                      onSelected={(value) => {
                        const newArray = [...score] // Create a copy of the array
                        newArray[index] = value // Update the value at index 6
                        setScore(newArray)
                      }}
                      dropdownMenuContentStyle={{
                        sx: { minWidth: 100 },
                      }}
                      containerStyle={{ bg: '#153CDB' }}
                    />
                  )}
                </View>
              )
            })}
          </Row>
        </View>
        <BouncePressable
          onPress={handlePress}
          sx={{
            mx: 'auto',
            mb: -20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          disabled={disabled}
        >
          <>
            <SolitoImage
              src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/btn-submit-${
                disabled ? 'off' : 'on'
              }.png`}
              width={100}
              height={42}
              alt=""
            />
            <Text
              sx={{ position: 'absolute', fontSize: 20, fontWeight: 'bold' }}
            >
              {t('common.submit')}
            </Text>
          </>
        </BouncePressable>
      </ImageBackground>
    </View>
  )
}

const TeamFlag = ({ active, image, label, onPress }: TeamFlagProps) => (
  <View sx={{ mb: '$3', alignItems: 'center' }}>
    <Pressable onPress={onPress}>
      <View
        sx={{
          borderWidth: 4,
          borderColor: active ? '#00FF62' : 'transparent',
          borderRadius: 50,
        }}
      >
        <SolitoImage
          src={image}
          width={48}
          height={48}
          alt=""
          style={{
            borderWidth: 4,
            borderColor: active ? '#00FF62' : 'transparent',
            borderRadius: 50,
          }}
        />
      </View>
    </Pressable>
    <Text sx={{ fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>
      {label.toUpperCase()}
    </Text>
  </View>
)

export default PredictionStage
