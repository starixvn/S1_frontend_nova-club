import { SafeAreaView, ScrollView, styled, Sx, SxProp, View } from 'dripsy'
import { ComponentProps } from 'react'
import { Platform } from 'react-native'
import { Source } from 'react-native-fast-image'
import Header from '../common/Header'
import Image from '../common/Image'
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
  background?: Source['uri']
  wrapperStyle?: SxProp
} & (PageScrollViewProps | PageViewProps)

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

  return (
    <View
      sx={{
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
          minHeight: 0,
          bg: background ? 'transparent' : '$secondary',
          flex: 1,
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
