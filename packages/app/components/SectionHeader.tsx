import useLocalization from 'app/provider/localization'
import { SxProp, Text, View, styled, useDripsyTheme } from 'dripsy'
import React from 'react'
import { Platform, ViewProps } from 'react-native'
import { useRouter } from 'solito/router'
import SectionLabel from './SectionLabel'
import Shadow from './Shadow'
import TouchableOpacity from './pressable/TouchableOpacity'

interface SectionHeaderProps extends ViewProps {
  sx?: SxProp
  icon: string
  title: string
  seeMoreUrl?: string
}

export default function SectionHeader({
  icon,
  title,
  seeMoreUrl,
  sx,
  children,
  ...rest
}: SectionHeaderProps) {
  const { theme } = useDripsyTheme()
  const { push } = useRouter()
  const { t } = useLocalization()

  function handleSeeMoreRedirect(url: string) {
    if (Platform.OS === 'web') push(url)
    else
      push({
        pathname: url,
      })
  }

  return (
    <Root sx={sx}>
      <Shadow
        safeRender
        offset={[0, -1]}
        distance={1}
        stretch
        startColor={theme?.colors?.$primary?.[100]}
        style={{
          borderTopLeftRadius: 30,
          borderBottomLeftRadius: 30,
        }}
      >
        <View
          sx={{
            bg: '$primary.300',
            borderTopLeftRadius: 30,
            borderBottomLeftRadius: 30,
            p: [6, '$2'],
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          {...rest}
        >
          <SectionLabel icon={icon} title={title}>
            {children}
          </SectionLabel>
          {seeMoreUrl && (
            <TouchableOpacity
              sx={{
                alignSelf: 'center',
              }}
              onPress={() => handleSeeMoreRedirect(seeMoreUrl)}
            >
              <Text sx={{ textDecorationLine: 'underline', fontSize: 11 }}>
                {t('common.seeMore')} {'>>'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Shadow>
    </Root>
  )
}
const Root = styled(View)({
  ml: ['$pagePadding', '$pagePadding', '$pagePadding', 0],
})
