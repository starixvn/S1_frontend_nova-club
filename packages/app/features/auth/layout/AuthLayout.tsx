import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { View, Text, styled, Image, ScrollView } from 'dripsy'
import React from 'react'
import { MotiLink } from 'solito/moti'

const HEADER_IMAGE = require('../../../assets/images/common/logo.jpg')
const BACK_ICON_SIZE = 40

const StyledImage = styled(Image)({
  height: 120,
  width: 120,
})
const StyledLink = styled(MotiLink)({})

interface AuthLayoutProps {
  showBackButton?: boolean
  formHeader?: React.ReactNode
  children?: React.ReactNode
}

const AuthLayout = ({
  showBackButton = true,
  formHeader,
  children,
}: AuthLayoutProps) => {
  const { top, bottom } = useSafeArea()

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
              pt: '$6',
              pb: '$3',
            }}
          >
            <StyledImage
              source={HEADER_IMAGE}
              accessibilityLabel="n88 app logo"
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
                <StyledLink
                  href={'/auth/login'}
                  animate={({ hovered, pressed }) => {
                    'worklet'
                    return {
                      opacity: pressed ? 0.6 : hovered ? 0.6 : 1,
                    }
                  }}
                >
                  <Icon name="chevleft" size={BACK_ICON_SIZE} />
                </StyledLink>
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
                p: '$6',
                textAlign: 'center',
              }}
            >
              Account registration
            </Text>
          </View>

          {formHeader}

          <View sx={{ alignItems: 'center', pt: '$16' }}>
            <View sx={{ width: '75%' }}>{children}</View>
          </View>
        </View>

        <View sx={{ alignItems: 'center', mb: bottom + 8, mt: 70 }}>
          <Text variant="md" sx={{ opacity: 0.7, mt: '$5' }}>
            Powered by NOVA88
          </Text>
        </View>
      </DripsyGradient>
    </ScrollView>
  )
}

export default AuthLayout
