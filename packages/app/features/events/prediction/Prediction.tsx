import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { Image, ScrollView, Text, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React, { useState } from 'react'
import { useModal } from 'react-native-modalfy'
import * as Yup from 'yup'
import BackgroundImage from './components/BackgroundImage'
import BottomTicketCounter from './components/BottomTicketCounter'
import LogoHeader from './components/LogoHeader'
import TeamFlag from './components/TeamFlag'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import useSoundController from './hooks/useSoundController'
import {
  useCLTicketCountQuery,
  useSubmitCLTicketMutation,
} from 'services/eventApi'
import { getErrorMessage } from 'app/utils/validation'
import useAlert from 'app/hooks/useAlert'
import { useFonts } from 'expo-font'
import BeVietnamProBold from 'app/assets/fonts/BeVietnamPro-Bold.ttf'
import CustomText from './components/CustomText'
import { useAppSelector } from 'app/provider/redux/store'

interface PredictionForm {
  homeTeam?: number
  awayTeam?: number
}

const TEAM = {
  homeTeam: {
    name: 'Man City',
    flagImageSource: require('app/assets/images/events/prediction/MC.png'),
  },
  awayTeam: {
    name: 'Inter',
    flagImageSource: require('app/assets/images/events/prediction/Inter.png'),
  },
}

const Prediction = () => {
  const [fontLoaded] = useFonts({
    BeVietnamProBold,
  })

  const { width, height } = useContainerDimension()
  const [logoHeight, setLogoHeight] = useState(0)
  const [selectedTeam, setSelectedTeam] = useState<keyof typeof TEAM>()
  const { t } = useLocalization()
  const { top: safeAreaTop, bottom: safeAreaBottom } = useSafeArea()
  const { openModal } = useModal()
  const { token } = useAppSelector((state) => state.auth.info) || {}

  const [submitCLTicket, { isLoading }] = useSubmitCLTicketMutation()
  const { data, refetch } = useCLTicketCountQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: !token,
  })
  const { showAlert } = useAlert()

  useSoundController()

  const isOverBreakpoint = width > 500
  const ticketBalance = data?.data?.count ?? 0

  const LOGO_SCALING = isOverBreakpoint ? 1.5 : 1.8

  const logoImageSource = isOverBreakpoint
    ? require('app/assets/images/events/prediction/UEFA_logo_black.png')
    : require('app/assets/images/events/prediction/UEFA_logo.png')

  const onSubmit = async (
    values: PredictionForm,
    formikHelpers: FormikHelpers<PredictionForm>
  ) => {
    try {
      if (!selectedTeam) {
        return
      }

      const selectedTeamInfo = TEAM[selectedTeam]
      const { homeTeam: homeTeamScore, awayTeam: awayTeamScore } = values

      const result = await submitCLTicket(
        `${selectedTeamInfo.name} ${homeTeamScore}-${awayTeamScore}`
      ).unwrap()

      if (result.success) {
        formikHelpers.resetForm()
        setSelectedTeam(undefined)
        refetch()

        const scoringArrangement = [
          { teamName: TEAM.homeTeam.name, score: homeTeamScore },
          { teamName: TEAM.awayTeam.name, score: awayTeamScore },
        ]
        openModal('PredictionWhiteBgModal', {
          imageSource: selectedTeamInfo.flagImageSource,
          scoringArrangement,
        })
      } else {
        throw result.message
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      showAlert(errorMessage)
    }
  }

  const formik = useFormik<PredictionForm>({
    initialValues: {
      homeTeam: undefined,
      awayTeam: undefined,
    },
    validationSchema: Yup.object({
      homeTeam: Yup.number().required('validation.required'),
      awayTeam: Yup.number().required('validation.required'),
    }),
    onSubmit,
  })

  const { values, setFieldValue, isValid, handleSubmit, dirty, resetForm } =
    formik

  if (!fontLoaded) {
    return null
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      sx={{
        backgroundColor: '#060608',
      }}
    >
      <View>
        <BackgroundImage />

        <View
          sx={{
            minHeight: height,
          }}
        >
          <LogoHeader
            sx={{
              flex: 1,
              mt: safeAreaTop + 8,
            }}
          />

          <View
            sx={{
              justifyContent: 'center',
              pt: Math.floor(logoHeight * ((LOGO_SCALING % 1) / 2 + 1.1)),
              pb: Math.floor(logoHeight * ((LOGO_SCALING % 1) / 2 + 1.25)),
            }}
          >
            <View
              sx={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <TeamFlag
                sx={{
                  flex: 4,
                  alignItems: 'center',
                }}
                source={TEAM.homeTeam.flagImageSource}
                teamName={TEAM.homeTeam.name}
                value={values.homeTeam}
                onDropDownSelect={(e) => {
                  setFieldValue('homeTeam', e.value)
                }}
                onFlagSelect={() => {
                  setSelectedTeam('homeTeam')
                }}
                isSelected={selectedTeam === 'homeTeam'}
                isShowDropDownButton={typeof selectedTeam !== 'undefined'}
                disabled={ticketBalance === 0}
              />

              <View
                sx={{
                  flex: 3,
                  // backgroundColor: 'red',
                  alignSelf: 'flex-start',
                  alignItems: 'center',
                  mt: '5%',
                }}
              >
                <View
                  sx={{
                    position: 'absolute',
                    top: -(logoHeight * ((LOGO_SCALING % 1) / 2 + 1.1)),
                    bottom: 0,
                    left: 0,
                    right: 0,
                    alignItems: 'center',
                  }}
                >
                  <Image
                    source={logoImageSource}
                    resizeMode="contain"
                    style={{
                      width: Math.min(100, width * 0.2),
                      height: Math.min(100, width * 0.23),
                      transform: [{ scale: LOGO_SCALING }],
                    }}
                    onLayout={(e) => {
                      setLogoHeight(e.nativeEvent.layout.height)
                    }}
                  />
                </View>

                {ticketBalance && ticketBalance > 0 ? (
                  <CustomText
                    sx={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: [14, '$2'],
                      maxWidth: 200,
                      color: isOverBreakpoint ? '$black' : '$white',
                    }}
                  >
                    {t('event.prediction.selectTeam')}
                  </CustomText>
                ) : null}
              </View>

              <TeamFlag
                sx={{
                  flex: 4,
                  alignItems: 'center',
                }}
                source={TEAM.awayTeam.flagImageSource}
                teamName={TEAM.awayTeam.name}
                value={values.awayTeam}
                onDropDownSelect={(e) => {
                  setFieldValue('awayTeam', e.value)
                }}
                onFlagSelect={() => {
                  setSelectedTeam('awayTeam')
                }}
                isSelected={selectedTeam === 'awayTeam'}
                isShowDropDownButton={typeof selectedTeam !== 'undefined'}
                disabled={ticketBalance === 0}
              />
            </View>
          </View>

          <BottomTicketCounter
            sx={{
              flex: 1,
              pb: safeAreaBottom + 8,
            }}
            onSubmit={handleSubmit}
            disabled={!isValid || !dirty || isLoading}
            isLoading={isLoading}
            ticketBalance={ticketBalance}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default Prediction
