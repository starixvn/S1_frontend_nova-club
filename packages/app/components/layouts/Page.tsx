import { SafeAreaView, ScrollView, Sx, SxProp, View, styled } from 'dripsy'
import React, { ComponentProps } from 'react'
import { Platform, useWindowDimensions } from 'react-native'
import Image from '../common/Image'
import Header from '../common/Header'
import isDesktop from 'app/utils/isDesktop'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import useIsDesktop from 'app/hooks/useIsDesktop'

type PageScrollViewProps = {
  disableScrollView?: false
} & ComponentProps<typeof Page.ScrollView>

type PageViewProps = {
  disableScrollView: true
} & ComponentProps<typeof Page>

type PageWithBackHeaderProps = {
  children?: React.ReactNode
  header?: (() => React.ReactNode) | ComponentProps<typeof Header>
  hideHeader?: boolean
  background?: string
  wrapperStyle?: SxProp
} & (PageScrollViewProps | PageViewProps)

const pageStyles: Sx = {
  bg: '$background',
}

const Page = Object.assign(styled(View, {})(pageStyles), {
  ScrollView: styled(ScrollView, {})(pageStyles),
  FillView: styled(
    ScrollView,
    {}
  )({ ...pageStyles, minHeight: Platform.OS === 'web' ? '100dvh' : 0 }),
})

export const PageSafeArea = ({
  children,
  disableScrollView = false,
  ...rest
}) => {
  const PageComponent = disableScrollView ? Page : Page.ScrollView

  return (
    <SafeAreaView sx={pageStyles}>
      <PageComponent {...rest}>{children}</PageComponent>
    </SafeAreaView>
  )
}

export const PageWithBackHeader = ({
  children,
  header,
  hideHeader = false,
  disableScrollView = false,
  background = undefined,
  wrapperStyle,
  ...rest
}: PageWithBackHeaderProps) => {
  const PageComponent = disableScrollView ? Page : Page.ScrollView
  const { height } = useWindowDimensions()
  const desktop = useIsDesktop()
  const { bottom } = useSafeArea()
  return (
    <View
      sx={{
        minHeight: desktop ? height * 0.5 : height,
        flex: 1,
        ...pageStyles,
        ...wrapperStyle,
      }}
    >
      {background && (
        <Image
          source={{
            uri: background,
          }}
          alt="background"
          sx={{
            width: '100%',
            position: 'absolute',
            height: Platform.select({ web: '100vh', default: '100%' }),
          }}
        />
      )}
      {hideHeader || !header ? null : typeof header === 'function' ? (
        header()
      ) : (
        <Header style={{ flex: 1, flexBasis: 50 }} {...header} />
      )}
      <PageComponent
        sx={{
          // minHeight: 0,
          bg: background ? 'transparent' : '$secondary',
          flex: 1,
          pb: bottom,
        }}
        showsVerticalScrollIndicator={false}
        {...(rest as any)}
      >
        {children}
      </PageComponent>
    </View>
  )
}

export default Page
