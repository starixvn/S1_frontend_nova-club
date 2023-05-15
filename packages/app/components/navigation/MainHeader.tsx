import { useDrawer } from 'app/hooks/useDrawer'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Row, Text } from 'dripsy'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Link } from 'solito/link'

const MainHeader = () => {
  const { top } = useSafeArea()
  const { toggleDrawer } = useDrawer()

  return (
    <Row
      sx={{
        bg: '$primary.500',
        height: 50 + top,
        pt: top,
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <Link href={'/account'}>
        <Text>Account</Text>
      </Link>

      <TouchableOpacity
        onPress={(e) => {
          toggleDrawer()
        }}
      >
        <Text>Drawer</Text>
      </TouchableOpacity>
    </Row>
  )
}

export default MainHeader
