import Header from 'app/components/common/Header'
import { Button } from 'app/components/form/Button'
import { DripsyGradient } from 'app/components/Gradient'
import { View } from 'dripsy'
import { useState } from 'react'
import GameAmount from './GameAmount'
import GameRewards from './GameRewards'
import TopHeader from './TopHeader'
import UserAgreement from './UserAgreement'

const PreLaunchGame = () => {
  const [agree, setAgree] = useState(false)

  return (
    <DripsyGradient colors={['#164672', '#0D2035']} sx={{ flex: 1 }}>
      <TopHeader />
      <GameRewards />
      <UserAgreement
        onAgree={(e) => {
          setAgree(e)
        }}
        isAgree={agree}
      />
      <GameAmount />
      <View sx={{ mt: '$10', mx: '$5' }}>
        <Button
          disabled={!agree}
          rounded
          stretch
          variant="lg"
          fill={{
            type: 'gradient',
            color: ['#33A0D0', '#0B76A5'],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0 },
          }}
        >
          <Button.Label>Enter Game</Button.Label>
        </Button>
      </View>
    </DripsyGradient>
  )
}

export default PreLaunchGame
