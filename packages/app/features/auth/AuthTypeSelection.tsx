import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { Pressable, Text, View, styled } from 'dripsy'
import { Gradient } from 'dripsy/gradient'
import React from 'react'
import { useRouter } from 'solito/router'

export enum LoginType {
  Member = 'member',
  Agent = 'agent',
}

type AuthTypeSelectionProps = {
  setType: (s: LoginType) => void
  isAgent: boolean
}
const AuthTypeSelection = ({
  setType,
  isAgent = false,
}: AuthTypeSelectionProps) => {
  const { t } = useLocalization()
  const agentToken = useAppSelector((s) => s.agent.access_token)
  const memberToken = useAppSelector((state) => state.auth.info?.token)
  const { replace } = useRouter()
  //   const { token: memberToken } =
  //     useAppSelector((state) => state.auth.info) || {}

  return (
    <Gradient
      gradient={'surface'}
      sx={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        py: 15,
      }}
    >
      {memberToken ? null : (
        <ButtonContainer>
          <Pressable
            disabled={!isAgent}
            sx={{
              justifyContent: 'center',
              borderRadius: 15,
              bg: !isAgent ? '#32325A' : '$primary.700',
            }}
            onPress={() => setType(LoginType.Member)}
          >
            <AuthTypeSelectionText sx={{ color: !isAgent ? 'white' : 'grey' }}>
              {t('common.player')}
            </AuthTypeSelectionText>
          </Pressable>
        </ButtonContainer>
      )}

      <ButtonContainer>
        <Pressable
          disabled={isAgent}
          sx={{
            justifyContent: 'center',
            borderRadius: 15,
            bg: isAgent ? '#32325A' : '$primary.700',
          }}
          onPress={() => {
            if (agentToken) {
              replace('/agent/profile')
            }
            setType(LoginType.Agent)
          }}
        >
          <AuthTypeSelectionText sx={{ color: isAgent ? 'white' : 'grey' }}>
            {t('common.agent')}
          </AuthTypeSelectionText>
        </Pressable>
      </ButtonContainer>
    </Gradient>
  )
}

const AuthTypeSelectionText = styled(Text)({
  fontSize: 14,
  fontWeight: 'bold',
  textAlign: 'center',
  minWidth: 150,
  textTransform: 'uppercase',
  py: 15,
})

const ButtonContainer = styled(View)({
  px: 10,
  alignItems: 'center',
})

export default AuthTypeSelection
