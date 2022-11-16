import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Image from 'app/components/common/Image'
import { Button } from 'app/components/form/Button'
import { PageWithBackHeader } from 'app/components/layout/Page'
import useAlert from 'app/hooks/useAlert'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import useLocalization from 'app/provider/localization'
import { ActivityIndicator, Text, View } from 'dripsy'
import uniq from 'lodash/uniq'
import { useMemo, useState } from 'react'
import { IResponse } from 'services/common/types'
import { useGetRecoMatchQuery } from 'services/contentApi'
import { useWcPredictMutation, useWcTicketCountQuery } from 'services/eventApi'
import PredictionHeader from './PredictionHeader'

const FifaTeams = {
  '152': 'Uruguay',
  '169': 'Tunisia',
  '171': 'Croatia',
  '172': 'Poland',
  '175': 'Denmark',
  '178': 'Netherlands',
  '182': 'Portugal',
  '184': 'England',
  '191': 'USA',
  '217': 'Japan',
  '235': 'Switzerland',
  '238': 'Germany',
  '250': 'Spain',
  '254': 'Belgium',
  '264': 'Canada',
  '269': 'Cameroon',
  '748': 'Morocco',
  '818': 'Iran',
  '928': 'France',
  '1064': 'Ghana',
  '1262': 'Senegal',
  '1922': 'Qatar',
  '2133': 'Saudi Arabia',
  '2793': 'Ecuador',
  '3397': 'Australia',
  '7078': 'Wales',
  '7804': 'Serbia',
  '9917': 'Korea Republic',
  '12055': 'Costa Rica',
  '18955': 'Brazil',
  '18956': 'Argentina',
  '18958': 'Mexico',
}

const WorldCupPrediction = () => {
  const [predict, { isLoading: isSubmitting }] = useWcPredictMutation()
  const { predictCount, isFetching } = useWcTicketCountQuery(undefined, {
    selectFromResult: (s) => ({ ...s, predictCount: s.data?.data?.count }),
  })
  const [selected, setSelected] = useState<string | null>()
  const { t } = useLocalization()
  const maxWidth = 600
  const colSize = Math.min(Math.floor(maxWidth / 4), 90)
  const { showAlert } = useAlert()

  const { matches } = useGetRecoMatchQuery(undefined, {
    selectFromResult: (s) => {
      const matches = s.data?.data?.rows

      return {
        ...s,
        matches,
      }
    },
  })

  const playingTeams = useMemo(() => {
    if (matches) {
      let teams = [] as string[]
      if (matches) {
        matches.forEach((m) => {
          teams.push(m.HomeKey.toString())
          teams.push(m.AwayKey.toString())
        })

        teams = uniq(teams)
      }

      console.log('teams', teams, teams.length)

      return teams
    }
  }, [matches])

  async function onPredict() {
    if (selected) {
      try {
        const { data, success, message } = await predict(selected)
          .unwrap()
          .catch((e: IResponse<void>) => {
            return e
          })

        if (success) {
          setSelected(null)
          showAlert(t('event.ticketSubmitted'))
        } else {
          showAlert(message)
        }
      } catch (e) {
        showAlert(t('status.systemError'))
      }
    }
  }

  return (
    <PageWithBackHeader
      background={`${MEDIA_DOMAIN}${CONTENT_URI}/event/wc/prediction-bg.jpg`}
      header={PredictionHeader}
      contentContainerStyle={{ alignItems: 'center' }}
      bounces={false}
    >
      <View
        sx={{
          bg: '$backgroundSecondary',
          width: '100%',
          borderBottomWidth: 1,
          height: 40,
          borderColor: '$borderBlue',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        {predictCount == null || isFetching ? (
          <ActivityIndicator color={'$lightCyan'} />
        ) : (
          <>
            <Image
              source={{
                uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/wc/predict-ticket.png`,
              }}
              sx={{ height: 20, width: 31 }}
              resizeMode="contain"
            />
            <Text sx={{ ml: '$2', color: '#A0D3F2', fontWeight: 'bold' }}>
              {t('event.youHave')}
              <Text
                sx={{ color: '#fdf609', fontWeight: 'bold' }}
              >{` ${predictCount} `}</Text>
              {t('event.ticket')}
            </Text>
          </>
        )}
      </View>
      <View
        sx={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth,
        }}
      >
        {Object.keys(FifaTeams).map((k) => {
          const active = selected === k
          const available =
            predictCount && playingTeams && playingTeams.includes(k)
          return (
            <TouchableOpacity
              onPress={() => setSelected(k)}
              disabled={!available}
              key={k}
              sx={{
                // borderWidth: 1,
                width: colSize,
                alignItems: 'center',
                justifyContent: 'center',
                mt: '$4',
                opacity: available ? 1 : 0.5,
              }}
            >
              <View
                sx={{ alignItems: 'center', justifyContent: 'space-between' }}
              >
                <View
                  sx={{
                    borderRadius: 200,
                    overflow: 'hidden',
                    borderWidth: 4,
                    borderColor: active ? '$borderBlue' : 'transparent',
                    width: colSize * 0.6,
                    aspectRatio: 1,
                    mb: '$1',
                  }}
                >
                  <View
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 200,
                      borderWidth: 1,
                      borderColor: available ? 'white' : 'transparent',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      source={{
                        uri: `${MEDIA_DOMAIN}${CONTENT_URI}/fifa/${k.replace(
                          /\s+/g,
                          ''
                        )}.png`,
                      }}
                      sx={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </View>
                </View>
                <Text sx={{ fontSize: 12, textAlign: 'center' }}>
                  {FifaTeams[k]}
                </Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
      <Button
        rounded
        fill={{
          type: 'gradient',
          color: ['#33A0D0', '#0B76A5'],
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 },
        }}
        loading={isSubmitting}
        disabled={!selected || !predictCount}
        sx={{ my: '$10' }}
        onPress={onPredict}
      >
        <Button.Label>{t('common.submit')}</Button.Label>
      </Button>
    </PageWithBackHeader>
  )
}

export default WorldCupPrediction
