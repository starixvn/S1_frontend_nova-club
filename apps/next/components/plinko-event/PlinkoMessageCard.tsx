import useLocalization from 'app/provider/localization'
import { View, Text, styled } from 'dripsy'
import React, { MutableRefObject } from 'react'

interface PlinkoMessageCardProps {
  winAmount: string
  code: MutableRefObject<number>
  width: number
  height: number
}

const PlinkoMessageCard = ({
  winAmount,
  code,
  width,
  height,
}: PlinkoMessageCardProps) => {
  const { t } = useLocalization()
  return (
    <StyledViewContainer>
      <View
        sx={{
          borderRadius: 20,
          py: '$3',
          minHeight: height * 0.2,
          bg: 'rgba(204, 232, 255, 0.65)',
          alignItems: 'center',
        }}
      >
        <Text
          sx={{
            fontWeight: 'bold',
            fontSize: '$3',
            my: '$2',
            textAlign: 'center',
          }}
        >
          {code.current ? t('event.won2') : t('event.lose2')}
        </Text>
        {code.current ? (
          <Text
            sx={{
              color: '#f9ff59',
              fontWeight: 'bold',
              fontSize: '$5',
              my: '$2',
            }}
          >
            {(winAmount === '1000K' ? '1TR' : winAmount) + ' VND'}
          </Text>
        ) : null}

        <View
          sx={{
            my: '$2',
            backgroundColor: '#98c458',
            borderRadius: 20,
            width: width * 0.5,
            MozBoxShadow: '0px 5px 0px -2px rgba(120, 179, 77, 1)',
            WebkitBoxShadow: '0px 5px 0px -2px rgba(120, 179, 77, 1)',
            boxShadow: '0px 5px 0px -2px rgba(120, 179, 77, 1)',
          }}
        >
          <Text
            sx={{
              fontWeight: 'bold',
              fontSize: '$1',
              py: '$2',
              textAlign: 'center',
            }}
          >
            {t('event.next')}
          </Text>
        </View>
      </View>
    </StyledViewContainer>
  )
}

const StyledViewContainer = styled(View)(() => ({
  color: 'white',
  justifyContent: 'center',
  flex: 1,
  px: '$4',
}))

export default PlinkoMessageCard
