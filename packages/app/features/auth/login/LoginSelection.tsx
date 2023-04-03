import { DripsyGradient } from 'app/components/Gradient'
import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { LoginType } from '../type'

type LoginSelectionProps = {
  setType: (s: LoginType) => void
  isAgent: boolean
}
const LoginSelection = ({ setType, isAgent = false }: LoginSelectionProps) => {
  const { t } = useLocalization()

  return (
    <View
      sx={{
        width: '100%',
        height: 50,
        // flex: 1,
        flexDirection: 'row',
      }}
    >
      <DripsyGradient
        colors={
          !isAgent ? ['#69E1FC', '#008CD5'] : ['#33B4D4', '#1F99C7', '#0F84BB']
        }
        sx={{
          width: '50%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          disabled={!isAgent}
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
          }}
          onPress={() => setType(LoginType.Member)}
        >
          <Text
            sx={{
              color: !isAgent ? 'white' : '#004e65',
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {t('auth.memberLogin')}
          </Text>
        </TouchableOpacity>
      </DripsyGradient>

      {/* <View sx={{ borderWidth: 1, borderColor: 'white' }} /> */}
      <DripsyGradient
        colors={
          isAgent ? ['#69E1FC', '#008CD5'] : ['#33B4D4', '#1F99C7', '#0F84BB']
        }
        sx={{
          width: '50%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          disabled={isAgent}
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
          }}
          onPress={() => setType(LoginType.Agent)}
        >
          <Text
            sx={{
              color: isAgent ? 'white' : '#004e65',
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {t('auth.agentLogin')}
          </Text>
        </TouchableOpacity>
      </DripsyGradient>
    </View>
  )
}

export default LoginSelection
