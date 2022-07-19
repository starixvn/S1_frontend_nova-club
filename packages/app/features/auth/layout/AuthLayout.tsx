import IconButton from 'app/components/form/IconButton'
import { DripsyGradient } from 'app/components/Gradient'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Image, ScrollView, styled, Text, View } from 'dripsy'
import React from 'react'
import { MotiLink } from 'solito/moti'

const HEADER_IMAGE = require('../../../assets/images/common/logo.jpg')
const BACK_ICON_SIZE = 30

const StyledImage = styled(Image)({
  height: 120,
  width: 120,
})

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
  const { top, bottom } = useSafeArea()

  const onPressBack = () => {
    onBack?.()
  }

  return (
    <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }}>
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
        <View>
          <View
            sx={{
              position: 'relative',
              alignItems: 'center',
              pt: '$3',
              pb: '$1a',
            }}
          >
            <StyledImage
              source={HEADER_IMAGE}
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

          <View sx={{ alignItems: 'center', pt: '$8' }}>
            <View sx={{ width: '75%' }}>{children}</View>
          </View>
        </View>
      </DripsyGradient>
    </ScrollView>
  )
}

export default AuthLayout
