import { SafeAreaView, ScrollView, styled, Sx, View } from 'dripsy'
import { Platform } from 'react-native'
const pageStyles: Sx = {
  bg: '#0D2035',
  flex: 1,
  minHeight: Platform.OS === 'web' ? '100vh' : 0,
}

const Page = styled(ScrollView, {})(pageStyles)

export const PageSafeArea = ({ children, ...rest }) => {
  return (
    <SafeAreaView sx={pageStyles}>
      <Page {...rest}>{children}</Page>
    </SafeAreaView>
  )
}

export default Page
