import Image from 'app/components/common/Image'
import IconButton from 'app/components/form/IconButton'
import { DripsyGradient } from 'app/components/Gradient'
import KeyboardView from 'app/components/KeyboardView'
import { ROUNDED_LOGO } from 'app/constant/imagePath'
import CnyAuthDeco from 'app/features/events/cny/CnyAuthDeco'
import ProfileLanguage from 'app/features/profile/ProfileLanguage'
import { useIsFocused } from 'app/hooks/isFocus/useIsFocused'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Text, View } from 'dripsy'
import React, { useCallback, useEffect } from 'react'
import { useRouter } from 'solito/router'

const BACK_ICON_SIZE = 30

interface AuthLayoutProps {
  showBackButton?: boolean
  headerDesc?: string
  formHeader?: React.ReactNode
  children?: React.ReactNode
  onBack?: () => void
}

const AuthLayout = ({
  showBackButton = true,
  headerDesc,
  formHeader,
  children,
  onBack,
}: AuthLayoutProps) => {
  const isFocus = useIsFocused()
  const { top, bottom } = useSafeArea()
  const { replace } = useRouter()
  const { token } = useAppSelector((state) => state.auth.info) || {}

  const onPressBack = () => {
    onBack?.()
  }

  const checkIfUserLoggedIn = useCallback(() => {
    return Boolean(token)
  }, [token])

  useEffect(() => {
    if (!isFocus) return

    if (checkIfUserLoggedIn()) {
      replace('/')
    }
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
        pt: top,
      }}
    >
      <CnyAuthDeco />
      <KeyboardView bounces={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View sx={{ flex: 1 }}>
          <View
            sx={{
              position: 'relative',
              alignItems: 'center',
              pt: '$3',
              pb: '$1a',
            }}
          >
            <Image
              source={{ uri: ROUNDED_LOGO }}
              sx={{ width: 120, height: 120 }}
              // accessibilityLabel="n88 app logo"
            />

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
                <IconButton
                  name="chevleft"
                  size={BACK_ICON_SIZE}
                  onPress={onPressBack}
                />
              </View>
            ) : null}
          </View>

          <View
            sx={{
              backgroundColor: '$darkOcean',
              borderColor: '$darkOcean2',
              borderTopWidth: 2,
              borderBottomWidth: 2,
            }}
          >
            <Text
              sx={{
                textTransform: 'uppercase',
                fontWeight: 'bold',
                p: '$3',
                textAlign: 'center',
              }}
            >
              {headerDesc}
            </Text>
          </View>

          {formHeader}

          <View sx={{ alignItems: 'center', pt: '$8', flex: 1 }}>
            <View sx={{ width: '75%', flex: 1 }}>{children}</View>
          </View>
        </View>

        <View sx={{ alignItems: 'center', mb: bottom + 8, mt: 40 }}>
          <ProfileLanguage isAuthRequired={false} />
        </View>
      </KeyboardView>
    </DripsyGradient>
  )
}

export default AuthLayout
