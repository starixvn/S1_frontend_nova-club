import { Flex } from 'dripsy'
import React, { useState } from 'react'
import { useRouter } from 'solito/router'
import BottomNavIcon from './BottomNavIcon'

const tabConfig = [
  {
    id: 1,
    name: 'Sportsbook',
    icon: '',
    isFocused: false,
    iconName: 'sb',
    route: '/test/Sportsbook',
  },
  {
    id: 2,
    name: 'Games',
    icon: '',
    isFocused: false,
    iconName: 'games',
    route: '/games/Games',
  },
  {
    id: 3,
    name: 'Home',
    icon: 'home',
    isFocused: true,
    iconName: 'home',
    route: '/home',
  },
  {
    id: 4,
    name: 'Slots',
    icon: '',
    isFocused: false,
    iconName: 'sl',
    route: '/slots/Slots?page=1&limit=10',
  },
  {
    id: 5,
    name: 'Live Casino',
    icon: '',
    isFocused: false,
    iconName: 'lc',
    route: '/live/Live Casino',
  },
]

const BottomNavigation = () => {
  const { push } = useRouter()
  const [activeIdx, setActiveIdx] = useState(2)

  return (
    <Flex
      sx={{
        justifyContent: 'space-evenly',
        backgroundColor: '#0d2035',
        width: '100%',
        height: 56,
        position: 'relative',
        // paddingX: [12, 'auto'],
      }}
    >
      {tabConfig.map((item, index) => (
        <BottomNavIcon
          key={item.id}
          name={item.name}
          iconName={item.iconName}
          active={activeIdx === index}
          onPress={() => {
            setActiveIdx(index)
            push(item.route)
          }}
        />
      ))}
    </Flex>
  )
}

export default BottomNavigation
