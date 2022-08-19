import { SafeAreaView, ScrollView, styled, Sx, View } from 'dripsy'
import { Platform } from 'react-native'
import Header from '../common/Header'
const pageStyles: Sx = {
  bg: '$background',
  flex: 1,
  // minHeight: Platform.OS === 'web' ? '100vh' : 0,
  flexDirection: 'column',
}

const Page = Object.assign(styled(View, {})(pageStyles), {
  ScrollView: styled(ScrollView, {})(pageStyles),
  FillView: styled(
    ScrollView,
    {}
  )({ ...pageStyles, minHeight: Platform.OS === 'web' ? '100vh' : 0 }),
})

// Page.ScrollView

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
  ...rest
}) => {
  const PageComponent = disableScrollView ? Page : Page.ScrollView
  return (
    <View
      sx={{
        ...pageStyles,
        ...Platform.select({
          web: {
            maxHeight: '100vh',
          },
        }),
        minHeight: 0,
      }}
    >
      {!hideHeader && <Header style={{ flex: 1, flexBasis: 50 }} {...header} />}
      <PageComponent
        sx={{
          minHeight: 0,
          bg: '$secondary',
          flex: 1,
        }}
        {...rest}
      >
        {children}
      </PageComponent>
    </View>
  )
}

export default Page
