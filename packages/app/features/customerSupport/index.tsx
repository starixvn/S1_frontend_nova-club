import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import { PageWithBackHeader } from 'app/components/layout/Page'
import BouncePressable from 'app/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { isURLSupported } from 'app/utils/helper'
import { Image, styled, Text, View } from 'dripsy'
import { useEffect, useState } from 'react'
import { Linking, Platform } from 'react-native'
import { CONTACT_LIST } from '../floatingContent'
import useSupportItemList from './useSupportItemList'
const HEADER_IMAGE = require('../../assets/images/logo.png')

const CustomerSupportPage = () => {
  const { t } = useLocalization()

  return (
    <DripsyGradient colors={['#133351', '#0D2035']} sx={{ flex: 1 }}>
      <PageWithBackHeader header={{ title: t('menu.customerSupport') }}>
        <View sx={{ alignItems: 'center', mt: '$2a' }}>
          <StyledImage source={HEADER_IMAGE} resizeMode="contain" />
          <Text sx={{ fontSize: 18, fontWeight: 'bold', my: '$4' }}>
            {t('contact.contactVia')}:
          </Text>
          <SupportItems />
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
  overflow: 'hidden',
})

const SupportItems = () => {
  const { t } = useLocalization()
  const mediaList = useSupportItemList()

  return (
    <View>
      {!!mediaList.length &&
        mediaList.map((item) => {
          return (
            <BouncePressable
              key={item.label}
              onPress={() => {
                if (Platform.OS !== 'web') Linking.openURL(item.href)
              }}
            >
              <StyledButton
                colors={['#33A0D0', '#0B76A5']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                href={item.href}
                hrefAttrs={{
                  rel: 'noreferrer',
                  target: '_blank',
                }}
                sx={{
                  width: 200,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <StyledWrapIcon colors={item.bg}>
                  {typeof item.icon === 'undefined' ? (
                    <Image
                      resizeMode="contain"
                      source={item.image}
                      sx={{
                        width: 47,
                        height: 47,
                      }}
                    />
                  ) : (
                    <Icon
                      name={item.icon}
                      size={30}
                      sx={{
                        color: 'white',
                        alignSelf: 'center',
                      }}
                    />
                  )}
                </StyledWrapIcon>
                <Text
                  sx={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    pl: '$4',
                  }}
                >
                  {t('contact.' + item.label)}
                </Text>
              </StyledButton>
            </BouncePressable>
          )
        })}
    </View>
  )
}

export default CustomerSupportPage
