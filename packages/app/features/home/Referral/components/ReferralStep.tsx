import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useLocalization from 'app/provider/localization'
import { Text, View, useResponsiveValue } from 'dripsy'
import { useWindowDimensions } from 'react-native'
import { SolitoImage } from 'solito/image'

const imageRatio = 384 / 256

const ReferralStep = () => {
  const { t } = useLocalization()
  const horizontalMode = useResponsiveValue([false, false, false, true, true])

  const STEPS = [
    {
      title: t('referral.steps.step1'),
      body: t('referral.steps.n1'),
      image: `${MEDIA_DOMAIN}${CONTENT_URI}/v2/referral/step1.png`,
    },
    {
      title: t('referral.steps.step2'),
      body: t('referral.steps.n2'),
      image: `${MEDIA_DOMAIN}${CONTENT_URI}/v2/referral/step2.png`,
    },
    {
      title: t('referral.steps.step3'),
      body: t('referral.steps.n3'),
      image: `${MEDIA_DOMAIN}${CONTENT_URI}/v2/referral/step3.png`,
    },
  ]

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
                <>
                  <View
                    key={i}
                    sx={{
                      flex: 1,
                      flexDirection: 'row',
                    }}
                  >
                    <View
                      sx={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: '$primary.100',
                        borderRadius: 10,
                        overflow: 'hidden',
                        alignItems: 'center',
                      }}
                    >
                      <Text sx={{ paddingVertical: 10 }}>{e.title}</Text>
                      <Text
                        sx={{
                          textAlign: 'center',
                          paddingHorizontal: 10,
                          mb: 10,
                        }}
                      >
                        {e.body}
                      </Text>
                      <View
                        sx={{
                          mt: 'auto',
                          width: '100%',
                          paddingTop: `${(1 / imageRatio) * 100}%`,
                        }}
                      >
                        <SolitoImage
                          fill
                          src={e.image}
                          contentFit="cover"
                          alt={e.title}

                          //   sx={{ position: 'absolute', left: '-10%' }}
                        />
                      </View>
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
                </>
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
                    <View
                      sx={{
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        overflow: 'hidden',
                        width: 120 * imageRatio,
                        height: 120,

                      }}
                    >
                      <SolitoImage
                        fill
                        src={e.image}
                        contentFit="cover"
                        alt={e.title}
                      />
                    </View>
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
