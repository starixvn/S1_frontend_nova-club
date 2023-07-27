import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import { FONT_TOP_OFFSET } from 'app/constants/font'
import useLocalization from 'app/provider/localization'
import { Pressable, Row, Text, View, styled, useResponsiveValue } from 'dripsy'
import React from 'react'

export default function HireBanner() {
  const { t } = useLocalization()
  // const direction = useResponsiveValue(['column', 'column', 'column', 'row'])
  const showTime = useResponsiveValue([false, true])

  return (
    <Row
      sx={{
        borderRadius: 40,
        bg: '$primary.200',
        p: ['$1', '$1', '$1', '$2'],
      }}
    >
      <View
        sx={{
          borderRadius: 30,
          bg: '$primary.500',
          px: ['$2', '$3'],
          justifyContent: 'center',
        }}
      >
        <Text
          sx={{
            fontWeight: '900',
            // pt: FONT_TOP_OFFSET,
            fontSize: [10, 12, 14, 10, 12, 14],
            lineHeight: [13, 15, 15, 13, 15],
          }}
        >
          {t('home.hireAgent')}
        </Text>
      </View>
      <Row
        sx={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <View
          sx={{
            mx: '$1',
            px: ['$1', '$2'],
            flex: 1,
          }}
        >
          <Label
            sx={{
              flex: 1,
            }}
          >
            {t('home.joinsUs')}
          </Label>
          {showTime && (
            <Row sx={{ flex: 1, alignItems: 'center' }}>
              <Icon size={16} name="date" />
              <Label
                sx={{
                  mx: ['$1', '$2'],
                }}
              >
                1-31/5/2023
              </Label>
              <Label
                sx={{
                  color: '#00FFFF',
                }}
              >
                30 {t('common.days')} 12:34:56
              </Label>
            </Row>
          )}
        </View>

        <JoinNowBtn>{t('home.joinNow')}</JoinNowBtn>
      </Row>
    </Row>
  )
}

const Label = styled(Text)({
  mt: FONT_TOP_OFFSET,
  fontSize: [10, 12, 12, 11, 12],
  fontWeight: 'bold',
})

const JoinNowBtn = ({ children }) => {
  return (
    <Pressable
      sx={{
        borderRadius: 30,
        overflow: 'hidden',
        alignSelf: 'stretch',
        borderWidth: 2,
        borderColor: '$secondary.500',
      }}
    >
      <DripsyGradient
        gradient={'secondary'}
        sx={{ px: ['$1', '$2', '$3'], flex: 1, justifyContent: 'center' }}
      >
        <Text
          sx={{
            fontSize: [10, 12, 13, 10, 12, 13],
            color: '$error',
            fontWeight: '900',
            marginTop: FONT_TOP_OFFSET,
          }}
        >
          {children}
        </Text>
      </DripsyGradient>
    </Pressable>
  )
}
