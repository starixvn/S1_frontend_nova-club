import { Gradient } from '@dripsy/gradient'
import Divider from 'app/components/Divider'
import IconButton from 'app/components/form/IconButton'
import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import { styled, StyledProps, SxProp, Text, View } from 'dripsy'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'

const ProfileBalance = () => {
  const [isExtend, setIsExtend] = useState(false)

  return (
    <StyledGradient gradient="PaleBlue" sx={{ height: isExtend ? 200 : 100 }}>
      <View
        sx={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <BalanceItem
          title="Balance"
          value="88K"
          size="large"
          _sx={{ justifyContent: 'center' }}
        />
        <IconButton
          _icon={{ name: 'chevdown' }}
          onPress={() => setIsExtend(!isExtend)}
          sx={{ position: 'absolute', right: 0 }}
        />
      </View>
      {isExtend && (
        <>
          <View
            sx={{
              flex: 1,

              borderTopWidth: 1,
              borderTopColor: '$lightNavyBlue',
              justifyContent: 'center',
            }}
          >
            <View
              sx={{
                flexDirection: 'row',
                height: '80%',
              }}
            >
              <BalanceItem title="Cash" value="86K" />
              <BalanceItem
                title="Reward"
                value="2K"
                _sx={{
                  borderLeftWidth: 1,
                  borderLeftColor: '$lightNavyBlue',
                }}
              />
            </View>
          </View>
        </>
      )}
    </StyledGradient>
  )
}

const BalanceItem = ({
  title,
  value,
  size = 'small',
  _sx,
}: {
  title: string
  value: string
  size?: 'large' | 'small'
  _sx?: SxProp
}) => {
  const titleFontSize = size === 'large' ? 18 : 16
  const valueFontSize = size === 'large' ? 28 : 24

  return (
    <View
      sx={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        ..._sx,
      }}
    >
      <Icon name="lc" size={50} />
      <View>
        <Text sx={{ fontSize: titleFontSize }}>{title}</Text>
        <Text
          sx={{
            fontSize: valueFontSize,
            fontWeight: 'bold',
            color: '$yellowLight',
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  )
}

const StyledGradient = styled(Gradient)(() => ({
  m: '$8',
  px: '$8',
  height: 100,
  borderWidth: 2,
  borderColor: '$lightNavyBlue',
  borderRadius: 18,
}))

export default ProfileBalance
