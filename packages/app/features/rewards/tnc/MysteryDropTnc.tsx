import { Text, View } from 'dripsy'
import React from 'react'
import JackpotPool from './MysteryDrop/JackpotPool'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import Prize from './MysteryDrop/Prize'
import useWindowResize from 'app/hooks/useWindowResize'

const MysteryDropTnc = () => {
  const { width } = useWindowResize()

  return (
    <PageWithBackHeader
      header={{
        title: 'Mystery Drop',
      }}
    >
      <View>
        <JackpotPool />
        <View sx={{ alignItems: 'center' }}>
          <Prize width={width * 0.7} type="grand" />
        </View>
        <View
          sx={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 12,
          }}
        >
          <Prize width={width * 0.45} type="major" />
          <Prize width={width * 0.45} type="mini" />
        </View>

        <Text sx={{ textAlign: 'center' }}>
          {`Vui123 is introducing an exclusive feature Mystery Drops. We’ve added mystery jackpots to your favourite games. There are 3 progressive jackpot levels, Major, Grand, and Mega. Play the games with the tag ‘Mystery Drops’ and make bets starting from 0.5 EUR (or equivalents in other fiat currencies).
          
          No extra money is charged for the participation. Once you make a qualifying bet, you participate automatically. The jackpots are awarded in real time as real money, no wagering requirement. Each next bet can be winning!`}
        </Text>
      </View>
    </PageWithBackHeader>
  )
}

export default MysteryDropTnc
