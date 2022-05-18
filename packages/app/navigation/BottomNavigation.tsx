import { Flex, View } from 'dripsy'
import React, { useState } from 'react'
import { useRouter } from 'solito/router'
import BottomNavIcon from './BottomNavIcon'

const tabConfig = [
    {
        id: 1,
        name: 'Sportsbook',
        isFocused: false,
        iconName: 'sb',
        route: '/test/Sportsbook',
    },
    {
        id: 2,
        name: 'Games',
        isFocused: false,
        iconName: 'games',
        route: '/games/Games',
    },
    {
        id: 3,
        name: 'Home',
        isFocused: true,
        iconName: 'home',
        route: '/home',
    },
    {
        id: 4,
        name: 'Slots',
        isFocused: false,
        iconName: 'sl',
        route: '/slots/Slots?page=1&limit=10',
    },
    {
        id: 5,
        name: 'Live Casino',
        isFocused: false,
        iconName: 'lc',
        route: '/live/Live Casino',
    },
]

const BottomNavigation = () => {
    const { push } = useRouter()
    const [activeIdx, setActiveIdx] = useState(2)

    const BAR_HEIGHT = 60
    const CIRCLE_HEIGHT = BAR_HEIGHT
    const ICON_HEIGHT = 60
    const MARGIN_TOP = -BAR_HEIGHT * 0.4
    return (
        <Flex
            sx={{
                alignItems: 'flex-end',
                justifyContent: 'space-evenly',
                backgroundColor: '#0d2035',
                width: '100%',
                height: BAR_HEIGHT,
                // paddingX: [12, 'auto'],
            }}
        >
            {tabConfig.map((item, index) => (
                <View
                    key={item.id}
                    sx={{
                        marginTop: MARGIN_TOP,
                        paddingBottom: 1,
                        flex: 1,
                        overflow: 'visible',
                    }}
                >
                    <BottomNavIcon
                        name={item.name}
                        iconName={item.iconName}
                        active={activeIdx === index}
                        size={CIRCLE_HEIGHT}
                        onPress={() => {
                            setActiveIdx(index)
                            push(item.route, undefined, { scroll: false })
                        }}
                    />
                </View>
            ))}
        </Flex>
    )
}

export default BottomNavigation
