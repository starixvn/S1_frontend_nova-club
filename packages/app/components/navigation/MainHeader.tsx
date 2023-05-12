import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Box, Pressable, Row, Text } from 'dripsy'
import React from 'react'
import { useDrawer } from './Drawer/DrawerProvider'
import { Link } from 'solito/link'
import { TouchableOpacity } from 'react-native'

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
