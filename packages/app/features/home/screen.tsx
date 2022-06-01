import Select from 'app/components/form/Select'
import { ScrollView, Text } from 'dripsy'
import React, { useEffect, useState } from 'react'
import CasinoSection from './Section/CasinoSection'
import GamesSection from './Section/GamesSection'
import HotGamesSection from './Section/HotGamesSection'
import LeaderboardSection from './Section/LeaderboardSection'
import LotterySection from './Section/LotterySection'
import GridSection from './Section/GridSection'
import WalletMenu from './WalletMenu'
import BannerSection from './Section/BannerSection'
import { Platform } from 'react-native'
import * as Updates from 'expo-updates'

const HomeScreen = () => {
  const [selected, setSelected] = useState(null)
  const [updateStatus, setUpdateStatus] = useState('--')
  const [event, setEvent] = useState('-')

  useEffect(() => {
    async function checkUpdate() {
      const update = await Updates.checkForUpdateAsync()
      if (update.isAvailable && update.manifest) {
        setUpdateStatus(JSON.stringify(update.manifest.id))
      }

      Updates.addListener((e) => {
        setEvent(e.type)
      })
    }

    if (Platform.OS !== 'web') {
      checkUpdate()
    }
  }, [])

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
      />
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
        ]}
        setSelectedValue={setSelected}
      />
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
      <Text>{'Status : ' + updateStatus}</Text>
      <Text>{'Event : ' + event}</Text>
      <BannerSection />
      {/* <WalletMenu /> */}
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
