import Select from 'app/components/form/Select'
import { ScrollView } from 'dripsy'
import React, { useState } from 'react'
import CasinoSection from './Section/CasinoSection'
import GamesSection from './Section/GamesSection'
import HotGamesSection from './Section/HotGamesSection'
import LeaderboardSection from './Section/LeaderboardSection'
import LotterySection from './Section/LotterySection'
import GridSection from './Section/GridSection'
import WalletMenu from './WalletMenu'

const HomeScreen = () => {
  const [selected, setSelected] = useState(null)

  return (
    <ScrollView
      sx={{ bg: '$background', flex: 1, pt: 2 }}
      showsVerticalScrollIndicator={false}
    >
      <Select
        headerTitle={'Period'}
        buttonTitle="Click here to oopen"
        buttonProps={{
          sx: {
            m: 10,
          },
          isActive: false,
        }}
        data={[
          { name: '13', value: 0 },
          { name: '1321312313', value: 1 },
          { name: '121231313123313132313232123123123213131231', value: 2 },
          { name: 'a', value: 3 },
          { name: 'b', value: 4 },
          { name: 'c', value: 5 },
          { name: 'd', value: 6 },
          { name: 'f', value: 1 },
        ]}
        setSelectedValue={setSelected}
      ></Select>
      {/* <Text sx={{ marginBottom: 20 }}>
        {data ? JSON.stringify(data, null, 2) : 'no login data'}
      </Text>
      <Text>
        Register data :
        {registerData
          ? 'registerData'
          : isError
          ? JSON.stringify(error, null, 2)
          : 'no register data'}
      </Text>
      <Text> This is the new Update</Text>
      </Text> */}
      <WalletMenu />
      <GridSection />
      <CasinoSection />
      <LotterySection />
      <GamesSection />
      <LeaderboardSection />
      <HotGamesSection />
    </ScrollView>
  )
}

export default HomeScreen
