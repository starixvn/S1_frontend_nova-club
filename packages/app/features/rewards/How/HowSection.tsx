import SectionHeader from 'app/components/SectionHeader'
import useLocalization from 'app/provider/localization'
import { Text, View, styled } from 'dripsy'
import { useState } from 'react'
import { Pressable } from 'react-native'
import { GRID_ROW, REWARD_HOW_TO_EARN_NOTES } from 'utils/constant'
import RotatableArrow from './Component/RotatableArrow'

const HowSection = () => {
  const { t } = useLocalization()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const renderDetail = (i: number) => {
    const loop = i <= 2 ? 5 : 6

    let details: React.ReactNode[] = []

    let count = 0

    for (count; count < loop; count++) {
      details.push(
        <View sx={{ flexDirection: 'row' }}>
          <Text>{count + 1}. </Text>
          <Text sx={{ mb: '$2' }}>
            {t(`rewards.grid.details.d${i + 1}.n${count + 1}`)}
          </Text>
        </View>
      )
    }

    return details
  }

  return (
    <View>
      <SectionHeader
        icon="question"
        title={t('rewards.earn.title').toUpperCase()}
        titleProps={{
          sx: {
            fontSize: 16,
          },
        }}
      />
      <View sx={{ width: '80%', alignSelf: 'center', marginVertical: 20 }}>
        {REWARD_HOW_TO_EARN_NOTES.map((e, i) => {
          return (
            <View key={i} sx={{ flexDirection: 'row' }}>
              <ContentText sx={{ fontSize: 15 }}>{i + 1}. </ContentText>
              <ContentText sx={{ fontSize: 15, mb: '$1' }}>{t(e)}</ContentText>
            </View>
          )
        })}
      </View>
      <View
        sx={{
          flexDirection: 'row',
          backgroundColor: '$primary.300',
          p: '$2',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <HeaderLabel
          sx={{
            flex: 0.5,
          }}
        >
          {t('rewards.grid.header.how')}
        </HeaderLabel>
        <HeaderLabel sx={{ flex: 0.3 }}>
          {t('rewards.grid.header.requirement')}
        </HeaderLabel>
        <HeaderLabel sx={{ flex: 0.2 }}>
          {t('rewards.grid.header.coin')}
        </HeaderLabel>
      </View>
      {GRID_ROW.map((e, i) => {
        return (
          <>
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
                    flex: 0.5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    p: '$2',
                  }}
                >
                  <RotatableArrow isActive={i === openIndex} />
                  <ContentText sx={{ ml: '$2' }}>{t(e.earn)}</ContentText>
                </View>
                <View
                  sx={{
                    flex: 0.3,
                    p: '$2',
                  }}
                >
                  <ContentText
                    sx={{
                      textAlign: 'center',
                    }}
                  >
                    {t(e.requirement)}
                  </ContentText>
                </View>
                <View sx={{ flex: 0.2, p: '$2' }}>
                  <ContentText
                    sx={{
                      textAlign: 'center',
                    }}
                  >
                    {t(e.coin)}
                  </ContentText>
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
                {renderDetail(i)}
              </View>
            )}
          </>
        )
      })}
    </View>
  )
}

const HeaderLabel = styled(Text)({
  fontSize: 14,
  textAlign: 'center',
  fontWeight: 'bold',
})

const ContentText = styled(Text)({
  fontSize: 15,
})

export default HowSection
