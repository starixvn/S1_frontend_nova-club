import { SafeAreaView, ScrollView, styled, Sx, View } from 'dripsy'
import { Platform } from 'react-native'
import Header from '../common/Header'
const pageStyles: Sx = {
  bg: '#0D2035',
  flex: 1,
  minHeight: Platform.OS === 'web' ? '100vh' : 0,
  flexDirection: 'column',
}

const Page = styled(ScrollView, {})(pageStyles)
const PageView = styled(View, {})(pageStyles)

export const PageSafeArea = ({ children, ...rest }) => {
  return (
    <SafeAreaView sx={pageStyles}>
      <Page {...rest}>{children}</Page>
    </SafeAreaView>
  )
}

export const PageWithBackHeader = ({
  children,
  header,
  disableScrollView = false,
  ...rest
}) => {
  const PageComponent = disableScrollView ? PageView : Page
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
      <Header style={{ flex: 1, flexBasis: 50 }} {...header} />
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
