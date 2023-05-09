import { Box, Text, View, styled } from 'dripsy'
import React, { ComponentProps } from 'react'

import { Button, Text as TextRN } from 'react-native'

import { AvertaStdUseFont } from 'app/assets/fonts/Averta'
import { useFonts } from 'expo-font'
import { Link } from 'solito/link'
import * as DropdownMenu from 'zeego/dropdown-menu'
import * as ContextMenu from 'zeego/context-menu'

const DropdownMenuLabel = DropdownMenu.create(
  (props: ComponentProps<typeof DropdownMenu.Label>) => (
    <DropdownMenu.Label {...props} />
  ),
  'ItemImage'
)

export const DropdownMenuRoot = DropdownMenu.Root
export const DropdownMenuTrigger = DropdownMenu.Trigger
export const DropdownMenuContent = DropdownMenu.Content
export const DropdownMenuItemTitle = DropdownMenu.ItemTitle
export const DropdownMenuItem = DropdownMenu.create(
  styled(DropdownMenu.Item)({
    height: 34,
  }),
  'Item'
)

export default function SplashScreen() {
  const [loaded] = useFonts({
    ...AvertaStdUseFont,
  })

  console.log('font loaded', loaded)
  if (!loaded) return null

  return (
    <View
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        bg: '$primary.700',
        flex: 1,
      }}
    >
      <Text>AvertaStd</Text>
      <Text sx={{ fontWeight: '500' }}>AvertaStd Semibold</Text>
      <Text sx={{ fontWeight: 'bold' }}>AvertaStd Bold</Text>
      <Text sx={{ fontWeight: '900' }}>AvertaStd Black</Text>
      <TextRN>RN Original Text</TextRN>
      <Box sx={{ mt: 20 }}>
        <Link
          href="/?splashscreen=true"
          replace
          experimental={{
            nativeBehavior: 'stack-replace',
            isNestedNavigator: false,
          }}
        >
          <Text>Home</Text>
        </Link>
      </Box>
      <Box>
        <DropdownMenuRoot>
          <DropdownMenuTrigger>
            <Button title={'Zeego'} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenu.Item key="fernando rojo">
              <DropdownMenuItemTitle>ACB</DropdownMenuItemTitle>
              <DropdownMenu.ItemSubtitle>
                1391-2241-1412-4123
              </DropdownMenu.ItemSubtitle>
              <DropdownMenu.ItemImage
                source={require('app/assets/images/logo-acb.png')}
              />
              <DropdownMenu.ItemIcon />
            </DropdownMenu.Item>
            <DropdownMenu.Item key="vv">
              <DropdownMenuItemTitle>VIB</DropdownMenuItemTitle>
              <DropdownMenu.ItemSubtitle>
                7345-8345-5673-2231
              </DropdownMenu.ItemSubtitle>
              <DropdownMenu.ItemImage
                source={require('app/assets/images/vib.png')}
              />
              <DropdownMenu.ItemIcon />
            </DropdownMenu.Item>
          </DropdownMenuContent>
        </DropdownMenuRoot>
      </Box>
    </View>
  )
}
