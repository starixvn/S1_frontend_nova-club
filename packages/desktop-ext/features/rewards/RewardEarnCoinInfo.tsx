import RotatableArrow from 'app/features/rewards/How/Component/RotatableArrow'
import useLocalization from 'app/provider/localization'
import { Pressable, Text, View } from 'dripsy'
import React, { useState } from 'react'
import { GRID_ROW, REWARD_HOW_TO_EARN_NOTES } from 'utils/constant'

const RewardEarnCoinInfo = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const { t } = useLocalization()

  return (
    <View sx={{ paddingVertical: '$3' }}>
      <View sx={{ width: '80%', alignSelf: 'center' }}>
        {REWARD_HOW_TO_EARN_NOTES.map((e, i) => {
          return (
            <View key={i} sx={{ flexDirection: 'row' }}>
              <Text>{i + 1}. </Text>
              <Text sx={{ mb: '$1' }}>{t(e)}</Text>
            </View>
          )
        })}
      </View>
      <View
        sx={{
          width: '80%',
          alignSelf: 'center',
          borderWidth: 2,
          borderRadius: 15,
          borderColor: '$primary.100',
          backgroundColor: '$primary.500',
          marginVertical: '$2',
        }}
      >
        <View
          sx={{
            flexDirection: 'row',
            borderBottomWidth: 2,
            borderColor: '$primary.100',
          }}
        >
          <View
            sx={{
              flex: 0.4,
              borderColor: '$primary.100',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: '$3',
              paddingVertical: '$1',
            }}
          >
            <Text sx={{ fontWeight: 'bold' }}>
              {t('rewards.grid.header.how')}
            </Text>
          </View>
          <View
            sx={{
              flex: 0.3,
              borderColor: '$primary.100',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: '$3',
              paddingVertical: '$1',
            }}
          >
            <Text sx={{ fontWeight: 'bold' }}>
              {t('rewards.grid.header.requirement')}
            </Text>
          </View>
          <View
            sx={{
              flex: 0.3,
              paddingHorizontal: '$3',
              paddingVertical: '$1',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              {t('rewards.grid.header.coin')}
            </Text>
          </View>
        </View>

        {GRID_ROW.map((e, i) => {
          return (
            <View key={i}>
              <Pressable
                key={i}
                onPress={() => {
                  if (i === openIndex) {
                    setOpenIndex(null)
                  } else {
                    setOpenIndex(i)
                  }
                }}
              >
                <View sx={{ flexDirection: 'row', p: '$2' }}>
                  <View
                    sx={{
                      flex: 0.4,
                      flexDirection: 'row',
                      alignItems: 'center',
                      p: '$2',
                    }}
                  >
                    <RotatableArrow isActive={i === openIndex} />
                    <Text sx={{ ml: '$2' }}>{t(e.earn)}</Text>
                  </View>
                  <View
                    sx={{
                      flex: 0.3,
                      p: '$2',
                    }}
                  >
                    <Text sx={{ textAlign: 'center' }}>{t(e.requirement)}</Text>
                  </View>
                  <View sx={{ flex: 0.3, p: '$2' }}>
                    <Text sx={{ textAlign: 'center' }}>{t(e.coin)}</Text>
                  </View>
                </View>
              </Pressable>
              {i === openIndex && (
                <View
                  sx={{
                    width: '90%',
                    alignSelf: 'center',
                    backgroundColor: '$primary.500',
                    p: '$3',
                  }}
                >
                  {e.details.map((detailText, index) => {
                    return (
                      <View key={index} sx={{ flexDirection: 'row' }}>
                        <Text>{index + 1}. </Text>
                        <Text sx={{ mb: '$2' }}>{t(detailText)}</Text>
                      </View>
                    )
                  })}
                </View>
              )}
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default RewardEarnCoinInfo
