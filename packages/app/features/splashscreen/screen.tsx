import { Box, ScrollView, Text, styled } from 'dripsy'
import React, { ComponentProps } from 'react'

import { Button, Text as TextRN } from 'react-native'

import { AvertaStdUseFont } from 'app/assets/fonts/Averta'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { useFonts } from 'expo-font'
import * as DropdownMenu from 'zeego/dropdown-menu'
import SplashScreenButton from '../demo/SplashScreenButton'

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
  const { top, bottom } = useSafeArea()

  // console.log('font loaded', loaded)
  if (!loaded) return null

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: top,
        paddingBottom: bottom,
      }}
      sx={{
        bg: '$primary.700',
      }}
    >
      <Text>AvertaStd</Text>
      <Text sx={{ fontWeight: '500' }}>AvertaStd Semibold</Text>
      <Text sx={{ fontWeight: 'bold' }}>AvertaStd Bold</Text>
      <Text sx={{ fontWeight: '900' }}>AvertaStd Black</Text>
      <TextRN>RN Original Text</TextRN>
      <SplashScreenButton />
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
      {/* <DemoIcon /> */}
    </ScrollView>
  )
}
