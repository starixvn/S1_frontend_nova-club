import Header from 'app/components/common/Header'
import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import { PageWithBackHeader } from 'app/components/layout/Page'
import BouncePressable from 'app/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { openSocialPlatform } from 'app/utils/helper'
import { Image, styled, Text, View } from 'dripsy'
import { useMemo } from 'react'
const HEADER_IMAGE = require('../../assets/logo.png')

const CustomerSupportPage = () => {
  const CONTACT_LIST = useMemo(
    () => [
      {
        label: 'whatsapp',
        icon: 'cs',
        bg: ['#BFFABC', '#42C73B'],
      },
      {
        label: 'telegram',
        icon: 'cs',
        bg: ['#C0E0FD', '#33A0D0'],
      },
      {
        label: 'livechat',
        icon: 'cs',
        bg: ['#FC819B', '#E13256'],
      },
    ],
    []
  )
  return (
    <DripsyGradient colors={['#133351', '#0D2035']} sx={{ flex: 1 }}>
      <PageWithBackHeader header={{ title: 'Customer Support' }}>
        <View sx={{ alignItems: 'center', mt: '$2a' }}>
          <StyledImage source={HEADER_IMAGE} resizeMode="contain" />
          <Text sx={{ fontSize: 18, fontWeight: 'bold', my: '$4' }}>
            Contact via:
          </Text>
          <SupportItem data={CONTACT_LIST} />
        </View>
      </PageWithBackHeader>
    </DripsyGradient>
  )
}
const StyledImage = styled(Image)({
  height: 100,
  width: 100,
})

const StyledButton = styled(DripsyGradient)({
  borderRadius: 25,
  my: '$2',
})

const StyledWrapIcon = styled(DripsyGradient)({
  borderRadius: 25,
  borderWidth: 2,
  borderColor: '$PaleBlue',
  m: 1,
  height: 50,
  aspectRatio: 1,
  justifyContent: 'center',
})

const SupportItem = ({ data }) => {
  const { t } = useLocalization()
  return data.map((i) => {
    return (
      <StyledButton
        colors={['#33A0D0', '#0B76A5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        key={i.label}
      >
        <BouncePressable
          sx={{
            width: 200,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {
            openSocialPlatform(i.label)
          }}
        >
          <StyledWrapIcon colors={i.bg}>
            <Icon
              name={i.icon}
              size={30}
              sx={{
                color: 'white',
                alignSelf: 'center',
              }}
            />
          </StyledWrapIcon>
          <Text
            sx={{
              fontSize: 20,
              fontWeight: 'bold',
              pl: '$4',
            }}
          >
            {t('contact.' + i.label)}
          </Text>
        </BouncePressable>
      </StyledButton>
    )
  })
}

export default CustomerSupportPage
