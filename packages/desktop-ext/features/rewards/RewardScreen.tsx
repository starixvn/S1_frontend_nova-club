import RewardGameList from 'app/features/rewards/List/RewardGameList'
import useLocalization from 'app/provider/localization'
import PageSection from 'desktop-ext/components/layout/PageSection'
import RewardRoutes from 'desktop-ext/routes/rewardRoutes'
import { Text, View } from 'dripsy'
import RewardEarnCoinInfo from './RewardEarnCoinInfo'
import {
  CONTENT_FROM_TOP,
  HEADER_HEIGHT,
  REWARD_GENERAL_RULE_NOTES,
  SCROLL_OFFSET_TOP,
} from 'utils/constant'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { NAVIGATION_HEIGHT } from 'desktop-ext/components/layout/navigation/NavigationHeader'

const RewardScreen = () => {
  const { query } = useRouter()
  const [isContentLoaded, setContentLoaded] = useState(false)
  const { t } = useLocalization()

  useEffect(() => {
    if (isContentLoaded && query.tab && typeof query.tab === 'string') {
      const element = document.getElementById(query.tab)
      console.log('🚀 ~ useEffect ~ element:', element)

      if (element) {
        const elementTop = element.getBoundingClientRect().top

        element.scrollIntoView({ behavior: 'smooth' })

        if (elementTop < SCROLL_OFFSET_TOP || elementTop > CONTENT_FROM_TOP) {
          window.scrollBy(
            0,
            elementTop - HEADER_HEIGHT - NAVIGATION_HEIGHT - 16 // 16 is from $layoutSpace
          )
        }
      }
    }
  }, [query.tab, isContentLoaded])

  return (
    <View sx={{ gap: '$4' }}>
      <PageSection
        icon={'vui-coin'}
        text={t(RewardRoutes[0].title)}
        nativeID={RewardRoutes[0].key}
      >
        <RewardGameList onLoaded={() => setContentLoaded(true)} />
      </PageSection>
      {/* <PageSection
        icon={'question'}
        text={t('rewards.earn.title')}
        nativeID={RewardRoutes[1].key}
      >
        <RewardEarnCoinInfo />
      </PageSection> */}
      <PageSection
        icon={'exclaimation'}
        text={t('rewards.rule.title')}
        nativeID={RewardRoutes[1].key}
      >
        <View sx={{ width: '80%', alignSelf: 'center', paddingVertical: '$3' }}>
          {REWARD_GENERAL_RULE_NOTES.map((e, i) => {
            return (
              <View key={i} sx={{ flexDirection: 'row' }}>
                <Text>{i + 1}. </Text>
                <Text sx={{ mb: '$1' }}>{t(e)}</Text>
              </View>
            )
          })}
        </View>
      </PageSection>
    </View>
  )
}

export default RewardScreen
