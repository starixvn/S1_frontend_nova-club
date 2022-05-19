import { useLoginQuery, useRegisterQuery } from 'app/services/authApi'
import { ScrollView, Text } from 'dripsy'
import React, { useEffect } from 'react'
import CasinoSection from './Section/CasinoSection'
import GamesSection from './Section/GamesSection'
import HotGamesSection from './Section/HotGamesSection'
import LeaderboardSection from './Section/LeaderboardSection'
import LotterySection from './Section/LotterySection'

const HomeScreen = () => {
  const { data } = useLoginQuery({ username: 'tre', password: '123' })
  const {
    data: registerData,
    isError,
    error,
  } = useRegisterQuery({
    contactNumber: '123',
    cpassword: '123',
    email: '123@gmal.com',
    password: '123',
    terms: true,
    tracking_code: '13',
    username: 'username',
  })

  return (
    <ScrollView
      sx={{ bg: '$background', flex: 1, pt: 2 }}
      showsVerticalScrollIndicator={false}
    >
      <Text sx={{ marginBottom: 20 }}>
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
      <CasinoSection />
      <LotterySection />
      <GamesSection />
      <LeaderboardSection />
      <HotGamesSection />
    </ScrollView>
  )
}

export default HomeScreen
