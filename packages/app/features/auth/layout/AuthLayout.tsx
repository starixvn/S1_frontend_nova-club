import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Image from 'app/components/common/Image'
import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import KeyboardView from 'app/components/KeyboardView'
import ProfileLanguage from 'app/features/profile/ProfileLanguage'
import { useIsFocused } from 'app/hooks/isFocus/useIsFocused'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import BouncePressable from 'app/pressable/BouncePressable'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { ScrollView, Text, View } from 'dripsy'
import React, { useCallback, useEffect } from 'react'
import { Platform } from 'react-native'

const BACK_ICON_SIZE = 30

const BANNER_RATIO = 768 / 350

interface AuthLayoutProps {
  showBackButton?: boolean
  headerDesc?: string
  headerColor?: string
  gradientColor?: (string & {})[] | undefined
  formHeader?: React.ReactNode
  children?: React.ReactNode
  onBack?: () => void
}

const AuthLayout = ({
  showBackButton = true,
  headerDesc,
  headerColor,
  gradientColor,
  formHeader,
  children,
  onBack,
}: AuthLayoutProps) => {
  const isFocus = useIsFocused()
  const { top, bottom } = useSafeArea()
  const { width } = useContainerDimension()
  const { replace, back } = useContextualRouter()
  const { token } = useAppSelector((state) => state.auth.info) || {}

  const onPressBack = () => {
    if (onBack) onBack()
    else back()
  }

  const checkIfUserLoggedIn = useCallback(() => {
    return Boolean(token)
  }, [token])

  useEffect(() => {
    if (!isFocus) return

    // if (checkIfUserLoggedIn()) {
    //   replace('/')
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocus])

  return (
    <DripsyGradient
      gradient={'darkOceanBlue'}
      start={{ x: 0.8, y: 0 }}
      end={{ x: 0.1, y: 0.8 }}
      sx={{
        flexGrow: 1,
        justifyContent: 'space-between',
      }}
    >
      <View
        sx={{
          ...Platform.select({
            web: {
              height: '100vh',
            },
          }),
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <KeyboardView bounces={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View sx={{ flex: 1 }}>
              <DripsyGradient
                colors={gradientColor ? gradientColor : ['#0e3459', '#0e3459']}
              >
                <View
                  sx={{
                    flex: 1,
                    paddingTop: top,
                  }}
                >
                  <View
                    sx={{
                      position: 'relative',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      sx={{
                        color: headerColor ? headerColor : '#000000',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        p: '$3',
                        textAlign: 'center',
                      }}
                    >
                      {headerDesc}
                    </Text>
                    {showBackButton ? (
                      <View
                        sx={{
                          position: 'absolute',
                          left: '5%',
                          top: 0,
                          bottom: 0,
                          justifyContent: 'center',
                        }}
                      >
                        <BouncePressable
                          onPress={onPressBack}
                          sx={{ mr: '$4', p: '$2' }}
                        >
                          <Icon
                            name="chevleft"
                            size={20}
                            color={headerColor ? headerColor : '#000000'}
                          />
                        </BouncePressable>
                      </View>
                    ) : null}
                  </View>
                </View>
              </DripsyGradient>
              <Image
                source={{
                  uri: `${MEDIA_DOMAIN}${CONTENT_URI}/banners/${'authBanner.jpg?v=1'}`,
                }}
                resizeMode="cover"
                sx={{ width, height: width / BANNER_RATIO }}
              />

              {formHeader}

              <View sx={{ alignItems: 'center', pt: '$8', flex: 1 }}>
                <View sx={{ width: '75%', flex: 1 }}>{children}</View>
              </View>
            </View>

            <View sx={{ alignItems: 'center', mb: bottom + 8, mt: 40 }}>
              <ProfileLanguage isAuthRequired={false} />
            </View>
          </KeyboardView>
        </ScrollView>
      </View>
    </DripsyGradient>
  )
}

export default AuthLayout
