import Step1 from 'app/assets/images/referral/step1.png'
import Step2 from 'app/assets/images/referral/step2.png'
import Step3 from 'app/assets/images/referral/step3.png'
import useLocalization from 'app/provider/localization'
import { Text, View, useResponsiveValue } from 'dripsy'
import { useWindowDimensions } from 'react-native'
import { SolitoImage } from 'solito/image'

const ReferralStep = () => {
  const { t } = useLocalization()
  const horizontalMode = useResponsiveValue([false, false, false, true, true])

  const STEPS = [
    {
      title: t('referral.steps.step1'),
      body: t('referral.steps.n1'),
      image: Step1,
    },
    {
      title: t('referral.steps.step2'),
      body: t('referral.steps.n2'),
      image: Step2,
    },
    {
      title: t('referral.steps.step3'),
      body: t('referral.steps.n3'),
      image: Step3,
    },
  ]

  const { height, width } = useWindowDimensions()
  const xRatio = 480
  const yRatio = 320
  const scale = horizontalMode
    ? Math.min(width / 5 / xRatio, height / 5 / yRatio)
    : Math.min(width / 2.5 / xRatio, height / 2.5 / yRatio)
  const enlargedWidth = Math.floor(scale * xRatio)
  const enlargedHeight = Math.floor(scale * yRatio)

  return (
    <View>
      <Text
        sx={{
          textTransform: 'uppercase',
          fontWeight: 'bold',
          padding: 10,
          alignSelf: 'center',
        }}
      >
        {t('referral.howTo')}
      </Text>
      <View
        sx={{
          flexDirection: horizontalMode ? 'row' : 'column',
          justifyContent: 'center',
        }}
      >
        {STEPS.map((e, i) => {
          return (
            <>
              {horizontalMode ? (
                <View
                  key={i}
                  sx={{
                    flexDirection: 'row',
                  }}
                >
                  <View
                    sx={{
                      borderWidth: 1,
                      borderColor: '$primary.100',
                      borderRadius: 10,
                      justifyContent: 'space-between',
                    }}
                  >
                    <View
                      sx={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 10,
                      }}
                    >
                      <Text sx={{ paddingVertical: 10 }}>{e.title}</Text>
                      <Text
                        sx={{
                          width: enlargedWidth,
                          textAlign: 'center',
                          paddingHorizontal: 10,
                        }}
                      >
                        {e.body}
                      </Text>
                    </View>
                    <View>
                      <SolitoImage
                        src={e.image}
                        width={enlargedWidth}
                        height={enlargedHeight}
                        resizeMode="contain"
                        alt={e.title}
                        style={{
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                        }}
                        //   sx={{ position: 'absolute', left: '-10%' }}
                      />
                    </View>
                  </View>
                  {i < 2 && (
                    <View
                      sx={{
                        padding: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text sx={{ fontWeight: 'bold' }}>{'>'}</Text>
                    </View>
                  )}
                </View>
              ) : (
                <View key={i}>
                  <View
                    sx={{
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderColor: '$primary.100',
                      borderRadius: 10,
                    }}
                  >
                    <SolitoImage
                      src={e.image}
                      width={enlargedWidth}
                      height={enlargedHeight}
                      resizeMode="contain"
                      alt={e.title}
                      style={{
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                      }}
                      //   sx={{ position: 'absolute', left: '-10%' }}
                    />
                    <View
                      sx={{
                        padding: 10,
                        justifyContent: 'center',
                        flex: 1,
                      }}
                    >
                      <Text sx={{ mb: 5, fontWeight: 'bold' }}>{e.title}</Text>
                      <Text>{e.body}</Text>
                    </View>
                  </View>
                  {i < 2 && (
                    <View
                      sx={{
                        padding: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text sx={{ fontWeight: 'bold' }}>{'v'}</Text>
                    </View>
                  )}
                </View>
              )}
            </>
          )
        })}
      </View>
    </View>
  )
}

export default ReferralStep
