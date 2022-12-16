import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Image from 'app/components/common/Image'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { ActivityIndicator, styled, Text, View } from 'dripsy'
import React from 'react'
import { Platform } from 'react-native'
import { useAffcupWinnerListQuery } from 'services/eventApi'

const BoldText = styled(Text)({
  fontWeight: 'bold',
})

const AffCupList = () => {
  const { data, error, isLoading } = useAffcupWinnerListQuery()
  const winnerList = data?.data?.rows || []

  if (error) {
    return null
  }

  return (
    <View sx={{ alignItems: 'center', px: '$6', mt: '$4' }}>
      <BoldText sx={{ fontSize: '$5', mb: '$2' }}>
        DANH SÁCH TRÚNG GIẢI
      </BoldText>

      {isLoading ? (
        <ActivityIndicator sx={{ flex: 1, minHeight: 68 }} />
      ) : (
        <View>
          {!!winnerList.length &&
            winnerList.map((winner, index) => {
              return (
                <View
                  key={`${winner.ticket_date}${index}`}
                  sx={{
                    py: '$2',
                    px: '$8',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: 20,
                    backgroundColor: '#fff',
                    my: '$2',
                    maxWidth: '100%',
                  }}
                >
                  <View>
                    <BoldText sx={{ color: '#000000' }}>
                      {winner.ticket_date}
                    </BoldText>
                  </View>

                  <View sx={{ flexShrink: 1 }}>
                    <BoldText
                      sx={{
                        color: '#000000',
                        pl: '$4',
                        flexShrink: 1,
                        ...Platform.select({
                          web: {
                            wordBreak: 'break-all',
                          },
                        }),
                      }}
                    >
                      {winner.username}
                    </BoldText>
                  </View>
                </View>
              )
            })}
        </View>
      )}
    </View>
  )
}

const AffCupRule = () => {
  const rules = [
    {
      key: 'rule-1',
      text: (
        <BoldText sx={{ color: '#000000', flexShrink: 1 }}>
          Nạp tối thiểu <BoldText sx={{ color: '#FF0000' }}>500k</BoldText> VNĐ
          mỗi ngày
        </BoldText>
      ),
    },
    {
      key: 'rule-2',
      text: `Thành viên đủ điều kiện mặc định nằm trong danh sách rút thăm trúng thưởng.`,
    },
    {
      key: 'rule-3',
      text: (
        <BoldText sx={{ color: '#000000', flexShrink: 1 }}>
          Thành viên trúng giải sẽ được thông báo hàng ngày trên website / app{' '}
          <BoldText sx={{ color: '#FF0000' }}>Vui123</BoldText>.
        </BoldText>
      ),
    },
  ]

  return (
    <View sx={{ mt: '$6' }}>
      <BoldText sx={{ fontSize: '$5', textAlign: 'center' }}>THỂ LỆ</BoldText>

      {rules.map((rule, index) => {
        const ruleText = rule.text

        return (
          <View
            key={rule.key}
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              mt: '$3',
              backgroundColor: '#fff',
              px: '$3',
            }}
          >
            <BoldText sx={{ color: '#FF0000', fontSize: 40, mr: '$2' }}>
              {index + 1}
            </BoldText>

            {typeof ruleText === 'string' ? (
              <BoldText sx={{ color: '#000000', flexShrink: 1 }}>
                {ruleText}
              </BoldText>
            ) : (
              ruleText
            )}
          </View>
        )
      })}
    </View>
  )
}

const AffTermAndCondition = () => {
  const terms = [
    {
      key: 'term-1',
      text: 'Khuyến mãi này dành cho TẤT CẢ thành viên của Vui123.',
    },
    {
      key: 'term-2',
      text: 'Vui123 có quyền hoãn và hủy sự kiện này bất cứ lúc nào. ',
    },

    {
      key: 'term-3',
      text: 'Vui123 có quyền đưa ra quyết định duy nhất và quyết định của Vui123 là quyết định cuối cùng. ',
    },
    {
      key: 'term-4',
      text: 'Áp dụng Điều Khoản & Điều Kiện Chung của Vui123.',
    },
  ]

  return (
    <View sx={{ mt: '$6', px: '$3', backgroundColor: '#000000', py: '$8' }}>
      <BoldText sx={{ fontSize: '$4', pb: '$2', textAlign: 'center' }}>
        Điều khoản & Điều kiện
      </BoldText>

      {terms.map((term, index) => {
        return (
          <View key={term.key} sx={{ flexDirection: 'row', mt: '$1' }}>
            <Text>{index + 1}.</Text>

            <Text sx={{ pl: '$1' }}>{term.text}</Text>
          </View>
        )
      })}
    </View>
  )
}

const AffCupScreen = () => {
  const { bottom } = useSafeArea()
  const PADDING_BOTTOM = 16

  return (
    <>
      <PageWithBackHeader
        background={`${MEDIA_DOMAIN}${CONTENT_URI}/event/aff-cup/affcup-bg.jpg`}
        header={{ title: '' }}
        contentContainerStyle={{
          paddingBottom: Platform.select({
            ios: bottom,
            android: bottom + PADDING_BOTTOM,
            default: PADDING_BOTTOM,
          }),
        }}
        sx={{ minHeight: 0, backgroundColor: 'rgba(0,0,0,0.5)', flex: 1 }}
      >
        <View sx={{ alignItems: 'center' }}>
          <Image
            sx={{
              width: 160,
              aspectRatio: 67 / 24,
            }}
            source={require('app/assets/images/logo.png')}
            resizeMode="contain"
          />

          <BoldText sx={{ fontWeight: 'bold', fontSize: '$3', mb: '$3' }}>
            HÒA MÌNH CÙNG AFF CUP 2022
          </BoldText>

          <BoldText sx={{ fontSize: '$1' }}>Sự kiện</BoldText>
          <View
            sx={{
              backgroundColor: '#fff',
              width: '100%',
              alignItems: 'center',
              py: '$1',
            }}
          >
            <BoldText sx={{ color: '#FF0000', fontSize: '$2' }}>
              Mỗi ngày tặng 1 iPhone 14 Pro Max
            </BoldText>
          </View>

          <BoldText sx={{ fontSize: '$1' }}>Thời gian</BoldText>
          <View
            sx={{
              backgroundColor: '#fff',
              width: '100%',
              alignItems: 'center',
              py: '$1',
            }}
          >
            <BoldText sx={{ color: '#FF0000', fontSize: '$2' }}>
              20/12/2022 tới 16/01/2023
            </BoldText>
          </View>

          <AffCupList />
        </View>

        <AffCupRule />

        <AffTermAndCondition />
      </PageWithBackHeader>
    </>
  )
}

export default AffCupScreen
